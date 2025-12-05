// pages/index.jsx

import React, { useState, useEffect } from 'react';
import { fetchPassage } from '../my-logos-app/lib/api'; // Import the fetching function
import Head from 'next/head'; 
import SmartSearch from '../components/SmartSearch';
// Note: In a real project, you would import components like SmartSearch and FactbookPanel here

const BIBLE_REFERENCE = 'JHN.1.1-JHN.1.3'; // Passage to load on startup

const StudyView = () => {
    // State to hold the fetched Bible content
    const [passageText, setPassageText] = useState("Loading Bible passage..."); 
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Function to fetch data and update state
        const loadPassage = async () => {
            try {
                // Using the actual fetching function from our utility file
                const content = await fetchPassage(BIBLE_REFERENCE); 
                setPassageText(content);
            } catch (error) {
                console.error("Failed to load passage:", error);
                setPassageText("Error loading content. Check your API key and network.");
            } finally {
                setIsLoading(false);
            }
        };

        loadPassage();
    }, []); // Empty dependency array means this runs only once on mount

    // Helper function to render the text safely (replace HTML in a real app)
    const renderContent = () => {
        // WARNING: In a production app, using dangerouslySetInnerHTML is a security risk.
        // For demonstration, we'll use it since the API returns HTML content.
        return { __html: passageText };
    };

    return (
        <>
            <Head>
                <title>Logos 3D Study App</title>
            </Head>

            {/* In a real project, we would use imported UI components here */}
            <main className="study-view"> 
                {/* Simulated Sticky Search Container */}
                <div className="search-container">
                    <input type="text" placeholder="Smart Search is now live..." className="smart-search-input" />
                </div>
                
                <h1 style={{color: '#FFD700', textAlign: 'center'}}>John 1:1-3</h1>

                {/* Display the dynamically fetched passage */}
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="bible-passage" dangerouslySetInnerHTML={renderContent()} />
                )}
                
                {/* Other UI elements like Factbook toggle would go here */}
            </main>
        </>
    );
};

export default StudyView;