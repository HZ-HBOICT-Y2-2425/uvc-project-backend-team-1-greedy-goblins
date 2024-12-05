import { JSONFilePreset } from "lowdb/node";

const defaultData = {
  meta: { tile: "List of Products", date: "November 2024" },
  products: [],
};
const db = await JSONFilePreset("products.json", defaultData);
const products = db.data.products;

export async function GetProducts(req, res) {
  res.status(200).send(products);
}

function getNextId() {
  if (products.length === 0) {
    return 1;
  }
  const ids = products.map(product => product.productID);
  return Math.max(...ids) + 1;
}

export async function AddProduct(req, res) {
  let id = getNextId();
  let catId = req.query.categoryID
  let name = req.query.name;
  let price = req.query.price;

  if (!id || !catId || !name || !price) {
    return res
      .status(400)
      .send("ProductID, CategoryID, Name and Description are required.");
  }

  let existingProduct = products.find(
    (product) => product.productID === id
  );
  if (existingProduct) {
    return res.status(409).send(`Product with ID ${id} already exists.`);
  }

  let newProduct = {
    productID: id,
    categoryID: catId,
    name: name,
    price: price,
  };

  products.push(newProduct);
  await db.write();

  res.status(201).send(`Added product: ${JSON.stringify(newProduct)}`);
}

export async function FetchProductById(req, res) {
  let id = parseInt(req.params.id);
  let product = products.find((product) => product.productID === id);

  if (product) {
    res.status(200).send(product);
  } else {
    res.status(404).send("product not found");
  }
}

export async function deleteProduct(req, res) {
  let id = parseInt(req.params.id);
  let productIndex = products.findIndex(
    (product) => product.productID === id
  );

  if (productIndex !== -1) {
    products.splice(productIndex, 1);
    await db.write();
    res.status(200).send(`deleted product with ID ${id}`);
  } else {
    res.status(404).send(`cannot find ID ${id}`);
  }
}

export async function updateProduct(req, res) {
  let id = parseInt(req.params.id);
  let catId = req.query.categoryID
  let name = req.query.name;
  let price = req.query.price;

  if (!id || !catId || !name || !price) {
    return res.status(400).send(`ID and/or name are required inputs`);
  }

  let existingProduct = products.find(
    (product) => product.productID === id
  );

  if (!existingProduct) {
    return res.status(404).send(`No product found with ID "${id}"`);
  }

  existingProduct.productID = id;
  existingProduct.catId = catId;
  existingProduct.name = name;
  existingProduct.price = price;
  await db.write();

  return res.status(200).json({
    message: "Product updated successfully",
    product: existingProduct,
  });


}
