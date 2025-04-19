import { ModelDefinition } from 'miragejs';

interface MovieAttrs {
  id: stringl
  title: string,
  year: string,
  genres: string[]
}

declare module 'miragejs' {
  interface ModelRegistry {
    movie: ModelDefinition<MovieAttrs>;
  }
}