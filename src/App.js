import "./App.css";
import PurchaseList from "page/PurchaseList";
import FormPage from "page/FormPage";
import Header from "componets/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <PageRoutes />
      </BrowserRouter>
    </>
  );
}

function PageRoutes() {
  return (
    <>
      <Header />
      <Routes>
        <Route element={<PurchaseList />} exact path="/" />
        <Route element={<FormPage />} exact path="/add-order" />
      </Routes>
    </>
  );
}

export default App;
