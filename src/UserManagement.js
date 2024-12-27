import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Box, Input, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

function UserManagement() {
  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile);
    } else {
      alert('Only CSV files are allowed.');
    }
  };

  const handleUpload = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const csvData = e.target.result;
        navigate('/preview', { state: { csvData } });
      };
      reader.readAsText(file);
    } else {
      alert('Please select a CSV file.');
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ textAlign: 'center', mt: 5 }}>
      <Typography variant="h4" gutterBottom>User Management</Typography>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Upload
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Upload CSV File</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please upload a CSV file containing the user's name (required), email (required), and workplace title (optional).
          </DialogContentText>
          <Input type="file" accept=".csv" onChange={handleFileChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Cancel</Button>
          <Button onClick={handleUpload} color="primary">Upload</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default UserManagement;
