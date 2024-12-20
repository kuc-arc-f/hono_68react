//import React, { useState, useEffect } from 'react';
//import TodoList from './components/TodoList';
//import TodoDialog from './components/TodoDialog';
//import { z } from 'zod';

//const API_URL = "/api/todo19"

const App = () => {
    const [todos, setTodos] = React.useState([]);
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [editTodo, setEditTodo] = React.useState(null);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [errors, setErrors] = React.useState({});
    const [isSubmitting, setIsSubmitting] = React.useState(false);


    React.useEffect(() => {
        fetchTodos();
    }, []);
    
    // エラーリセット
    const resetErrors = () => {
        setErrors({});
    };
    
    // バリデーション
    const validateTodo = (todo) => {
        try {
            //todoSchema.parse(todo);
            setErrors({});
            return true;
        } catch (error) {
           if(error instanceof z.ZodError) {
            const errorMessages = error.errors.reduce((acc, err) => {
                acc[err.path[0]] = err.message;
                return acc;
              }, {});
              setErrors(errorMessages);
              return false
           }
             return false
            
        }
    };
    // TODO取得
    const fetchTodos = async () => {
        try {
            const response = await fetch('/api/todo19');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setTodos(data);
        } catch (error) {
            console.error("Failed to fetch todos:", error);
        }
    };

    // TODO追加ダイアログを開く
    const openAddDialog = () => {
        setEditTodo(null);
        setDialogOpen(true);
        resetErrors();
    };

    // TODO編集ダイアログを開く
    const openEditDialog = (todo) => {
        setEditTodo(todo);
        setDialogOpen(true);
        resetErrors();
    };

    // TODOダイアログを閉じる
    const closeDialog = () => {
        setDialogOpen(false);
        setEditTodo(null);
        resetErrors();
    };

    // TODO作成
    const handleCreateTodo = async (todo) => {
        setIsSubmitting(true);
        if (!validateTodo(todo)) {
            setIsSubmitting(false);
          return;
        }
        try {
            const response = await fetch('/api/todo19', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(todo),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            fetchTodos();
            closeDialog();
        } catch (error) {
            console.error("Failed to create todo:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // TODO更新
    const handleUpdateTodo = async (todo) => {
        setIsSubmitting(true);
      if (!validateTodo(todo)) {
          setIsSubmitting(false);
          return;
        }
        try {
            const response = await fetch(`/api/todo19/${todo.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(todo),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            fetchTodos();
            closeDialog();
        } catch (error) {
            console.error("Failed to update todo:", error);
        } finally {
           setIsSubmitting(false);
        }
    };

    // TODO削除
    const handleDeleteTodo = async (id) => {
        if (window.confirm('このTODOを削除しますか？')) {
            try {
                const response = await fetch(`/api/todo19/${id}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                fetchTodos();
            } catch (error) {
                console.error("Failed to delete todo:", error);
            }
        }
    };

   // TODO検索
    const handleSearch = async () => {
        if (searchQuery.trim() === '') {
            fetchTodos();
            return;
        }
        try {
            const response = await fetch(`/api/todo19/search/${searchQuery}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setTodos(data);
        } catch (error) {
            console.error("Failed to search todos:", error);
        }
    };


    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">TODO List</h1>

             <div className="flex mb-4">
                <input
                  type="text"
                  className="border p-2 mr-2"
                   placeholder="検索..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
               <button onClick={handleSearch} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                     検索
               </button>
             </div>
{/*  
"bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4
*/}
            <button onClick={openAddDialog} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
                TODO追加
            </button>

            <TodoList todos={todos}  onEdit={openEditDialog} onDelete={handleDeleteTodo} />

            <TodoDialog
                isOpen={dialogOpen}
                onClose={closeDialog}
                onCreate={handleCreateTodo}
                onUpdate={handleUpdateTodo}
                todo={editTodo}
                errors={errors}
                isSubmitting={isSubmitting}
            />
        </div>
    );
};
ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
);
//export default App;
