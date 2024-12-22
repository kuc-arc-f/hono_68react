
import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

const htm = `
<div>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Todo22</h1>

    <!-- 検索フォーム -->
    <div class="mb-4 flex items-center">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="タイトルで検索"
        class="border rounded py-2 px-3 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button @click="searchTodos" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">検索</button>
      <button @click="clearSearch" class="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">クリア</button>
    </div>
    <!-- TODOリスト -->
    <ul class="mb-4">
      <li v-for="todo in filteredTodos" :key="todo.id" class="border p-4 mb-2 rounded shadow-md">
        <div class="flex justify-between items-center">
            <h2 class="text-lg font-semibold">{{ todo.title }}</h2>
            <div>
                <button @click="openEditDialog(todo)" class="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-1">編集</button>
                <button @click="deleteTodo(todo.id)" class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">削除</button>
            </div>
        </div>
          
        <p class="text-gray-700 mt-1">内容: {{ todo.content }}</p>
          <p class="text-gray-700 mt-1">公開設定: {{ todo.public_type }}</p>
          <p class="text-gray-700 mt-1">選択した食品:
              <span v-if="todo.food_orange">オレンジ, </span>
              <span v-if="todo.food_apple">りんご, </span>
              <span v-if="todo.food_banana">バナナ</span>
          </p>
          <p class="text-gray-700 mt-1">日付1: {{ todo.pub_date1 }}</p>
          <p class="text-gray-700 mt-1">日付2: {{ todo.pub_date2 }}</p>
          <p class="text-gray-700 mt-1">日付3: {{ todo.pub_date3 }}</p>
          <p class="text-gray-700 mt-1">数量1: {{ todo.qty1 }}</p>
          <p class="text-gray-700 mt-1">数量2: {{ todo.qty2 }}</p>
          <p class="text-gray-700 mt-1">数量3: {{ todo.qty3 }}</p>

      </li>
    </ul>

    <!-- TODO追加ボタン -->
    <button @click="openAddDialog" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      TODOを追加
    </button>

    <!-- TODO追加ダイアログ -->
    <dialog id="addTodoDialog" class="p-4 rounded shadow-md">
      <h2 class="text-xl font-semibold mb-4">TODOを追加</h2>
      <form @submit.prevent="addTodo">
        <div class="mb-4">
          <label for="title" class="block text-gray-700 font-bold mb-2">タイトル</label>
          <input type="text" id="title" v-model="newTodo.title" class="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <p v-if="titleError" class="text-red-500 mt-1">{{ titleError }}</p>
        </div>
        <div class="mb-4">
          <label for="content" class="block text-gray-700 font-bold mb-2">内容</label>
          <textarea id="content" v-model="newTodo.content" class="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
          <p v-if="contentError" class="text-red-500 mt-1">{{ contentError }}</p>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2">公開設定</label>
          <div class="flex">
            <label class="mr-4">
              <input type="radio" v-model="newTodo.public_type" value="public" class="mr-1" />
              公開
            </label>
            <label>
              <input type="radio" v-model="newTodo.public_type" value="private" class="mr-1" />
              非公開
            </label>
          </div>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2">食品</label>
          <div class="flex">
            <label class="mr-4">
              <input type="checkbox" v-model="newTodo.food_orange" :true-value="1" :false-value="0" class="mr-1" />
              オレンジ
            </label>
            <label class="mr-4">
              <input type="checkbox" v-model="newTodo.food_apple" :true-value="1" :false-value="0" class="mr-1" />
              りんご
            </label>
            <label>
              <input type="checkbox" v-model="newTodo.food_banana" :true-value="1" :false-value="0" class="mr-1" />
              バナナ
            </label>
          </div>
        </div>
        <div class="mb-4">
          <label for="pub_date1" class="block text-gray-700 font-bold mb-2">日付1</label>
          <input type="date" id="pub_date1" v-model="newTodo.pub_date1" class="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div class="mb-4">
          <label for="pub_date2" class="block text-gray-700 font-bold mb-2">日付2</label>
          <input type="date" id="pub_date2" v-model="newTodo.pub_date2" class="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div class="mb-4">
          <label for="pub_date3" class="block text-gray-700 font-bold mb-2">日付3</label>
          <input type="date" id="pub_date3" v-model="newTodo.pub_date3" class="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div class="mb-4">
          <label for="qty1" class="block text-gray-700 font-bold mb-2">数量1</label>
          <input type="text" id="qty1" v-model="newTodo.qty1" class="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div class="mb-4">
          <label for="qty2" class="block text-gray-700 font-bold mb-2">数量2</label>
          <input type="text" id="qty2" v-model="newTodo.qty2" class="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div class="mb-4">
          <label for="qty3" class="block text-gray-700 font-bold mb-2">数量3</label>
          <input type="text" id="qty3" v-model="newTodo.qty3" class="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div class="flex justify-end">
          <button type="button" @click="closeAddDialog" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2">キャンセル</button>
          <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">追加</button>
        </div>
      </form>
    </dialog>

    <!-- TODO編集ダイアログ -->
    <dialog id="editTodoDialog" class="p-4 rounded shadow-md">
        <h2 class="text-xl font-semibold mb-4">TODOを編集</h2>
        <form @submit.prevent="updateTodo">
            <div class="mb-4">
                <label for="editTitle" class="block text-gray-700 font-bold mb-2">タイトル</label>
                <input type="text" id="editTitle" v-model="editTodo.title" class="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <p v-if="editTitleError" class="text-red-500 mt-1">{{ editTitleError }}</p>
            </div>
            <div class="mb-4">
                <label for="editContent" class="block text-gray-700 font-bold mb-2">内容</label>
                <textarea id="editContent" v-model="editTodo.content" class="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                <p v-if="editContentError" class="text-red-500 mt-1">{{ editContentError }}</p>
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 font-bold mb-2">公開設定</label>
              <div class="flex">
                  <label class="mr-4">
                    <input type="radio" v-model="editTodo.public_type" value="public" class="mr-1" />
                    公開
                  </label>
                  <label>
                    <input type="radio" v-model="editTodo.public_type" value="private" class="mr-1" />
                    非公開
                  </label>
              </div>
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 font-bold mb-2">食品</label>
                <div class="flex">
                    <label class="mr-4">
                        <input type="checkbox" v-model="editTodo.food_orange" :true-value="1" :false-value="0" class="mr-1" />
                        オレンジ
                    </label>
                    <label class="mr-4">
                        <input type="checkbox" v-model="editTodo.food_apple" :true-value="1" :false-value="0" class="mr-1" />
                        りんご
                    </label>
                    <label>
                        <input type="checkbox" v-model="editTodo.food_banana" :true-value="1" :false-value="0" class="mr-1" />
                        バナナ
                    </label>
                </div>
            </div>
            <div class="mb-4">
              <label for="editPubDate1" class="block text-gray-700 font-bold mb-2">日付1</label>
              <input type="date" id="editPubDate1" v-model="editTodo.pub_date1" class="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div class="mb-4">
              <label for="editPubDate2" class="block text-gray-700 font-bold mb-2">日付2</label>
              <input type="date" id="editPubDate2" v-model="editTodo.pub_date2" class="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div class="mb-4">
              <label for="editPubDate3" class="block text-gray-700 font-bold mb-2">日付3</label>
              <input type="date" id="editPubDate3" v-model="editTodo.pub_date3" class="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div class="mb-4">
              <label for="editQty1" class="block text-gray-700 font-bold mb-2">数量1</label>
              <input type="text" id="editQty1" v-model="editTodo.qty1" class="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div class="mb-4">
              <label for="editQty2" class="block text-gray-700 font-bold mb-2">数量2</label>
              <input type="text" id="editQty2" v-model="editTodo.qty2" class="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div class="mb-4">
              <label for="editQty3" class="block text-gray-700 font-bold mb-2">数量3</label>
              <input type="text" id="editQty3" v-model="editTodo.qty3" class="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          <div class="flex justify-end">
            <button type="button" @click="closeEditDialog" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2">キャンセル</button>
            <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">更新</button>
          </div>
        </form>
      </dialog>

  </div>
</div>
`;
import { onMounted, computed } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
//import TodoDialog from './TodoDialog.js';
//import TodoItem from './TodoItem.js';
//import SearchBar from './components/SearchBar.vue';
//import { getTodos, createTodo, updateTodo, deleteTodo } from './api.js';
const API_URL_BASE ="/api/todo22";

