import nock from "nock";
import request from "supertest";

import { app } from "../../../app";

describe("prices", () => {
  it("should return name and price", async () => {
    // nock("https://www.alphavantage.co")
    //   .get("/query?function=GLOBAL_QUOTE&symbol=WIX&apikey=OKC0BT76URCJ1QBU")
    //   .reply(200, {
    //     name: "Wix.com Ltd.",
    //     price: 150.5
    //   });

    const { body } = await request(app).get("/api/v1/prices?company=WIX");

    expect(body).toHaveProperty("name");
    expect(body).toHaveProperty("price");
  });

  it("should return Wix company name", async () => {
    const { body } = await request(app).get("/api/v1/prices?company=WIX");

    expect(body.name).toEqual("Wix.com Ltd.");
  });

  it("should return valid price", async () => {
    const { body } = await request(app).get("/api/v1/prices?company=WIX");

    expect(typeof body.price).toBe("number");
    expect(body.price).toBeGreaterThan(0);
  });
});
