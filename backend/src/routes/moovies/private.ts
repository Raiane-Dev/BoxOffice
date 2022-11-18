import { Router } from "express";
import MonopolyController from "../../controllers/moovies/MonopolyController";
import upload from "../../configs/MulterConfig";

const route = Router();
const controller = new MonopolyController();

// route.post("/create", controller.post.bind(controller));
route.post("/create", upload.single("banner"), controller.post.bind(controller));

export default route;