import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
const router = express.Router();

// create a proxy for each microservice
const microserviceMarketProxy = createProxyMiddleware({
  target: 'http://microserviceMarket:3011',
  changeOrigin: true
});
const microserviceUserProxy = createProxyMiddleware({
  target: 'http://microserviceUser:3012',
  changeOrigin: true
});

router.use('/microserviceMarket', microserviceMarketProxy);
router.use('/microserviceUser', microserviceUserProxy);
// router.use('/locations', microserviceProxy);

export default router;
