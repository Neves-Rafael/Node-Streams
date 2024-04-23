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
      const result = database.select("tasks")
      return res.end(JSON.stringify(result))
    }
  },
  {
    method:"PUT",
    path:buildRoutePath("/tasks/:id"),
    handle: (req, res) =>{

    }
  },
  {
    method:"DELETE",
    path:buildRoutePath("/tasks/:id"),
    handle: (req, res) =>{
      const { id } = req.params
      database.delete("tasks", id)
      return res.end()
    }
  },
  {
    method:"PATCH",
    path:buildRoutePath("/tasks/:id/complete"),
    handle: (req, res) =>{

    }
  }
]