const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const securePassword = async (password) => {
    try {
        const passwordHash = await bcrypt.hash(password, 10);
        return passwordHash;
    }
    catch (error) {
        console.log(error.message);
    }
}

const loadRegister = async (req, res) => {
    try {
        res.render('registration');
    } catch (error) {
        console.log(error.message);
    }
}

const insertUser = async (req, res) => {
    try {
        const spassword = await securePassword(req.body.password);
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mobile,
            image: req.file ? req.file.filename : undefined,
            password: spassword,
            is_admin: 0
        });

        const userData = await user.save();
        if (userData) {
            res.render('registration', { message: 'User registered successfully. Please verify your email to login.' });
        }
        else {
            res.render('registration', { message: 'User registration failed' });
        }

    } catch (error) {
        console.log(error.message);
    }
}

// API: return all users as JSON
const getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
}

// API: insert user and return JSON
const insertUserApi = async (req, res) => {
    try {
        const spassword = await securePassword(req.body.password);
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mobile,
            image: req.file ? req.file.filename : undefined,
            password: spassword,
            is_admin: 0
        });

        const userData = await user.save();
        if (userData) {
            const userObj = userData.toObject();
            delete userObj.password;
            res.status(201).json({ message: 'User registered', user: userObj });
        } else {
            res.status(400).json({ message: 'User registration failed' });
        }

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    loadRegister,
    insertUser,
    getUsers,
    insertUserApi
}