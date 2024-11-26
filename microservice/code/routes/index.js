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
import { marketInfo } from "../controllers/mainController.js";
import { checkName } from "../middleware/exampleMiddleware.js";
const router = express.Router();

// routes
router.get("/", (req, res) => {
  res.json("hi");
});

// category routes
router.get("/categorys", checkName, GetCategorys);
router.get("/category/:id", checkName, getCategoryById);
router.post("/category/add", checkName, AddCategory);
router.delete("/category/delete/:id", checkName, deleteCategory);
router.put("/category/update/:id", checkName, updateCategory);

// location routes
router.get("/locations", checkName, GetLocations);
router.get("/location/:id", checkName, FetchLocationById);
router.post("/location/add", checkName, AddLocation);
router.delete("/location/delete/:id", checkName, deleteLocations);
router.put("/location/update/:id", checkName, updateLocation);

// main routes
router.get("/MarketInfo/:id", checkName, marketInfo);

export default router;
