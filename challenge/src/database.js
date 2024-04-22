import { randomUUID } from "node:crypto"

export class Database{
  #database = {};

  create(req, res){
    // const { title, description } = req.body
    const task = {
      id: randomUUID(),
      completed_at: null,
      created_at: new Date(),
      updated_at: new Date()
    }

    // console.log(title, description,...task)
    // console.log(req.body)
    
    return
    // return res.writeHead(task).end()
  }

  update(){

  }

  delete(){

  }
}