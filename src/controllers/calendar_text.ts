/**
 * Controllers of CRUD calendar text.
 * 
 * Author: Hao Chun Chang (changhaochun84@gmail.com)
 */ 
import { RouterContext } from "https://deno.land/x/oak/mod.ts";
import { CalendarText } from "../model.ts";

export default {
  /**
   * @description Get calendar text by box id
   * @route GET /api/calendar_text/:id
   */
  getCalendarTextById: async (ctx: RouterContext) => {
    const id = ctx.params.id;
    if (id === undefined || parseInt(id, 10) <= 0) {
      ctx.response.status = 404;
      return;
    }
    const text = await CalendarText.select("content")
                                   .where("box_id", id)
                                   .first();
    ctx.response.status = 200;
    ctx.response.body = {
      success: true,
      data: text.content,
    };
  },
  /**
   * @description Save calendar text from box id to the database.
   * @route POST /api/calendar_text/:id
   */
  createCalendarText: async (ctx: RouterContext) => {
    if (!ctx.request.hasBody) {
      ctx.response.status = 400;
      ctx.response.body = {
        success: false,
        message: "No data provided",
      };
      return;
    }
    const value = await ctx.request.body().value;
    const result = await CalendarText.create({
      box_id: value.box_id,
      content: value.text
    });
    ctx.response.body = {
      success: true,
      affectedRows: result.affectedRows
    };
  },
  /**
   * @description Update calendar text by box id
   * @route PUT /api/calendar_text:id/
   */
  updateCalendarTextById: async (ctx: RouterContext) => {
    const id = ctx.params.id;
    if (id === undefined || isNaN(parseInt(id, 10))) {
      ctx.response.status = 404;
      return;
    }
    const { text } = await ctx.request.body().value;
    const result = await CalendarText.where("box_id", id).update({ content: text });
    ctx.response.body = {
      success: true,
      message: result
    };
  },
  /**
   * @description Delete calendar text by box id
   * @route DELETE /api/calendar_text:id/
   */
  deleteCalendarTextById: async (ctx: RouterContext) => {
    const id = ctx.params.id;
    if (id === undefined || parseInt(id, 10) <= 0) {
      ctx.response.status = 404;
      return;
    }
    const result = await CalendarText.where("box_id", id).delete();
    console.log(result);
    ctx.response.body = {
      success: true,
      message: result
    };
  },
};