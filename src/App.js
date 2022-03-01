import React from "react";
import "./App.css";
import Header from "./header";
import Member from "./pages/member";
import Paket from "./pages/paket";
import FormTransaksi from "./pages/formtransaksi";
import User from "./pages/user";
import Transaksi from "./pages/transaksi";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./navbar";

export default function App(){
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar><Dashboard></Dashboard></Navbar>}></Route>
          <Route path="/transaksi" 
            element={<Navbar><Transaksi /></Navbar>} />
          <Route path="/member"
            element={<Navbar><Member /></Navbar>} />
          <Route path="/paket" 
            element={<Navbar><Paket /></Navbar>} />
          <Route path="/user" 
            element={<Navbar><User /></Navbar>} />
          <Route path="/login" 
            element={<Login />} />
          <Route path="/formtransaksi" 
            element={<Navbar><FormTransaksi /></Navbar>} />
        </Routes>
    </BrowserRouter>
  );
} 

function Home() {
  return <h2>Home</h2>;
}