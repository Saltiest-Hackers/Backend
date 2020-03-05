const request = require("supertest");
const server = require("./server");

describe("Sample Test", () => {
  it("should test that true === true", () => {
    expect(true).toBe(true);
  });
});

describe("server", function() {
  test("dummy test for server. does it run?", function() {
    expect(true).toBe(true);
  });
});

describe("get home /", () => {
  it("should return 200", async () => {
    const res = await request(server).get("/");
    expect(res.status).toBe(200);
  });

  it("should return a json object", async () => {
    const res = await request(server).get("/");
    expect(res.type).toBe("application/json");
  });
});
