let items = [];
let message = "";
console.log("#home");
//
function App() {
    const [updatetime, setUpdatetime] = React.useState("");
    React.useEffect(() => {
        (async () => {
            console.log("#start");
            message = "hoge"; 
            updateTimestap();
        })()
    }, []);
    //
    const updateTimestap = function() {
        const dt = new Date().toString();
        setUpdatetime(dt);
    }
    //
    return (
    <div className="App container mx-auto p-4">
        <h1 className="text-4xl">Hello React 123</h1>
        <hr className="my-2" />
        <p>update:{updatetime}</p>
        <p>message: {message}</p>
        <hr />
    </div>
    );
};
//
ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
);
