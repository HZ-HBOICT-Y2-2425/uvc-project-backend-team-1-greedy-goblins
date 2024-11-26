import { JSONFilePreset } from "lowdb/node";

const defaultData = {
  meta: { tile: "List of locations", date: "November 2024" },
  locations: [],
  MarketLocation: [],
};
const db = await JSONFilePreset("location.json", defaultData);
const locations = db.data.locations;

export async function GetLocations(req, res) {
  res.status(200).send(locations);
}

export async function AddLocation(req, res) {
  let id = parseInt(req.query.id);
  let name = req.query.Name;

  if (!id || !name) {
    return res.status(400).send("LocationID and Name are required.");
  }

  let existingLocation = locations.find(
    (location) => location.LocationID === id
  );
  if (existingLocation) {
    return res.status(409).send(`location with ID ${id} already exists.`);
  }

  let newLocation = {
    LocationID: id,
    Name: name,
  };

  locations.push(newLocation);
  await db.write();

  res.status(201).send(`Added location: ${JSON.stringify(newLocation)}`);
}

export async function FetchLocationById(req, res) {
  let id = parseInt(req.params.id);
  let location = locations.find((location) => location.locationID === id);

  if (location) {
    res.status(200).send(location);
  } else {
    res.status(404).send("location not found");
  }
}

// delete the location by id
export async function deleteLocations(req, res) {
  let id = parseInt(req.params.id);
  let locationIndex = locations.findIndex(
    (location) => location.locationID === id
  );

  if (locationIndex !== -1) {
    locations.splice(locationIndex, 1);
    await db.write();
    res.status(200).send(`deleted location with ID ${id}`);
  } else {
    res.status(404).send(`cannot find ID ${id}`);
  }
}

// update the location of the market by using the following param in postman
//
// name | UpdatedName
export async function updateLocation(req, res) {
  let id = parseInt(req.params.id);
  let name = req.query.name;

  if (!id || !name) {
    return res.status(400).send(`ID and/or name are required inputs`);
  }

  let existingLocation = locations.find(
    (location) => location.LocationID === id
  );

  if (!existingLocation) {
    return res.status(404).send(`No location found with ID ${id}`);
  }

  existingLocation.Name = name;
  await db.write();

  return res.status(200).json({
    message: "Location updated successfully",
    location: existingLocation,
  });
}
