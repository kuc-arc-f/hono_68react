
let PATH__FAVICON = "/favicon.ico";
//
export default function Compo(props: any) {
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
      <a href="/react19">[ react19 ]</a>
      <a href="/react19_2">[ react19_2 ]</a>
      <a href="/vuecdn">[ vuecdn ]</a>
      <a href="/todo18">[ todo18 ]</a>
      <a href="/todo19">[ todo19 ]</a>
      <a href="/todo20">[ todo20 ]</a>
      <a href="/todo22">[ todo22 ]</a>
    </div>
    <hr />        
    ${props.children}
  </body></html>
  `
  return html;
}
/*
*/
