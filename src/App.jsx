import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Categories from "./pages/Categories"; // <-- Naya Import
import LettersPage from "./pages/LettersPage";
import TracePage from "./pages/TracePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Step 2: Categories/Mode Selection Page */}
        <Route path="/categories" element={<Categories />} /> 
        {/* Step 3: Alphabet Grid Page */}
        <Route path="/letters" element={<LettersPage />} />
        <Route path="/trace/:letter" element={<TracePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;