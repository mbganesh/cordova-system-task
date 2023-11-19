import logo from "./logo.svg";
import "./App.css";
import PurchaseList from "page/PurchaseList";
import FormPage from "page/FormPage";
import Header from "componets/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";

function App() {

  const [formData, setFormData] = useState(null);

  const onSubmitApp = (data) => {
    console.log("data in App COmponent", data);
    setFormData(data);
  };

  return (
    <>
      <Header formDatafromApp={formData}/>
      <Routes>
        <Route element={<PurchaseList />} path="/" />
        <Route element={<FormPage onSubmitApp={onSubmitApp}/>} path="/add-order" />
      </Routes>
    </>
  );
}

export default App;
