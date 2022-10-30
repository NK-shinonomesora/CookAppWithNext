import { dbRun } from "./DatabaseCreate"

// dbRun(`CREATE TABLE cookName (
//   id INTEGER PRIMARY KEY NOT NULL,
//   name TEXT NOT NULL
// )`)

// dbRun(`CREATE TABLE material (
//   id INTEGER PRIMARY KEY NOT NULL,
//   name TEXT NOT NULL,
//   cookName_id INTEGER,
//   foreign key (cookName_id) references cookName(id)
// )`)

dbRun(`CREATE TABLE step (
  id INTEGER PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  cookName_id INTEGER,
  foreign key (cookName_id) references cookName(id)
)`)