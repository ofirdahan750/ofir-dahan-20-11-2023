import { Route, Routes } from "react-router-dom";
import AppHeader from "./components/HeaderCmps/AppHeader";
import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage";
import NotFoundPage from "./pages/NotFoundPage";
import "./App.css";

const CurrentYear = new Date().getFullYear();

function App() {
  return (
    <div className="page__content fade-in">
      <AppHeader />
      <main className="main fade-in">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <footer className="footer">
        <p className="footer__copyright-text">
          &copy; {CurrentYear} All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;
