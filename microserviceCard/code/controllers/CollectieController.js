import { JSONFilePreset } from "lowdb/node";

const defaultData = {
    meta: { title: "collecties", data: "December 2024"},
    collecties: []
};
const db = await JSONFilePreset("collecties.json", defaultData);
const collecties = db.data.collecties;

export async function GetCollecties(req, res) {
    res.status(200).send(collecties);
}

export async function getCollectieById(req, res) {
    let id = parseInt(req.params.id);
    let collectie = collecties.find((collectie) => collectie.collectieID === id);

    if (collectie) {
        res.status(200).send(collectie);
    } else {
        res.status(404).send("Collectie not found")
    }
}

export async function getKaartById(req, res){
    try {
        let collectieID = parseInt(req.query.collectieID);
        let kaartID = parseInt(req.query.kaartID);

        if (!collectieID || !kaartID) {
            return res.status(400).send("CollectieID and kaartID are required.");
        }

        const collectie = collecties.find((col) => col.collectieID === collectieID);
        console.log("Collectie:" + collectie);
        if (!collectie) {
            return res.status(404).send(`Collectie with ID ${collectieID} not found.`);
        }
        console.log("Hij crasht hierna!");
        console.log("Alles: " + collecties.kaarten);
        console.log("Eentje: " + collecties[0].kaarten);
        const kaart = collecties[collectieID - 1].kaarten.find((card) => card.kaartID === kaartID);
        console.log("Kaart:" + kaart);
        if (!kaart) {
            return res.status(404).send(`kaart with ID ${kaartID} not found in collectieID ${collectieID}.`);
        }

        res.status(200).send(kaart);
    } catch (error) {

        res.status(500).send("Server error");
    }
}

export async function updateCollecties(req, res) {
    let id = parseInt(req.params.id);
    let name = req.query.name;

    if (!id || !name) {
        return res.status(400).send(`ID and/or name are required inputs`);
    }

    let existingCollectie = collecties.find(
        (collectie) => collectie.collectieID === id
    );

    if (!existingCollectie) {
        return res.status(404).send(`No collection found with ID ${id}`);
    }

    existingCollectie.Name = name;
    await db.write();

    return res.status(200).json({
        message: "Collectie updated successfully",
        collecties: existingCollectie,
    });
}
