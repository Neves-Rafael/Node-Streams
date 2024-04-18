import http from "node:http";
import { Transform } from "node:stream";

class InverseNumber extends Transform {
  _transform(chunk, encoding, callback){
    const transformed = Number(chunk.toString()) * -1;

    console.log(transformed)

    callback(null, Buffer.from(String(transformed)))
  }
}

// req = ReadableStream
// res = WritableStream

const server = http.createServer(async (req, res)=> {
  //Para consumir dados por completo
  const buffers = [];

 for await (const chunk of req){
  buffers.push(chunk)
 }

  const fullBody = Buffer.concat(buffers).toString();

  console.log(fullBody)

  return res.end(fullBody);

  // return req
  //   .pipe(new InverseNumber())
  //   .pipe(res)
})

server.listen(3334)
