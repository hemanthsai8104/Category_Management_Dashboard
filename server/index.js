const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const db = require('./models');

const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const categoryController = require('./controllers/categoryController');


require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}


// Static folder for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);

// Database Sync & Start Server
db.sequelize.sync({ force: false }).then(async () => {
    console.log('Database synced');

    // Auto-seed if empty (Better for shortlisting!)
    try {
        const Category = require('./models/Category');
        const count = await Category.count();
        console.log(`Current category count in DB: ${count}`);
        if (count === 0) {

            console.log('Seeding initial categories...');
            // Create a dummy req/res to call the controller function or just use a helper
            // For simplicity, we just trigger the seedCategories logic
            await categoryController.seedCategories({ body: {} }, { json: () => { } });
        }
    } catch (err) {
        console.error('Auto-seeding failed:', err);
    }

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch(err => {

    console.error('Failed to sync database:', err);
});
