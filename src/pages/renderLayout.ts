
let PATH__FAVICON = "/favicon.ico";
let PATH__ENTRY_CLIENT = "/static/entry-client.js";
//
export default function Compo(props: any) {
//console.log("renderLayout.env.PROD=", import.meta.env.PROD);
  //if(import.meta.env.PROD) {
  //  PATH__FAVICON = "/public/favicon.ico";
  //  PATH__ENTRY_CLIENT = "/public/static/entry-client.js";
  //}
  //
  const html = `<!DOCTYPE html><html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${props.title}</title>
    <link rel="icon" href="${PATH__FAVICON}" type="image/x-icon"></link>
    <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>  
    <link href="/main.css" rel="stylesheet"/>
  </head>
  <body>
    <!-- head_wrap -->
    <div>
      <a href="/">[ home ]</a>
      <a href="/about">[ about ]</a>
      <a href="/todo18">[ todo18 ]</a>
    </div>
    <hr />        
    ${props.children}
  </body></html>
  `
  return html;
}
/*
*/
