/**
 * Server Entry Point
 *
 * This file is responsible for bootstrapping the application. It:
 * - Loads environment variables using dotenv.
 * - Imports and configures the Express app.
 * - Starts the HTTP server on the configured port.
 */

import app from './app.js';              // Import the Express application instance
import dotenv from 'dotenv';             // Load environment variables from a .env file
import logger from './utils/logger.js';  // Custom logger for logging server events

// Load environment variables into process.env
dotenv.config();

// Set the server port from the environment variable or use a default value (3000)
const PORT = process.env.PORT || 3000;

// Start the server and log a message indicating the port the server is listening on
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});