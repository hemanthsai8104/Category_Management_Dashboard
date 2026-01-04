const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');
const fs = require('fs');


// Multer config
const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            const dir = path.join(__dirname, '..', 'uploads');
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            cb(null, dir);
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + path.extname(file.originalname));
        }
    })
});


router.get('/', authMiddleware, categoryController.getCategories);
router.post('/', authMiddleware, upload.single('image'), categoryController.createCategory);
router.put('/:id', authMiddleware, upload.single('image'), categoryController.updateCategory);
router.delete('/:id', authMiddleware, categoryController.deleteCategory);
router.post('/seed', categoryController.seedCategories); // Public for easy setup


module.exports = router;
