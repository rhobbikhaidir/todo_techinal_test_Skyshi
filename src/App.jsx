import React from 'react';
import { Col } from 'react-bootstrap';
import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import { Route, Routes, useNavigate } from "react-router-dom";
import AddTodoList from './components/pages/addTodoList';
import ListItems from './components/pages/listItem';

function App() {
  return (
    <Col
      style={{ height: "100vh", width: "100%" }}>
      <Navbar />
      <Col className='my-5'>
        <Routes>
          < Route exact path="/" element={<Home />} />
          {/* < Route exact path="/Tambah-Activity" element={<AddTodoList />} /> */}
          < Route exact path="/List-Items" element={<ListItems />} />
        </Routes>
      </Col>
    </Col>
    
  );
}

export default App;
