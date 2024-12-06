import RestaurantService from "../services/RestaurantService";
import { BaseController } from "../utils/BaseController";
import { Request, Response } from "express";


export default class RestaurantController extends BaseController {
    private restaurantService: RestaurantService;
    constructor(restaurantService: RestaurantService) {
        super();
        this.restaurantService = restaurantService;
    }

    public getTop10Restaurants = async (req: Request, res: Response) => {
        try {
            const restaurants = await this.restaurantService.getTop10Restaurants();
            return this.sendResponse(res, 200, { success: true, data: restaurants });
        } catch (error) {
            this.sendError(res, 500, "Internal server error");
            throw error;
        }
    };
}