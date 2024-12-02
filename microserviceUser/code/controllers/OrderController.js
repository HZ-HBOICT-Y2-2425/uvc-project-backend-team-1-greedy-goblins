import { JSONFilePreset } from "lowdb/node";

// Initialize database with default structure
const defaultData = {
  meta: { tile: "List of users", date: "November 2024" },
  users: [],
  orders: [],
};
const db = await JSONFilePreset("users.json", defaultData);
const orders = db.data.orders;

export async function getAllOrders(req, res) {
  return res.status(200).json(orders);
}

export async function createOrder(req, res) {
  let { DiscountCodeID, UserID, Amount, PaymentDate } = req.body;

  if (!UserID || !Amount || !PaymentDate) {
    return res
      .status(400)
      .send(`UserID, Amount, and PaymentDate are required inputs.`);
  }

  let user = db.data.users.find((u) => u.UserID === UserID);

  if (!user) {
    return res.status(404).send(`No user found with ID ${UserID}`);
  }

  let newOrder = {
    OrderID: orders.length + 1,
    DiscountCodeID,
    UserID,
    Amount,
    PaymentDate,
  };

  orders.push(newOrder);
  user.OrderID = newOrder.OrderID; // Link order to user
  await db.write();

  return res.status(201).json({
    message: "Order created successfully",
    order: newOrder,
  });
}

export async function getOrderById(req, res) {
  let id = parseInt(req.params.id);

  if (!id) {
    return res.status(400).send(`Order ID is required.`);
  }

  let order = orders.find((o) => o.OrderID === id);

  if (!order) {
    return res.status(404).send(`No order found with ID ${id}`);
  }

  return res.status(200).json(order);
}
