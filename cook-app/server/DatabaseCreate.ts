import { promisify } from "util"
import * as sqlite3 from "sqlite3" 

const db = new sqlite3.Database('./dist/cooking')

type CookProp = {
  id?: number
  name?: string
  review?: number
}

export const dbGet = promisify<string, string>(db.get.bind(db))
export const dbAll = promisify<string, CookProp[]>(db.all.bind(db))
export const dbRun = function(arg: string) {
  return new Promise<any>((resolve, reject) => {
    db.run.apply(db, [
      arg,
      function(this: sqlite3.Database, err: Error) {
        err ? reject(err) : resolve(this)
      }
    ]
    )
  })
}