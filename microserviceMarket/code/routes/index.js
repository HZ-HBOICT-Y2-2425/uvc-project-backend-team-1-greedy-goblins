import express from "express";
import {
  GetCategorys,
  AddCategory,
  getCategoryById,
  deleteCategory,
  updateCategory,
} from "../controllers/categoryController.js";
import {
  GetLocations,
  FetchLocationById,
  AddLocation,
  deleteLocations,
  updateLocation,
} from "../controllers/locationController.js";
import {
  marketInfo,
  marketInfoList,
  changeBoolean,
} from "../controllers/marketInfoController.js";
import { checkName } from "../middleware/exampleMiddleware.js";

const router = express.Router();

// Root route
router.get("/", (req, res) => {
  res.json("Hi, I am the Microservice Market");
});

// Category routes
router.get("/categories", checkName, GetCategorys); // Meervoud voor consistentie
router.get("/categories/:id", checkName, getCategoryById); // Gebruik enkelvoud en :id
router.post("/categories", checkName, AddCategory); // POST voor toevoegen
router.delete("/categories/:id", checkName, deleteCategory); // DELETE voor verwijderen
router.put("/categories/:id", checkName, updateCategory); // PUT voor updaten

// Location routes
router.get("/locations", checkName, GetLocations);
router.get("/locations/:id", checkName, FetchLocationById);
router.post("/locations", checkName, AddLocation);
router.delete("/locations/:id", checkName, deleteLocations);
router.put("/locations/:id", checkName, updateLocation);

// MarketInfo routes
router.get("/market-info", checkName, marketInfoList); // RESTful: lowercase met koppeltekens
router.get("/market-info/:id", checkName, marketInfo);
router.put("/market-info/:id/boolean", checkName, changeBoolean); // Meer beschrijvende URI

export default router;
