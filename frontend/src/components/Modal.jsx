import React from "react";

export default function Modal({ open, onClose, title, image, content, author, date }) {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50">
            <div
                className="absolute inset-0 bg-black bg-opacity-50"
                onClick={onClose}
            />
            <div className="absolute inset-0 flex items-center justify-center p-4">
                <div className="relative bg-white max-w-3xl w-full rounded-lg shadow-lg overflow-hidden">
                    <button
                        aria-label="Close"
                        onClick={onClose}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-xl"
                    >
                        ×
                    </button>
                    {image && (
                        <img src={image} alt={title} className="w-full h-64 object-cover" />
                    )}
                    <div className="p-6">
                        <h2 className="text-2xl font-semibold mb-3">{title}</h2>
                        {(author || date) && (
                            <p className="text-sm text-gray-500 mb-4">
                                {author ? `By ${author}` : ""}
                                {author && date ? " • " : ""}
                                {date ? new Date(date).toLocaleDateString() : ""}
                            </p>
                        )}
                        <div className="prose max-w-none text-gray-700 whitespace-pre-line">
                            {content}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


