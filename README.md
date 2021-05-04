# neko-calendar-backend

The backend server for neko-calendar.
* It use [Deno](https://deno.land/#installation) as javascript runtime.

### Usage
* Start backend server (create `db.sqlite` if not exists)
```bash
deno run --allow-net --allow-read --allow-write ./src/main.ts
```

* Testing
```bash
deno test --allow-net --allow-read --allow-write
```


### API
* GET `/api/calendar_text/:id`:
  * e.g. `localhost:1993/api/calendar_text/1`

* POST `/api/calendar_text`:
  * see `neko-calendar/src/api/api.js`
