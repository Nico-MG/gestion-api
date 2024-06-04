import { PrismaClient } from "@prisma/client";

const db = new PrismaClient()

async function testConnection() {
	try {
		await db.$connect();
		console.log("Connection successful");
	} catch (error) {
		console.error("Connection failed", error);
	} finally {
		await db.$disconnect();
	}
}

testConnection();

export default db;