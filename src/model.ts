/**
 * Define database model.
 * 
 * Author: Hao Chun Chang (changhaochun84@gmail.com)
 */ 
import { Model, DataTypes } from "https://deno.land/x/denodb/mod.ts";

export class CalendarText extends Model {
    static table = 'calendar_texts';
    static timestamps = true;
    static fields = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        box_id: {
            type: DataTypes.INTEGER,
        },
        content: {
            type: DataTypes.STRING,
            length: 1000
        }
    };
}
