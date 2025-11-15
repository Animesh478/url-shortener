// // import { env } from "../config/env.js";
// // import { dbClient } from "../config/db-client.js";
// import { db } from "../config/db-client.js";

// // const db = dbClient.db(env.MONGODB_DATABASE_NAME);
// // const shortenerCollection = db.collection("urlShortener");

// export const loadLinks = async function () {
//   try {
//     // return await shortenerCollection.find().toArray();
//     const [result] = await db.execute(`select * from short_links`);
//     return result;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const saveLinks = async function (url, shortCode) {
//   // await shortenerCollection.insertOne(link);
//   try {
//     await db.execute(`insert into short_links(short_code, url) values (?, ?)`, [
//       shortCode,
//       url,
//     ]);
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const getLinkByShortCode = async function (shortCode) {
//   // return await shortenerCollection.findOne({ finalShortCode: shortCode });
//   try {
//     const [result] = await db.execute(
//       `select * from short_links where short_code = ?`,
//       [shortCode]
//     );

//     if (result.length > 0) {
//       return result[0];
//     } else {
//       return null;
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };
