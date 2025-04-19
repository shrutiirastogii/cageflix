import Fuse from 'fuse.js';

export interface SearchOptions<T> {
    keys: Array<keyof T>;
    threshold?: number;    
    distance?: number;  
    minMatchCharLength?: number;
  }

export function fuzzySearch<T>(
    list: T[],
    pattern: string,
    options:SearchOptions<T>
): T[] {
    if (!pattern) return list;

    const fuse = new Fuse(list, {
      keys: options.keys as string[],
      threshold: options.threshold ?? 0.3,
      distance: options.distance ?? 100,
      minMatchCharLength: options.minMatchCharLength ?? 2,
    });
    return fuse.search(pattern).map((result: { item: any; }) => result.item);
}
  