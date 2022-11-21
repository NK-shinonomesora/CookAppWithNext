import express, { Request, Response } from "express";
import { dbRun } from "./DatabaseCreate";
import { CookFunc } from "./cook";
import { MaterialFunc } from "./material";
import { StepFunc } from "./step";
export const cook_and_material_and_step = express.Router();

type Insert = {
  lastID: number
  changes: number
}

export const CMSFunc = {
  AllCreate: async (cookName: string, materials: string[], steps: string[]): Promise<Insert> => {
    try {
      const registeredMaterials = materials.filter((m: string) => m !== "");
      const registeredSteps = steps.filter((s: string) => s !== "");
      await dbRun('BEGIN TRANSACTION');
      const result: Insert = await CookFunc.InsertCook(cookName);
      await MaterialFunc.InsertMaterials(result.lastID, registeredMaterials);
      await StepFunc.InsertSteps(result.lastID, registeredSteps);
      await dbRun('COMMIT TRANSACTION');
      return result;
    } catch(err) {
      console.log(err);
      return dbRun('ROLLBACK TRANSACTION');
    }
  },
  AllDelete: async (id: number) => {
    try {
      await dbRun('BEGIN TRANSACTION');
      await CookFunc.DeleteCook(id);
      await MaterialFunc.DeleteMaterial(id);
      await StepFunc.DeleteStep(id);
      return dbRun('COMMIT TRANSACTION');
    } catch(err) {
      console.log(err);
      return dbRun('ROLLBACK TRANSACTION');
    }
  },
  AllUpdate: async (id: number, cookName: string, materials: string[], steps: string[]) => {
    try {
      await dbRun('BEGIN TRANSACTION');
      await StepFunc.DeleteStep(id);
      await MaterialFunc.DeleteMaterial(id);
      await CookFunc.DeleteCook(id);
      const registeredMaterials = materials.filter((m: string) => m !== "");
      const registeredSteps = steps.filter((s: string) => s !== "");
      const result: Insert = await CookFunc.InsertCook(cookName);
      await MaterialFunc.InsertMaterials(result.lastID, registeredMaterials);
      await StepFunc.InsertSteps(result.lastID, registeredSteps);
      await dbRun('COMMIT TRANSACTION');
      return result;
    } catch(err) {
      console.log(err);
      return dbRun('ROLLBACK TRANSACTION');
    }
  },
  AllGet: async (id: number) => {
    try {
      const cook = await CookFunc.GetCook(id);
      const materials = await MaterialFunc.GetMaterialsIdentified(id);
      const steps = await StepFunc.GetStepsIdentified(id);
      return { cook, materials, steps }
    } catch(err) {
      console.log(err);
    }
  }
}

cook_and_material_and_step.get("/:id(\\d+)", async (req: Request, res: Response, next) => {
  try {
    const id = Number(req.params.id);
    const data = await CMSFunc.AllGet(id);
    res.status(200).json(data);
  } catch(err) {
    res.status(500).json({ reason: "Internal Server Error in cook_and_material_and_step.get(/:id)" });
    console.log(err);
  }
});

cook_and_material_and_step.post("/:id(\\d+)", async (req: Request, res: Response, next) => {
  try {
    const { cookName, materials, steps } = req.body;
    const result: Insert = await CMSFunc.AllCreate(cookName, materials, steps);
    const lastID = { lastID: result.lastID }
    res.status(200).json(lastID);
  } catch(err) {
    res.status(500).json({ reason: "Internal Server Error in cook_and_material_and_step.post(/:id)" });
    console.log(err);
  }
});

cook_and_material_and_step.delete("/:id(\\d+)", async (req: Request, res: Response, next) => {
  try {
    const id = Number(req.params.id);
    await CMSFunc.AllDelete(id);
    res.status(200).json({ id: id });
  } catch(err) {
    res.status(500).json({ reason: "Internal Server Error in cook_and_material_and_step.delete(/:id)" });
    console.log(err);
  }
});

cook_and_material_and_step.put("/:id(\\d+)", async (req: Request, res: Response, next) => {
  try {
    const id = Number(req.params.id);
    const { cookName, materials, steps } = req.body;
    const result = await CMSFunc.AllUpdate(id, cookName, materials, steps);
    const lastID = { lastID: result.lastID }
    res.status(200).json(lastID);
  } catch(err) {
    res.status(500).json({ reason: "Internal Server Error in cook_and_material_and_step.put(/:id)" });
    console.log(err);
  }
});