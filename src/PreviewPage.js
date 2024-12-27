import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Papa from 'papaparse';
import { Button, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, Chip } from '@mui/material';

function PreviewPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (location.state && location.state.csvData) {
      Papa.parse(location.state.csvData, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const { data, errors } = results;
          const validatedData = data.map(user => ({
            name: validateName(user.name) ? user.name : 'Invalid Name',
            email: validateEmail(user.email) ? user.email : 'Invalid Email',
            'workplace title': user['workplace title'] || 'N/A',
            roles: user.roles ? user.roles.split(',').map(role => role.trim()) : ['default role']
          }));
          setUsers(validatedData);
          setErrors(errors);
        }
      });
    }
  }, [location.state]);

  const validateName = (name) => {
    const nameRegex = /^[a-zA-Z\s]+$/;
    return nameRegex.test(name);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRoleChange = (index, roles) => {
    const updatedUsers = [...users];
    updatedUsers[index].roles = roles;
    setUsers(updatedUsers);
  };

  const handleSave = () => {
    // Save the users to the backend or local storage
    console.log('Users saved:', users);
    navigate('/');
  };

  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>Preview Users</Typography>
      {errors.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" color="error">Parsing Errors</Typography>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error.message}</li>
            ))}
          </ul>
        </Box>
      )}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Workplace Title</TableCell>
              <TableCell>Roles</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user['workplace title']}</TableCell>
                <TableCell>
                  <Select
                    multiple
                    value={user.roles}
                    onChange={(e) => handleRoleChange(index, e.target.value)}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} sx={{ margin: 0.5 }} />
                        ))}
                      </Box>
                    )}
                  >
                    <MenuItem value="default role">Default Role</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="user">User</MenuItem>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" color="primary" onClick={handleSave} sx={{ mt: 3 }}>
        Save
      </Button>
    </Box>
  );
}

export default PreviewPage;
