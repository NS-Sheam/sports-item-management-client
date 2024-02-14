import { createBrowserRouter } from "react-router-dom";
import { routesGenerator } from "../utils/routesGenerator";
import { routeItems } from "./routes.const";

const router = createBrowserRouter(routesGenerator(routeItems));

export default router;
