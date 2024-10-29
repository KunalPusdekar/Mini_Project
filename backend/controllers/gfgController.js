const axios = require('axios');
const cheerio = require('cheerio');

// Fetch user data from GeeksforGeeks
const fetchGFGUserData = async (username) => {
    try {
        const url = `https://auth.geeksforgeeks.org/user/${username}/practice`;
        const { data: html } = await axios.get(url);
        const $ = cheerio.load(html);

        // Extract data using the selectors from the working code
        const InstituteRank = $('span.rankNum').text().trim(); // Rank number

        // Extract counts for Total Solved
        const TotalEasy = parseInt($('a[href="#easy"]').text().match(/\d+/)?.[0] || 0) || 0; // Extract Easy problems count
        const TotalMedium = parseInt($('a[href="#medium"]').text().match(/\d+/)?.[0] || 0) || 0; // Extract Medium problems count
        const TotalHard = parseInt($('a[href="#hard"]').text().match(/\d+/)?.[0] || 0) || 0; // Extract Hard problems count

        // Calculate Total Solve count
        const TotalSolve = TotalEasy + TotalMedium + TotalHard;

        // Extract consistency
        const Consistency = $('div.streakCnt.tooltipped').text().trim();

        // Return assembled user data object
        return {
            "status": "success",
            "InstituteRank": InstituteRank,
            "TotalSolve": TotalSolve,
            "Consistency": Consistency,
            "TotalEasy": TotalEasy,
            "TotalMedium": TotalMedium,
            "TotalHard": TotalHard
        };
    } catch (e) {
        console.error(e);
        return {
            "status": "error",
            "message": "Username Not Found"
        };
    }
};

// Controller function for handling requests
const gfgController = async (req, resp) => {
    const username = req.params.id;
    try {
        const userData = await fetchGFGUserData(username);
        resp.status(userData.status === "success" ? 200 : 404).json(userData);
    } catch (e) {
        resp.status(500).json({
            "status": "error",
            "message": "An error occurred while processing the request."
        });
        console.error(e);
    }
};

module.exports = gfgController;
