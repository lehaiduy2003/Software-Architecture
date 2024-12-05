declare global {
  namespace NodeJS {
    interface ProcessEnv {
      RABBITMQ: string;
      STRIPE_SECRET_KEY: string;
    }
  }
}

export {};
