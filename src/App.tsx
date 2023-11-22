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
      <footer className="footer">
        <p className="footer__copyright-text">
          &copy; {new Date().getFullYear()} All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}
export default App;
