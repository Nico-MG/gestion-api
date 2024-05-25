import { describe, expect, it } from "vitest";
import request from "supertest";
import server from "../src/server.js";

describe("Tests para /user", () => {
	it("get todos los usuarios", async () => {
		const response = await request(server).get("/user");
		expect(response.status).toBe(200);
	});
});
