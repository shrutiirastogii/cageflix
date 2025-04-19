import { Server, Model, } from "miragejs";
import moviesList from "./data/cage-movies.json";

export function makeServer({ environment = "development" } = {}) {
  return new Server({
    environment,

    models: {
      movie: Model,
      user: Model,
    },

    seeds(server) {
      moviesList.forEach((movie) => {
        server.create("movie", movie);
      });
      const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const randomInitials = 
        letters.charAt(Math.floor(Math.random() * letters.length)) +
        letters.charAt(Math.floor(Math.random() * letters.length));

      server.create("user", { initials: randomInitials });
    },

    routes() {
      this.namespace = "api";
      this.timing = 500;

      // GET User
      this.get("/user", (schema: any) => {
        let u = schema.users.first();
        return { user: { initials: u.attrs.initials } };
      });

      // GET all movies with pagination
      this.get("/movies", (schema: any, request) => {
        let { page = "1" } = request.queryParams;
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
