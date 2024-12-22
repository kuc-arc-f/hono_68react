import { Hono } from 'hono'
import { basicAuth } from 'hono/basic-auth'

import type { Database } from '@cloudflare/d1'
interface Env {
  DB: Database
}
import Top from './pages/App';
import React19 from './pages/React19';
import React19_2 from './pages/React19_2';
import Todo18 from './pages/Todo18';
import Todo19 from './pages/Todo19';
import Todo20 from './pages/Todo20';
import Todo22 from './pages/Todo22';
import VueCdn from './pages/VueCdn';
//
import todo18Router from "./routes/todo18";
import todo19Router from "./routes/todo19";
import todo20Router from "./routes/todo20";
import todo22Router from "./routes/todo22";

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

app.get("/api/todo19", async (c) => {
  let result = await todo19Router.getTodos(c);
  return c.json(result.data , result.status);
});
app.post("/api/todo19", async (c) => {
  let result = await todo19Router.create(c);
  return c.json(result.data , result.status);
});
app.get("/api/todo20", async (c) => {
  let result = await todo20Router.search(c);
  return c.json(result.data , result.status);
});
app.post("/api/todo20", async (c) => {
  let result = await todo20Router.create(c);
  return c.json(result.data , result.status);
});
app.delete("/api/todo20/:id", async (c) => {
  let result = await todo20Router.delete(c);
  return c.json(result.data , result.status);
});
app.put("/api/todo20/:id", async (c) => {
  let result = await todo20Router.update(c);
  return c.json(result.data , result.status);
});
app.get("/api/todo22", async (c) => {
  let result = await todo22Router.search(c);
  return c.json(result.data , result.status);
});
app.post("/api/todo22", async (c) => {
  let result = await todo22Router.create(c);
  return c.json(result.data , result.status);
});
app.delete("/api/todo22/:id", async (c) => {
  let result = await todo22Router.delete(c);
  return c.json(result.data , result.status);
});
app.put("/api/todo22/:id", async (c) => {
  let result = await todo22Router.update(c);
  return c.json(result.data , result.status);
});

//MPA
app.get('/todo18', (c) => {
  const htm = Todo18({});
  //console.log(htm);
  return c.html(htm)
})
app.get('/todo19', (c) => {
  const htm = Todo19({});
  return c.html(htm)
})
app.get('/todo20', (c) => {
  const htm = Todo20({});
  return c.html(htm)
})
app.get('/todo22', (c) => {
  const htm = Todo22({});
  return c.html(htm)
})

app.get('/react19', (c) => {
  const htm = React19({});
  return c.html(htm)
});
app.get('/react19_2', (c) => {
  const htm = React19_2({});
  return c.html(htm)
});
app.get('/vuecdn', (c) => {
  const htm = VueCdn({});
  return c.html(htm)
});

app.get('/', (c) => {
  const htm = Top({});
  //console.log(htm);
  return c.html(htm)
})

export default app
