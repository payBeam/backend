import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import {AppError} from "@/utils/AppError";

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "PayBeam API",
            version: "1.0.0",
            description: "API documentation for PayBeam",
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Local server",
            },
            {
                url: "http://localhost:5000",
                description: "Docker Container",
            },
        ],
    },
    apis: ["src/routes/*.ts"], // Load route definitions from your files
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export function setupSwagger(app: Express) {
    if (!app || typeof app.use !== "function") {
        throw new AppError("Invalid Express instance passed to setupSwagger", 500);
    }
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}