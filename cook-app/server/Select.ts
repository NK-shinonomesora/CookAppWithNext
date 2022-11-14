import { dbAll } from "./DatabaseCreate"

(async () => {
  const cook = await dbAll('SELECT * FROM cookname');
  console.log(cook);
  const material = await dbAll('SELECT * FROM material');
  console.log(material);
  const step = await dbAll('SELECT * FROM step');
  console.log(step);
})();

