const API_BASE_URL = "/api/todo18"; // バックエンドのURL

const fetchTodos = async (query) => {
  const url = query ? `${API_BASE_URL}/search?q=${query}` : `${API_BASE_URL}/search`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch todos: ${response.statusText}`);
  }
  return await response.json();
};

const addTodo = async (todo) => {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
  if (!response.ok) {
    throw new Error(`Failed to add todo: ${response.statusText}`);
  }
  return await response.json();
};

const updateTodo = async (todo) => {
  const response = await fetch(API_BASE_URL, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
  if (!response.ok) {
    throw new Error(`Failed to update todo: ${response.statusText}`);
  }
  return await response.json();
};

const deleteTodo = async (id) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(`Failed to delete todo: ${response.statusText}`);
  }
  return await response.json();
};
/*
import { z } from "zod";

const todoSchema = z.object({
    title: z.string().min(1, "タイトルは必須です"),
    description: z.string().optional(),
    completed: z.boolean().optional(),
});
*/
const TodoDialog = (props) => {
    const [title, setTitle] = React.useState("");
    if(props.initialTodo && props.initialTodo.title) {setTitle(props.initialTodo.title)}
    const [description, setDescription] = React.useState("");
    if(props.initialTodo && props.initialTodo.description){ setDescription(props.initialTodo.description) }
    const [completed, setCompleted] = React.useState(false);
    const [errors, setErrors] = React.useState([]);
    const dialogRef = React.useRef(null);


    React.useEffect(() => {
        if (props.isOpen) {
            dialogRef.current.showModal();
        } else {
            dialogRef.current.close();
        }
    }, [props.isOpen]);

    React.useEffect(() => {
        if (props.initialTodo) {
            setTitle(props.initialTodo.title);
            setDescription(props.initialTodo.description || "");
            setCompleted(props.initialTodo.completed || false);
        } else {
            setTitle("");
            setDescription("");
            setCompleted(false);
        }
        setErrors([]);
    }, [props.initialTodo]);


    const handleSave = async () => {
      /*
        const result = todoSchema.safeParse({ title, description, completed });

        if (!result.success) {
            setErrors(result.error.issues);
            return;
        }
      */
      if(props.initialTodo && props.initialTodo.id){
        props.onSave({ title, description, completed, id: props.initialTodo.id });
      }else{
        props.onSave({ title, description, completed  });
      }
      props.onClose();
    };

    const handleClose = () => {
      props.onClose();
    };

    const handleCheckboxChange = () => {
        setCompleted(!completed);
    }

    return (
        <dialog ref={dialogRef} className="fixed z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-md w-full max-w-md">
            <div className="p-6">
                <h2 className="text-xl font-bold mb-4">{props.initialTodo ? "編集" : "追加"}</h2>

                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
                        タイトル
                    </label>
                    <input
                        type="text"
                        id="title"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    {errors.filter(err => err.path.includes("title")).map((error, index) => (
                        <p key={index} className="text-red-500 text-xs italic">{error.message}</p>
                    ))}
                </div>

                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
                        説明
                    </label>
                    <textarea
                        id="description"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    {errors.filter(err => err.path.includes("description")).map((error, index) => (
                        <p key={index} className="text-red-500 text-xs italic">{error.message}</p>
                    ))}
                </div>
                {props.initialTodo && (
                  <div className="mb-4 flex items-center">
                    <input
                      type="checkbox"
                      id="completed"
                      className="mr-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      checked={completed}
                      onChange={handleCheckboxChange}
                    />
                    <label htmlFor="completed" className="block text-gray-700 text-sm font-bold">
                      完了
                    </label>
                  </div>
                )}
                <div className="flex justify-end">
                    <button onClick={handleClose} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2">
                        キャンセル
                    </button>
                    <button onClick={handleSave} className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
                        保存
                    </button>
                </div>
            </div>
        </dialog>
    );
};

const TodoList = (props) => {
    return (
        <ul className="divide-y divide-gray-200">
            {props.todos.map((todo) => (
                <li key={todo.id} className="py-4 px-2 flex items-center justify-between">
                    <div className="flex flex-col">
                        <h3 className={`text-lg font-semibold ${todo.completed ? 'line-through' : ''}`}>{todo.title}</h3>
                        {todo.description && <p className="text-sm text-gray-500">{todo.description}</p>}
                    </div>
                    <div className="flex space-x-2">
                        <button onClick={() => props.onEdit(todo)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm">編集</button>
                        <button onClick={() => props.onDelete(todo.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-sm">削除</button>
                    </div>
                </li>
            ))}
        </ul>
    );
};

const App = () => {
  const [todos, setTodos] = React.useState([]);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [editTodo, setEditTodo] = React.useState(undefined);
  const [searchQuery, setSearchQuery] = React.useState("");

  React.useEffect(() => {
      fetchTodosData();
  }, []);

  const fetchTodosData = async (query) => {
    try {
        const todos = await fetchTodos(query);
        setTodos(todos);
    } catch (error) {
        console.error("Failed to fetch todos:", error);
    }
  }
  const handleSearch = async (e) => {
      const query = e.target.value;
      setSearchQuery(query);
      fetchTodosData(query);
  }

  const handleAddTodo = () => {
      setEditTodo(undefined);
      setIsDialogOpen(true);
  };

  const handleEditTodo = (todo) => {
      setEditTodo(todo);
      setIsDialogOpen(true);
  };

  const handleSaveTodo = async (todo) => {
    try {
        if (todo.id) {
            await updateTodo(todo);
        } else {
            await addTodo(todo);
        }
        fetchTodosData(searchQuery);
    } catch (error) {
        console.error("Failed to save todo:", error);
    }
    setIsDialogOpen(false);
  };

  const handleDeleteTodo = async (id) => {
    try {
        await deleteTodo(id);
        fetchTodosData(searchQuery);
    } catch (error) {
        console.error("Failed to delete todo:", error);
    }
  };

  return (
      <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">TODO App</h1>
          <div className="flex justify-between items-center mb-4">
            <button onClick={handleAddTodo} className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
                TODOを追加
            </button>
            <input
              type="text"
              placeholder="検索..."
              className="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={searchQuery}
              onChange={handleSearch}
            />
        </div>
          <TodoList todos={todos} onEdit={handleEditTodo} onDelete={handleDeleteTodo} />
          <TodoDialog
              isOpen={isDialogOpen}
              onClose={() => setIsDialogOpen(false)}
              onSave={handleSaveTodo}
              initialTodo={editTodo}
          />
      </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
);