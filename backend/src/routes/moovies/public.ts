import { Router } from "express";
import MoovieController from "../../controllers/moovies/MoovieController";
import TicketController from "../../controllers/moovies/MonopolyController";
import upload from "../../configs/MulterConfig";

const route = Router();
const controller = new TicketController();

route.get("/list", controller.getAll.bind(controller));

export default route;