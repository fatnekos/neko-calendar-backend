/**
 * The neko-calendar backend server
 * 
 * Author: Hao Chun Chang (changhaochun84@gmail.com)
 */ 
import { Application } from "https://deno.land/x/oak/mod.ts";
import { Database, SQLite3Connector } from "https://deno.land/x/denodb/mod.ts";
import { green, yellow } from "https://deno.land/std/fmt/colors.ts";

import { CalendarText } from "./model.ts";
import calendarTextRouter from "./routes/calendar_text.ts";
import notFound from './middlewares/notFound.ts';

const app = new Application();
const connector = new SQLite3Connector({
  filepath: "./db.sqlite",
});
const db = new Database(connector);
db.link([CalendarText]);
await db.sync();

app.use(calendarTextRouter.routes());
app.use(calendarTextRouter.allowedMethods());
app.use(notFound);
app.addEventListener("listen", ({ secure, hostname, port }) => {
  const protocol = secure ? "https://" : "http://";
  const url = `${protocol}${hostname ?? "localhost"}:${port}`;
  console.log(
    `${yellow("Listening on:")} ${green(url)}`,
  );
});

export default app;