process.env.PORT = 8001;

const request = require("supertest");
const expect = require("chai").expect;
const app = require("../server/index.js");

describe("API server tests", () => {
  describe("GET /items/:id", () => {
    it("should fetch the item with the specified ID", (done) => {
      request(app)
        .get("/items/1")
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property("id");
          expect(res.body.id).to.equal(1);
          done();
        });
    });
  });

  describe("GET /items", () => {
    it("should fetch all items", (done) => {
      request(app)
        .get("/items")
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.be.an("array");
          done();
        });
    });
  });

  describe("POST /items", () => {
    it("should add a new item", (done) => {
      const newItem = {
        name: "Test Item",
        description: "This is a test item",
      };

      request(app)
        .post("/items")
        .send(newItem)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message).to.equal(
            "Received your POST request. A new item has been inserted into the database."
          );
          done();
        });
    });
  });
});
