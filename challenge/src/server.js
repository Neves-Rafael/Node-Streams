import http from "node:http"
import { routes } from "./routes.js"

const server = http.createServer((req, res)=> {
  const { method, url } = req
  const pathRoute = routes.find((route) => {
    return route.method === method && url === route.path
  })
   
  if(pathRoute){
    pathRoute.handle(req, res)
  }

})

server.listen(3333)