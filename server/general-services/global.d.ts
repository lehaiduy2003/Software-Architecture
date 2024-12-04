declare global {
  namespace NodeJS {
    interface ProcessEnv {
      RABBITMQ: string;
    }
  }
}

export {};
