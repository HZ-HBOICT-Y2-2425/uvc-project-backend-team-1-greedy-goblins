import { JSONFilePreset } from "lowdb/node";

const locationData = {
  meta: { tile: "List of locations", date: "November 2024" },
  locations: [],
  MarketLocation: [],
};
const locatioDB = await JSONFilePreset("location.json", locationData);
const locations = locatioDB.data.locations;
const MarketLocation = locatioDB.data.MarketLocation;

const categoryData = {
  meta: { tile: "List of categories", date: "November 2024" },
  categorys: [],
  MarketCategory: [],
};
const db = await JSONFilePreset("category.json", categoryData);
const categorys = db.data.categorys;
const MarketCategory = db.data.MarketCategory;

// Function to retrieve all info for the market
export async function marketInfo(req, res) {
  const marketID = parseInt(req.params.id);
  const marketLocationEntry = MarketLocation.find(
    (entry) => entry.MarketID === marketID
  );
  if (!marketLocationEntry) {
    return res.status(404).json({ error: "Market not found" });
  }

  const location = locations.find(
    (loc) => loc.locationID === marketLocationEntry.LocationID
  );
  if (!location) {
    return res.status(404).json({ error: "Location not found for the market" });
  }

  const marketCategories = MarketCategory.filter(
    (entry) => entry.MarketID === marketID
  )
    .map((entry) => entry.CategoryID)
    .map(
      (categoryID) =>
        categorys.find((cat) => cat.CategoryID === categoryID)?.Name
    )
    .filter(Boolean);

  if (marketCategories.length === 0) {
    return res
      .status(404)
      .json({ error: "No categories found for the market" });
  }

  const response = {
    marketID: marketID,
    location: location.Name,
    categories: marketCategories,
  };

  res.json(response);
}
