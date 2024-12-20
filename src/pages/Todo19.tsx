import renderLayout from './renderLayout';
//
export default function Page(props: any) { 
  //
  const htm = `
  <div>
    <div id="root"></div>
    <script type="text/babel" src="/js/Todo19/TodoList.js" ></script>
    <script type="text/babel" src="/js/Todo19/TodoDialog.js" ></script>
    <script type="text/babel" src="/js/Todo19.js" ></script>
  </div>
  `;
  return renderLayout({children: htm, title: "Todo19"});
}
/*
*/

