import express, { Request, Response } from "express";
import { dbAll, dbRun } from "./DatabaseCreate"
export const cook = express.Router();

// type Insert = {
//   lastID: number
//   changes: number
// }

cook.get("/", async (req: Request, res: Response, next) => {
  try {
    const cooks = await dbAll('SELECT * FROM cookName')
    res.status(200).json(cooks);
  } catch(err) {
    console.log(err)
  }
});