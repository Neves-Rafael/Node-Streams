import { Database } from "./database.js";
import { randomUUID } from "node:crypto";
import { buildRoutePath } from "./utils/build-route-path.js";

const database = new Database;

export const routes = [
  {
    method:"POST",
    path:buildRoutePath("/tasks"),
    handle: async(req, res) => {
      const { title, description } = req.body

      await database.insert("tasks", {
        id: randomUUID(),
        title: title,
        description: description,
        completed_at: null,
        created_at: new Date(),
        updated_at: new Date()
      })

      return res.end();
    }
  },
  {
    method:"GET",
    path:buildRoutePath("/tasks"),
    handle: (req, res) =>{
      const { search } = req.query

      const result = database.select("tasks", search ? {
        title: search,
        description: search
      }: null)
      return res.end(JSON.stringify(result))
    }
  },
  {
    method:"PUT",
    path:buildRoutePath("/tasks/:id"),
    handle: (req, res) =>{
      const { id } = req.params
      const { title, description } = req.body
      console.log(id)

      const task = {
        title,
        description
      }

      const updateTask = database.update("tasks", id, task)

      if(updateTask){
        return res.writeHead(404).end(updateTask)
      }

      return res.writeHead(201)
    }
  },
  {
    method:"DELETE",
    path:buildRoutePath("/tasks/:id"),
    handle: (req, res) =>{
      const { id } = req.params
      const deleteTask = database.delete("tasks", id)

      if(deleteTask){
        return res.writeHead(404).end(deleteTask)
      }

      return res.end()
    }
  },
  {
    method:"PATCH",
    path:buildRoutePath("/tasks/:id/complete"),
    handle: (req, res) =>{
      const { id } = req.params

      const completeTask = database.complete("tasks", id)

      if(completeTask){
        return res.writeHead(404).end(completeTask)
      }

      return res.end()
    }
  }
]