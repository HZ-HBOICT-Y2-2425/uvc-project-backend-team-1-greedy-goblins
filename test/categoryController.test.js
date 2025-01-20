// test/categoryController.test.js
const request = require("supertest");
const express = require("express");
const app = express();
app.use(express.json());

// Import the mock version of the controller
const {
  createCategory,
  getCategories,
  getCategory,
  deleteCategory,
  updateCategory,
} = require("./categoryController"); // This points to the new test version in the test folder

// Set up routes to use the mock controller
app.post("/categories", createCategory);
app.get("/categories", getCategories);
app.get("/categories/:id", getCategory);
app.delete("/categories/:id", deleteCategory);
app.put("/categories/:id", updateCategory);

// Tests
describe("Category Controller", () => {
  it("should create a category", async () => {
    const response = await request(app)
      .post("/categories")
      .send({ name: "New Category" });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe("New Category");
  });

  it("should fetch all categories", async () => {
    const response = await request(app).get("/categories");

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0]).toHaveProperty("name");
  });

  it("should fetch a single category by ID", async () => {
    const response = await request(app).get("/categories/1");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", "1");
    expect(response.body.name).toBe("Category 1");
  });

  it("should delete a category by ID", async () => {
    const response = await request(app).delete("/categories/1");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Category 1 deleted");
  });

  it("should update a category by ID", async () => {
    const response = await request(app)
      .put("/categories/1")
      .send({ name: "Updated Category" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", "1");
    expect(response.body.name).toBe("Updated Category");
  });
});
