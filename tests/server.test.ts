import app from "../src/server.ts";
import { superoak } from "https://deno.land/x/superoak@4.2.0/mod.ts";

Deno.test("it should create a record of calendar_text given id", async () => {
  const request = await superoak(app);
  await request.post("/api/calendar_text")
    .send({
      box_id: 1,
      text: "This is a testing calendar text for id 1"
    })
    .expect(200)
    .expect("Content-Type", /json/)
    .expect({"success": true, "affectedRows": 1})
});

Deno.test("it should get a record of calendar_text given id", async () => {
  const request = await superoak(app);
  await request.get("/api/calendar_text/1")
    .expect(200)
    .expect("Content-Type", /json/)
    .expect({"success": true, "data": "This is a testing calendar text for id 1"});
});

Deno.test("it should update the record of calendar_text given id", async () => {
  const id = 2;
  const prepare = await superoak(app)
  await prepare.post("/api/calendar_text")
    .send({
      box_id: id,
      text: `This is a testing calendar text for id ${id}`
    })
    .expect(200)

  const request = await superoak(app);
  await request.put(`/api/calendar_text/${id}`)
    .send({text: `This is a testing calendar text for id ${id} (Updated)`})
    .expect(200)
    .expect("Content-Type", /json/)
    .expect({"success": true, message: { affectedRows: 1 }});
  
  const teardown = await superoak(app);
  await teardown.delete(`/api/calendar_text/${id}`)
    .expect(200)
});

Deno.test("it should delete the record of calendar_text given id", async () => {
  const request = await superoak(app);
  const id = 1;
  await request.delete(`/api/calendar_text/${id}`)
    .expect(200)
    .expect("Content-Type", /json/)
    .expect({"success": true, message: { affectedRows: 1 }});
});

Deno.test("it should failed to update the record", async () => {
  const request = await superoak(app);
  await request.put(`/api/calendar_text/invalid_id`)
    .send({text: "This is a testing calendar text for id 1 (Updated)"})
    .expect(404)
});

Deno.test("it should return no data provided", async () => {
  const request = await superoak(app);
  await request.post("/api/calendar_text")
    .expect(400)
    .expect("Content-Type", /json/)
    .expect({"success": false, message: "No data provided"})
});