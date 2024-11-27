const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Mock Data
let users = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Editor', status: 'Inactive' },
];

let roles = [
  { id: 1, name: 'Admin', permissions: ['Read', 'Write', 'Delete'] },
  { id: 2, name: 'Editor', permissions: ['Read', 'Write'] },
];

const permissions = ['Read', 'Write', 'Delete', 'Custom'];

// Helper function to generate unique IDs
const generateId = (collection) => {
  return collection.length > 0 ? Math.max(...collection.map((item) => item.id)) + 1 : 1;
};

// Routes

// Get all users
app.get('/users', (req, res) => {
  res.json(users);
});

// Add a new user
app.post('/users', (req, res) => {
  const newUser = { id: generateId(users), ...req.body };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Update a user
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const userIndex = users.findIndex((user) => user.id === parseInt(id, 10));
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }
  users[userIndex] = { ...users[userIndex], ...req.body };
  res.json(users[userIndex]);
});

// Delete a user
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  users = users.filter((user) => user.id !== parseInt(id, 10));
  res.status(204).send();
});

// Get all roles
app.get('/roles', (req, res) => {
  res.json(roles);
});

// Add a new role
app.post('/roles', (req, res) => {
  const newRole = { id: generateId(roles), ...req.body };
  roles.push(newRole);
  res.status(201).json(newRole);
});

// Update a role
app.put('/roles/:id', (req, res) => {
  const { id } = req.params;
  const roleIndex = roles.findIndex((role) => role.id === parseInt(id, 10));
  if (roleIndex === -1) {
    return res.status(404).json({ message: 'Role not found' });
  }
  roles[roleIndex] = { ...roles[roleIndex], ...req.body };
  res.json(roles[roleIndex]);
});

// Delete a role
app.delete('/roles/:id', (req, res) => {
  const { id } = req.params;
  roles = roles.filter((role) => role.id !== parseInt(id, 10));
  res.status(204).send();
});

// Get all permissions
app.get('/permissions', (req, res) => {
  res.json(permissions);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
