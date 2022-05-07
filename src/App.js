// import logo from './logo.svg';
import React from 'react';
import { BrowserRouter as Router,Route, Routes } from "react-router-dom";
import NavBar from './components/navbar';
import Login from './components/login';
import SignUp from './components/signUp'
import ShipperHome from './components/shipperHome';
import CustomerHome from './components/customerHome';
import CustomerPreviousOrders from './components/customerPreviousOrders';
import OrderHistory from './components/orderHistory';
import OrderSuccess from './components/orderSuccess';
import './App.css';


function App() {
  return (
    <div className="App">
      	<Router>
          <NavBar>
            <Routes>
              <Route path="/login" element={<Login />}/> 
              <Route path="/sign-up" element={<SignUp />}/> 
              <Route path="/shipper-home" element={<ShipperHome />}/> 
              <Route path="/customer-home" element={<CustomerHome />}/> 
              <Route path="/customer-previous-orders" element={<CustomerPreviousOrders />}/> 
              <Route path="/customer/:customerId/order/:orderId" element={<OrderHistory />}/> 
              <Route path="/customer/:customerId/order-success/:orderId" element={<OrderSuccess />}/>
            </Routes>
          </NavBar>
      </Router>
    </div>
  );
}

export default App;
