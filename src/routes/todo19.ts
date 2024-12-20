import { Hono } from "hono";
import { z } from 'zod';

export interface Bindings {
    DB: D1Database;
}

export const todoSchema = z.object({
    title: z.string().min(1),
    content: z.string().nullable(),
    public_type: z.string().nullable(),
    food_orange: z.boolean().nullable(),
    food_apple: z.boolean().nullable(),
    food_banana: z.boolean().nullable(),
    pub_date1: z.string().nullable(),
    pub_date2: z.string().nullable(),
    pub_date3: z.string().nullable(),
    qty1: z.string().nullable(),
    qty2: z.string().nullable(),
    qty3: z.string().nullable(),
});
  
export type Todo = z.infer<typeof todoSchema>;

// データベースの接続は、D1のインスタンスを直接使用
export const createDatabase = (env: { DB: D1Database }) => {
  return env.DB;
};

const todosRouter = new Hono<{ Bindings: { DB: D1Database } }>();

const createTodoSchema = todoSchema.pick({ title: true, description: true });
const updateTodoSchema = todoSchema.pick({id: true, title: true, description: true, completed: true});

const todo19Router = {

  getTodos: async function(c: any){
    const { results } = await c.env.DB.prepare('SELECT * FROM todo19').all();
    //return c.json(results);
    return {
      data: results, status: 201
    }
  },

  create: async function(c: any){
    const todo: Todo = await c.req.json();
    const validatedTodo = todoSchema.parse(todo);

    const { success } = await c.env.DB.prepare(`
      INSERT INTO todo19 (title, content, public_type, food_orange, food_apple, food_banana, pub_date1, pub_date2, pub_date3, qty1, qty2, qty3) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
        validatedTodo.title,
        validatedTodo.content,
        validatedTodo.public_type,
        validatedTodo.food_orange ? 1 : 0,
        validatedTodo.food_apple ? 1 : 0,
        validatedTodo.food_banana ? 1 : 0,
        validatedTodo.pub_date1,
        validatedTodo.pub_date2,
        validatedTodo.pub_date3,
        validatedTodo.qty1,
        validatedTodo.qty2,
        validatedTodo.qty3
      ).run();


    if (success) {
      //return c.json({ message: 'Todo created successfully' }, 201);
      return {
        data: { message: 'Todo created successfully' }, status: 201
      }
    } else {
      //return c.json({ message: 'Failed to create todo' }, 500);
      return {
        data: { message: 'Failed to create todo' }, status: 500
      }
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

  update: async function(c: any){
    const db = createDatabase(c.env);
    const body = await c.req.json();
    const result = updateTodoSchema.safeParse(body);

    if (!result.success) {
      //return c.json({ message: "バリデーションエラー", errors: result.error.issues }, 400)
      return {
        data: { message: "バリデーションエラー", errors: result.error.issues }, status: 400
      }
    }
    const updateTodo = result.data as UpdateTodo;
    const {id, title, description, completed} = updateTodo;

    const now = Date.now();
    const { results } = await db
      .prepare(
        "UPDATE todo18 SET title = ?, description = ?, completed = ?, updated_at = ? WHERE id = ? RETURNING id, title, description, completed, created_at, updated_at",
      )
      .bind(title, description, completed, now, id)
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

export default todo19Router;


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

