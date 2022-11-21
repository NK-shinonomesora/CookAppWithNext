import { render, RenderResult, renderHook, act } from '@testing-library/react';
import { CookName, Material, RegisterProp, Step } from './register';
import { CookFunc } from '../server/cook';
import { MaterialFunc } from '../server/material';
import { StepFunc } from '../server/step';
import { CMSFunc } from '../server/cook_and_material_and_step';
import request from 'supertest';
import { server } from '../server'

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '/',
      query: { id: 1 },
      asPath: '',
    };
  },
}));

const cookName1 = "pizza";
const cookName2 = "curry";
const cookName3 = "donut";
const cookName4 = "new_curry";
const materials1 = ["tomato", "egg"];
const materials2 = ["potato", "carrot"];
const materials3 = ["flour", "chocolate"];
const materials4 = ["new_potato", "new_carrot"];
const steps1 = ["knead", "put on", "bake"];
const steps2 = ["cut", "stir fry", "simmer"];
const steps3 = ["mix", "cold", "sprinkle"];
const steps4 = ["new_cut", "new_stir fry", "new_simmer"];

describe('CookName', () => {
  let renderResult: RenderResult;

  beforeAll(() => {
    renderResult = render(<CookName />);
  })

  afterAll(() => {
    renderResult.unmount();
  })

  test('When calling the SetInputtedCookName function, argument value is inputted to the cookName.', () => {
    const { result } = renderHook(() => RegisterProp());
    act(() => result.current.SetInputtedCookName("okonomiyaki"));
    expect(result.current.cookName).toBe("okonomiyaki");
  })
})

describe('Material', () => {
  let renderResult: RenderResult;

  beforeAll(() => {
    renderResult = render(<Material />);
  })

  afterAll(() => {
    renderResult.unmount();
  })

  test('When calling the IncreaseMaterial function, increase the materialInputNum.', () => {
    const { result } = renderHook(() => RegisterProp());
    act(() => result.current.IncreaseMaterial());
    expect(result.current.materialInputNum).toBe(2)
  })

  test('When calling the SetInputtedMaterial function, argument value is inputted to index in the materials.', () => {
    const { result } = renderHook(() => RegisterProp());
    act(() => result.current.SetInputtedMaterial(1, "testValue"));
    expect(result.current.materials[1]).toBe("testValue");
  })
})

describe('Step', () => {
  let renderResult: RenderResult;

  beforeAll(() => {
    renderResult = render(<Step />);
  })

  afterAll(() => {
    renderResult.unmount();
  })

  test('When calling the IncreaseStep function, increase the stepInputNum.', () => {
    const { result } = renderHook(() => RegisterProp());
    act(() => result.current.IncreaseStep());
    expect(result.current.stepInputNum).toBe(2)
  })

  test('When calling the SetInputtedStep function, argument value is inputted to index in the steps.', () => {
    const { result } = renderHook(() => RegisterProp());
    act(() => result.current.SetInputtedStep(3, "testValue2"));
    expect(result.current.steps[3]).toBe("testValue2");
  })
})

