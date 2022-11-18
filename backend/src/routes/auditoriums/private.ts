import { Router } from "express";
import AuditoriumController from "../../controllers/moovies/AuditoriumController";

const route = Router();
const controller = new AuditoriumController();

route.post("/create", controller.post.bind(controller));

export default route;