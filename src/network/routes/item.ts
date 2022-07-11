import { Response, Request, Router } from 'express'

import { response } from '../response'

import data from './data.js'

const Items = Router()

Items.route('/items').get((req: Request, res: Response) => {
  response({
    error: false,
    message: data,
    res,
    status: 200
  })
})

export { Items }
