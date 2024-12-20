import renderLayout from './renderLayout';
//
export default function Page(props: any) { 
  //
  const htm = `
  <div>
    <div id="root"></div>
    <script type="text/babel" src="/js/home.js" ></script>
  </div>
  `;
  return renderLayout({children: htm, title: "Home"});
}
/*
<script type="module">
import App from '/js/home.js';
</script>    
*/
