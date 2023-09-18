import express from "express";
import cors from "cors";
import cookies from "cookie-parser";

import authorizationRouter from "./routes/authorization.js";
import usersRouter from "./routes/users.js";
import filesRouter from "./routes/files.js";

const app = express();
app.use(cookies());
app.use(cors());
app.use(express.json());

app.use("/", authorizationRouter);
app.use("/", usersRouter);
app.use("/files", filesRouter);

app.listen(3000, () => {
  console.log("Server is available in address http://localhost:3000");
});
