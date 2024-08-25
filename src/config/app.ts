import 'dotenv/config'

type enviroment = 'local' | 'development' | 'production'

interface IAppConfig {
  port: number
  environment: enviroment
}

export const appConfig: IAppConfig = {
  port: Number(process.env.PORT) ?? 3333,
  environment: (process.env.ENVIROMENT ?? 'local') as enviroment
}
