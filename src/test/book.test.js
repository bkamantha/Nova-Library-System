const request = require("supertest");
const config = require("../config");
const mongoose = require("mongoose");
const app = require("../app");

const { URL } = config;

describe("Book Routes", () => {
  beforeAll(async () => {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  it("creates a new book in the database", async () => {
    const response = await request(app).post("/book/create").send({
      name: "Moby Dick",
      totalCopies: 10,
    });
    expect(response.status).toBe(201);
    expect(response.body.name).toBe("Moby Dick");
  });

  it("updates a book in the database", async () => {
    let response = await request(app).post("/book/create").send({
      name: "Moby Dick",
      totalCopies: 10,
    });

    const bookId = response.body._id;

    response = await request(app).put("/book/").send({
      id: bookId,
      name: "Updated Book",
      totalCopies: 20,
    });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe("Updated Book");
  });

  it("deletes a book from the database", async () => {
    let response = await request(app).post("/book/create").send({
      name: "Moby Dick",
      totalCopies: 10,
    });

    const bookId = response.body._id;

    response = await request(app).delete(`/book?id=${bookId}`);

    expect(response.status).toBe(200);
  });

  it("gets all books from the database", async () => {
    const response = await request(app).get("/book/");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
