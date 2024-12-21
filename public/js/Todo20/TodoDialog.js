import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

const htm = `
<div>
  <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-8 rounded shadow-lg w-96">
      <h2 class="text-xl font-bold mb-4">{{ isEditing ? 'Edit Todo' : 'Add New Todo' }}</h2>
      <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
              Name
          </label>
            <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                v-model="name"
            />
      </div>
      <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="description">
              Description
          </label>
            <textarea
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="description"
                v-model="description"
            />
      </div>
          <p v-if="error" class="text-red-500 text-sm mb-4">{{ error }}</p>
        <div class="flex justify-end">
            <button
                class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
                @click="$emit('close')"
            >
                Cancel
            </button>
            <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                @click="handleSubmit"
            >
                {{ isEditing ? 'Update' : 'Add' }}
            </button>
        </div>
      </div>
  </div>
</div>
`;
import { watch } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

export default {
  components: {
  },
  props: {
    isOpen: Boolean,
    initialTodo: {
        type: Object,
        default: null
    },
     isEditing: {
         type: Boolean,
         default: false,
    }
  },
  emits: ['close', 'submit'],
  setup(props, { emit }) {
      const name = ref('');
      const description = ref('');
      const error = ref('');

      watch(() => props.initialTodo, (newTodo) => {
        if(newTodo) {
           name.value = newTodo.name;
           description.value = newTodo.description;
        } else {
            name.value = '';
            description.value = '';
        }
      }, { immediate: true });

      const handleSubmit = () => {
        if (!name.value.trim()) {
              error.value = 'Name is required.';
            return;
        }

         error.value = '';
          emit('submit', { name: name.value, description: description.value });
      };

      return {
          name,
          description,
          error,
          handleSubmit
      };
  },  
  template: htm
}