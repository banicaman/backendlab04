import { Application, Response, Request, Router, NextFunction } from 'express'
import httpErrors from 'http-errors'

import { response } from './response'
import * as routes from './routes'

const { Home, ...apiRoutes } = routes

const routers = Object.values(apiRoutes)

const applyRoutes = (app: Application): void => {
  app.use('/', Home)
  routers.forEach((router: Router): Application => app.use('/api', router))

  // Handling 404 error
  app.use((req, res, next) => {
    next(new httpErrors.NotFound('This route does not exists'))
  })
  app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    response({
      error: true,
      server: 'Backend 01',
      message: error,
      method: 'NOT_FOUND',
      res,
      status: error.status ?? 400
    })
    next()
  })
}

export { applyRoutes }
