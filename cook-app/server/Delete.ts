import { resolve } from "path";
import { dbRun } from "./DatabaseCreate";

dbRun(`delete from step`).then((resolve) => resolve);
dbRun(`delete from material`).then((resolve) => resolve);
dbRun(`delete from cookName`).then((resolve) => resolve);
