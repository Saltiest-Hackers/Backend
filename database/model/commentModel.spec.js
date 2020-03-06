const db = require("../dbConfig");
const Comments = require("../model/commentModel");

describe("commentModel", () => {
  beforeEach(async () => {
    await db("comments").truncate();
  });

  describe("add()", () => {
    it("should insert a new comment", () => {
      Comments.add({
        author: "shakespear",
        comment_text: "test",
        saltiness: 1,
        time: 100,
        user_id: 1
      }).then(comment => {
        expect(comment).toBeTruthy();
        expect(comment.author).toBe("shakespear");
        expect(comment.comment_text).toBe("test");
        expect(comment.saltiness).toBe(1);
        expect(comment.time).toBe(100);
      });
    });
    it("should find all comments", () => {
      Comments.findAll().then(comments => {
        expect(comments.length).toBe(1);
      });
    });

    it("should update a comment", () => {
      Comments.updateComment(1, { comment_text: "updated text" }).then(
        comment => {
          expect(comment.comment_text).toBe("updated text");
        }
      );
    });
  });
});
