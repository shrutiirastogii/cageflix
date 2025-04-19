import { Server, Model, } from "miragejs";
import moviesList from "./data/cage-movies.json";

export function makeServer({ environment = "development" } = {}) {
  return new Server({
    environment,

    models: {
      movie: Model,
    },

    seeds(server) {
      moviesList.forEach((movie) => {
        server.create("movie", movie);
      });
    },

    routes() {
      this.namespace = "api";
      this.timing = 500;

      this.get('/movies', (schema : any, request) => {
        let { page = '1', perPage = '20', genre, year } = request.queryParams;
        let all = schema.movies.all().models;

        // // optional filtering
        // if (genre) {
        //   all = all.filter((m: { attrs: { genres: any; }; }) =>
        //     m.attrs.genres.split(',').includes(genre)
        //   );
        // }
        // if (year) {
        //   all = all.filter((m: { attrs: { startYear: string | string[]; }; }) => m.attrs.startYear === year);
        // }

        // simple pagination
        let pageNum = Number(page);
        let perPageNum = Number(perPage);
        let start = (pageNum - 1) * perPageNum;
        let paged = all.slice(start, start + perPageNum);

        return {
          movies: paged.map((m: { attrs: any; }) => m.attrs),
          meta: {
            total: all.length,
            page: pageNum,
            perPage: perPageNum,
          },
        };
      });
    },
  });
}
