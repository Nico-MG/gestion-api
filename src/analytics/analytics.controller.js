import { Router } from "express";
import { getAnalyticData } from "./analytics.service.js";

const analyticsRoute = Router();

analyticsRoute.get("/", async (_, res) => {
	try {
		const result = await getAnalyticData();
		return res.status(200).json({
			message: "Datos para analíticas",
			data: result,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Error interno del servidor" });
	}
});

export default analyticsRoute;
