import { Database } from "./database.js"

const database = new Database;

export const routes = [
  {
    method:"POST",
    path:"/tasks",
    handle: async(req, res) =>{
      console.log(req.body)
      await database.create(req, res)

      return;
    }
  },
  {
    method:"GET",
    path:"/tasks",
    handle: (req, res) =>{

    }
  },
  {
    method:"PUT",
    path:"/tasks/:id",
    handle: (req, res) =>{

    }
  },
  {
    method:"DELETE",
    path:"/tasks/:id",
    handle: (req, res) =>{

    }
  },
  {
    method:"PATCH",
    path:"/tasks/:id/complete",
    handle: (req, res) =>{

    }
  }
]