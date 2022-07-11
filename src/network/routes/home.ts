import { Response, Request, Router } from 'express'

import { response } from '../response'

const Home = Router()

Home.route('').get((req: Request, res: Response) => {
  response({
    error: false,
    message: 'Welcome Backend 01',
    res,
    status: 200
  })
})

export { Home }
