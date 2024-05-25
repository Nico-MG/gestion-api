import { describe, expect, it } from "vitest";
import request from "supertest";
import server from "../src/server.js";

describe("Tests para /product", () => {
	it("get todos los productos", async () => {
		const response = await request(server).get("/product");
		expect(response.status).toBe(200);
	});
});
