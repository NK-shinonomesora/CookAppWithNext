import express, { Request, Response } from "express";
import { dbAll, dbRun } from "./DatabaseCreate"
export const material = express.Router();

material.get("/:id(\\d+)", async (req: Request, res: Response, next) => {
  try {
    const id = req.params.id;
    const materials = await dbAll(`SELECT name FROM material where cookName_id = ${id}`);
    const data = {materials: materials};
    res.status(200).json(data);
  } catch(err) {
    console.log(err);
  }
});