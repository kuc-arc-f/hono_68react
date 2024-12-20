import { Hono } from "hono";
//import { createDatabase, todoSchema, type NewTodo, type UpdateTodo } from "../utils/db";
import { z } from "zod";

export const todoSchema = z.object({
    id: z.number().optional(),
    title: z.string().min(1),
    description: z.string().optional(),
    completed: z.boolean().optional(),
    createdAt: z.number().optional(),
    updatedAt: z.number().optional(),
});

export type Todo = z.infer<typeof todoSchema>;
export type NewTodo = Omit<Todo, "id" | "createdAt" | "updatedAt">;
export type UpdateTodo = Omit<Todo, "createdAt" | "updatedAt">;

// データベースの接続は、D1のインスタンスを直接使用
export const createDatabase = (env: { DB: D1Database }) => {
  return env.DB;
};

const todosRouter = new Hono<{ Bindings: { DB: D1Database } }>();

const createTodoSchema = todoSchema.pick({ title: true, description: true });
const updateTodoSchema = todoSchema.pick({id: true, title: true, description: true, completed: true});

const todo18Router = {

  create: async function(c: any){
    const db = createDatabase(c.env);
    const body = await c.req.json();
    const result = createTodoSchema.safeParse(body);
     if (!result.success) {
        //return c.json({ message: "バリデーションエラー", errors: result.error.issues }, 400)
        return {
          data: { message: "バリデーションエラー", errors: result.error.issues }, status: 400
        }
    }
    const newTodo = result.data as NewTodo;
    const { title, description } = newTodo;

    const now = Date.now();
    const { results } = await db
      .prepare(
        "INSERT INTO todo18 (title, description, created_at, updated_at) VALUES (?, ?, ?, ?) RETURNING id, title, description, completed, created_at, updated_at",
      )
      .bind(title, description, now, now)
      .all();

    if (!results || results.length === 0) {
      //return c.json({ message: "Todoの追加に失敗しました" }, 500);
      return {
        data: { message: "Todoの追加に失敗しました", errors: result.error.issues }, status: 500
      }
    }
    //return c.json(results[0], 201);
    return {
      data: null, status: 201
    }

  },

  search: async function(c: any){
    const db = createDatabase(c.env);
    const query = c.req.query("q");
  
    if (!query) {
      //return c.json({ message: "検索キーワードを入力してください" }, 400);
      const { results } = await db
      .prepare("SELECT id, title, description, completed, created_at, updated_at FROM todo18")
      .all();
      return {
        data: results, status: 200
      }
    }
  
    const { results } = await db
      .prepare("SELECT id, title, description, completed, created_at, updated_at FROM todo18 WHERE title LIKE ?")
      .bind(`%${query}%`)
      .all();
  
    //return c.json(results);
    return {
      data: results, status: 200
    }
  },

  delete: async function(c: any){
    const db = createDatabase(c.env);
    const id = parseInt(c.req.param("id"), 10);
  
    if (isNaN(id)) {
      //return c.json({ message: "無効なIDです" }, 400);
      return {
        data: { message: "無効なIDです" }, status: 400
      }
    }
  
    const { results } = await db
      .prepare("DELETE FROM todo18 WHERE id = ? RETURNING id, title, description, completed, created_at, updated_at")
      .bind(id)
      .all();
  
    if (!results || results.length === 0) {
      //return c.json({ message: "Todoが見つかりませんでした" }, 404);
      return {
        data: { message: "Todoが見つかりませんでした" }, status: 404
      }
    }
    //return c.json(results[0]);
    return {
      data: results[0], status: 200
    }

  },
}

export default todo18Router;

// TODOの追加
todosRouter.post("/", async (c) => {
    const db = createDatabase(c.env);
    const body = await c.req.json();
    const result = createTodoSchema.safeParse(body);
     if (!result.success) {
        return c.json({ message: "バリデーションエラー", errors: result.error.issues }, 400)
    }
    const newTodo = result.data as NewTodo;
    const { title, description } = newTodo;

    const now = Date.now();
    const { results } = await db
      .prepare(
        "INSERT INTO todos (title, description, created_at, updated_at) VALUES (?, ?, ?, ?) RETURNING id, title, description, completed, created_at, updated_at",
      )
      .bind(title, description, now, now)
      .all();

    if (!results || results.length === 0) {
      return c.json({ message: "Todoの追加に失敗しました" }, 500);
    }
    return c.json(results[0], 201);
});

// TODOの編集
todosRouter.put("/", async (c) => {
    const db = createDatabase(c.env);
    const body = await c.req.json();
    const result = updateTodoSchema.safeParse(body);

     if (!result.success) {
        return c.json({ message: "バリデーションエラー", errors: result.error.issues }, 400)
    }
    const updateTodo = result.data as UpdateTodo;
    const {id, title, description, completed} = updateTodo;

    const now = Date.now();
    const { results } = await db
      .prepare(
        "UPDATE todos SET title = ?, description = ?, completed = ?, updated_at = ? WHERE id = ? RETURNING id, title, description, completed, created_at, updated_at",
      )
      .bind(title, description, completed, now, id)
      .all();
    if (!results || results.length === 0) {
      return c.json({ message: "Todoが見つかりませんでした" }, 404);
    }
    return c.json(results[0]);
});

// TODOの削除
todosRouter.delete("/:id", async (c) => {
  const db = createDatabase(c.env);
  const id = parseInt(c.req.param("id"), 10);

  if (isNaN(id)) {
    return c.json({ message: "無効なIDです" }, 400);
  }

  const { results } = await db
    .prepare("DELETE FROM todos WHERE id = ? RETURNING id, title, description, completed, created_at, updated_at")
    .bind(id)
    .all();

  if (!results || results.length === 0) {
    return c.json({ message: "Todoが見つかりませんでした" }, 404);
  }
  return c.json(results[0]);
});

// TODOの検索
todosRouter.get("/search", async (c) => {
  const db = createDatabase(c.env);
  const query = c.req.query("q");

  if (!query) {
    return c.json({ message: "検索キーワードを入力してください" }, 400);
  }

  const { results } = await db
    .prepare("SELECT id, title, description, completed, created_at, updated_at FROM todos WHERE title LIKE ?")
    .bind(`%${query}%`)
    .all();

  return c.json(results);
});

// TODOの取得（ID指定または全件）
todosRouter.get("/:id?", async (c) => {
    const db = createDatabase(c.env);
    const id = c.req.param("id");

    if (id) {
      const todoId = parseInt(id, 10);
      if (isNaN(todoId)) {
          return c.json({ message: "無効なIDです" }, 400);
      }
        const { results } = await db
          .prepare(
            "SELECT id, title, description, completed, created_at, updated_at FROM todos WHERE id = ?",
          )
          .bind(todoId)
          .all();

      if (!results || results.length === 0) {
        return c.json({ message: "Todoが見つかりませんでした" }, 404);
      }
      return c.json(results[0]);
    }
    const { results } = await db
        .prepare("SELECT id, title, description, completed, created_at, updated_at FROM todos")
        .all();
    return c.json(results);
});

//export default todosRouter;
