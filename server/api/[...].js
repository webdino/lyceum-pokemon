import app from "~/server/utils/app";
import router from "~/server/utils/router";

app.use("/api", router);

export default fromNodeMiddleware(app);
