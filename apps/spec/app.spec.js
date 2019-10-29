process.env.NODE_ENV = "test";
const app = require("../app");
const request = require("supertest");
const connection = require("../../connection");

const chai = require("chai");
const { expect } = chai;

describe("/api", () => {
  after(() => {
    connection.destroy();
  });
  beforeEach(() => {
    return connection.seed.run();
  });
  describe("/Topics", () => {
    describe("GET", () => {
      it("GET 200 and returns all topics", () => {
        return request(app)
          .get("/api/Topics")
          .expect(200)
          .then(response => {
            // console.log(response.body);
            expect(response.body[0]).to.contain.keys("slug", "description");
          });
      });
    });
    describe("Invalid Methods", () => {
      it("status:405", () => {
        const invalidMethods = ["patch", "put", "delete"];
        const methodPromises = invalidMethods.map(method => {
          return request(app)
            [method]("/api/Topics")
            .expect(405)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal("method not allowed");
            });
        });
        return Promise.all(methodPromises);
      });
    });
  });
  describe("/Users", () => {
    describe("GET", () => {
      it("GET 200, return the requested user with the key username, avatar_url and name", () => {
        return request(app)
          .get("/api/users/butter_bridge")
          .expect(200)
          .then(response => {
            expect(response.body).to.contain.keys(
              "username",
              "avatar_url",
              "name"
            );
          });
      });
    });
    describe('ERROR', () => {
        it("404 status when there is a customer error", () => {
            return request(app)
            .get("/api/users/butterbridge")
            .expect(404)
            .then(({ body}) => {
                console.log(body)
                expect(body).to.equal('Request not found')
            })
        })
    });
  });
});
