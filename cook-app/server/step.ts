import express, { Request, Response } from "express";
import { dbAll, dbRun } from "./DatabaseCreate"
export const step = express.Router();

export const StepFunc = {
  GetAllSteps: async () => {
    const steps = await dbAll(`SELECT * FROM step`);
    return steps;
  },
  InsertSteps: async (id: number, steps: string[]) => {
    for(let i = 0; i < steps.length; i++) {
      await dbRun(`INSERT INTO step (name, cookName_id) VALUES ("${steps[i]}", ${id})`);
    }
  },
  DeleteStep: async (id: number) => {
    await dbRun(`delete from step where cookName_id = ${id}`);
  },
  GetStepsIdentified: async (id: number) => {
    const steps = await dbAll(`SELECT name FROM step where cookName_id = ${id}`);
    return steps;
  }
}

step.get("/:id(\\d+)", async (req: Request, res: Response, next) => {
  try {
    const id = Number(req.params.id);
    const steps = await StepFunc.GetStepsIdentified(id);
    const data = { steps: steps };
    res.status(200).json(data);
  } catch(err) {
    res.status(500).json({ reason: "Internal Server Error in step.get(/material/:id)" });
    console.log(err);
  }
});