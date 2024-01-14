const User = require("../models/userModel");
const UserController = require("../controllers/userController");
const jwt = require("jsonwebtoken");

beforeEach(() => {
    jest.mock("../models/userModel");
});

describe("UserController", () => {
    test("Should register a user", async () => {
        jest.spyOn(User.prototype, "save").mockResolvedValue({
            email: "email1",
            password: "password1",
        });

        const req = {
            body: {
                email: "email1",
                password: "password1",
            },
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await UserController.userRegister(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            message: `Utilisateur crée: ${req.body.email}`,
        });
    });
    test("Should login a user", async () => {
        const user = {
            _id: "5e7d0f7e4f6edf3b7c4a3e0f",
            email: "email1",
            password: "password1",
        };

        jest.spyOn(User, "findOne").mockResolvedValue(user);

        jest.spyOn(jwt, "sign").mockResolvedValue("token");

        const req = {
            body: {
                email: "email1",
                password: "password1",
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await UserController.userLogin(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ token: "token" });
    });
});