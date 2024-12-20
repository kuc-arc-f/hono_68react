import { Hono } from 'hono'
import { basicAuth } from 'hono/basic-auth'

import type { Database } from '@cloudflare/d1'
interface Env {
  DB: Database
}
import Top from './pages/App';
import Todo18 from './pages/Todo18';
//
import todo18Router from "./routes/todo18";

//const app = new Hono();
const app = new Hono<{ Bindings: { DB: D1Database } }>();

//API
app.post("/api/todo18", async (c) => {
  let result = await todo18Router.create(c);
  return c.json(result.data , result.status);
});

app.get("/api/todo18/search", async (c) => {
  let result = await todo18Router.search(c);
  return c.json(result.data , result.status);
});
app.delete("/api/todo18/:id", async (c) => {
  let result = await todo18Router.delete(c);
  return c.json(result.data , result.status);
});
app.put("/api/todo18", async (c) => {
  let result = await todo18Router.update(c);
  return c.json(result.data , result.status);
});
  
//MPA
app.get('/todo18', (c) => {
  const htm = Todo18({});
  console.log(htm);
  return c.html(htm)
})

app.get('/', (c) => {
  const htm = Top({});
  console.log(htm);
  return c.html(htm)
})

export default app
