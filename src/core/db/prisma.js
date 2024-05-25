import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
	return new PrismaClient();
};

const globalPrisma = global;

const prisma = globalPrisma.prismaGlobal ?? prismaClientSingleton();

async function testConnection() {
	try {
		await prisma.$connect();
		console.log("Connection successful");
	} catch (error) {
		console.error("Connection failed", error);
	} finally {
		await prisma.$disconnect();
	}
}

testConnection();

export default prisma;

if (process.env.NODE_ENV !== "production") globalPrisma.prismaGlobal = prisma;
