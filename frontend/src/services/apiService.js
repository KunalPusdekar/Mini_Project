// services/apiService.js
import axios from 'axios';

const getCodeChefData = async (username) => {
    try {
        if (!username) throw new Error("CodeChef username is missing");
        const response = await axios.get(`https://codechef-api.vercel.app/handle/${username}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching CodeChef data:', error.message);
        return null; // Return null to indicate failed fetch
    }
};

const getLeetCodeData = async (username) => {
    try {
        if (!username) throw new Error("LeetCode username is missing");
        const response = await axios.get(`https://leetcode-api-chi.vercel.app/${username}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching LeetCode data:', error.message);
        return null; // Return null to indicate failed fetch
    }
};

const getCodeForcesData = async (username) => {
    try {
        if (!username) throw new Error("CodeForces username is missing");
        const response = await axios.get(`http://localhost:5000/api/codeforces/${username}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching Codeforces data:', error.message);
        return null; // Return null to indicate failed fetch
    }
};

const getAggregatedData = async (usernames) => {
    const [codeChefData, leetCodeData, codeForcesData] = await Promise.all([
        getCodeChefData(usernames.codeChef),
        getLeetCodeData(usernames.leetCode),
        getCodeForcesData(usernames.codeForces),
    ]);

    return {
        codeChef: codeChefData || {},  // Default to empty object if null
        leetCode: leetCodeData || {},
        codeForces: codeForcesData || {},
    };
};

export { getAggregatedData };
