import React from 'react';
import { Col } from 'react-bootstrap';
import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import { Route, Routes, Navigate } from "react-router-dom";
import ListItems from './components/pages/listItem';
import { useSelector } from 'react-redux';

function App() {
  const { redirect } = useSelector((state) => state.todosSlicer);

  return (
    <Col
      style={{ height: "100vh", width: "100%" }}>
      <Navbar />
      <Col className='my-5'>
        <Routes>
          < Route exact path="/" element={<Home />} />
          {/* < Route exact path="/Tambah-Activity" element={<AddTodoList />} /> */}
          < Route exact path="/List-Items/:id" element={redirect ?<ListItems /> : <Navigate to="/" />} />
        </Routes>
      </Col>
    </Col>
    
  );
}

export default App;
