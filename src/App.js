import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout.jsx';
import Overview from './Overview.jsx';
import Transactions from './Transactions.jsx';
import { Upload } from './Upload.jsx';
import './App.css';
import SignIn from './SignIn.jsx';
import EventCalendar from './EventCalendar.jsx'; 
import About from './About.jsx';

function App() {
  return (
    <div className='main'>
        <Routes>
          <Route path="/about" element={<Layout><About /></Layout>}/>
          <Route path="/calendar" element={<Layout><EventCalendar /></Layout>} />
          <Route path="/transactions" element={<Layout><Transactions /></Layout>}/>
          <Route path="/upload" element={<Layout><Upload /></Layout>}/>
          <Route path="/overview" element={<Layout><Overview /></Layout>}/>
          <Route path='/' element={<SignIn />} />
        </Routes>
      </div>
  );
}

export default App;
