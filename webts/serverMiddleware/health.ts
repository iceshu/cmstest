import { ServerMiddleware } from '@nuxt/types'
const isHealth = true
const myServerMiddleware: ServerMiddleware = function (req, res, next) {
  if (req.originalUrl === '/health') {
    if (isHealth) {
      res.writeHead(200)
      res.end('success')
    } else {
      res.writeHead(503)
      res.end()
    }
  }
}
export default myServerMiddleware
