// lib/api/bible.js

// IMPORTANT: Replace 'YOUR_API_KEY_HERE' with your actual key
// In a real Next.js app, this should be process.env.NEXT_PUBLIC_BIBLE_API_KEY

const API_KEY = 'VlkOYC4TvsuQWzGOFFnhS'; 
const API_BASE_URL = 'https://api.scripture.api.bible/v1/bibles';
const BIBLE_ID = 'de4e12af7f28f599-01'; // Example: KJV Bible ID

/**
 * Fetches a specific Bible passage text from the API.bible service.
 * @param {string} passageReference - The passage to fetch (e.g., 'JHN.1.1-JHN.1.3')
 * @returns {Promise<string>} - The formatted Bible text.
 */
export async function fetchPassage(passageReference) {
    // 1. Construct the API URL
    // We request the formatted text for the given passage.
    const url = `${API_BASE_URL}/${BIBLE_ID}/passages/${passageReference}?content-type=text&include-chapter-numbers=false&include-verse-numbers=true`;

    try {
        // 2. Make the API Call with the necessary Headers
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'api-key': API_KEY, // API Key is passed in the header
            }
        });

        // 3. Handle Errors
        if (!response.ok) {
            throw new Error(`API call failed with status: ${response.status}`);
        }

        // 4. Parse the JSON response
        const data = await response.json();
        
        // The API returns the text content under data.content
        return data.data.content;

    } catch (error) {
        console.error("Error fetching Bible passage:", error);
        return "Failed to load passage. Please check API key and network connection.";
    }
}

// lib/api/bible.js

// ... (Existing variables and fetchPassage function above) ...

/**
 * Performs a keyword search across the entire Bible version.
 * @param {string} query - The keyword or phrase to search (e.g., 'faith', 'love').
 * @returns {Promise<Array<Object>>} - An array of search result objects.
 */
export async function smartSearch(query) {
    // The search endpoint requires a query parameter 'query'
    const url = `${API_BASE_URL}/${BIBLE_ID}/search?query=${encodeURIComponent(query)}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'api-key': API_KEY, 
            }
        });

        if (!response.ok) {
            throw new Error(`Search API call failed with status: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        
        // The search results (verses) are located in data.data.verses
        return data.data.verses || []; // Return an array of verse objects

    } catch (error) {
        console.error("Error performing Smart Search:", error);
        return [{ reference: "Search Error", text: "Failed to connect to Bible database." }];
    }
}