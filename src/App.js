import "./App.css";
import Chat from "./components/Chat/Chat";
import { Routes, Route } from "react-router-dom";
import PageNotFound from "./components/PageNotFound/PageNotfound";
import LoginPage from "./components/LoginPage/LoginPage";
import PrivateRoute from "./PrivateRoute";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    function setViewportHeight() {
      // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
      let vh = window.innerHeight * 0.01;
      // Then we set the value in the --vh custom property to the root of the document
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    }
    setViewportHeight();
    window.addEventListener("resize", setViewportHeight);

    return () => window.removeEventListener("resize", setViewportHeight);
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
