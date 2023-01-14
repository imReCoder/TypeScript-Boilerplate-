import { UserModule } from './modules/user/index';
import App from './app';
import validateEnv from './lib/utils/validateEnv';
validateEnv();

const app = new App([new UserModule()]);

app.listen();
