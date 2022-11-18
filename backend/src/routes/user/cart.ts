import { Router } from "express";
import CartController from "../../controllers/purchases/CartController";

const route = Router();
const controller = new CartController();

route.post("/add", controller.add.bind(controller));

route.get("/pull", controller.get.bind(controller));

export default route;