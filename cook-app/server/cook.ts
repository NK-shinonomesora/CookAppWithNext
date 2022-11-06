import express, { Request, Response } from "express";
import { dbGet, dbAll, dbRun } from "./DatabaseCreate"
export const cook = express.Router();

cook.get("/", async (req: Request, res: Response, next) => {
  try {
    const cooks = await dbAll('SELECT * FROM cookName')
    res.status(200).json(cooks);
  } catch(err) {
    console.log(err)
  }
});

cook.get("/:id(\\d+)", async (req: Request, res: Response, next) => {
  try {
    const id = req.params.id;
    const cook = await dbGet(`SELECT name FROM cookName where id = ${id}`);
    const data = {cook: cook};
    res.status(200).json(data);
  } catch(err) {
    console.log(err);
  }
});