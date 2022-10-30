"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DatabaseCreate_1 = require("./DatabaseCreate");
(0, DatabaseCreate_1.dbAll)('SELECT * FROM cookname').then(function (result) { return console.log(result); });
(0, DatabaseCreate_1.dbAll)('SELECT * FROM material').then(function (result) { return console.log(result); });
(0, DatabaseCreate_1.dbAll)('SELECT * FROM step').then(function (result) { return console.log(result); });
