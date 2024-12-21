import { Hono } from "hono";
import { z } from "zod";

export const todoSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1),
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

const createTodoSchema = todoSchema.pick({ name: true, description: true });
const updateTodoSchema = todoSchema.pick({id: true, name: true, description: true });

const todo20Router = {

  create: async function(c: any){
    const db = createDatabase(c.env);
    const body = await c.req.json();
    const result = createTodoSchema.safeParse(body);
     if (!result.success) {
        return {
          data: { message: "バリデーションエラー", errors: result.error.issues }, status: 400
        }
    }
    const newTodo = result.data as NewTodo;
    const { name, description } = newTodo;
    console.log(newTodo);
 
    const now = Date.now();
    const { results } = await db
      .prepare(
        "INSERT INTO todo20 (name, description, createdAt, updatedAt) VALUES (?, ?, ?, ?) RETURNING id, name, description, createdAt, updatedAt",
      )
      .bind(name, description, now, now)
      .all();

    if (!results || results.length === 0) {
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
      const { results } = await db
      .prepare("SELECT id, name, description, createdAt, updatedAt FROM todo20")
      .all();
      return {
        data: results, status: 200
      }
    }
  
    const { results } = await db
      .prepare("SELECT id, name, description, completed, createdAt, updatedAt FROM todo20 WHERE name LIKE ?")
      .bind(`%${query}%`)
      .all();
  
    return {
      data: results, status: 200
    }
  },

  delete: async function(c: any){
    const db = createDatabase(c.env);
    const id = parseInt(c.req.param("id"), 10);
  
    if (isNaN(id)) {
      return {
        data: { message: "無効なIDです" }, status: 400
      }
    }
  
    const { results } = await db
      .prepare("DELETE FROM todo20 WHERE id = ? RETURNING id, name, description, createdAt, updatedAt")
      .bind(id)
      .all();
  
    if (!results || results.length === 0) {
      return {
        data: { message: "Todoが見つかりませんでした" }, status: 404
      }
    }
    return {
      data: results[0], status: 200
    }

  },

  update: async function(c: any){
    const db = createDatabase(c.env);
    const id = parseInt(c.req.param("id"), 10);
    console.log("id=", id);
    const body = await c.req.json();
    console.log(body);
    const result = updateTodoSchema.safeParse(body);
    if (!result.success) {
      return {
        data: { message: "バリデーションエラー", errors: result.error.issues }, status: 400
      }
    }
    const updateTodo = result.data as UpdateTodo;
    //const {id, name, description, completed} = updateTodo;
    const {name, description} = updateTodo;

    const now = Date.now();
    const { results } = await db
      .prepare(
        "UPDATE todo20 SET name = ?, description = ?, updatedAt = ? WHERE id = ? RETURNING id, name, description, createdAt, updatedAt",
      )
      .bind(name, description, now, id)
      .all();
    if (!results || results.length === 0) {
      return {
        data: { message: "Todoが見つかりませんでした" }, status: 404
      }
    }
    return {
      data: results[0], status: 200
    }
  },

}

export default todo20Router;
