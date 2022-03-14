import "./App.css";
import Chat from "./components/Chat/Chat";
import { Routes, Route } from "react-router-dom";
import PageNotFound from "./components/PageNotFound/PageNotfound";
import LoginPage from "./components/LoginPage/LoginPage";
import PrivateRoute from "./PrivateRoute";

function App() {
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
