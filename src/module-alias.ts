import 'module-alias/register';
import { addAliases } from 'module-alias';

// Add aliases for paths defined in tsconfig.json
addAliases({
    '@': __dirname,
});