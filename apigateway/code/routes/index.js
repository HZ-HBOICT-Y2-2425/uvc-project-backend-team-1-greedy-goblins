import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
const router = express.Router();
import cors from 'cors';
const app = express();

// create a proxy for each microservice
const microserviceProxy = createProxyMiddleware({
  target: 'http://microservice:3011',
  changeOrigin: true
});

router.use('/microservice', microserviceProxy);
app.use(cors());

export default router;
