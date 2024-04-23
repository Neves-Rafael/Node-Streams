// /tasks/:id

export function buildRoutePath(path){
  const parametersRegex = /:([a-zA-Z]+)/g
  const pathParams = path.replaceAll(parametersRegex, "(?<$1>[a-z0-9\-_]+)")

  const pathRegex = new RegExp(`^${pathParams}`)

  return pathRegex
}