describe('Create a cooking to Database', () => {
  beforeEach(async () => {
    const cooks = await CookFunc.GetAllCooks();
    //下記のPromise.allとmapを組み合わせた方法は、DB処理側でTRANSACTIONを使用しているとエラーになる模様。
    //await Promise.all(cooks.map((cook) => AllDelete(cook.id!)))
    for(let i = 0; i < cooks.length; i++) {
      await CMSFunc.AllDelete(cooks[i].id!);
    }
  });

  test('Enable to create correctly cooking.', async () => {
    expect(await CookFunc.GetAllCooks()).toEqual([]);
    expect(await MaterialFunc.GetAllMaterials()).toEqual([]);
    expect(await StepFunc.GetAllSteps()).toEqual([]);

    const result1 = await CMSFunc.AllCreate(cookName1, materials1, steps1);

    expect(await CookFunc.GetAllCooks()).toEqual(
      [
        { id: 1, name: "pizza" }
      ]
    );
    expect(await MaterialFunc.GetAllMaterials()).toEqual(
      [
        { id: 1, name: "tomato", cookName_id: 1 },
        { id: 2, name: "egg", cookName_id: 1 }
      ]
    );
    expect(await StepFunc.GetAllSteps()).toEqual(
      [
        { id: 1, name: "knead", cookName_id: 1 },
        { id: 2, name: "put on" ,cookName_id: 1 },
        { id: 3, name: "bake", cookName_id: 1 }
      ]
    );

    const result2 = await CMSFunc.AllCreate(cookName2, materials2, steps2);

    expect(await CookFunc.GetAllCooks()).toEqual(
      [
        { id: 1, name: "pizza" },
        { id: 2, name: "curry" }
      ]
    );
    expect(await MaterialFunc.GetAllMaterials()).toEqual(
      [
        { id: 1, name: "tomato", cookName_id: 1 },
        { id: 2, name: "egg", cookName_id: 1 },
        { id: 3, name: "potato", cookName_id: 2 },
        { id: 4, name: "carrot", cookName_id: 2 }
      ]
    );
    expect(await StepFunc.GetAllSteps()).toEqual(
      [
        { id: 1, name: "knead", cookName_id: 1 },
        { id: 2, name: "put on" ,cookName_id: 1 },
        { id: 3, name: "bake", cookName_id: 1 },
        { id: 4, name: "cut", cookName_id: 2 },
        { id: 5, name: "stir fry", cookName_id: 2 },
        { id: 6, name: "simmer", cookName_id: 2 }
      ]
    );
  });

  test('Enable to delete correctly cooking created.', async () => {
    expect(await CookFunc.GetAllCooks()).toEqual([]);
    expect(await MaterialFunc.GetAllMaterials()).toEqual([]);
    expect(await StepFunc.GetAllSteps()).toEqual([]);

    const result1 = await CMSFunc.AllCreate(cookName1, materials1, steps1);
    const result2 = await CMSFunc.AllCreate(cookName2, materials2, steps2);
    const result3 = await CMSFunc.AllCreate(cookName3, materials3, steps3);

    await CMSFunc.AllDelete(2);

    expect(await CookFunc.GetAllCooks()).toEqual(
      [
        { id: 1, name: "pizza" },
        { id: 3, name: "donut" }
      ]
    );
    expect(await MaterialFunc.GetAllMaterials()).toEqual(
      [
        { id: 1, name: "tomato", cookName_id: 1 },
        { id: 2, name: "egg", cookName_id: 1 },
        { id: 5, name: "flour", cookName_id: 3 },
        { id: 6, name: "chocolate", cookName_id: 3 }
      ]
    );
    expect(await StepFunc.GetAllSteps()).toEqual(
      [
        { id: 1, name: "knead", cookName_id: 1 },
        { id: 2, name: "put on" ,cookName_id: 1 },
        { id: 3, name: "bake", cookName_id: 1 },
        { id: 7, name: "mix", cookName_id: 3 },
        { id: 8, name: "cold", cookName_id: 3 },
        { id: 9, name: "sprinkle", cookName_id: 3 }
      ]
    );
  });

  test('Enable to update correctly cooking created.', async () => {
    expect(await CookFunc.GetAllCooks()).toEqual([]);
    expect(await MaterialFunc.GetAllMaterials()).toEqual([]);
    expect(await StepFunc.GetAllSteps()).toEqual([]);

    const result1 = await CMSFunc.AllCreate(cookName1, materials1, steps1);
    const result2 = await CMSFunc.AllCreate(cookName2, materials2, steps2);
    const result3 = await CMSFunc.AllCreate(cookName3, materials3, steps3);

    const result4 = await CMSFunc.AllUpdate(2, cookName4, materials4, steps4);

    expect(await CookFunc.GetAllCooks()).toEqual(
      [
        { id: 1, name: "pizza" },
        { id: 3, name: "donut" },
        { id: 4, name: "new_curry" },
      ]
    );
    expect(await MaterialFunc.GetAllMaterials()).toEqual(
      [
        { id: 1, name: "tomato", cookName_id: 1 },
        { id: 2, name: "egg", cookName_id: 1 },
        { id: 5, name: "flour", cookName_id: 3 },
        { id: 6, name: "chocolate", cookName_id: 3 },
        { id: 7, name: "new_potato", cookName_id: 4 },
        { id: 8, name: "new_carrot", cookName_id: 4 },
      ]
    );
    expect(await StepFunc.GetAllSteps()).toEqual(
      [
        { id: 1, name: "knead", cookName_id: 1 },
        { id: 2, name: "put on" ,cookName_id: 1 },
        { id: 3, name: "bake", cookName_id: 1 },
        { id: 7, name: "mix", cookName_id: 3 },
        { id: 8, name: "cold", cookName_id: 3 },
        { id: 9, name: "sprinkle", cookName_id: 3 },
        { id: 10, name: "new_cut", cookName_id: 4 },
        { id: 11, name: "new_stir fry", cookName_id: 4 },
        { id: 12, name: "new_simmer", cookName_id: 4 },
      ]
    );
  });

  test('If cooking creation fails, DB operation is ROLLBACKED.', async () => {
    jest.spyOn(StepFunc, 'InsertSteps').mockRejectedValue(new Error('InsertSteps function fails.'));

    expect(await CookFunc.GetAllCooks()).toEqual([]);
    expect(await MaterialFunc.GetAllMaterials()).toEqual([]);
    expect(await StepFunc.GetAllSteps()).toEqual([]);

    const result1 = await CMSFunc.AllCreate(cookName1, materials1, steps1);

    expect(await CookFunc.GetAllCooks()).toEqual([]);
    expect(await MaterialFunc.GetAllMaterials()).toEqual([]);
    expect(await StepFunc.GetAllSteps()).toEqual([]);
  });

  test('If cooking deletion fails, DB operation is ROLLBAKED.', async () => {
    jest.spyOn(MaterialFunc, 'DeleteMaterial').mockRejectedValue(new Error('DeleteMaterial function fails.'));

    expect(await CookFunc.GetAllCooks()).toEqual([]);
    expect(await MaterialFunc.GetAllMaterials()).toEqual([]);
    expect(await StepFunc.GetAllSteps()).toEqual([]);

    const result1 = await CMSFunc.AllCreate(cookName1, materials1, steps1);
    await CMSFunc.AllDelete(1);

    expect(await CookFunc.GetAllCooks()).toEqual(
      [
        { id: 1, name: "pizza" }
      ]
    );
    expect(await MaterialFunc.GetAllMaterials()).toEqual(
      [
        { id: 1, name: "tomato", cookName_id: 1 },
        { id: 2, name: "egg", cookName_id: 1 }
      ]
    );
    expect(await StepFunc.GetAllSteps()).toEqual(
      [
        { id: 1, name: "knead", cookName_id: 1 },
        { id: 2, name: "put on" ,cookName_id: 1 },
        { id: 3, name: "bake", cookName_id: 1 }
      ]
    );
  });

  test('If cooking update fails, DB operation is ROLLBACKED.', async () => {
    expect(await CookFunc.GetAllCooks()).toEqual([]);
    expect(await MaterialFunc.GetAllMaterials()).toEqual([]);
    expect(await StepFunc.GetAllSteps()).toEqual([]);

    const result1 = await CMSFunc.AllCreate(cookName1, materials1, steps1);
    jest.spyOn(CookFunc, 'InsertCook').mockRejectedValue(new Error('InsertCook function fails'));
    const result2 = await CMSFunc.AllUpdate(1, cookName4, materials4, steps4);

    expect(await CookFunc.GetAllCooks()).toEqual(
      [
        { id: 1, name: "pizza" }
      ]
    );
    expect(await MaterialFunc.GetAllMaterials()).toEqual(
      [
        { id: 1, name: "tomato", cookName_id: 1 },
        { id: 2, name: "egg", cookName_id: 1 }
      ]
    );
    expect(await StepFunc.GetAllSteps()).toEqual(
      [
        { id: 1, name: "knead", cookName_id: 1 },
        { id: 2, name: "put on" ,cookName_id: 1 },
        { id: 3, name: "bake", cookName_id: 1 }
      ]
    );
  });
});

