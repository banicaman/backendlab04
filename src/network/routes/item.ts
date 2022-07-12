import { Response, Request, Router } from 'express'
import { request } from 'http'
import { response } from '../response'

import { ProductModel } from '../../database'

// import data from './data.js'

const Items = Router()

const productGetAll = async () => {
  return await ProductModel.find()
}

const productGetone = async (name: string) => {
  return await ProductModel.findOne({ name })
}

const productCreate = async (data: any) => {
  await ProductModel.create(data)
}

const productPut = async (name: string, data: any) => {
  return await ProductModel.findOneAndUpdate({ name }, data, {
    new: true
  })
}

Items.route('/items').get((req: Request, res: Response) => {
  try {
    if (req.body.args && req.body.args.title) {
      const data = req.body.args
      productGetone(data).then(data => {
        response({
          error: false,
          server: 'Backend01',
          message: data,
          method: 'Getone',
          res,
          status: 200
        })
      })
    } else
      productGetAll().then(data => {
        response({
          error: false,
          server: 'Backend01',
          message: data,
          method: 'GetAll',
          res,
          status: 200
        })
      })
  } catch (error) {
    console.log(error)
  }
})

Items.route('/items').post((req: Request, res: Response) => {
  try {
    const data = req.body.args

    productCreate(data).then(data => {
      response({
        error: false,
        server: 'Backend01',
        message: data,
        method: 'Create',
        res,
        status: 200
      })
    })
  } catch (error) {
    console.log(error)
  }
})

Items.route('/items').put((req: Request, res: Response) => {
  try {
    const data = req.body.args

    productPut(data.title, data).then(data => {
      response({
        error: false,
        server: 'Backend01',
        message: data,
        method: 'Update Item',
        res,
        status: 200
      })
    })
  } catch (error) {
    console.log(error)
  }
})

export { Items }
