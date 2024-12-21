import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectToDatabase } from "./database";
import { employeeRouter } from "./employee.routes";

// Load environment variables from the .env file, where the ATLAS_URI is configured
dotenv.config();
 const username = "maheshpulivarthi18";
 const password = encodeURIComponent("Mahesh@11066"); // URL-encode the password
 const cluster = "cluster0.zjpnr.mongodb.net";
const dbName = "valuefy"; // Replace with your actual database name
const ATLAS_URI  =`mongodb+srv://${username}:${password}@${cluster}/${dbName}?retryWrites=true&w=majority` ;

if (!ATLAS_URI) {
  console.error(
    "No ATLAS_URI environment variable has been defined in config.env"
  );
  process.exit(1);
}

connectToDatabase(ATLAS_URI)
  .then(() => {
    const app = express();
    app.use(cors());
    app.use("/employees", employeeRouter);

    // start the Express server
    app.listen(5200, () => {
      console.log(`Server running at http://localhost:5200...`);
    });
  })
  .catch((error) => console.error(error));
