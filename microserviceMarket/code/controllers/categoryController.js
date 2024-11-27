import { JSONFilePreset } from "lowdb/node";

// Read or create db.json
// defaultData specifies the structure of the database
const defaultData = {
  meta: { tile: "List of categories", date: "November 2024" },
  categorys: [],
  MarketCategory: [],
};
const db = await JSONFilePreset("category.json", defaultData);
const categorys = db.data.categorys;

export async function GetCategorys(req, res) {
  res.status(200).send(categorys);
}

//in postman | id        | 7
//           | Name      | "CategoryName"
//MarketID start met 10 gevolgd door de id dus hier 7

function getNextId() {
  if (categorys.length === 0) {
    return 1;
  }
  const ids = categorys.map(category => category.CategoryID);
  return Math.max(...ids) + 1;
}

export async function AddCategory(req, res) {
  let id = getNextId();
  let name = req.query.Name;

  if (!id || !name) {
    return res.status(400).send("CategoryID and Name are required.");
  }

  let existingCategory = categorys.find(
    (category) => category.CategoryID === id
  );
  if (existingCategory) {
    return res.status(409).send(`Category with ID ${id} already exists.`);
  }

  let newCategory = {
    CategoryID: id,
    Name: name,
  };

  categorys.push(newCategory);
  await db.write();

  res.status(201).send(`Added category: ${JSON.stringify(newCategory)}`);
}

export async function getCategoryById(req, res) {
  let id = parseInt(req.params.id);
  let category = categorys.find((category) => category.CategoryID === id);

  if (category) {
    res.status(200).send(category);
  } else {
    res.status(404).send("Category not found");
  }
}

export async function deleteCategory(req, res) {
  let id = parseInt(req.params.id);
  let categoryIndex = categorys.findIndex(
    (category) => category.CategoryID === id
  );

  if (categoryIndex !== -1) {
    categorys.splice(categoryIndex, 1);
    await db.write();
    res.status(200).send(`deleted category with ID ${id}`);
  } else {
    res.status(404).send(`cannot find ID ${id}`);
  }
}

export async function updateCategory(req, res) {
  let id = parseInt(req.params.id);
  let name = req.query.name;

  if (!id || !name) {
    return res.status(400).send(`ID and/or name are required inputs`);
  }

  let existingCategory = categorys.find(
    (category) => category.CategoryID === id
  );

  if (!existingCategory) {
    return res.status(404).send(`No category found with ID ${id}`);
  }

  existingCategory.Name = name;
  await db.write();

  return res.status(200).json({
    message: "Category updated successfully",
    category: existingCategory,
  });
}
