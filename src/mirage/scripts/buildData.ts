// const fs = require('fs');
// const path = require('path');
// const zlib = require('zlib');
// const { Parser } = require('csv-parse');
import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { Parser } from 'csv-parse';

interface NameBasic    { nconst: string; primaryName: string; }
interface TitlePrincipal { tconst: string; nconst: string; category: string; }
interface TitleBasic   { tconst: string; primaryTitle: string; startYear: string; genres: string; }

function streamParser<T>(options: ConstructorParameters<typeof Parser>[0]) {
  return new Parser(options);
}

async function findCageIds(): Promise<Set<string>> {
  return new Promise((resolve, reject) => {
    const cages = new Set<string>();
    const parser = streamParser<NameBasic>({
      columns: true,
      delimiter: '\t',
      quote: '',
      relaxColumnCount: true
    });
    fs.createReadStream(path.join(__dirname, '../data/name.basics.tsv.gz'))
      .pipe(zlib.createGunzip())
      .pipe(parser)
      .on('data', (row: NameBasic) => {
        if (row.primaryName.toLowerCase().includes('cage')) cages.add(row.nconst);
      })
      .on('end', () => resolve(cages))
      .on('error', reject);
  });
}

async function findCageTitles(cages: Set<string>): Promise<Set<string>> {
  return new Promise((resolve, reject) => {
    const titles = new Set<string>();
    const parser = streamParser<TitlePrincipal>({
      columns: true,
      delimiter: '\t',
      quote: '',
      relaxColumnCount: true
    });
    fs.createReadStream(path.join(__dirname, '../data/title.principals.tsv.gz'))
      .pipe(zlib.createGunzip())
      .pipe(parser)
      .on('data', (row: TitlePrincipal) => {
        if (row.category === 'actor' && cages.has(row.nconst)) {
          titles.add(row.tconst);
        }
      })
      .on('end', () => resolve(titles))
      .on('error', reject);
  });
}

async function buildRecords(titles: Set<string>): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const out: any[] = [];
    const parser = streamParser<TitleBasic>({
      columns: true,
      delimiter: '\t',
      quote: '',
      relaxColumnCount: true
    });
    fs.createReadStream(path.join(__dirname, '../data/title.basics.tsv.gz'))
      .pipe(zlib.createGunzip())
      .pipe(parser)
      .on('data', (row: TitleBasic) => {
        if (titles.has(row.tconst)) {
          out.push({
            id: row.tconst,
            title: row.primaryTitle,
            year: row.startYear,
            genres: row.genres === '\\N' ? [] : row.genres.split(','),
          });
        }
      })
      .on('end', () => resolve(out))
      .on('error', reject);
  });
}

async function main() {
  console.log('Finding Cage IDs…');
  const cages = await findCageIds();
  console.log(`Found ${cages.size} name IDs`);

  console.log('Finding his titles…');
  const titles = await findCageTitles(cages);
  console.log(`Found ${titles.size} titles`);

  console.log('Building movie records…');
  const records = await buildRecords(titles);
  console.log(`Built ${records.length} records`);

  const outPath = path.join(__dirname, '../data/cage-movies.json');
  fs.writeFileSync(outPath, JSON.stringify(records, null, 2));
  console.log(`Written to ${outPath}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
