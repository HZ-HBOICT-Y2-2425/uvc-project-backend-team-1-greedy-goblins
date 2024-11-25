import { JSONFilePreset } from "lowdb/node";

// Read or create db.json
// defaultData specifies the structure of the database
const defaultData = {
  meta: { "tile": "List of categories", "date": "November 2024" },
  categorys: [],
  MarketCategory: []
};
const db = await JSONFilePreset('db.json', defaultData)
const categorys = db.data.categorys
const MarketCategory = db.data.MarketCategory

export async function responseExample(req, res) {
  res.status(200).send(categorys);
}

export async function responseTest(req, res) {
  let marketId = parseInt(req.params.marketId);

  let marketCategories = MarketCategory.filter(market => market.MarketID === marketId);

  if (marketCategories.length === 0) {
    return res.status(404).send('Market category not found');
  }

  let results = marketCategories.map(marketCategory => {
    let category = categorys.find(category => category.CategoryID === marketCategory.CategoryID);
    return {
      ...marketCategory,
      CategoryName: category ? category.Name : 'Category not found'
    };
  });

  res.status(200).send(results);
}
//in postman | id        | 7
//           | MarketID  | 107
//           | Name      | "CategoryName"
//MarketID start met 10 gevolgd door de id dus hier 7

export async function updateCategory(req, res) {
  let id = parseInt(req.query.id);
  let marketId = parseInt(req.query.MarketID);
  let name = req.query.Name;

  if (!id || !marketId || !name) {
    return res.status(400).send("CategoryID, MarketID, and Name are required.");
  }

  let existingCategory = categorys.find(category => category.CategoryID === id);
  if (existingCategory) {
    return res.status(409).send(`Category with ID ${id} already exists.`);
  }

  let newCategory = { 
    CategoryID: id, 
    MarketID: marketId, 
    Name: name 
  };

  categorys.push(newCategory);
  await db.write();

  res.status(201).send(`Added category: ${JSON.stringify(newCategory)}`);
}


export async function getCategoryById(req, res) {
  let id = parseInt(req.params.id);
  let category = categorys.find(category => category.CategoryID === id);

  if (category) {
    res.status(200).send(category);
  } else {
    res.status(404).send('Category not found');
  }
}
