"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DatabaseCreate_1 = require("./DatabaseCreate");
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
(0, DatabaseCreate_1.dbRun)("CREATE TABLE step (\n  id INTEGER PRIMARY KEY NOT NULL,\n  name TEXT NOT NULL,\n  cookName_id INTEGER,\n  foreign key (cookName_id) references cookName(id)\n)");
