import { Router } from 'express'

import { mainRouter } from './routes'

const routes = Router()

routes.use('/', mainRouter)

export { routes }
