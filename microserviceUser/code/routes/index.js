import express from "express";
import { createUser, getAllUsers } from "../controllers/UserController.js";
import { getUserWithOrders } from "../controllers/OrderController.js";
import { checkName } from "../middleware/exampleMiddleware.js";
const router = express.Router();

// routes
router.get("/", (req, res) => {
  res.json("hi, I am the Microservice User");
});

router.get("/users", checkName, getAllUsers);
router.post("/users/add", checkName, createUser);

/*
 * Start of Order routes
 */
router.get("/orderByUser", checkName, getUserWithOrders);

export default router;
