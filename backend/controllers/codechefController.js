const axios = require('axios');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const fetchUserData = async (handle) => {
  try {
    const resdata = await axios.get(`https://www.codechef.com/users/${handle}`);
    if (resdata.status === 200) {
      let data = resdata.data;
      let heatMapDataCursor1 =
        data.search("var userDailySubmissionsStats =") +
        "var userDailySubmissionsStats =".length;
      let heatMapDataCursor2 = data.search("'#js-heatmap") - 9;
      let heatDataString = data.substring(
        heatMapDataCursor1,
        heatMapDataCursor2
      );
      let headMapData = JSON.parse(heatDataString);
      let allRatingCursor1 =
        data.search("var all_rating = ") + "var all_rating = ".length;
      let allRatingCursor2 = data.search("var current_user_rating =") - 6;
      let ratingData = JSON.parse(data.substring(allRatingCursor1, allRatingCursor2));
      let dom = new JSDOM(data);
      let document = dom.window.document;

      return {
        success: true,
        status: resdata.status,
        profile: document.querySelector(".user-details-container").children[0]
          .children[0].src,
        name: document.querySelector(".user-details-container").children[0]
          .children[1].textContent,
        currentRating: parseInt(
          document.querySelector(".rating-number")?.textContent
        ),
        highestRating: parseInt(
          document
            .querySelector(".rating-number")?.parentNode?.children[4]?.textContent?.split("Rating")[1]
        ),
        countryFlag: document.querySelector(".user-country-flag").src,
        countryName: document.querySelector(".user-country-name").textContent,
        globalRank: parseInt(
          document.querySelector(".rating-ranks")?.children[0]?.children[0]
            ?.children[0]?.children[0]?.innerHTML
        ),
        countryRank: parseInt(
          document.querySelector(".rating-ranks")?.children[0]?.children[1]
            ?.children[0]?.children[0]?.innerHTML
        ),
        stars: document.querySelector(".rating")?.textContent || "unrated",
        heatMap: headMapData,
        ratingData,
      };
    } else {
      return { success: false, status: resdata.status };
    }
  } catch (e) {
    console.log(e);
    return { success: false, status: 404 };
  }
};

const codechefController = async (req, res) => {
  const handle = req.params.id;
  try {
    if (handle === "favicon.ico") {
      return res.send({ success: false, error: 'invalid handle' });
    }

    let userData = await fetchUserData(handle);
    while (userData.status === 429) {
      for (let i = 0; i < 1000000; i++) {}
      userData = await fetchUserData(handle);
    }

    res.send(userData);
  } catch (err) {
    res.status(500).send({ success: false, error: err.message });
  }
};

module.exports = codechefController;
