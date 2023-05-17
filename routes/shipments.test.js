"use strict";

const shipItApi = require("../shipItApi")
shipItApi.shipProduct = jest.fn()

const request = require("supertest");
const app = require("../app");

describe("POST /", function () {
  test("valid", async function () {
    shipItApi.shipProduct.mockReturnValue(9119)

    const resp = await request(app).post("/shipments").send({
      productId: 1000,
      name: "Test Tester",
      addr: "100 Test St",
      zip: "12345-6789",
    });

    expect(resp.body).toEqual({ shipped: 9119 });
  });

  test("throws error if empty request body", async function () {
    const resp = await request(app)
      .post("/shipments")
      .send();
    expect(resp.statusCode).toEqual(400);
  });
});
