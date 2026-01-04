const Category = require('../models/Category');

exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        console.log(`>>> API: Returning ${categories.length} categories to frontend`);
        res.json(categories);
    } catch (err) {
        console.error('>>> API ERROR:', err);
        res.status(500).json({ error: 'Server Error' });
    }
};


exports.createCategory = async (req, res) => {
    try {
        const { name, itemCount } = req.body;
        // Image handling: if file uploaded via multer, use filename, else use body url if provided
        let image = req.body.image || '';
        if (req.file) {
            // Assuming we serve static files from uploads
            image = `/uploads/${req.file.filename}`;
        }

        const category = await Category.create({
            name,
            image,
            itemCount
        });

        res.json(category);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// Seed/Init functionality (optional, but good for demo)
exports.seedCategories = async (req, res) => {
    // Just a helper to populate data if empty
    const count = await Category.count();
    if (count === 0) {
        const seedData = [
            { name: 'Men Clothes', itemCount: 24, image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
            { name: 'Women Clothes', itemCount: 12, image: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
            { name: 'Accessories', itemCount: 43, image: 'https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
            { name: 'Cotton Clothes', itemCount: 31, image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
            { name: 'Summer Clothes', itemCount: 26, image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
            { name: 'Wedding Clothes', itemCount: 52, image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=500&q=60' },
        ];
        await Category.bulkCreate(seedData);
        return res.json({ msg: 'Seeded' });
    }
    res.json({ msg: 'Already has data' });
};

exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, itemCount } = req.body;

        const category = await Category.findByPk(id);
        if (!category) return res.status(404).json({ msg: 'Category not found' });

        category.name = name || category.name;
        category.itemCount = itemCount !== undefined ? itemCount : category.itemCount;

        if (req.file) {
            category.image = `/uploads/${req.file.filename}`;
        } else if (req.body.image) {
            category.image = req.body.image;
        }

        await category.save();
        res.json(category);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findByPk(id);
        if (!category) return res.status(404).json({ msg: 'Category not found' });

        await category.destroy();
        res.json({ msg: 'Category removed' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

