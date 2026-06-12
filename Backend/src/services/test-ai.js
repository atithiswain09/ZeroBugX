const dotenv = require("dotenv");
dotenv.config({ path: "../../.env" });

const main = require("./ai.service");

async function test() {
  try {
    console.log("Testing AI Service...");
    const res = await main("Hello, test prompt", "console.log('hello');");
    console.log("Response:", res);
  } catch (err) {
    console.error("Error catched:", err);
  }
}

test();
