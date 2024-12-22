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

const todo22Router = {

  create: async function(c: any){
    const db = createDatabase(c.env);
    const body = await c.req.json();
        
    const { title, content, public_type, food_orange, food_apple, food_banana, pub_date1, pub_date2, pub_date3, qty1, qty2, qty3 } = body;

    const stmt = db.prepare(`
        INSERT INTO todo22 (title, content, public_type, food_orange, food_apple, food_banana, pub_date1, pub_date2, pub_date3, qty1, qty2, qty3)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const info = await stmt.bind(title, content, public_type, food_orange, food_apple, food_banana, pub_date1, pub_date2, pub_date3, qty1, qty2, qty3).run();
    
    return {
      data: JSON.stringify({
        message: 'Item created successfully',
        id: info.lastRowId
      })
      , status: 201
    }

  },

  search: async function(c: any){
    const db = createDatabase(c.env);
    //const { searchParams } = new URL(request.url);
    //const id = searchParams.get('id');
  
    let query = 'SELECT * FROM todo22';
    let params = [];

    //if(id) {
    //    query += ' WHERE id = ?';
    //    params = [id];
    //}
    const { results } = await db.prepare(query)
      .bind(...params)
      .all();
    
    return {
      data: results, status: 200
    }
  },

  delete: async function(c: any){
    const db = createDatabase(c.env);
    const itemId = parseInt(c.req.param("id"), 10);
  
    const info = await db.prepare('DELETE FROM todo22 WHERE id = ?')
        .bind(itemId)
        .run();

    if (info.changes === 0) {
        //return new Response('Item not found', { status: 404 });
        return {
          data: null, status: 404
        }
    }
    
    //return new Response(JSON.stringify({ message: 'Item deleted successfully' }), {
    //    headers: { 'Content-Type': 'application/json' },
    //});
    return {
      data: null, status: 200
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
        "UPDATE todo22 SET name = ?, description = ?, updatedAt = ? WHERE id = ? RETURNING id, name, description, createdAt, updatedAt",
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

export default todo22Router;
