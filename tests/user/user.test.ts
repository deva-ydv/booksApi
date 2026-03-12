import request from "supertest";
import app from "../../src/app";
import userModel from "../../src/user/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

jest.mock("../../src/user/userModel");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

describe("User API", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  /*
  REGISTER TESTS
  */

  it("should register a new user", async () => {
    (userModel.findOne as jest.Mock).mockResolvedValue(null);
    (bcrypt.hash as jest.Mock).mockResolvedValue("hashedPassword");
    (userModel.create as jest.Mock).mockResolvedValue({
      _id: "123",
      name: "Deva",
      email: "deva@test.com",
      password: "hashedPassword",
    });
    (jwt.sign as jest.Mock).mockReturnValue("fakeToken");

    const res = await request(app).post("/api/users/register").send({
      name: "Deva",
      email: "deva@test.com",
      password: "123456",
    });

    expect(res.status).toBe(201);
    expect(res.body.accessToken).toBe("fakeToken");
  });

  it("should fail if user already exists", async () => {
    (userModel.findOne as jest.Mock).mockResolvedValue({
      email: "deva@test.com",
    });

    const res = await request(app).post("/api/users/register").send({
      name: "Deva",
      email: "deva@test.com",
      password: "123456",
    });

    expect(res.status).toBe(400);
  });

  /*
  LOGIN TESTS
  */

  it("should login user", async () => {
    (userModel.findOne as jest.Mock).mockResolvedValue({
      _id: "123",
      email: "deva@test.com",
      password: "hashedPassword",
    });
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (jwt.sign as jest.Mock).mockReturnValue("loginToken");

    const res = await request(app).post("/api/users/login").send({
      email: "deva@test.com",
      password: "123456",
    });

    expect(res.status).toBe(201);
    expect(res.body.accessToken).toBe("loginToken");
  });

  it("should fail if user not found", async () => {
    (userModel.findOne as jest.Mock).mockResolvedValue(null);

    const res = await request(app).post("/api/users/login").send({
      email: "wrong@test.com",
      password: "123456",
    });

    expect(res.status).toBe(401);
  });

  it("should fail if password incorrect", async () => {
    (userModel.findOne as jest.Mock).mockResolvedValue({
      _id: "123",
      email: "deva@test.com",
      password: "hashedPassword",
    });
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    const res = await request(app).post("/api/users/login").send({
      email: "deva@test.com",
      password: "wrongpass",
    });

    expect(res.status).toBe(401);
  });
});
