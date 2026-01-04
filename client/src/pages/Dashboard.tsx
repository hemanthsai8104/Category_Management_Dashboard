import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import CategoryCard from '../components/CategoryCard';
import CategoryModal from '../components/CategoryModal';
import { Plus, Search, Bell } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface Category {
    id: number;
    name: string;
    image: string;
    itemCount: number;
}

const Dashboard = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editCategory, setEditCategory] = useState<Category | null>(null);
    const { token, user } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');

    const fetchCategories = async () => {
        if (!token) {
            console.log('>>> DASHBOARD: No token found, skipping fetch');
            return;
        }
        try {
            console.log('>>> DASHBOARD: Fetching categories with token...');
            const res = await axios.get('http://localhost:5000/api/categories', {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log(`>>> DASHBOARD: Received ${res.data.length} categories`);
            setCategories(res.data);
        } catch (err) {
            console.error('>>> DASHBOARD ERROR:', err);
        }
    };


    useEffect(() => {
        fetchCategories();
    }, [token]);

    const handleEdit = (category: Category) => {
        setEditCategory(category);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this category?')) return;
        try {
            await axios.delete(`http://localhost:5000/api/categories/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchCategories();
        } catch (err) {
            console.error(err);
            alert('Failed to delete category');
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditCategory(null);
    };

    const filteredCategories = categories.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar />

            <main className="flex-1 ml-64 p-8">
                {/* Header */}
                <header className="flex justify-between items-center mb-8">
                    <div className="relative w-96">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search categories..."
                            className="input-field pl-10 bg-white border-transparent focus:bg-white shadow-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full relative">
                            <Bell size={20} />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>
                        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-100">
                            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold">
                                {user?.username.charAt(0).toUpperCase()}
                            </div>
                            <span className="text-sm font-medium text-gray-700 pr-1">{user?.username}</span>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <div className="mb-6 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Categories</h1>
                        <p className="text-gray-500 text-sm mt-1">Manage your product categories here.</p>
                    </div>
                    <button
                        onClick={() => { setEditCategory(null); setIsModalOpen(true); }}
                        className="btn btn-primary flex items-center gap-2 shadow-lg shadow-indigo-200"
                    >
                        <Plus size={20} />
                        <span>Add Category</span>
                    </button>
                </div>

                {categories.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-20 text-center">
                        <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Plus size={32} />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-1">No categories yet</h3>
                        <p className="text-gray-500 mb-6">Start by adding your first product category.</p>
                        <button
                            onClick={() => { setEditCategory(null); setIsModalOpen(true); }}
                            className="btn btn-primary"
                        >
                            Create Category
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCategories.map(cat => (
                            <div key={cat.id} className="h-full">
                                <CategoryCard
                                    id={cat.id}
                                    name={cat.name}
                                    image={cat.image}
                                    itemCount={cat.itemCount}
                                    onEdit={() => handleEdit(cat)}
                                    onDelete={() => handleDelete(cat.id)}
                                />
                            </div>
                        ))}
                    </div>
                )}

                <CategoryModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onSuccess={fetchCategories}
                    editData={editCategory}
                />
            </main>
        </div>
    );
};

export default Dashboard;

