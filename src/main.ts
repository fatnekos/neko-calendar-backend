import app from "./server.ts";

const port = 1993;
await app.listen({ port });