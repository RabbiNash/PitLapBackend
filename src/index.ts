import express from 'express';
import rateLimit from 'express-rate-limit';
import http from 'http';
import bodyParser from 'body-parser';
import compression from 'compression';
import cookieparser from 'cookie-parser';
import cors from 'cors';
import mongoose, { mongo } from 'mongoose';
import router from './router';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../swagger/swagger.config'; 

const app = express();

app.use(cors({
    credentials: false
}));

app.use(compression());
app.use(cookieparser());
app.use(bodyParser.json());

const server = http.createServer(app);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});

dotenv.config();
const MONGO_URI = process.env.MONGO_URI;

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI);
mongoose.connection.on('error', (err) => {
    console.error(err);
    process.exit(1);
});

app.use('/', router())

 