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
  GetProducts,
  FetchProductById,
  AddProduct,
  deleteProduct,
  updateProduct,
} from "../controllers/productController.js";
import { marketInfo, marketInfoList } from "../controllers/marketInfoController.js";
import { checkName } from "../middleware/exampleMiddleware.js";
const router = express.Router();

// routes
router.get("/", (req, res) => {
  res.json("hi, I am the Microservice Market");
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

// marketInfo routes
// Met deze routes roepen we de tabel aan die de info samenvoegt van de markt, locatie en categorie
router.get("/MarketInfo", checkName, marketInfoList);
router.get("/MarketInfo/:id", checkName, marketInfo);

// stock (voorraad) routes

// products routes
router.get("/products", checkName, GetProducts);
router.get("/product/:id", checkName, FetchProductById);
router.post("/product/add", checkName, AddProduct);
router.delete("/product/delete/:id", checkName, deleteProduct);
router.put("/product/update/:id", checkName, updateProduct);

export default router;
