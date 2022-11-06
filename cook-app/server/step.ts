import express, { Request, Response } from "express";
import { dbAll, dbRun } from "./DatabaseCreate"
export const step = express.Router();

step.get("/:id(\\d+)", async (req: Request, res: Response, next) => {
  try {
    const id = req.params.id;
    const steps = await dbAll(`SELECT name FROM step where cookName_id = ${id}`);
    const data = {steps: steps};
    res.status(200).json(data);
  } catch(err) {
    console.log(err);
  }
});