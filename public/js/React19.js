
import React from "https://esm.sh/react@19/?dev"
import ReactDOMClient from "https://esm.sh/react-dom@19/client?dev"

let items = [];
let message = "";
console.log("#React19.js");

function App() {
  const [updatetime, setUpdatetime] = React.useState("");
  React.useEffect(() => {
    (async () => {
        message = "hoge"; 
        updateTimestap();
    })()
  }, []);
  
  const updateTimestap = function() {
    const dt = new Date().toString();
    setUpdatetime(dt);
  }
  
  return (
  <div className="App container mx-auto p-4">
    <h1 className="text-4xl">Hello , React19</h1>
    <hr className="my-2" />
    <p>message: {message}</p>
    <hr />
  </div>
  );
};

ReactDOMClient.createRoot(document.getElementById('root')).render(
  <App />
);
