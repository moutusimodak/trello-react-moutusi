import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import BoardDetails from "./pages/BoardDetails";
import ErrorPage from "./pages/ErrorPage";

import { Provider } from "react-redux";
import store from "./store/store";

const App = () => {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/boards" element={<HomePage />} />
        <Route path="/boards/:id" element={<BoardDetails />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
    </Provider>
  );
};

export default App;