export default {
  data() {
    return {
      todos: [],
      newTodo: {
        title: '',
        content: '',
        public_type: 'public',
        food_orange: 0,
        food_apple: 0,
        food_banana: 0,
        pub_date1: '',
        pub_date2: '',
        pub_date3: '',
        qty1: '',
        qty2: '',
        qty3: '',
      },
      editTodo: {
        id: null,
        title: '',
        content: '',
        public_type: 'public',
        food_orange: 0,
        food_apple: 0,
        food_banana: 0,
        pub_date1: '',
        pub_date2: '',
        pub_date3: '',
        qty1: '',
        qty2: '',
        qty3: '',
      },
        titleError: '',
        contentError: '',
        editTitleError: '',
        editContentError: '',
        searchQuery: '',
      };
  },
  computed: {
      filteredTodos() {
          if (!this.searchQuery) {
              return this.todos;
          }
          return this.todos.filter(todo => todo.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
      }
  },
  mounted() {
      this.fetchTodos();
  },
  methods: {
    async fetchTodos() {
        try {
            const response = await fetch(API_URL_BASE);
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.todos = await response.json();
        } catch (error) {
            console.error("データの取得に失敗しました:", error);
        }
    },
    openAddDialog() {
      this.newTodo = {
          title: '',
          content: '',
          public_type: 'public',
          food_orange: 0,
          food_apple: 0,
          food_banana: 0,
          pub_date1: '',
          pub_date2: '',
          pub_date3: '',
          qty1: '',
          qty2: '',
          qty3: '',
      }
      this.titleError = '';
      this.contentError = '';
      document.getElementById('addTodoDialog').showModal();
    },
      closeAddDialog() {
      document.getElementById('addTodoDialog').close();
      },
      async addTodo() {
          this.titleError = '';
          this.contentError = '';

          if (!this.newTodo.title) {
              this.titleError = "タイトルは必須です。";
          }
          if (!this.newTodo.content) {
              this.contentError = "内容は必須です。";
          }

          if (this.titleError || this.contentError) {
            return;
          }

      try {
          const response = await fetch(API_URL_BASE, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(this.newTodo),
          });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
          const data = await response.json();

            this.todos.push({...this.newTodo, id:data.id});
            this.closeAddDialog();
      } catch (error) {
            console.error("TODOの追加に失敗しました:", error);
        }
      },
      openEditDialog(todo) {
      this.editTodo = { ...todo };
        this.editTitleError = '';
        this.editContentError = '';
        document.getElementById('editTodoDialog').showModal();
    },
      closeEditDialog() {
          document.getElementById('editTodoDialog').close();
      },
    async updateTodo() {
      this.editTitleError = '';
      this.editContentError = '';

          if (!this.editTodo.title) {
              this.editTitleError = "タイトルは必須です。";
          }
          if (!this.editTodo.content) {
              this.editContentError = "内容は必須です。";
          }

      if (this.editTitleError || this.editContentError) {
            return;
      }

          try {
              const response = await fetch(`${API_URL_BASE}/${this.editTodo.id}`, {
                  method: 'PUT',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(this.editTodo),
              });

              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }

            const data = await response.json();
            
              const index = this.todos.findIndex(todo => todo.id === this.editTodo.id);
              if (index !== -1) {
                this.todos.splice(index, 1, { ...this.editTodo });
              }
            
              this.closeEditDialog();
              
          } catch (error) {
            console.error("TODOの更新に失敗しました:", error);
          }
      },
  async deleteTodo(id) {
      try {
          const response = await fetch(`${API_URL_BASE}/${id}`, {
            method: 'DELETE',
          });
      
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }

          this.todos = this.todos.filter(todo => todo.id !== id);
      } catch (error) {
            console.error("TODOの削除に失敗しました:", error);
      }
    },
    searchTodos() {
          // 検索処理はcomputedで処理しています。
    },
    clearSearch() {
        this.searchQuery = '';
    },
  },
  template: htm
};
