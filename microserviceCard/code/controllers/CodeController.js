import { JSONFileSync } from "lowdb/node";
import { nanoid } from "nanoid";

const defaultData = {
  meta: { title: "Discount Codes", date: "December 2024" },
  DiscountCodes: [],
};
const db = new JSONFileSync("discountCode.json", defaultData);
const database = db.read() || defaultData;

if (!database.meta) database.meta = defaultData.meta;
if (!database.DiscountCodes) database.DiscountCodes = defaultData.DiscountCodes;

export async function generateDiscountCode(req, res) {
  const discountCodes = database.DiscountCodes;

  const code = nanoid(18);

  discountCodes.push(code);

  await db.write(database);

  return res
    .status(200)
    .json({ message: "Discount code generated successfully.", code });
}
