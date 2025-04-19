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

      this.get("/movies", (schema: any, request) => {
        let { page = "1", genre, year } = request.queryParams;
        let all = schema.movies.all().models;

        const pageNum = Number(page);
        const perPageNum = 20;
        const start = (pageNum - 1) * perPageNum;
        const paged = all.slice(start, start + perPageNum);

        return {
          movies: paged.map((m: any) => m.attrs),
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
