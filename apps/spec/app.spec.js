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
          .get("/api/topics")
          .expect(200)
          .then(response => {
            expect(response.body[0]).to.contain.keys("slug", "description");
          });
      });
      it("GET 200 and returns the requested slug", () => {
        return request(app)
          .get("/api/topics?slug=paper")
          .expect(200)
          .then(response => {
            expect(response.body[0]).to.eql({
              slug: "paper",
              description: "what books are made of"
            });
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
    describe("GET array of articles", () => {
      it("200 status, returns all articles from the author and topic requested with the correct keys", () => {
        return request(app)
          .get("/api/articles?author=butter_bridge&topic=mitch")
          .expect(200)
          .then(response => {
            expect(response.body[0]).to.contain.keys(
              "author",
              "title",
              "article_id",
              "topic",
              "created_at",
              "votes",
              "comment_count"
            );
          });
      });
      it("200 status and returns an array of articles sorted by date in descending order by default", () => {
        return request(app)
          .get("/api/articles?author=butter_bridge&topic=mitch")
          .expect(200)
          .then(response => {
            expect(response.body).to.be.sortedBy("created_at", {
              descending: true
            });
          });
      });
      it("200 status and returns an array of sorted articles as per client request", () => {
        return request(app)
          .get(
            "/api/articles?author=butter_bridge&topic=mitch&sort_by=votes&sort_order=asc"
          )
          .expect(200)
          .then(response => {
            expect(response.body).to.be.sortedBy("votes", { ascending: true });
          });
      });
      it("200 when passing a non valid username but a valid topic, will respond with an array of all articles for the requested topic", () => {
        return request(app)
          .get("/api/articles?author=butterbri&topic=mitch")
          .expect(200)
          .then(response => {
            expect(response.body).to.be.an("array");
            expect(response.body[0]).to.contain.keys(
              "author",
              "title",
              "article_id",
              "topic",
              "created_at",
              "votes",
              "comment_count"
            );
          });
      });
      it("returns an empty array when passed a correct topic with no articles", () => {
        return request(app)
          .get("/api/articles?topic=paper")
          .expect(200)
          .then(response => {
            expect(response.body).to.eql([]);
          });
      });
    });
  });

  describe("/Comments", () => {
    describe("PATCH", () => {
      it("PATCH 200, updates the comment_vote and returns the updated comment", () => {
        return request(app)
          .patch("/api/comments/10")
          .send({ inc_votes: 2 })
          .expect(200)
          .then(({ body }) => {
            expect(body).to.contain.keys(
              "comment_id",
              "author",
              "article_id",
              "votes",
              "created_at",
              "body"
            );
            expect(body.votes).to.equal(2);
          });
      });
    });
    describe("DELETE", () => {
      it("204, deletes a treasure from the database given a treasure id", () => {
        return request(app)
          .delete("/api/comments/10")
          .expect(204);
      });
    });
  });

  describe("ERROR", () => {
    it("Topics status:405", () => {
      const invalidMethods = ["patch", "post", "put", "delete"];
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

    it("Users status:405", () => {
      const invalidMethods = ["patch", "post", "put", "delete"];
      const methodPromises = invalidMethods.map(method => {
        return request(app)
          [method]("/api/users/butterbridge")
          .expect(405)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal("method not allowed");
          });
      });
      return Promise.all(methodPromises);
    });
    it("GET user 404 status when the requested username does not exist", () => {
      return request(app)
        .get("/api/users/butterbridge")
        .expect(404)
        .then(response => {
          expect(response.text).to.equal("Request not found");
        });
    });
    it("Articles by id status:405", () => {
      const invalidMethods = ["post", "put", "delete"];
      const methodPromises = invalidMethods.map(method => {
        return request(app)
          [method]("/api/users/butterbridge")
          .expect(405)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal("method not allowed");
          });
      });
      return Promise.all(methodPromises);
    });
    it("GET article by article_id 404 status when the requested id does not exist", () => {
      return request(app)
        .get("/api/articles/11111110000")
        .expect(404)
        .then(response => {
          expect(response.text).to.equal("Request not found");
        });
    });
    it("GET article by article_id 400 status when the param requested is not valid", () => {
      return request(app)
        .get("/api/articles/hi")
        .expect(400)
        .then(response => {
          expect(response.error.text).to.equal(
            ' invalid input syntax for integer: "hi"'
          );
        });
    });
    it("PATCH articles 400 status when trying to modify an incorrect value", () => {
      return request(app)
        .patch("/api/articles/10")
        .send({ inc_votes: true })
        .expect(400)
        .then(response => {
          expect(response.text).to.equal("Incorrect value");
        });
    });
    it("PATCH articles 400 status when trying to modify an incorrect body", () => {
      return request(app)
        .patch("/api/comments/1")
        .send({ 454: 1 })
        .expect(400)
        .then(response => {
          expect(response.text).to.equal("Incorrect value");
        });
    });
    it("Comments by articles_id status:405", () => {
      const invalidMethods = ["put", "patch", "delete"];
      const methodPromises = invalidMethods.map(method => {
        return request(app)
          [method]("/api/articles/10/comments")
          .expect(405)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal("method not allowed");
          });
      });
      return Promise.all(methodPromises);
    });
    it("POST a comment by article_id 400 status when trying to post an incorrect body", () => {
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
    it("POST a comment by article_id 400 status when posting a value of incorrect type", () => {
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

    it("GET comments by article_id 400 status when sortBy and invalid column", () => {
      return request(app)
        .get("/api/articles/1/comments?sort_by=invalid")
        .expect(400)
        .then(response => {
          expect(response.error.text).to.eql(
            ' column "invalid" does not exist'
          );
        });
    });
    it("GET comments by article_id 400 status when sortBy and invalid column", () => {
      return request(app)
        .get("/api/articles/1/comments?sort_by=3")
        .expect(400)
        .then(response => {
          expect(response.error.text).to.eql(' column "3" does not exist');
        });
    });
    it("Articles by articles_id with queries status:405", () => {
      const invalidMethods = ["put", "patch", "post", "delete"];
      const methodPromises = invalidMethods.map(method => {
        return request(app)
          [method]("/api/articles?username=rogersop&topic=mitch")
          .expect(405)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal("method not allowed");
          });
      });
      return Promise.all(methodPromises);
    });
    it("GET articles 404 when passing a non valid query", () => {
      return request(app)
        .get("/api/articles?username=rogersop&topic=5555")
        .expect(404)
        .then(response => {
          expect(response.text).to.eql("Request not found");
        });
    });
    it("GET articles 404 when passing a non existing topic", () => {
      return request(app)
        .get("/api/articles?username=r&topic=5555")
        .expect(404)
        .then(response => {
          console.log(response.body);
          expect(response.text).to.eql("Request not found");
        });
    });
    it("GET articles 400 status when sortBy and invalid column", () => {
      return request(app)
        .get(
          "/api/articles?author=butter_bridge&topic=mitch&sort_by=5555&sort_order=asc"
        )
        .expect(400)
        .then(response => {
          expect(response.error.text).to.eql(' column "5555" does not exist');
        });
    });
    it("PATCH comment 400 status when trying to modify an incorrect value", () => {
      return request(app)
        .patch("/api/comments/1")
        .send({ inc_votes: true })
        .expect(400)
        .then(response => {
          expect(response.text).to.equal("Incorrect value");
        });
    });
    it("PATCH comment 400 status when trying to modify an incorrect body", () => {
      return request(app)
        .patch("/api/comments/1")
        .send({ 454: 1 })
        .expect(400)
        .then(response => {
          expect(response.text).to.equal("Incorrect value");
        });
    });
    it("PATCH comment 404 status when trying to modify a non existing comment", () => {
      return request(app)
        .patch("/api/comments/500000")
        .send({ inc_votes: 2 })
        .expect(404)
        .then(response => {
          expect(response.text).to.equal("Request not found");
        });
    });
    it("DELETE comment 404 status when the comment id provided does not exist", () => {
      return request(app)
        .delete("/api/comments/1545450")
        .expect(404)
        .then(response => {
          expect(response.text).to.equal("Request not found");
        });
    });
  });
});
