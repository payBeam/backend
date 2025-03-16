import { User } from "@prisma/client";

declare global {
    namespace Express {
        interface User extends User { } // Ensure Express knows about Prisma User type
        interface Request {
            user?: User; // Make sure it includes id
        }
    }
}
