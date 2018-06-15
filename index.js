import path from 'path'

import { send } from 'micro'

import route from 'fs-route/esm'

const promisedRouter = route(path.join(__dirname, 'routes'))

export default async (req, res) => {
  const matcher = await promisedRouter
  try {
    const { handler, query, params } = matcher(req.url, req.method)
    
    if (handler) {
      return handler(req, res, { query, params })
    } else {
      send(res, 404, { error: 'not found' })
    }      
  } catch (err) {
    send(res, 500, { error: err.message })
  }
}
