import express, { Request, Response } from "express";
import { dbGet, dbAll, dbRun } from "./DatabaseCreate"
export const cook_and_material_and_step = express.Router();

type Insert = {
  lastID: number
  changes: number
}

const AllCreate = async (cookName: string, materials: string[], steps: string[]): Promise<Insert> => {
  try {
    dbRun('BEGIN TRANSACTION');
    const result: Insert = await dbRun(`INSERT INTO cookName (name) VALUES ("${cookName}")`);
    for(let i = 0; i < materials.length; i++) {
      await dbRun(`INSERT INTO material (name, cookName_id) VALUES ("${materials[i]}", ${result.lastID})`);
    }
    for(let i = 0; i < steps.length; i++) {
      await dbRun(`INSERT INTO step (name, cookName_id) VALUES ("${steps[i]}", ${result.lastID})`);
    }
    dbRun('COMMIT');
    return Promise.resolve(result);
  } catch(err) {
    const errObj = new Error("Error occures in All Create function");
    return Promise.reject(errObj);
  }
}

const AllDelete = async (id: string) => {
  try {
    dbRun('BEGIN TRANSACTION');
    await dbRun(`delete from step where cookName_id = ${id}`);
    await dbRun(`delete from material where cookName_id = ${id}`);
    await dbRun(`delete from cookName where id = ${id}`);
    dbRun('COMMIT');
    Promise.resolve();
  } catch(err) {
    const errObj = new Error("Error occures in All Delete function");
    Promise.reject(errObj);
  }
}

cook_and_material_and_step.post("/:id(\\d+)", async (req: Request, res: Response, next) => {
  try {
    const { cookName, materials, steps } = req.body;
    const registeredMaterials = materials.filter((m: string) => m !== "");
    const registeredSteps = steps.filter((s: string) => s !== "");
    const result: Insert = await AllCreate(cookName, registeredMaterials, registeredSteps);
    const lastID = { lastID: result.lastID }
    res.status(200).json(lastID);
  } catch(err) {
    res.status(500).json(err);
  }
});

cook_and_material_and_step.delete("/:id(\\d+)", async (req: Request, res: Response, next) => {
  try {
    const id = req.params.id;
    await AllDelete(id);
    res.status(200).json({ id: id });
  } catch(err) {
    res.status(500).json(err);
  }
});

cook_and_material_and_step.put("/:id(\\d+)", async (req: Request, res: Response, next) => {
  try {
    dbRun('BEGIN TRANSACTION');
    const id = req.params.id;
    await AllDelete(id);
    const { cookName, materials, steps } = req.body;
    const registeredMaterials = materials.filter((m: string) => m !== "");
    const registeredSteps = steps.filter((s: string) => s !== "");
    const result: Insert = await AllCreate(cookName, registeredMaterials, registeredSteps);
    dbRun('COMMIT');
    const lastID = { lastID: result.lastID }
    res.status(200).json(lastID);
  } catch(err) {
    res.status(500).json(err);
  }
});