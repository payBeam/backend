// import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import { AppError } from "@/utils/AppError";
import YAML from 'yamljs';
import path from "path";
const apiPath = path.resolve(__dirname, './index.yaml');
const api = YAML.load(apiPath);



export function setupSwagger(app: Express) {
    if (!app || typeof app.use !== "function") {
        throw new AppError("Invalid Express instance passed to setupSwagger", 500);
    }
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(api));
}