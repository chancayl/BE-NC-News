const { expect } = require("chai");
const {
  formatDates,
  makeRefObj,
  formatComments
} = require("../utils");

describe("formatDates", () => {
  it("returns an empty array when an empty array is provided", () => {
    expect(formatDates([])).to.eql([]);
  });
  it("returns a new array with  timestamp converted into a Javascript date object", () => {
    expect(
      formatDates([
        {
          title: "Living in the shadow of a great man",
          topic: "mitch",
          author: "butter_bridge",
          body: "I find this existence challenging",
          created_at: 1542284514171,
          votes: 100
        }
      ])
    ).to.eql([
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: new Date(1542284514171),
        votes: 100
      }
    ]);
  });
  it("returns a new array with timestamp converted into a Javascript date object", () => {
    const data = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100
      },
      {
        title: "Sony Vaio; or, The Laptop",
        topic: "mitch",
        author: "icellusedkars",
        body:
          "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
        created_at: 1416140514171
      },
      {
        title: "Eight pug gifs that remind me of mitch",
        topic: "mitch",
        author: "icellusedkars",
        body: "some gifs",
        created_at: 1289996514171
      }
    ];
    const copiedData = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100
      },
      {
        title: "Sony Vaio; or, The Laptop",
        topic: "mitch",
        author: "icellusedkars",
        body:
          "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
        created_at: 1416140514171
      },
      {
        title: "Eight pug gifs that remind me of mitch",
        topic: "mitch",
        author: "icellusedkars",
        body: "some gifs",
        created_at: 1289996514171
      }
    ];
    expect(formatDates(data)).to.eql([
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: new Date(1542284514171),
        votes: 100
      },
      {
        title: "Sony Vaio; or, The Laptop",
        topic: "mitch",
        author: "icellusedkars",
        body:
          "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
        created_at: new Date(1416140514171)
      },
      {
        title: "Eight pug gifs that remind me of mitch",
        topic: "mitch",
        author: "icellusedkars",
        body: "some gifs",
        created_at: new Date(1289996514171)
      }
    ]);
    expect(formatDates(data)).to.not.eql(copiedData);
  });
});

describe("makeRefObj", () => {
  it("returns an empty object when an empty array is provided", () => {
    expect(makeRefObj([])).to.eql({});
  });
  it("returns an object reference object. the object must be keyed by each item's title, with the values being each item's corresponding", () => {
    expect(makeRefObj([{ article_id: 1, title: "A" }])).to.eql({ A: 1 });
  });
  it("returns an object reference object. the object must be keyed by each item's title, with the values being each item's corresponding", () => {
    expect(
      makeRefObj([
        { article_id: 1, title: "A" },
        { article_id: 2, title: "B" },
        { article_id: 3, title: "C" }
      ])
    ).to.eql({ A: 1, B: 2, C: 3 });
  });
});

describe("formatComments", () => {
  it("returns an empty object when an empty array is provided", () => {
    expect(formatComments([], [])).to.eql({});
  });
  it("returns a formated comment. Each formatted comment must hasve Its created_by property renamed to an author key Its belongs_to property renamed to an article_id key The value of the new article_id key must be the id corresponding to the original title value provided Its created_at value converted into a javascript date object The rest of the comment's properties must be maintained ", () => {
    const comments = [
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        belongs_to: "They're not exactly dogs, are they?",
        created_by: "butter_bridge",
        votes: 16,
        created_at: 1511354163389
      }
    ];
    const articleRef = { "They're not exactly dogs, are they?": 1 };
    expect(formatComments(comments, articleRef)).to.eql({
      author: "butter_bridge",
      article_id: 1,
      created_at: new Date(1511354163389),
      body:
        "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
      votes: 16
    });
  });
  it("returns a formated comment. Each formatted comment must hasve Its created_by property renamed to an author key Its belongs_to property renamed to an article_id key The value of the new article_id key must be the id corresponding to the original title value provided Its created_at value converted into a javascript date object The rest of the comment's properties must be maintained ", () => {
    const comments = [
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        belongs_to: "They're not exactly dogs, are they?",
        created_by: "butter_bridge",
        votes: 16,
        created_at: 1511354163389
      },
      {
        body: "Test",
        belongs_to: "They're not exactly dogs, are they?",
        created_by: "Test",
        votes: 100,
        created_at: 1511354165555
      }
    ];
    const articleRef = { "They're not exactly dogs, are they?": 1 };
    expect(formatComments(comments, articleRef)).to.eql([
      {
        author: "butter_bridge",
        article_id: 1,
        created_at: new Date(1511354163389),
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        votes: 16
      },
      {
        author: "Test",
        article_id: 1,
        created_at: new Date(1511354165555),
        body: "Test",
        votes: 100
      }
    ]);
  });
});
