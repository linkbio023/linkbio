import { json, urlencoded } from "express";
import helmet from "helmet";
import bodyParser from "body-parser";
import routes from "../routes/index.js";
import config from "../config/index.js";
import { ResponseDTO } from "../DTO/response.js";
import controllers from "../controllers/index.js";

export default async ({ app }) => {
  // Enable Helmet middleware to secure the Express app
  app.use(helmet());

  // Enable rawBody middleware to get raw body of the request for Stripe Webhook (It should be placed before body parser)
  app.use(
    "/api/stripe/server-webhook",
    bodyParser.raw({ type: "application/json", limit: "10kb" }), // Stripe Webhook needs the raw body
    controllers.stripe.handleStripeServerWebhook
  );

  // Enable body parser middleware to parse the request body
  app.use(
    bodyParser.json({
      limit: "10kb",
      type: "application/json",
    })
  );

  // Enable Cross Origin Resource Sharing to all origins by default
  app.use((_req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", config.frontendURL);
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, X-Biolink-Session-ID, stripe-signature"
    );
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
  });

  // Transforms the raw string of req.body into json
  app.use(json());

  app.use(urlencoded({ extended: true }));

  // Load API routes
  app.use(config.api.prefix, routes());

  // Error handling
  app.use((err, _req, res, _next) => {
    const responseDTO = new ResponseDTO()
      .setSuccess(false)
      .setMessage(err.message || "Internal server error")
      .build();

    res.status(err.statusCode || 500).json(responseDTO);
  });
};
