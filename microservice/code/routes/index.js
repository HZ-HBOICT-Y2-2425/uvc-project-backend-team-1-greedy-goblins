import express from "express";
import {
  responseExample,
  updateCategory,
  getCategoryById,
  responseTest,
} from "../controllers/categoryController.js";
import {
  responseLocation,
  FetchLocationById,
} from "../controllers/locationController.js";
import { marketInfo, marketInfoList } from "../controllers/marketInfoController.js";
import { checkName } from "../middleware/exampleMiddleware.js";
const router = express.Router();

// routes
router.get("/", (req, res) => {
  res.json("hi");
});

// category routes
router.get("/category", checkName, responseExample);
router.post("/updateCategory", checkName, updateCategory);
router.get("/category/:id", checkName, getCategoryById);
router.get("/MarketCategory/:marketId", checkName, responseTest);

// location routes
router.get("/location", checkName, responseLocation);
router.get("/marketLocation/:id", checkName, FetchLocationById);

// marketInfo routes
// Met deze routes roepen we de tabel aan die de info samenvoegt van de markt, locatie en categorie
router.get("/MarketInfo", checkName, marketInfoList);
router.get("/MarketInfo/:id", checkName, marketInfo);

export default router;