describe('server api', () => {
  describe('GET /cook', () => {
    test('Return all cookings.', async () => {
      jest.spyOn(CookFunc, 'GetAllCooks').mockResolvedValue([{ id: 1, name: cookName1 }]);
      const res = await request(server).get('/cook');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual([{ id: 1, name: cookName1 }]);
    });
    test('If error occures, return 500.', async () => {
      jest.spyOn(CookFunc, 'GetAllCooks').mockRejectedValue(new Error('GetAllCooks function fails.'));
      const res = await request(server).get('/cook');
      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({ reason: "Internal Server Error in cook.get(/)"});
    });
  });
  describe('GET /cook/:id', () => {
    test('Return a cooking.', async () => {
      jest.spyOn(CookFunc, 'GetCook').mockResolvedValue(cookName1);
      const res = await request(server).get('/cook/1');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ cook: "pizza" });
    });
    test('If error occures, return 500.', async () => {
      jest.spyOn(CookFunc, 'GetCook').mockRejectedValue(new Error('GetCook function fails.'));
      const res = await request(server).get('/cook/1');
      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({ reason: "Internal Server Error in cook.get(/:id)"});
    });
  });
  describe('GET /material/:id', () => {
    test('Returns the material identified by id.', async () => {
      jest.spyOn(MaterialFunc, 'GetMaterialsIdentified').mockResolvedValue([{ name: "tomato" }, { name: "egg" }]);
      const res = await request(server).get('/material/1');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ materials: [{ name: "tomato" }, { name: "egg" }]});
    });
    test('If error occures, return 500.', async () => {
      jest.spyOn(MaterialFunc, 'GetMaterialsIdentified').mockRejectedValue(new Error('GetMaterialsIdentified function fails.'));
      const res = await request(server).get('/material/1');
      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({ reason: "Internal Server Error in material.get(/material/:id)" });
    });
  });
  describe('GET /step/:id', () => {
    test('Returns the step identified by id.', async () => {
      jest.spyOn(StepFunc, 'GetStepsIdentified').mockResolvedValue([{ name: "tomato" }, { name: "egg" }]);
      const res = await request(server).get('/step/1');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ steps: [{ name: "tomato" }, { name: "egg" }]});
    });
    test('If error occures, return 500.', async () => {
      jest.spyOn(StepFunc, 'GetStepsIdentified').mockRejectedValue(new Error('GetStepsIdentified function fails.'));
      const res = await request(server).get('/step/1');
      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({ reason: "Internal Server Error in step.get(/material/:id)" });
    });
  });
  describe('POST /cook_and_material_step/:id', () => {
    test('Create cooking.', async () => {
      jest.spyOn(CMSFunc, 'AllCreate').mockResolvedValue({ lastID: 1, changes: 1 });
      const res = await request(server).post('/cook_and_material_and_step/1');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ lastID: 1 });
    });
    test('If error occures, return 500.', async () => {
      jest.spyOn(CMSFunc, 'AllCreate').mockRejectedValue(new Error('AllCreate function fails.'));
      const res = await request(server).post('/cook_and_material_and_step/1');
      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({ reason: "Internal Server Error in cook_and_material_and_step.post(/:id)" });
    });
  });
  describe('DELETE /cook_and_material_step/:id', () => {
    test('Delete cooking.', async () => {
      jest.spyOn(CMSFunc, 'AllDelete').mockResolvedValue("");
      const res = await request(server).delete('/cook_and_material_and_step/1');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ id: 1 });
    });
    test('If error occures, return 500.', async () => {
      jest.spyOn(CMSFunc, 'AllDelete').mockRejectedValue(new Error('AllDelete function fails.'));
      const res = await request(server).delete('/cook_and_material_and_step/1');
      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({ reason: "Internal Server Error in cook_and_material_and_step.delete(/:id)"});
    });
  });
  describe('PUT /cook_and_material_step/:id', () => {
    test('Update cooking.', async () => {
      jest.spyOn(CMSFunc, 'AllUpdate').mockResolvedValue({ lastID: 1, changes: 1 });
      const res = await request(server).put('/cook_and_material_and_step/1');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ lastID: 1 });
    });
    test('If error occures, return 500.', async () => {
      jest.spyOn(CMSFunc, 'AllUpdate').mockRejectedValue(new Error('AllUpdate function fails.'));
      const res = await request(server).put('/cook_and_material_and_step/1');
      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({ reason: "Internal Server Error in cook_and_material_and_step.put(/:id)" });
    });
  });
});