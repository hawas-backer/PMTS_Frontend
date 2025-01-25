import React, { useState } from 'react';

const AddPlacementResults = () => {
    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState('');

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleCaptionChange = (e) => {
        setCaption(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (image) {
            const formData = new FormData();
            formData.append('image', image);
            formData.append('caption', caption);

            // Send the formData to the backend (image storage and caption saving)
            // Example: axios.post('/upload-placement-results', formData)

            alert('Placement Result Added!');
        } else {
            alert('Please select an image!');
        }
    };

    return (
        <div className="p-8 max-w-lg mx-auto">
            <h2 className="text-2xl font-bold text-center mb-6">Add Placement Results</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="image" className="block text-sm font-semibold">Upload Poster/Image</label>
                    <input 
                        type="file" 
                        id="image" 
                        accept="image/*" 
                        onChange={handleImageChange} 
                        className="w-full p-2 border border-gray-300 rounded-lg mt-2" 
                        required 
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="caption" className="block text-sm font-semibold">Caption (Optional)</label>
                    <input 
                        type="text" 
                        id="caption" 
                        value={caption} 
                        onChange={handleCaptionChange} 
                        placeholder="Enter a caption (e.g., Placement Year 2023)" 
                        className="w-full p-2 border border-gray-300 rounded-lg mt-2" 
                    />
                </div>

                <button type="submit" className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300">
                    Add Placement Result
                </button>
            </form>
        </div>
    );
};

export default AddPlacementResults;