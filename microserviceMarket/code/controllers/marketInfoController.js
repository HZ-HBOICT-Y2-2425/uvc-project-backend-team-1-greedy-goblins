import { JSONFilePreset } from "lowdb/node";

const locationData = {
  meta: { tile: "List of all MarketInfo", date: "November 2024" },
  locations: [],
  MarketLocation: [],
};
const locationDB = await JSONFilePreset("location.json", locationData);
const locations = locationDB.data.locations;
const MarketLocation = locationDB.data.MarketLocation;

const categoryData = {
  meta: { tile: "List of categories", date: "November 2024" },
  categorys: [],
  MarketCategory: [],
};
const db = await JSONFilePreset("category.json", categoryData);
const categorys = db.data.categorys;
const MarketCategory = db.data.MarketCategory;

// (Read all items) Function to retrieve all info for all markets
export async function marketInfoList(req, res) {
  const allMarkets = MarketLocation.map((marketLocationEntry) => {
    const location = locations.find(
      (loc) => loc.locationID === marketLocationEntry.LocationID
    );

    if (!location) {
      return null;
    }

    const marketCategories = MarketCategory.filter(
      (entry) => entry.MarketID === marketLocationEntry.MarketID
    )
      .map((entry) => entry.CategoryID)
      .map(
        (categoryID) =>
          categorys.find((cat) => cat.CategoryID === categoryID)?.Name
      )
      .filter(Boolean);

    if (marketCategories.length === 0) {
      return null;
    }

    return {
      marketID: marketLocationEntry.MarketID,
      marketName: location.Name,
      categories: marketCategories,
      description: location.Description,
      marketAdress: location.adress,
      favorite: location.favorite,
    };
  }).filter(Boolean);

  if (allMarkets.length === 0) {
    return res.status(404).json({ error: "No markets found" });
  }

  res.json(allMarkets);
}

// (Read 1 item) Function to retrieve all info for the market
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
    marketName: location.Name,
    marketDesc: location.Description,
    categories: marketCategories,
    marketAdress: location.adress,
    favorite: location.favorite,
  };

  res.json(response);
}

export async function changeBoolean(req, res) {
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

  location.favorite = !location.favorite;
  await locationDB.write();

  res.json({
    message: "Favorite status toggled",
    marketID,
    favorite: location.favorite,
  });
}
