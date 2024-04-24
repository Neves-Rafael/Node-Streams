import fs from "node:fs/promises"

const urlPath = new URL("../db.json", import.meta.url)

export class Database{

  #database = {};

  constructor(){
    fs.readFile(urlPath, "utf-8").then(data => {
      this.#database = JSON.parse(data)
    }).catch(() =>{
      this.#persist()
    })
  }

  #persist(){
    fs.writeFile(urlPath, JSON.stringify(this.#database))
  }

  insert(table, data){
    if(Array.isArray(this.#database[table])){
      this.#database[table].push(data)
      console.log("adicionado")
    }else{
      this.#database[table] = [data]
    }

    this.#persist();

    return data;
  }
  
  select(table, search){
    let data = this.#database[table] ?? []

    if(search){
      data = data.filter(row => {
        return Object.entries(search).some(([key, value]) => {
          return row[key].toLowerCase().includes(value.toLowerCase())
        })
      })
    }
    return data
  }

  update(table, id, data){
    const rowIndex = this.#database[table].findIndex(index => {
      return index.id === id
    })


    if(rowIndex < 0 || !data.title && !data.description){
      return "Registro não existe!"
    }

    const task = this.#database[table][rowIndex]

    if(data.title){
      task.title = data.title
    }

    if(data.description){
      task.description = data.description
    }

    task.updated_at = new Date()
    this.#persist()

    return 
  }

  delete(table, id){
    const rowIndex = this.#database[table].findIndex(index => {
      return index.id === id
    })

    
    if(rowIndex > -1){
      this.#database[table].splice(rowIndex, 1)
      this.#persist();
    }else{
      return "Registro não existe!"
    }

    return 
  }

  complete(table, id){
    const rowIndex = this.#database[table].findIndex(index => {
      return index.id === id
    })

    if(rowIndex > -1 ){
      this.#database[table][rowIndex].completed_at = new Date()
      console.log("patch")
      this.#persist()
    }else{
      return "Registro não existe!"
    }

    return 
  }
}