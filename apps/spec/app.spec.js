process.env.NODE_ENV = "test";
const app = require("../app");
const request = require("supertest");
const connection = require("../../connection");

const chai = require("chai");
const chaiSorted = require("sams-chai-sorted");
const { expect } = chai;

chai.use(chaiSorted);

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
            expect(response.body[0]).to.contain.keys("slug", "description");
          });
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
  });
  describe("/Articles", () => {
    describe("GET Articles", () => {
      it("GET 200, returns an article with author, title, article_id, body, topic, created_at, votes and comment_count", () => {
        return request(app)
          .get("/api/articles/10")
          .expect(200)
          .then(response => {
            expect(response.body).to.contain.keys(
              "author",
              "title",
              "article_id",
              "body",
              "topic",
              "created_at",
              "votes",
              "comment_count"
            );
          });
      });
    });
    describe("PATCH", () => {
      it("PATCH 200, updates the article_vote and returns the updated article", () => {
        return request(app)
          .patch("/api/articles/10")
          .send({ inc_votes: 2 })
          .expect(200)
          .then(({ body }) => {
            expect(body).to.contain.keys(
              "article_id",
              "title",
              "body",
              "votes",
              "topic",
              "author",
              "created_at"
            );
          });
      });
    });
    describe("POST", () => {
      it("POST 201, when adding a new comment and returns the posted comment", () => {
        return request(app)
          .post("/api/articles/10/comments")
          .send({
            username: "butter_bridge",
            body: "This is a Test, I'm testing my post comment"
          })
          .expect(201)
          .then(({ body }) => {
            expect(body.comment).to.contain.keys(
              "comment_id",
              "author",
              "article_id",
              "votes",
              "created_at",
              "body"
            );
          });
      });
    });
    describe("GET comments by article_id", () => {
      it("GET 200 and returns an array of comments for the given article_id", () => {
        return request(app)
          .get("/api/articles/1/comments")
          .expect(200)
          .then(response => {
            expect(response.body[0]).to.contain.keys(
              "comment_id",
              "votes",
              "created_at",
              "author",
              "body"
            );
          });
      });
      it("GET 200 and returns an array of sorted comments by any valid column (defaults to created_at)", () => {
        return request(app)
          .get("/api/articles/1/comments?sort_by=votes")
          .expect(200)
          .then(response => {
            expect(response.body).to.be.sortedBy("votes", { descending: true });
          });
      });
    });
  });

  describe("ERROR", () => {
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
    it("404 status when the requested username does not exist", () => {
      return request(app)
        .get("/api/users/butterbridge")
        .expect(404)
        .then(response => {
          expect(response.status).to.equal(404);
        });
    });
    it("404 status when the requested id does not exist", () => {
      return request(app)
        .get("/api/articles/11111110000")
        .expect(404)
        .then(response => {
          expect(response.status).to.equal(404);
        });
    });
    it("400 status when the param requested is not valid", () => {
      return request(app)
        .get("/api/articles/hi")
        .expect(400)
        .then(response => {
          expect(response.error.text).to.equal(
            ' invalid input syntax for integer: "hi"'
          );
        });
    });
    it("400 status when trying to post an incorrect body", () => {
      return request(app)
        .post("/api/articles/10/comments")
        .send({ username: "luisa" })
        .expect(400)
        .then(response => {
          expect(response.error.text).to.equal(
            ' null value in column "body" violates not'
          );
        });
    });
    it("400 status when posting a value of incorrect type", () => {
      return request(app)
        .post("/api/articles/10/comments")
        .send({ username: "luisa", body: 3 })
        .expect(400)
        .then(response => {
          expect(response.error.text).to.equal(
            ' insert or update on table "Comments" violates foreign key constraint "comments_author_foreign"'
          );
        });
    });
    it("400 status when sortBy and invalid column", () => {
      return request(app)
        .get("/api/articles/1/comments?sort_by=invalid")
        .expect(400)
        .then(response => {
          expect(response.error.text).to.eql(
            ' column "invalid" does not exist'
          );
        });
    });
    it("400 status when sortBy and invalid column", () => {
      return request(app)
        .get("/api/articles/1/comments?sort_by=3")
        .expect(400)
        .then(response => {
          expect(response.error.text).to.eql(' column "3" does not exist');
        });
    });
  });
});
