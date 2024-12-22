import vueLayout from './vueLayout';

export default function Page(props: any) { 
  
  const htm = `
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-4">Todo22</h1>
    <hr class="my-2" />
    <div id="app">{{ message }}</div>
    <script type="module" src="/js/Todo22.js"></script>
  </div>
  `;
  return vueLayout({children: htm, title: "Todo22"});
}

