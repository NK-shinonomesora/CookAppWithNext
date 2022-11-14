import express, { Request, Response } from "express";
import { dbGet, dbAll, dbRun } from "./DatabaseCreate"
export const cook = express.Router();

export const CookFunc = {
  GetAllCooks: async () => {
    const cooks = await dbAll('SELECT * FROM cookName');
    return cooks;
  },
  InsertCook: async (cookName: string) => {
    const result = await dbRun(`INSERT INTO cookName (name) VALUES ("${cookName}")`);
    return result;
  },
  DeleteCook: async (id: number) => {
    await dbRun(`delete from cookName where id = ${id}`);
  },
  GetCook: async (id: number) => {
    const cook = dbGet(`SELECT name FROM cookName where id = ${id}`);
    return cook;
  }
}


cook.get("/", async (req: Request, res: Response, next) => {
  try {
    const cooks = await CookFunc.GetAllCooks();
    res.status(200).json(cooks);
  } catch(err) {
    res.status(500).json({ reason: "Internal Server Error in cook.get(/)"});
    console.log(err);
  }
});

cook.get("/:id(\\d+)", async (req: Request, res: Response, next) => {
  try {
    const id = Number(req.params.id);
    const cook = await CookFunc.GetCook(id);
    const data = {cook: cook};
    res.status(200).json(data);
  } catch(err) {
    res.status(500).json({ reason: "Internal Server Error in cook.get(/:id)"});
    console.log(err);
  }
});