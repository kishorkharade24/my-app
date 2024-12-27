import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserManagement from './UserManagement';
import PreviewPage from './PreviewPage';
import { CssBaseline, Container } from '@mui/material';

function App() {
  return (
    <Router>
      <CssBaseline />
      <Container>
        <Routes>
          <Route path="/" element={<UserManagement />} />
          <Route path="/preview" element={<PreviewPage />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
