import { join, resolve } from "node:path";
import express from "express";

const __dirname = resolve();

const router = express.Router();

router.get("/registration", (req, res) => {
  return res.sendFile(join(__dirname, "src", "frontend", "index.html"));
});

router.post("/registration", (req, res) => {
  console.log({ body: req.body });
  return res.json({ res: "deu boa" });
});

export { router };
