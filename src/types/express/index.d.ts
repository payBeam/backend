import { User, Merchant } from "@prisma/client";

declare global {
    namespace Express {
        interface Request {
            user?: User;
            merchant?: Merchant;
        }
    }
}
export { };