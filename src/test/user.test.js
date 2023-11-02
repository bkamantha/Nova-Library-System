const request = require("supertest");
const config = require("../config");
const mongoose = require("mongoose");
const app = require("../app");

const { URL } = config;

const randomString = () => {
  return Math.random().toString(36).substring(7);
};

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

describe("User Routes", () => {
  const randvalue = randomString();
  it("creates a new user", async () => {
    const response = await request(app)
      .post("/user/create")
      .set("Authorization", `Bearer ${token}`)
      .send({
        userID: `${randvalue}@test.com`,
        name: `${randvalue}User`,
        password: `${randvalue}@123`,
      });
    expect(response.status).toBe(201);
  });

  it("deletes a user", async () => {
    const response = await request(app)
      .delete("/user/")
      .set("Authorization", `Bearer ${token}`)
      .query({
        id: `${randvalue}@test.com`,
      });
    expect(response.status).toBe(200);
  });

  // it("fails to create a new user without a userID", async () => {
  //   const response = await request(app)
  //     .post("/user/create")
  //     .set("Authorization", `Bearer ${token}`)
  //     .send({
  //       name: `${randvalue}User`,
  //       password: `${randvalue}@123`,
  //     });
  //   expect("This should not be reached").toBe(false);
  // });

  // it("fails to delete a user that does not exist", async () => {
  //   const response = await request(app)
  //     .delete("/user/")
  //     .set("Authorization", `Bearer ${token}`)
  //     .query({
  //       id: "nonexistent@test.com",
  //     });
  //   expect(response.status).toBe(404);
  // });
});

afterAll(async () => {
  await mongoose.connection.close();
});
