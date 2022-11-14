import express, { Request, Response } from "express";
import { dbAll, dbRun } from "./DatabaseCreate"
export const material = express.Router();

export const MaterialFunc = {
  GetAllMaterials: async () => {
    const materials = await dbAll(`SELECT * FROM material`);
    return materials;
  },
  InsertMaterials: async (id: number, materials: string[]) => {
    for(let i = 0; i < materials.length; i++) {
      await dbRun(`INSERT INTO material (name, cookName_id) VALUES ("${materials[i]}", ${id})`);
    }
  },
  DeleteMaterial: async (id: number) => {
    await dbRun(`delete from material where cookName_id = ${id}`);
  },
  GetMaterialsIdentified: async (id: number) => {
    const materials = await dbAll(`SELECT name FROM material where cookName_id = ${id}`);
    return materials;
  }
}

material.get("/:id(\\d+)", async (req: Request, res: Response, next) => {
  try {
    const id = Number(req.params.id);
    const materials = await MaterialFunc.GetMaterialsIdentified(id);
    const data = {materials: materials};
    res.status(200).json(data);
  } catch(err) {
    res.status(500).json({ reason: "Internal Server Error in material.get(/material/:id)" });
    console.log(err);
  }
});