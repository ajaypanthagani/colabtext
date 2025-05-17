import { useEffect } from "react";
import "./App.css";
import Editor from "./components/editor/editor";
import { connectToWebSocket } from "./services/websocket/websocket";


const App = () => {
  useEffect(() => {
    connectToWebSocket();
  });

  return (
    <>
      <Editor></Editor>
    </>
  );
}

export default App;