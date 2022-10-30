"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DatabaseCreate_1 = require("./DatabaseCreate");
(0, DatabaseCreate_1.dbRun)("INSERT INTO cookName (name) VALUES (\"test\")").then(function (res) { return console.log(res); });
