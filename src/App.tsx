import "./App.css";
import AppHeader from "./components/HeaderCmps/AppHeader.tsx";
import HomePage from "./pages/HomePage.tsx";
import { Route, Routes } from "react-router";
function App() {

  return (
    <div className="page__content fade-in">
      <AppHeader />
      <main className="main">
        <Routes>
        <Route path="/" element={<HomePage />} />
        </Routes>
      </main>
      <footer>
        <div className="footer__copyright-text">
          <p>&copy; {new Date().getFullYear()} All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
export default App;
