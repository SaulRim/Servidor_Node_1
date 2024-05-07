import express from 'express';
import getRouters from './routes/routes.js';
import {dirname,join} from 'path';
import {fileURLToPath} from 'url';


const server = express();
server.set('appName', 'API Minecraft');
server.set('port',3000)


// Ejs
const __dirname = dirname(fileURLToPath(import.meta.url)); 
server.set('views', join(__dirname,'views')); 
server.set('view engine','ejs'); // establece las vistas

server.use(express.static(join(__dirname,'public')));

server.use(express.json());
server.use(getRouters);

server.listen(process.env.PORT || server.get('port'));
console.log("Server active: " + server.get('appName'));