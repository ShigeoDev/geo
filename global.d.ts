declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MAP_KEY: string;
    }
  }
}

export {};
