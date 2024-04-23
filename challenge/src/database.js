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
    }else{
      this.#database[table] = [data]
    }

    this.#persist();

    return data;
  }
  
  select(table){
    const data = this.#database[table] ?? []
    return data
  }

  update(){

  }

  delete(table, id){
    const rowIndex = this.#database[table].findIndex(index => {
      return index.id === id
    })

    
    if(rowIndex > -1){
      this.#database[table].splice(rowIndex, 1)
      this.#persist();
    }

    return 
  }
}