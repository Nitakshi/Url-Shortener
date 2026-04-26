const { nanoid } = require("nanoid");
const URL = require("../model/url");

async function handleGenerateNewShortURL(req, res) {
    try {
        const body = req.body;
        if (!body.url) return res.status(400).json({ err: "URL is required" });

        const shortId = nanoid(8);
        await URL.create({
            shortId,
            redirectURL: body.url,
            visitHistory: [],
        });

        return res.render("home", { id: shortId });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ err: "Server error" });
    }
}

async function handleGetAnalytics(req, res) {
    try {
        const shortId = req.params.shortId;
        const result = await URL.findOne({ shortId });

        if (!result) return res.status(404).json({ err: "Short URL not found" });

        return res.json({
            totalClicks: result.visitHistory.length,
            analytics: result.visitHistory,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ err: "Server error" });
    }
}

module.exports = { handleGenerateNewShortURL, handleGetAnalytics };