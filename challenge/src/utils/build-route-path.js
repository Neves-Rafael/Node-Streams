// /tasks/:id

export function buildRoutePath(path){
  const parametersRegex = /:([a-zA-Z]+) /g

  console.log(Array.from(path.matchAll(parametersRegex)))
}