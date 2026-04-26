import express from "express";
import URL from "../model/url.js";
import { handleGenerateNewShortURL, handleGetAnalytics } from "../controller/url.js";
const router = express.Router();

router.post("/", handleGenerateNewShortURL);
router.get('/analytics/:shortId', handleGetAnalytics);
export default router;