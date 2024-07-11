import {
	getAllNotificationsService,
	createNotificationService,
        deleteNotificationService,
} from "./notifications.service.js";
import { Router  } from "express";





const notificationsRoute = Router();

notificationsRoute.get("/", async (req,res) => {
    	try {
		const result = await getAllNotificationsService();
	    return res.status(200).json(result);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
});

notificationsRoute.post("/create", async (req,res) =>{ //TEMPORAL
    try{
	const result = await createNotificationService(req.body);
	return res.json(result);
	
    } catch (error){
	return res.status(500).json({error : error.message});

    }
    
});

notificationsRoute.delete("/:id/delete", async (req,res) => {
    const { id } = req.params;
	try {
	        const result = await deleteNotificationService(id);
	    return res.status(result.status).json(result);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
});


export default notificationsRoute;

