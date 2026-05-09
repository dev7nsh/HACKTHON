const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3001;
const DB_FILE = path.join(__dirname, 'database.json');

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database file if it doesn't exist
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify([]));
}

// Helper to read DB
const readDB = () => {
  const data = fs.readFileSync(DB_FILE, 'utf-8');
  return JSON.parse(data);
};

// Helper to write DB
const writeDB = (data) => {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

// GET all students
app.get('/api/certificates', (req, res) => {
  try {
    const students = readDB();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read database' });
  }
});

// GET single student by ID
app.get('/api/certificates/:id', (req, res) => {
  try {
    const students = readDB();
    const student = students.find((s) => s.id === req.params.id);
    if (!student) {
      return res.status(404).json({ error: 'Certificate not found' });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read database' });
  }
});

// POST new student certificate
app.post('/api/certificates', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== 'Bearer developeby123') {
    return res.status(401).json({ error: 'Unauthorized: Invalid admin password' });
  }

  try {
    const students = readDB();
    
    const newStudent = {
      id: uuidv4(),
      certificateId: `CERT-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
      issueDate: new Date().toISOString().split('T')[0],
      ...req.body
    };

    students.push(newStudent);
    writeDB(students);

    res.status(201).json({ message: 'Certificate created successfully', student: newStudent });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save certificate' });
  }
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

module.exports = app;
