//import React from 'react';

const TodoList = ({ todos, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
       <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100">
                <tr>
                    <th className="py-2 px-4 border-b">タイトル</th>
                     <th className="py-2 px-4 border-b">内容</th>
                     <th className="py-2 px-4 border-b">公開</th>
                      <th className="py-2 px-4 border-b">オレンジ</th>
                     <th className="py-2 px-4 border-b">リンゴ</th>
                     <th className="py-2 px-4 border-b">バナナ</th>
                     <th className="py-2 px-4 border-b">日付1</th>
                     <th className="py-2 px-4 border-b">日付2</th>
                     <th className="py-2 px-4 border-b">日付3</th>
                     <th className="py-2 px-4 border-b">数量1</th>
                     <th className="py-2 px-4 border-b">数量2</th>
                     <th className="py-2 px-4 border-b">数量3</th>
                   <th className="py-2 px-4 border-b">操作</th>
                </tr>
            </thead>
            <tbody>
                {todos.map((todo) => (
                   <tr key={todo.id} className="hover:bg-gray-50">
                        <td className="py-2 px-4 border-b">{todo.title}</td>
                       <td className="py-2 px-4 border-b">{todo.content}</td>
                       <td className="py-2 px-4 border-b">{todo.public_type}</td>
                       <td className="py-2 px-4 border-b">{todo.food_orange ? '〇' : ''}</td>
                        <td className="py-2 px-4 border-b">{todo.food_apple ? '〇' : ''}</td>
                         <td className="py-2 px-4 border-b">{todo.food_banana ? '〇' : ''}</td>
                         <td className="py-2 px-4 border-b">{todo.pub_date1}</td>
                         <td className="py-2 px-4 border-b">{todo.pub_date2}</td>
                         <td className="py-2 px-4 border-b">{todo.pub_date3}</td>
                          <td className="py-2 px-4 border-b">{todo.qty1}</td>
                         <td className="py-2 px-4 border-b">{todo.qty2}</td>
                         <td className="py-2 px-4 border-b">{todo.qty3}</td>
                       <td className="py-2 px-4 border-b">
                            <button onClick={() => onEdit(todo)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2">編集</button>
                            <button onClick={() => onDelete(todo.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">削除</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  );
};

//export default TodoList;
