declare global {
  namespace NodeJS {
    interface ProcessEnv {
      USER_AGENT: string,
      CLIENT_ID: string,
      CLIENT_SECRET: string,
      BOT_USERNAME: string,
      BOT_PASSWORD: string
    }
  }
}

export {}