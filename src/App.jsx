import React from 'react';
import { Col } from 'react-bootstrap';
import './App.css';
import LandingPage from './components/pages/LandingPage';
import Navbar from './components/Navbar';
import { Route, Routes, Navigate } from "react-router-dom";
import DetailPage from './components/pages/DetailPage';
import { useSelector } from 'react-redux';

function App() {
  const { redirect } = useSelector((state) => state.todosSlicer);

  return (
    <Col
      style={{ height: "100vh", width: "100%" }}>
      <Navbar />
      <Col className='my-5'>
        <Routes>
          < Route exact path="/" element={<LandingPage />} />
          {/* < Route exact path="/Tambah-Activity" element={<AddTodoList />} /> */}
          < Route exact path="/List-Items/:id" element={redirect ?<DetailPage /> : <Navigate to="/" />} />
        </Routes>
      </Col>
    </Col>
    
  );
}

export default App;
