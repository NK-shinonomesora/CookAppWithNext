"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DatabaseCreate_1 = require("./DatabaseCreate");
(0, DatabaseCreate_1.dbRun)("delete from step").then(function (resolve) { return resolve; });
(0, DatabaseCreate_1.dbRun)("delete from material").then(function (resolve) { return resolve; });
(0, DatabaseCreate_1.dbRun)("delete from cookName").then(function (resolve) { return resolve; });
