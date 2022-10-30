import { dbRun } from "./DatabaseCreate"

dbRun(`INSERT INTO cookName (name) VALUES ("test")`).then(res => console.log(res))
