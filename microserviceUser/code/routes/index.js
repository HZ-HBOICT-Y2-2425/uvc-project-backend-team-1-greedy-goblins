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

// Root route
router.get("/", (req, res) => {
  res.json("Hi, I am the Microservice User");
});

// User routes
router.get("/users", checkName, getAllUsers);
router.post("/users", checkName, createUser); // POST zonder /add
router.get("/users/:id/orders", checkName, getUserWithOrders); // Gebruik :id voor dynamische ID en duidelijke route

/*
 * Start of Order routes
 */
router.get("/orders", checkName, getAllOrders); // Meervoud en duidelijker
router.get("/orders/:id", checkName, getOrderById); // Gebruik /orders/:id voor het ophalen van orders
router.post("/orders", checkName, createOrder); // POST zonder /add

export default router;
