import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PlacementResults = () => {
    const [placementResults, setPlacementResults] = useState([]);

    // Simulate fetching data from the backend (image URLs and captions)
    useEffect(() => {
        // Example data fetching:
        // axios.get('/placement-results').then(response => setPlacementResults(response.data));

        setPlacementResults([
            { id: 1, imageUrl: '/images/result1.jpg', caption: 'Placement Year 2023' },
            { id: 2, imageUrl: '/images/result2.jpg', caption: 'Placement Year 2022' }
        ]);
    }, []);

    const handleDelete = (id) => {
        // Call to the backend to delete the result by ID
        // Example: axios.delete(`/placement-results/${id}`).then(() => {
        setPlacementResults(placementResults.filter(result => result.id !== id));
        alert('Placement result deleted!');
        // });
    };

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-6">Placement Results</h2>

            {/* Button to Add Placement Result */}
            <div className="text-center mb-6">
                <Link to="/add-results">
                    <button className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition duration-300">
                        Add Placement Result
                    </button>
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {placementResults.map((result) => (
                    <div key={result.id} className="relative text-center">
                        <img src={result.imageUrl} alt={result.caption} className="w-full h-auto rounded-lg shadow-lg" />
                        <p className="mt-4 font-semibold text-lg text-gray-800">{result.caption}</p>
                        <button 
                            onClick={() => handleDelete(result.id)} 
                            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>

            {/* Placeholder for where the results would be displayed on the home page */}
            {/* <div className="home-placement-results">
                Add a component or logic here to display these results on the homepage.
            </div> */}
        </div>
    );
};

export default PlacementResults;