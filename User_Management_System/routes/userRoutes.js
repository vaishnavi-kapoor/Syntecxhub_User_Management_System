const express = require('express');
const user_router = express.Router();

user_router.set && user_router.set('view engine', 'ejs');
user_router.set && user_router.set('views', './views/users');

const bodyParser = require('body-parser');
user_router.use(bodyParser.json());
user_router.use(bodyParser.urlencoded({ extended: true }));

const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/userImages'));
    },
    filename: function (req, file, cb) {
        const name = Date.now() + '-' + file.originalname;
        cb(null, name);
    }
});

const upload = multer({ storage: storage });

const userController = require('../controllers/userController');

// Web routes
user_router.get('/register', userController.loadRegister);
user_router.post('/register', upload.single('image'), userController.insertUser);

// API routes (used by frontend)
user_router.get('/api/users', userController.getUsers);
user_router.post('/api/users', upload.single('image'), userController.insertUserApi);

module.exports = user_router;