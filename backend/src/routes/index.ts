import { Router } from "express";

import auth from "../middlewares/auth";
import role from "../middlewares/role";

import access from "./user/access";
import mooviePublic from "./moovies/public";
import mooviePrivate from "./moovies/private";
import purchaseCart from "./user/cart";
import auditoriumPrivate from "./auditoriums/private";


const routes: Router= Router();

/**
 * PUBLIC ROUTES
 */
 routes.use("/access", access);
 routes.use("/moovie", mooviePublic);
 
 /**
  * PRIVATE ROUTES
  * Authenticad routes
  */
 routes.use("*", auth);
 routes.use("*", role);
 routes.use("/purchase", purchaseCart);
 routes.use("/moovie", mooviePrivate);
 routes.use("/auditorium", auditoriumPrivate);
 
 export default routes;