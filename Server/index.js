const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const FormDataModel = require('./models/FormData');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

// Connect to MongoDB (from environment variable)
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

// Handle registration
app.post('/register', (req, res) => {
    const { name, email, password, favoritePet, hostel } = req.body;
    FormDataModel.findOne({ email })
        .then(user => {
            if (user) {
                res.json("Already registered");
            } else {
                FormDataModel.create({ name, email, password, favoritePet, hostel })
                    .then(data => res.json(data))
                    .catch(err => res.status(500).json({ error: "Error creating user", details: err }));
            }
        })
        .catch(err => res.status(500).json({ error: "Error checking user", details: err }));
});

// Handle login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    FormDataModel.findOne({ email })
        .then(user => {
            if (!user) return res.json("No records found!");
            if (user.password === password) return res.json("Success");
            res.json("Wrong password");
        })
        .catch(err => res.status(500).json({ error: "Error during login", details: err }));
});

// Handle forgot password
app.post('/forgot-password', (req, res) => {
    const { email, favoritePet, newPassword } = req.body;
    FormDataModel.findOne({ email })
        .then(user => {
            if (!user) return res.json("No records found");
            if (user.favoritePet !== favoritePet) return res.json("Incorrect favorite pet");

            user.password = newPassword;
            user.save()
                .then(() => res.json("Password updated"))
                .catch(err => res.status(500).json({ error: "Error saving new password", details: err }));
        })
        .catch(err => res.status(500).json({ error: "Error finding user", details: err }));
});

// Handle profile retrieval
app.get('/profile', (req, res) => {
    const { email } = req.query;
    FormDataModel.findOne({ email })
        .then(user => {
            if (!user) return res.status(404).json("User not found");
            res.json({ name: user.name, email: user.email, hostel: user.hostel });
        })
        .catch(err => res.status(500).json({ error: "Error retrieving profile", details: err }));
});

// Handle password change
app.post('/change-password', (req, res) => {
    const { email, currentPassword, newPassword } = req.body;
    FormDataModel.findOne({ email })
        .then(user => {
            if (!user) return res.status(404).json("User not found");
            if (user.password !== currentPassword)
                return res.status(400).json("Current password is incorrect.");

            user.password = newPassword;
            user.save()
                .then(() => res.json("Password changed successfully!"))
                .catch(err => res.status(500).json({ error: "Error saving new password", details: err }));
        })
        .catch(err => res.status(500).json({ error: "Error finding user", details: err }));
});

// Handle hostel update
app.post('/update-hostel', (req, res) => {
    const { email, hostel } = req.body;
    FormDataModel.findOne({ email })
        .then(user => {
            if (!user) return res.status(404).json("User not found.");

            user.hostel = hostel;
            user.save()
                .then(() => res.json("Hostel updated successfully!"))
                .catch(err => res.status(500).json({ error: "Error updating hostel", details: err }));
        })
        .catch(err => res.status(500).json({ error: "Error finding user", details: err }));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server listening on http://127.0.0.1:${PORT}`);
});
