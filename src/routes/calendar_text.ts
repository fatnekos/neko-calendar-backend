import { Router } from "https://deno.land/x/oak/mod.ts";
import calendarTextController from "../controllers/calendar_text.ts";

const router = new Router();

router
  .get("/api/calendar_text/:id", calendarTextController.getCalendarTextById)
  .post("/api/calendar_text", calendarTextController.createCalendarText)
  .put("/api/calendar_text/:id", calendarTextController.updateCalendarTextById)
  .delete("/api/calendar_text/:id", calendarTextController.deleteCalendarTextById);

export default router;