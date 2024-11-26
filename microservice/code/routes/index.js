import express from "express";
import {
  responseExample,
  updateCategory,
  getCategoryById,
  responseTest,
} from "../controllers/categoryController.js";
import {
  responseLocation,
  GrabLocation,
} from "../controllers/locationController.js";
import { marketInfo } from "../controllers/mainController.js";
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
router.get("/marketLocation/:id", checkName, GrabLocation);

// main routes
router.get("/MarketInfo/:id", checkName, marketInfo);

export default router;
