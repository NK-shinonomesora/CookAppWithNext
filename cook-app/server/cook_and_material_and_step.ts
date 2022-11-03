import express, { Request, Response } from "express";
import { dbAll, dbRun } from "./DatabaseCreate"
export const cook_and_material_and_step = express.Router();

type Insert = {
  lastID: number
  changes: number
}

cook_and_material_and_step.post("/", async (req: Request, res: Response, next) => {
  try {
    const { cookName, materials, steps } = req.body;
    const registeredMaterials = materials.filter((m: string) => m !== "");
    const registeredSteps = steps.filter((s: string) => s !== "");
    dbRun('BEGIN TRANSACTION')
    const result: Insert = await dbRun(`INSERT INTO cookName (name) VALUES ("${cookName}")`)
    for(let i = 0; i < registeredMaterials.length; i++) {
      await dbRun(`INSERT INTO material (name, cookName_id) VALUES ("${registeredMaterials[i]}", ${result.lastID})`)
    }
    for(let i = 0; i < registeredSteps.length; i++) {
      await dbRun(`INSERT INTO step (name, cookName_id) VALUES ("${registeredSteps[i]}", ${result.lastID})`)
    }
    dbRun('COMMIT')
    const lastID = { lastID: result.lastID }
    res.status(200).json(lastID)
  } catch(err) {
    const errMessage = { message: "Error occures!!!"}
    res.status(500).json(errMessage);
  }
});

cook_and_material_and_step.delete("/:id(\\d+)", async (req: Request, res: Response, next) => {
  try {
    const id = req.params.id;
    dbRun('BEGIN TRANSACTION');
    await dbRun(`delete from step where cookName_id = ${id}`);
    await dbRun(`delete from material where cookName_id = ${id}`);
    await dbRun(`delete from cookName where id = ${id}`);
    dbRun('COMMIT');
    res.status(200).json({ id: id });
  } catch(err) {
    console.log(err);
  }
});