const mongoose = require("mongoose");

const RETRY_DELAY_MS = 5000; // Retry every 5 seconds

async function ConnectDB() {
  // 1. Check the environment variable first for early error detection
  if (!process.env.MONGODB_URL) {
    console.error("[DB] MONGODB_URL environment variable is not set. Exiting.");
    process.exit(1);
  }

  while (true) {
    try {
      await mongoose.connect(process.env.MONGODB_URL);
      console.log("[DB] Connected to MongoDB successfully!");
      return; // Exit loop on success
    } catch (err) {
      console.error(`[DB] Connection failed: ${err.message}`);
      console.log(`[DB] Retrying in ${RETRY_DELAY_MS / 1000}s...`);
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
    }
  }
}

// Export the asynchronous function
module.exports = ConnectDB;