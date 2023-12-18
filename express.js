import cors from "cors";
import app from "~/server/utils/app";
import router from "~/server/utils/router";

app.use(
  cors({ origin: process.env.FRONTEND_ORIGIN ?? "http://localhost:3000" }),
);
app.use("/api", router);

app.listen(process.env.BACKEND_PORT ?? 4000);
