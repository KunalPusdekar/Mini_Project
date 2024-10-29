import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UsernameForm from './components/UsernameForm';
import Dashboard from './components/Dashboard';
import ContestSchedulePage from './pages/ContestShedulePage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<UsernameForm />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/contests" element={<ContestSchedulePage />} />
            </Routes>
        </Router>
    );
};

export default App;
