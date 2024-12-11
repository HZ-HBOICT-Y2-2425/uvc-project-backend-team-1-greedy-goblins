import express from "express";
import { generateDiscountCode } from "../controllers/CodeController.js";
import { checkName } from "../middleware/exampleMiddleware.js";
const router = express.Router();

// routes
router.get("/", (req, res) => {
  res.json("hi, I am the Microservice Card");
});

router.post("/getCode", checkName, generateDiscountCode);
export default router;
