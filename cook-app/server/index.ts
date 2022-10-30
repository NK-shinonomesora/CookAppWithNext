import express, { Request, Response } from "express";
import { cook } from "./cook";
import { material } from "./material";
import { cook_and_material_and_step } from "./cook_and_material_and_step"
import next from "next";

const dev = process.env.NODE_ENV === "development";
const port = 4000;
const app = next({ dev });
const handle = app.getRequestHandler();

(async () => {
  try {
    await app.prepare();
    const server = express();
    //すべてのAPIをCORS許可したい場合の設定//
    const cors = require('cors')
    server.use(cors())
    // POST受信時にこの設定がないとreq.bodyが取得できなかった
    const bodyParser = require('body-parser')
    server.use(bodyParser.urlencoded({
      extended: true
    }));
    server.use(bodyParser.json());

    server.use("/cook", cook);
    server.use("/material", material);
    server.use("/cook_and_material_and_step", cook_and_material_and_step)

    server.all("*", (req: Request, res: Response) => {
      return handle(req, res);
    });
    server.listen(port, () => {
      console.log(`${port}で起動中`);
    });
  } catch (e) {
    console.error(e);
  }
})();