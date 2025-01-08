import express from "express";
import { generateDiscountCode } from "../controllers/CodeController.js";
import { checkName } from "../middleware/exampleMiddleware.js";
import {
  getCollectieById,
  GetCollecties,
  getKaartById,
  updateCollectie,
  updateKaart
} from "../controllers/CollectieController.js";
const router = express.Router();

// routes
router.get("/", (req, res) => {
  res.json("hi, I am the Microservice Card");
});

router.get("/collecties", checkName, GetCollecties);
router.get("/collecties/:id", checkName, getCollectieById);
router.get("/kaart", checkName, getKaartById);

router.put("/collecties", checkName, updateCollectie);
router.put("/kaart", checkName, updateKaart);

router.post("/getCode", checkName, generateDiscountCode);
export default router;
