
import React , { useState , useTransition } from "https://esm.sh/react@19/?dev"
import ReactDOMClient from "https://esm.sh/react-dom@19/client?dev"

let items = [];
let message = "";

function UpdateName() {
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = () => {
    startTransition(async () => {
      console.log("#startTransition");
      //const error = await updateName(name);
      //if (error) {
      //  setError(error);
      //  return;
      //} 
      //redirect("/path");
    })
  };

  return (
    <div>
      <input value={name} onChange={(event) => setName(event.target.value)} />
      <button onClick={handleSubmit} disabled={isPending}>
        Update
      </button>
      {error && <p>{error}</p>}
    </div>
  );
};
//<h1 className="text-4xl">Hello , React19_2</h1>

ReactDOMClient.createRoot(document.getElementById('root')).render(
  <UpdateName />
);
