const express = require("express");
const urlRoute = require("./routes/url");
const { connectDB } = require("./connect");
const URL = require("./model/url");
const path = require("path");
const staticRoute = require("./routes/staticRouter");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

connectDB();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/test', async (req, res) => {
    try {
        const allUrls = await URL.find({});
        return res.render("home", { urls: allUrls });
    } catch (err) {
        console.error(err);
        return res.status(500).send("Server error");
    }
});

app.get('/:shortId', async (req, res) => {
    try {
        const shortId = req.params.shortId;
        const entry = await URL.findOneAndUpdate(
            { shortId },
            { $push: { visitHistory: { timeStamp: Date.now() } } }
        );
        if (!entry) return res.status(404).send("Short URL not found");
        res.redirect(entry.redirectURL);
    } catch (err) {
        console.error(err);
        return res.status(500).send("Server error");
    }
});

app.use("/url", urlRoute);
app.use("/", staticRoute);

// module.exports = app;

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => { console.log(`Server started at port: ${PORT}`) });