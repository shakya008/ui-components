'use strict';

const path = require('path');
const express = require('express');
var expressStaticGzip = require("express-static-gzip");

/**
 * Installs routes that serve production-bundled client-side assets.
 * It is set up to allow for HTML5 mode routing (404 -> /dist/index.html).
 * This should be the last router in your express server's chain.
 */
module.exports = (app) => {
  const distPath = path.join(__dirname, '../build');
  const indexFileName = 'index.html';
  app.use("/", expressStaticGzip(distPath,{ enableBrotli: true}));
  app.get('*', function(req, res) {
       res.sendFile(path.join(distPath, indexFileName));
     });
};
