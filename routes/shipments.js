"use strict";

const express = require("express");
const { BadRequestError } = require("../expressError");
const router = new express.Router();
const jsonschema = require("jsonschema");
const orderSchema = require("../schemas/orderschema.json");

const { shipProduct } = require("../shipItApi");

/** POST /ship
 *
 * VShips an order coming from json body:
 *   { productId, name, addr, zip }
 *
 * Returns { shipped: shipId }
 */

router.post("/", async function (req, res, next) {
  const { productId, name, addr, zip } = req.body;

  const order = jsonschema.validate(
    req.body, orderSchema, { required: true });
  if (!order.valid) {
    const errs = order.errors.map(err => err.stack);
    throw new BadRequestError(errs);
  }

  const shipId = await shipProduct({ productId, name, addr, zip });
  return res.json({ shipped: shipId });


});



module.exports = router;