import express from "express";
import { createClient } from "redis";

const client = createClient();
const app = express();
app.use(express.json());

app.post("/submit", async (req, res) => {
  const { problemId, userId, code, language } = req.body;
  try {
    await client.lPush(
      "submissions",
      JSON.stringify({ problemId, userId, code, language })
    );
    res.json({ message: "Submitted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to submit" });
  }
});

async function startServer() {
  try {
    await client.connect();
    console.log("Redis Connected");
    app.listen(8000, () => {
      console.log("Server started on 8000");
    });
  } catch (error) {
    console.log("Failed to connect to redis", error);
  }
}
startServer();
