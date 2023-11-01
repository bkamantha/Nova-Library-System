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

let token; // Declare token at the top of your file

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

describe("Book Routes", () => {
  it("creates a new book in the database", async () => {
    const response = await request(app)
      .post("/book/create")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Moby Dick",
        totalCopies: 10,
      });
    expect(response.status).toBe(201);
    expect(response.body.name).toBe("Moby Dick");
  });

  it("updates a book in the database", async () => {
    let response = await request(app)
      .post("/book/create")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Moby Dick",
        totalCopies: 10,
      });

    const bookId = response.body._id;

    response = await request(app)
      .put("/book/")
      .set("Authorization", `Bearer ${token}`)
      .send({
        id: bookId,
        name: "Updated Book",
        totalCopies: 20,
      });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe("Updated Book");
  });

  it("deletes a book from the database", async () => {
    let response = await request(app)
      .post("/book/create")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Moby Dick",
        totalCopies: 10,
      });

    const bookId = response.body._id;

    response = await request(app)
      .delete(`/book?id=${bookId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it("gets all books from the database", async () => {
    const response = await request(app)
      .get("/book/")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
