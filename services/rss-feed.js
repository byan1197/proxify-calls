const { parse } = require("rss-to-json");

const RssFeedHelper = {
  getSoompiFeed: async () => {
    return await parse("https://www.soompi.com/feed").then((rss) => {
      let firstNStories = rss.items.slice(0, 10);
      firstNStories = firstNStories.map((story) => {
        return {
          title: story.title,
        };
      });
      console.log("firstNStories", firstNStories);
      return firstNStories;
    });
  },
};

module.exports = RssFeedHelper;
