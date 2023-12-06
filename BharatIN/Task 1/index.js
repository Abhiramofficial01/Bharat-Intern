const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/registration_form', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a user schema
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

// Middleware for parsing JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Serve the registration form
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// Handle the form submission
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  // Create a new user
  const newUser = new User({
    username,
    email,
    password,
  });

  try {
    // Save the user to the database
    await newUser.save();
    res.send('Registration successful!');
  } catch (error) {
    res.status(500).send('Error registering user');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
