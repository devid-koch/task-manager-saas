import request from "supertest";
import app from "../src/app"; // Assuming you export your Express app from app.ts

describe("User Controller", () => {
  let userId: string;
  describe("POST /users", () => {
    it("should create a user successfully", async () => {
      const response = await request(app)
        .post("/users")
        .send({ name: "John Doe", email: "john@example.com" });

      userId = response.body.result.id;

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("User created successfully");
      expect(response.body.result.id).toBe(userId);
      expect(response.body.result.name).toBe("John Doe");
      expect(response.body.result.email).toBe("john@example.com");
    });

    it("should return a 400 error if name is missing", async () => {
      const response = await request(app)
        .post("/users")
        .send({ email: "john@example.com" });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe("name is required field.");
    });

    it("should return a 400 error if email is missing", async () => {
      const response = await request(app)
        .post("/users")
        .send({ name: "John Doe" });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe("email is required field.");
    });

    it("should return a 400 error if both name and email are missing", async () => {
      const response = await request(app).post("/users").send({});

      expect(response.status).toBe(400);
      expect(response.body.error).toBe("name, email are required fields.");
    });
  });
});
