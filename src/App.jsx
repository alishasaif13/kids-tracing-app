import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout"; // Sirf ek dot (.) use karein
import Home from "./pages/Home";
import CategoriesPage from "./pages/CategoriesPage";
import LettersPage from "./pages/LettersPage";
import CountingPage from "./pages/CountingPage";
import ShapesPage from "./pages/ShapesPage";
import UrduPage from "./pages/UrduPage";
import TracePage from "./pages/TracePage";
import LearningHub from "./pages/LearningHub";
import LearningAlphabets from "./pages/LearningAlphabets";
import LearningNumbers from "./pages/LearningNumbers";
import MatchingHub from "./pages/MatchingHub";
import UrduMatch from "./pages/UrduMatch";
import CountingMatch from "./pages/CountingMatch";
import ShapeMatch from "./pages/ShapeMatch";
import AlphabetMatch from "./pages/AlphabetsMatch";
import New from "./pages/New";

function App() {
  return (
    <Router>
   <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/learning-hub" element={<LearningHub />} />
          <Route path="/learning/alphabets" element={<LearningAlphabets />} />
          <Route path="/learning/numbers" element={<LearningNumbers />} />
          <Route path="/letters" element={<LettersPage />} />
          <Route path="/counting" element={<CountingPage />} />
          <Route path="/shapes" element={<ShapesPage />} />
          <Route path="/urdu" element={<UrduPage />} />
          <Route path="/matching-hub" element={<MatchingHub />} />
          <Route path="/matching/urdu" element={<UrduMatch />} />
          <Route path="/matching/alphabets" element={<AlphabetMatch />} />
          <Route path="/matching/numbers" element={<CountingMatch />} />
          <Route path="/matching/shapes" element={<ShapeMatch />} />
          <Route path="/trace/:categoryId/:item" element={<TracePage />} />
          <Route path="/new" element={<New />} />
        </Routes>
    </Layout>
    </Router>
  );
}

export default App;
