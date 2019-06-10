import { TASKS_FILENAME } from './constants'

export function jsonCopy(object) {
  return JSON.parse(JSON.stringify(object))
}



