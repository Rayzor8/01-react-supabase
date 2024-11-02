import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages
import Home from "@/pages/homepage";
import Navbar from "./components/navbar";
import FormEditor from "./pages/form-editor";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form/:slug" element={<FormEditor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
