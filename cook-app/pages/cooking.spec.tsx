import { CookFunc } from '../server/cook';
import { MaterialFunc } from '../server/material';
import { StepFunc } from '../server/step';
import { CMSFunc } from '../server/cook_and_material_and_step';
import { server } from '../server'
import request from 'supertest';

const cookName1 = "pizza";
const materials1 = ["tomato", "egg"];
const steps1 = ["knead", "put on", "bake"];

describe('Get all contents.', () => {

  beforeEach(async () => {
    const cooks = await CookFunc.GetAllCooks();
    //下記のPromise.allとmapを組み合わせた方法は、DB処理側でTRANSACTIONを使用しているとエラーになる模様。
    //await Promise.all(cooks.map((cook) => AllDelete(cook.id!)))
    for(let i = 0; i < cooks.length; i++) {
      await CMSFunc.AllDelete(cooks[i].id!);
    }
  });

  test('Enable to get a cooking name, materials and steps by identifing cooking id.', async () => {
    expect(await CookFunc.GetAllCooks()).toEqual([]);
    expect(await MaterialFunc.GetAllMaterials()).toEqual([]);
    expect(await StepFunc.GetAllSteps()).toEqual([]);

    const result1 = await CMSFunc.AllCreate(cookName1, materials1, steps1);
    
    expect(await CMSFunc.AllGet(1)).toEqual(
      { cook: { name: "pizza" }, 
        materials: [{ name: "tomato" }, { name: "egg" }],
        steps: [{ name: "knead" }, { name: "put on" }, { name: "bake" }],
      }
    )
  });
});

describe('server api', () => {
  describe('GET /cook_and_material_and_step', () => {
    test('Return all cooking contents.', async () => {
      jest.spyOn(CMSFunc, 'AllGet').mockResolvedValue(
        {
          cook: cookName1,
          materials: [{ name: materials1[0] }, { name: materials1[1] }],
          steps: [{ name: steps1[0] }, { name: steps1[1] }]
        }
      );
      const res = await request(server).get('/cook_and_material_and_step/1');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(
        {
          cook: cookName1,
          materials: [{ name: materials1[0] }, { name: materials1[1] }],
          steps: [{ name: steps1[0] }, { name: steps1[1] }]
        }
      );
    });
  });
});