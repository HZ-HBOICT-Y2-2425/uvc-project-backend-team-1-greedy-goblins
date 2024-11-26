import { JSONFilePreset } from "lowdb/node";

const defaultData = {
  meta: { tile: "List of locations", date: "November 2024" },
  locations: [],
  MarketLocation: [],
};
const db = await JSONFilePreset("location.json", defaultData);
const locations = db.data.locations;
const MarketLocation = db.data.MarketLocation;

export async function responseLocation(req, res) {
  res.status(200).send(locations);
}

export async function updateLocation(req, res) {
  let id = parseInt(req.query.id);
  let marketId = parseInt(req.query.MarketID);
  let name = req.query.Name;

  if (!id || !marketId || !name) {
    return res.status(400).send("LocationID, MarketID, and Name are required.");
  }

  let existingLocation = locations.find(
    (location) => location.LocationID === id
  );
  if (existingLocation) {
    return res.status(409).send(`location with ID ${id} already exists.`);
  }

  let newLocation = {
    LocationID: id,
    MarketID: marketId,
    Name: name,
  };

  locations.push(newLocation);
  await db.write();

  res.status(201).send(`Added location: ${JSON.stringify(newLocation)}`);
}

export async function GrabLocation(req, res) {
  let id = parseInt(req.params.id);
  let location = locations.find((location) => location.locationID === id);

  if (location) {
    res.status(200).send(location);
  } else {
    res.status(404).send("location not found");
  }
}
