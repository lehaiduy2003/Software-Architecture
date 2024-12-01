import { Request, RequestHandler, Response } from "express";
import path from "path";
import { BaseRoute } from "../utils/BaseRoute";
import AuthController from "./AuthController";

export default class AuthRoutes extends BaseRoute {
    private authController: AuthController;

    constructor(authController: AuthController) {
        super();
        this.authController = authController;
        this.autoBindControllerMethods(this.authController);
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post('/register', this.authController.register);
        this.router.post('/login', this.authController.login);
        this.router.post('/logout', this.authController.logout);
    }
}

