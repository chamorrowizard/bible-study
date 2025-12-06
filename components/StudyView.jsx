// components/StudyView.jsx

import React, { useState, useEffect } from 'react';
import { fetchPassage, smartSearch } from '../lib/api/bible'; // Import your API functions
// Import your SmartSearch component and other elements here

const BIBLE_REFERENCE = 'JHN.1.1-JHN.1.3'; 

// Function to replace your old static site's logic
const StudyView = () => {
    const [passageText, setPassageText] = useState("Loading Bible passage..."); 
    
    // useEffect to fetch passage on load (from your old pages/index.jsx)
    useEffect(() => {
        const loadPassage = async () => {
            try {
                const content = await fetchPassage(BIBLE_REFERENCE); 
                setPassageText(content);
            } catch (error) {
                setPassageText("Error loading content.");
            }
        };
        loadPassage();
    }, []);

    // Now, return the JSX structure, NOT the raw HTML
    return (
        <main className="study-view">
            {/* 1. Put your SmartSearch Component here */}
            {/* <SmartSearch /> */} 
            
            <h1 style={{color: '#FFD700', textAlign: 'center'}}>John 1:1-3</h1>

            {/* 2. Display the dynamically fetched passage */}
            <div 
                className="verse-text" 
                dangerouslySetInnerHTML={{ __html: passageText }} 
            />
            
            {/* 3. Placeholder for the scroll content */}
            <div className="placeholder-content">
                <h2>— Functional App Loaded! —</h2>
                <p>This is where your long, scrollable text content will go.</p>
                {/* ... other placeholder content ... */}
            </div>

            {/* Factbook Panel and Word Pop-up will be separate components */}
        </main>
    );
};

export default StudyView;