import express from "express";
import {
  createUser,
  getAllUsers,
  getUserWithOrders,
} from "../controllers/UserController.js";
import {
  getAllOrders,
  createOrder,
  getOrderById,
} from "../controllers/OrderController.js";
import { checkName } from "../middleware/exampleMiddleware.js";
const router = express.Router();

// routes
router.get("/", (req, res) => {
  res.json("hi, I am the Microservice User");
});

router.get("/users", checkName, getAllUsers);
router.post("/users", checkName, createUser);
router.get("/orderByUser/:id", checkName, getUserWithOrders);

/*
 * Start of Order routes
 */
router.get("/allOrders", checkName, getAllOrders);
router.get("/order/:id", checkName, getOrderById);
router.post("/order", checkName, createOrder);

export default router;
