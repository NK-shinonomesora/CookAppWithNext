import express, { Request, Response } from "express";
import { dbAll, dbRun } from "./DatabaseCreate"
export const material = express.Router();

// type Insert = {
//   lastID: number
//   changes: number
// }

material.post("/", async (req: Request, res: Response, next) => {
  try {
    const { materials } = req.body;
    console.log(materials);
  } catch(err) {
    console.log(err)
  }
});