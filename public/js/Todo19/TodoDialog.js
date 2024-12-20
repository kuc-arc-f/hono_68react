//import React, { useState, useEffect } from 'react';

const TodoDialog = ({ isOpen, onClose, onCreate, onUpdate, todo, errors, isSubmitting }) => {
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [publicType, setPublicType] = React.useState('公開');
  const [foodOrange, setFoodOrange] = React.useState(false);
  const [foodApple, setFoodApple] = React.useState(false);
  const [foodBanana, setFoodBanana] = React.useState(false);
  const [pubDate1, setPubDate1] = React.useState('');
  const [pubDate2, setPubDate2] = React.useState('');
  const [pubDate3, setPubDate3] = React.useState('');
  const [qty1, setQty1] = React.useState('');
  const [qty2, setQty2] = React.useState('');
  const [qty3, setQty3] = React.useState('');


  React.useEffect(() => {
    if (todo) {
      setTitle(todo.title || '');
      setContent(todo.content || '');
      setPublicType(todo.public_type || '公開');
      setFoodOrange(todo.food_orange || false);
      setFoodApple(todo.food_apple || false);
      setFoodBanana(todo.food_banana || false);
      setPubDate1(todo.pub_date1 || '');
      setPubDate2(todo.pub_date2 || '');
      setPubDate3(todo.pub_date3 || '');
       setQty1(todo.qty1 || '');
        setQty2(todo.qty2 || '');
        setQty3(todo.qty3 || '');
    } else {
      setTitle('');
      setContent('');
       setPublicType('公開');
       setFoodOrange(false);
      setFoodApple(false);
      setFoodBanana(false);
        setPubDate1('');
      setPubDate2('');
      setPubDate3('');
        setQty1('');
        setQty2('');
        setQty3('');
    }
  }, [todo]);


  const handleSubmit = (e) => {
        e.preventDefault();
        const newTodo = {
            title,
            content,
            public_type: publicType,
            food_orange: foodOrange,
            food_apple: foodApple,
            food_banana: foodBanana,
            pub_date1: pubDate1,
            pub_date2: pubDate2,
            pub_date3: pubDate3,
             qty1: qty1,
            qty2: qty2,
             qty3: qty3,
        };

        if (todo) {
           onUpdate({ ...todo, ...newTodo });
        } else {
            onCreate(newTodo);
        }
    };

  if (!isOpen) return null;
  /*
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
  */
/*
  <div className="fixed inset-0 bg-black bg-opacity-50"></div>
  <div className="fixed inset-0 flex items-center justify-center">
    <div className="bg-blue-400 p-6 rounded-lg w-full max-w-md">AAA
      <h2 className="text-lg font-bold mb-4">{todo ? 'TODO編集' : 'TODO追加'}</h2>


    </div>
  </div>
*/
  return (
    <div id="modal" className="fixed inset-0 z-10 hidden">
      <div className="fixed inset-0 bg-black bg-opacity-50"></div>
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold">ダイアログのタイトル</h2>
          <p className="mt-2 text-gray-600">ここにダイアログの内容を記載します。</p>
          <div className="mt-4">
            <button id="closeModal" className="bg-red-500 text-white px-4 py-2 rounded">閉じる</button>
          </div>
        </div>
      </div>
    </div>
  );
};

//export default TodoDialog;
