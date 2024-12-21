import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

const htmTemplate = `
<div>
  <li class="bg-white shadow rounded p-4 mb-2 flex items-center justify-between">
    <div>
      <h3 class="font-semibold text-lg">{{ todo.name }}</h3>
      <p class="text-gray-600">{{ todo.description }}</p>
    </div>
      <div class="flex gap-2">
        <button
          class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
          @click="$emit('edit', todo)"
        >
          Edit
        </button>
        <button
          class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          @click="$emit('delete', todo.id)"
        >
          Delete
        </button>
      </div>
  </li>
</div>
`;

export default {
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
  emits: ['edit', 'delete'],
  template: htmTemplate
};
