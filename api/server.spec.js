const db = require("../database/dbConfig");
const Users = require("../database/model/userModel");
const request = require("supertest");
const server = require("./server");

describe("unit-testing", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });
  describe("userModel", () => {
    describe("insert()", () => {
      it("should insert a new user", async () => {
        const user = await Users.add({
          username: "testuser",
          password: "test"
        });
        expect(user).toBeTruthy();
        expect(user.username).toBe("testuser");
      });
    });
  });

  describe("server", function() {
    describe("userRouter", () => {
      it("should register a user", () => {
        return request(server)
          .post("/api/user/register")
          .send({
            username: "Brad",
            password: "Sonoma"
          })
          .expect(201);
      });
      it("should return JSON", async () => {
        return request(server)
          .post("/api/user/login")
          .then(res => {
            //check that request returns JSON
            expect(res.type).toMatch(/json/i);
          });
      });
      it("should return 401 when posting invalid credentials", async () => {
        const res = await request(server)
          .post("/api/user/login")
          .send({
            username: "testuser",
            password: "wrongpassword"
          });
        expect(res.status).toBe(401);
      });
      it("should return 200 when posting valid credentials", async () => {
        request(server)
          .post("/api/user/register")
          .send({
            username: "Brad",
            password: "Sonoma"
          })
          .then(async () => {
            const res = await request(server)
              .post("/api/user/login")
              .send({
                username: "Brad",
                password: "Sonoma"
              });
            expect(res.status).toEqual(200);
          });
      });
    });
  });
});
