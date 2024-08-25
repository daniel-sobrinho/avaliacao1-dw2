import 'express-session'

declare module 'express-session' {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface Session {
    user: {
      name: string
      email: string
    }
  }
}
