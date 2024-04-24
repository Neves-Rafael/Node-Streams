import http from "node:http"
import { routes } from "./routes.js"
import { json } from "./middlewares/json.js"
import { extractQUeryParams } from "./utils/extract-query-params.js"

const server = http.createServer(async(req, res)=> {
  const { method, url } = req
  
  await json(req,res)
  
  const pathRoute = routes.find((route) => {
    return route.method === method && route.path.test(url)
  })
  

  if(pathRoute){
    const routeParams = req.url.match(pathRoute.path)

    const { query, ...params} = routeParams.groups

    req.params = params
    req.query = query ? extractQUeryParams(query) : {} 

    return pathRoute.handle(req, res)
  }

  return res.writeHead(404).end()
})

server.listen(3333)