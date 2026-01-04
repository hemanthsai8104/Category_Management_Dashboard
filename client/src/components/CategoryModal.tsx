import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { X, Upload } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface CategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    editData?: {
        id: number;
        name: string;
        itemCount: number;
        image: string;
    } | null;
}

const CategoryModal: React.FC<CategoryModalProps> = ({ isOpen, onClose, onSuccess, editData }) => {
    const [name, setName] = useState('');
    const [itemCount, setItemCount] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState(''); // Fallback URL
    const [useUrl, setUseUrl] = useState(true);
    const [loading, setLoading] = useState(false);
    const { token } = useAuth();

    useEffect(() => {
        if (editData) {
            setName(editData.name);
            setItemCount(editData.itemCount.toString());
            if (editData.image.startsWith('http')) {
                setImageUrl(editData.image);
                setUseUrl(true);
            } else {
                setImageUrl(`http://localhost:5000${editData.image}`);
                setUseUrl(true); // Default to URL even for existing file images for simplicity in the UI
            }
        } else {
            setName('');
            setItemCount('');
            setImage(null);
            setImageUrl('');
            setUseUrl(true);
        }
    }, [editData, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('itemCount', itemCount);

            if (useUrl) {
                formData.append('image', imageUrl);
            } else if (image) {
                formData.append('image', image);
            }

            const url = editData
                ? `http://localhost:5000/api/categories/${editData.id}`
                : 'http://localhost:5000/api/categories';

            const method = editData ? 'put' : 'post';

            await axios({
                method,
                url,
                data: formData,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            onSuccess();
            onClose();
        } catch (err) {
            console.error(err);
            alert(`Failed to ${editData ? 'update' : 'add'} category`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">
                        {editData ? 'Edit Category' : 'Add New Category'}
                    </h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
                        <input
                            type="text"
                            required
                            className="input-field"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Summer Collection"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Item Count</label>
                        <input
                            type="number"
                            required
                            className="input-field"
                            value={itemCount}
                            onChange={(e) => setItemCount(e.target.value)}
                            placeholder="0"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category Image</label>
                        <div className="flex gap-2 mb-2 text-sm">
                            <button
                                type="button"
                                onClick={() => setUseUrl(true)}
                                className={`px-3 py-1 rounded ${useUrl ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:bg-gray-100'}`}
                            >Link</button>
                            <button
                                type="button"
                                onClick={() => setUseUrl(false)}
                                className={`px-3 py-1 rounded ${!useUrl ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:bg-gray-100'}`}
                            >Upload</button>
                        </div>

                        {useUrl ? (
                            <input
                                type="url"
                                className="input-field"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                placeholder="https://images.unsplash.com/..."
                                required={useUrl}
                            />
                        ) : (
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition relative">
                                <input
                                    type="file"
                                    accept="image/*"
                                    id="category-image-upload"
                                    title="Choose a category image"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
                                    required={!useUrl && !editData}
                                />
                                <div className="flex flex-col items-center text-gray-500">
                                    <Upload size={24} className="mb-2" />
                                    <span className="text-sm">{image ? image.name : 'Click to upload'}</span>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full btn py-2.5 flex justify-center items-center ${editData ? 'bg-blue-600 hover:bg-blue-700' : 'btn-primary'
                                } text-white`}
                        >
                            {loading ? (editData ? 'Updating...' : 'Adding...') : (editData ? 'Update Category' : 'Add Category')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CategoryModal;
