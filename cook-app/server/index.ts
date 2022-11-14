import express, { Request, Response } from "express";
import { cook } from "./cook";
import { material } from "./material";
import { step } from "./step";
import { cook_and_material_and_step } from "./cook_and_material_and_step"
import next from "next";
import cors from 'cors';
import bodyParser from 'body-parser';

const dev = process.env.NODE_ENV === "development";
const port = 4000;
//----------------------------------------
// 下記に存在する"await app.prepare()"がある状態で、"register.spec.tsx"にて
// supertestからインポートしたrequestに当ファイルからエクスポートした変数を割り当てると
// seg fault 11が発生する。それを解消するため"conf: require('../next.config')"を以下のURLを参考にして追加。
// https://github.com/vercel/next.js/issues/33008
// ---------------------------------------
const app = next({ dev, conf: require('../next.config'), });
const handle = app.getRequestHandler();
export const server = express();
//---------------------------
// 以下のミドルウェアを"await app.prepare()"の次に記述するとsupertestのrequestが失敗するため、こちらに移動。
server.use(cors());
server.use(bodyParser.urlencoded({
  extended: true
}));
server.use(bodyParser.json());
server.use("/cook", cook);
server.use("/material", material);
server.use("/step", step);
server.use("/cook_and_material_and_step", cook_and_material_and_step);
server.all("*", (req: Request, res: Response) => {
  return handle(req, res);
});
// --------------------------
(async () => {
  try {
    await app.prepare();
    server.listen(port, () => {
      console.log(`${port}で起動中`);
    });
  } catch (e) {
    console.error(e);
  }
})();