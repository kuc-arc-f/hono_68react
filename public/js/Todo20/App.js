
import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

const htm = `
<div>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">TODO App</h1>
      <div class="flex justify-between items-center mb-4">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          @click="handleAddTodo"
        >
          Add New
        </button>
          <SearchBar @search="handleSearch" />
      </div>
    <ul>
      <TodoItem
        v-for="todo in filteredTodos"
        :key="todo.id"
        :todo="todo"
        @edit="handleEditTodo"
        @delete="handleDeleteTodo"
      />
    </ul>
    <TodoDialog
        :is-open="isDialogOpen"
        :initial-todo="editingTodo"
        :is-editing="!!editingTodo"
        @close="handleCloseDialog"
        @submit="handleDialogSubmit"
    />
  </div>
</div>
`;
import { onMounted, computed } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import TodoDialog from './TodoDialog.js';
import TodoItem from './TodoItem.js';
//import SearchBar from './components/SearchBar.vue';
import { getTodos, createTodo, updateTodo, deleteTodo } from './api.js';

export default {
  components: {
    TodoDialog,
    TodoItem,
    //  SearchBar
  },
  setup() {
    const todos = ref([]);
    const isDialogOpen = ref(false);
    const editingTodo = ref(null);
    const searchText = ref('');


    const fetchTodos = async () => {
        try {
            const fetchedTodos = await getTodos();
            console.log(fetchedTodos);
            todos.value = fetchedTodos;
        } catch(error) {
            console.error('Failed to fetch todos', error)
        }
    };
    onMounted(fetchTodos);

    const handleAddTodo = () => {
      editingTodo.value = null;
      isDialogOpen.value = true;
    };

    const handleEditTodo = (todo) => {
      editingTodo.value = todo;
      isDialogOpen.value = true;
    };

    const handleCloseDialog = () => {
      isDialogOpen.value = false;
    };


    const handleDialogSubmit = async (formData) => {
      try {
        if(editingTodo.value) {
            await updateTodo(editingTodo.value.id, formData);
              todos.value = todos.value.map(todo =>
                todo.id === editingTodo.value.id ? { ...todo, ...formData} : todo
              );
        } else {
            const newTodo = await createTodo(formData);
            todos.value.push(newTodo);
        }
        fetchTodos()
      } catch (err) {
        console.error('Error submitting form', err)
      }
    };

    const handleDeleteTodo = async (id) => {
      try {
        await deleteTodo(id);
          todos.value = todos.value.filter(todo => todo.id !== id);
      } catch(err) {
          console.error('Failed to delete todo:', err);
      }
    };

    const handleSearch = (text) => {
        searchText.value = text;
    };

    const filteredTodos = computed(() => {
        return todos.value.filter(todo =>
          todo.name.toLowerCase().includes(searchText.value.toLowerCase()) ||
            todo.description.toLowerCase().includes(searchText.value.toLowerCase())
        );
    });


    return {
      todos,
      isDialogOpen,
      editingTodo,
      filteredTodos,
      handleAddTodo,
      handleEditTodo,
      handleCloseDialog,
      handleDialogSubmit,
      handleDeleteTodo,
      handleSearch
    };
  },
  template: htm
}
