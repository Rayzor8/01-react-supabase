import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages
import Home from "@/pages/homepage";
import Navbar from "./components/navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/create" element={<Create />} />
        <Route path="/:id" element={<Update />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
