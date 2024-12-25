import React from 'react';
import { Routes, Route  } from 'react-router-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from './commoncomponents/navbar/navbar'; 
import Homescreen from './pages/homescreen/homescreen';
import Footer from './commoncomponents/footer/footer';
import InvoiceForm from './commoncomponents/invoice/Billing';
import Status from './pages/homescreen/StatusPage/status';
import Report from './pages/homescreen/ReportPage/report';
import Prescription from './pages/homescreen/Prescription/prescription';
import axios from 'axios';
import Login from './commoncomponents/login/login';

function App() {

  axios.get('http://localhost:3000/test/get').then(response=>{
    console.log(response);

  }).catch(err=>{
    console.log(err);
  })

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <>
          <Login />
        </>
      ),
    },
    {
      path: '/Homescreen',  
      element: (
        <>
          <Navbar />
          <Homescreen />
          {/* <Footer /> */}
        </>
      ),
    },
    {
      path: '/Billing',
      element: (
        <>
          <Navbar />
          <InvoiceForm />
        </>
      ),
    },
    {
      path: '/status',
      element: (
        <>
          <Navbar />
          <Status />
        </>
      ),
    },
    {
      path: '/report/:id',
      element: (
        <>
          <Navbar />
          <Report />
        </>
      ),
    },
    {
      path: '/prescription/:id',
      element: (
        <>
          <Navbar />
          <Prescription />
        </>
      ),
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;