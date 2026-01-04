import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';

interface CategoryCardProps {
    id: number;
    name: string;
    image: string;
    itemCount: number;
    onEdit: () => void;
    onDelete: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ name, image, itemCount, onEdit, onDelete }) => {
    // Resolve image URL
    const getImageUrl = (url: string) => {
        if (!url) return 'https://via.placeholder.com/300?text=No+Image';
        if (url.startsWith('http')) return url;
        return `http://localhost:5000${url}`;
    };

    return (
        <div className="card h-full flex flex-col group relative">
            <div className="h-64 overflow-hidden bg-gray-200 relative">
                <img
                    src={getImageUrl(image)}
                    alt={name}
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null; // Prevent infinite loop
                        target.src = 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=500&q=60';
                        // Add a visual indicator that image failed
                        target.parentElement?.insertAdjacentHTML('beforeend', '<div class="absolute inset-0 bg-gray-100 flex items-center justify-center text-gray-400 text-xs font-semibold">Image Not Available</div>');
                    }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex gap-2">
                        <button
                            onClick={(e) => { e.stopPropagation(); onEdit(); }}
                            className="p-2 bg-white rounded-full text-blue-600 hover:bg-blue-600 hover:text-white transition shadow-lg"
                            title="Edit Category"
                        >
                            <Pencil size={18} />
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); onDelete(); }}
                            className="p-2 bg-white rounded-full text-red-600 hover:bg-red-600 hover:text-white transition shadow-lg"
                            title="Delete Category"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                </div>
            </div>
            <div className="p-4 flex flex-col">
                <h3 className="font-semibold text-lg text-gray-800">{name}</h3>
                <span className="text-gray-500 text-sm mt-1">{itemCount} items</span>
            </div>
        </div>
    );
};

export default CategoryCard;

