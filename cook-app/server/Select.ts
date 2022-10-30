import { dbAll } from "./DatabaseCreate"

dbAll('SELECT * FROM cookname').then((result) => console.log(result));
dbAll('SELECT * FROM material').then((result) => console.log(result));
dbAll('SELECT * FROM step').then((result) => console.log(result));
