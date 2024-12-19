declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_MAP_KEY: string;
    }
  }
}

export {};
