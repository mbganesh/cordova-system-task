import logo from "./logo.svg";
import "./App.css";
import PurchaseList from "page/PurchaseList";
import FormPage from "page/FormPage";
import Header from "componets/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route element={<PurchaseList />} path="/" />
        <Route element={<FormPage />} path="/add-order" />
      </Routes>
    </>
  );
}

export default App;
