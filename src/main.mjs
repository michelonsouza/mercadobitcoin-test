import express from "express";

import { router } from "./router.mjs";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/frontend"));

app.use("/", router);

app.listen(3000, () => {
  console.log("App is running on http://localhost:3000");
});
