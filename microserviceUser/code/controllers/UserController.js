import { JSONFilePreset } from "lowdb/node";

// Initialize database with default structure
const defaultData = {
  meta: { tile: "List of users", date: "November 2024" },
  Users: [],
  Orders: [],
};
const db = await JSONFilePreset("users.json", defaultData);
const users = db.data.Users;

export async function getAllUsers(req, res) {
  return res.status(200).json(users);
}
/*
 * Create a new user (if we want to inplement this)
 */
export async function createUser(req, res) {
  let { Username, Email, Password } = req.body;

  if (!Username || !Email || !Password) {
    return res
      .status(400)
      .send(`Username, Email, and Password are required inputs.`);
  }

  let newUser = {
    UserID: users.length + 1,
    Username,
    Email,
    Password,
    OrderID: null, // No Orders yet
  };

  users.push(newUser);
  await db.write();

  return res.status(201).json({
    message: "User created successfully",
    user: newUser,
  });
}

export async function getUserWithOrders(req, res) {
  let id = parseInt(req.params.id);

  if (!id) {
    return res.status(400).send(`User ID is required.`);
  }

  let user = users.find((u) => u.UserID === id);

  if (!user) {
    return res.status(404).send(`No user found with ID ${id}`);
  }

  let userOrders = db.data.Orders.filter((o) => o.UserID === id);

  return res.status(200).json({
    ...user,
    Orders: userOrders,
  });
}
