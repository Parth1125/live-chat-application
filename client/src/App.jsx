import Form from "./Components/Form/Form.jsx";
import Chat from "./Components/Chat/Chat.jsx";
import { Routes, Route } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Form />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
}

export default App;
