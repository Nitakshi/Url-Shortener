import express from "express";
import urlRoute from "./routes/url.js";
import { connectDB } from "./connect.js";
import URL from "./model/url.js";
import path from "path";
import { fileURLToPath } from "url";
import staticRoute from "./routes/staticRouter.js";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

await connectDB();

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

app.use("/url", urlRoute);
app.use("/", staticRoute);
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

const PORT = process.env.PORT || 8001;
if (process.env.VERCEL !== "1") {
  app.listen(PORT, () => { console.log(`Server started at port: ${PORT}`); });
}

export default app;