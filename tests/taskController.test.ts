import request from "supertest";
import app from "../src/app"; // Assuming you export your Express app from app.ts

describe("Task Controller", () => {
  let userId: string;

  beforeAll(async () => {
    const response = await request(app)
      .post("/users")
      .send({ name: "Jane Doe", email: "jane@example.com" });
    userId = response.body.result.id;
  });

  describe("POST /users/:user_id/tasks", () => {
    it("should create a task successfully", async () => {
      const response = await request(app).post(`/users/${userId}/tasks`).send({
        title: "Test Task",
        description: "This is a test task",
        status: "To Do",
        dueDate: "2024-12-31",
      });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Task created successfully");
    });

    it("should return a 400 error if title is missing", async () => {
      const response = await request(app).post(`/users/${userId}/tasks`).send({
        description: "This is a test task",
        status: "To Do",
        dueDate: "2024-12-31",
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error", "title is required field.");
    });
  });

  describe("GET /users/:user_id/tasks", () => {
    it("should list tasks successfully", async () => {
      const response = await request(app).get(`/users/${userId}/tasks`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Task Lists");

      expect(Array.isArray(response.body.result.value)).toBe(true);

      const task = response.body.result.value[0];
      expect(task.title).toBe("Test Task");
      expect(task.description).toBe("This is a test task");
      expect(task.status).toBe("To Do");
      expect(task.dueDate).toBe("2024-12-31T00:00:00.000Z");

      expect(Array.isArray(response.body.result.value)).toBe(true);
    });
  });

  describe("GET /users/:user_id/tasks/:task_id", () => {
    let taskId: string;

    beforeAll(async () => {
      const response = await request(app).post(`/users/${userId}/tasks`).send({
        title: "Test Task",
        description: "This is a test task",
        status: "To Do",
        dueDate: "2024-12-31",
      });
      const getResponse = await request(app).get(`/users/${userId}/tasks`);
      expect(Array.isArray(getResponse.body.result.value)).toBe(true);

      const task = getResponse.body.result.value[0];
      taskId = task.id;
    });

    it("should get a task by id successfully", async () => {
      const response = await request(app).get(
        `/users/${userId}/tasks/${taskId}`
      );

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Task By Id");
      expect(response.body).toHaveProperty("result");
      expect(response.body.result).toHaveProperty("value");

      const task = response.body.result.value;
      expect(task).toHaveProperty("id", taskId);
      expect(task).toHaveProperty("title", "Test Task");
      expect(task).toHaveProperty("description", "This is a test task");
      expect(task).toHaveProperty("status", "To Do");
      expect(task).toHaveProperty("dueDate", "2024-12-31T00:00:00.000Z");
    });
  });

  describe("PUT /users/:user_id/tasks/:task_id", () => {
    let taskId: string;

    beforeAll(async () => {
      const response = await request(app).post(`/users/${userId}/tasks`).send({
        title: "Task for Update",
        description: "Task description",
        status: "To Do",
        dueDate: "2024-12-31",
      });
      const getResponse = await request(app).get(`/users/${userId}/tasks`);
      expect(Array.isArray(getResponse.body.result.value)).toBe(true);

      const task = getResponse.body.result.value[0];
      taskId = task.id;
    });

    it("should update a task successfully", async () => {
      const response = await request(app)
        .put(`/users/${userId}/tasks/${taskId}`)
        .send({
          title: "Updated Task",
          description: "Updated description",
          status: "Done",
          dueDate: "2024-11-30",
        });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Task updated successfully");
      expect(response.body).toHaveProperty("result");

      const task = response.body.result;

      expect(task).toHaveProperty("id", taskId);
      expect(task).toHaveProperty("title", "Updated Task");
      expect(task).toHaveProperty("description", "Updated description");
      expect(task).toHaveProperty("status", "Done");
      expect(new Date(task.dueDate).toISOString()).toBe(
        new Date("2024-11-30").toISOString()
      );
    });
  });

  describe("DELETE /users/:user_id/tasks/:task_id", () => {
    let taskId: string;

    beforeAll(async () => {
      const response = await request(app).post(`/users/${userId}/tasks`).send({
        title: "Task for Delete",
        description: "Task description",
        status: "To Do",
        dueDate: "2024-12-31",
      });
      taskId = response.body.id;
    });

    it("should delete a task successfully", async () => {
      const response = await request(app).delete(
        `/users/${userId}/tasks/${taskId}`
      );

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Task Deleted successfully");
    });
  });
});
