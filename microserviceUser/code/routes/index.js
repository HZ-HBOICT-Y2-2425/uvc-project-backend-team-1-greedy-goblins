import express from "express";
import { checkName } from "../middleware/exampleMiddleware.js";
const router = express.Router();

// routes
router.get("/", (req, res) => {
  res.json("hi, I am the Microservice User");
});

export default router;