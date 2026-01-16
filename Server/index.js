const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const FormDataModel = require('./models/FormData');


const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',  // Front-end origin
    credentials: true  // Allow credentials
}));

// Connect to MongoDB
mongoose.connect('mongodb+srv://tchawla827:timoboll@nullpointers.yklfd.mongodb.net/?retryWrites=true&w=majority&appName=nullpointers')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

// Handle registration
app.post('/register', (req, res) => {
    const { name, email, password, favoritePet, hostel } = req.body;
    FormDataModel.findOne({ email: email })
        .then(user => {
            if (user) {
                res.json("Already registered");
            } else {
                FormDataModel.create({ name, email, password, favoritePet, hostel })
                    .then(log_reg_form => res.json(log_reg_form))
                    .catch(err => res.status(500).json({ error: "Error creating user", details: err }));
            }
        })
        .catch(err => res.status(500).json({ error: "Error checking user", details: err }));
});

// Handle login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    FormDataModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json("Success");
                } else {
                    res.json("Wrong password");
                }
            } else {
                res.json("No records found!");
            }
        })
        .catch(err => res.status(500).json({ error: "Error during login", details: err }));
});

// Handle forgot password
app.post('/forgot-password', (req, res) => {
    const { email, favoritePet, newPassword } = req.body;
    FormDataModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.favoritePet === favoritePet) {
                    user.password = newPassword;
                    user.save()
                        .then(() => res.json("Password updated"))
                        .catch(err => res.status(500).json({ error: "Error saving new password", details: err }));
                } else {
                    res.json("Incorrect favorite pet");
                }
            } else {
                res.json("No records found");
            }
        })
        .catch(err => res.status(500).json({ error: "Error finding user", details: err }));
});

// Handle profile retrieval
app.get('/profile', (req, res) => {
    const email = req.query.email; // Assuming the email is passed from the front-end
    FormDataModel.findOne({ email: email })
        .then(user => {
            if (user) {
                res.json({ name: user.name, email: user.email, hostel: user.hostel }); // Send user data including hostel
            } else {
                res.status(404).json("User not found");
            }
        })
        .catch(err => res.status(500).json({ error: "Error retrieving profile", details: err }));
});

// Handle password change
app.post('/change-password', (req, res) => {
    const { email, currentPassword, newPassword } = req.body;

    FormDataModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === currentPassword) {
                    user.password = newPassword;
                    user.save()
                        .then(() => res.json("Password changed successfully!"))
                        .catch(err => res.status(500).json({ error: "Error saving new password", details: err }));
                } else {
                    res.status(400).json("Current password is incorrect.");
                }
            } else {
                res.status(404).json("User not found.");
            }
        })
        .catch(err => res.status(500).json({ error: "Error finding user", details: err }));
});

// Handle hostel update
app.post('/update-hostel', (req, res) => {
    const { email, hostel } = req.body;

    FormDataModel.findOne({ email: email })
        .then(user => {
            if (user) {
                user.hostel = hostel;
                user.save()
                    .then(() => res.json("Hostel updated successfully!"))
                    .catch(err => res.status(500).json({ error: "Error updating hostel", details: err }));
            } else {
                res.status(404).json("User not found.");
            }
        })
        .catch(err => res.status(500).json({ error: "Error finding user", details: err }));
});

app.listen(3001, () => {
    console.log("Server listening on http://127.0.0.1:3001");
});
