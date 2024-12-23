import vueLayout from './vueLayout';

export default function Page(props: any) { 
  
  const htm = `
  <div>
    <div id="app">{{ message }}</div>
    <script type="module" src="/js/Todo22.js"></script>
  </div>
  `;
  return vueLayout({children: htm, title: "Todo22"});
}

