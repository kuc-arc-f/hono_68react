import reactLayout from './reactLayout';

export default function Page(props: any) { 
  
  const htm = `
  <div>
    <div id="root"></div>
    <script type="text/babel" data-type="module" src="/js/React19.js" ></script>
  </div>
  `;
  return reactLayout({children: htm, title: "React19"});
}

