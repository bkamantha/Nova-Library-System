const request = require("supertest");
const config = require("../config");
const mongoose = require("mongoose");
const app = require("../app");

const { URL } = config;

beforeAll(async () => {
  await mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

let token;

beforeAll((done) => {
  request(app)
    .post("/auth/login")
    .send({
      userID: "admin@test.com",
      password: "admin@123",
    })
    .end((err, response) => {
      token = response.body.token;
      done();
    });
});

describe("POST /borrowings", () => {
  it("should borrow a book", async () => {
    const res = await request(app)
      .post("/borrowings/")
      .set("Authorization", `Bearer ${token}`)
      .send({
        userId: "lmn@test.com",
        bookId: "654093c66aeef7064d882cf3",
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("bookName");
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
