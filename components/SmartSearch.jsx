// components/SmartSearch.jsx
import React, { useState, useCallback } from 'react';
import { smartSearch } from '../lib/api/bible'; // Import the search function
// import useDebounce from './hooks/useDebounce'; // (Optional but recommended for API calls)

const SmartSearch = ({ BIBLE_ID }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Function to handle the search execution
    const executeSearch = useCallback(async (searchTerm) => {
        if (searchTerm.length < 3) {
            setResults(null);
            return;
        }

        setIsLoading(true);
        try {
            // CALLING THE REAL API SEARCH FUNCTION
            const searchResults = await smartSearch(searchTerm); 
            setResults(searchResults);
        } catch (error) {
            console.error("Search failed:", error);
            setResults([{ reference: "Error", text: "Failed to load search results." }]);
        } finally {
            setIsLoading(false);
        }
    }, [BIBLE_ID]);
    
    // In a real app, you'd use a debounced handler here:
    const handleInputChange = (e) => {
        const newQuery = e.target.value;
        setQuery(newQuery);
        executeSearch(newQuery); // Call search immediately for now (no debounce)
    };

    // Helper to render the 3D-feeling search cards
    const renderResults = () => {
        if (isLoading) {
            return <div className="loading-card result-card">Searching the archives...</div>;
        }
        if (!results || results.length === 0) {
            return <div className="no-results-card result-card">No matches found for "{query}".</div>;
        }

        return (
            <div className="result-group">
                <h3>Top Verse Matches ({results.length} found)</h3>
                {/* Map the real API data into the styled Glassmorphic cards */}
                {results.slice(0, 5).map((verse, index) => (
                    <div 
                        key={verse.id} 
                        className="result-card" 
                        // Simulate the 3D depth by rotating the cards slightly based on index
                        style={{ transform: `translateY(${index * 2}px) rotateX(-1deg)` }}
                    >
                        {/* verse.reference will be something like JHN.1.1-JHN.1.3 */}
                        <p><strong>{verse.reference}</strong></p> 
                        {/* Dangerously set inner HTML as the API returns content with tags */}
                        <div dangerouslySetInnerHTML={{ __html: verse.text }} />
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="search-container">
            <input
                type="text"
                id="smartSearch"
                placeholder="Smart Search: Type 'faith' or 'love'..."
                value={query}
                onChange={handleInputChange}
                className="smart-search-input" // This will need the Glassmorphism styling from your original file
                disabled={isLoading}
            />

            {/* Smart Search Results Panel (Positioned Fixed/Absolute in CSS) */}
            {query.length >= 3 && (
                <div id="searchResults" className="search-results-panel">
                    {renderResults()}
                </div>
            )}
        </div>
    );
};

export default SmartSearch;