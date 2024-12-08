import { validateFood } from "../libs/zod/types/FoodValidation";
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

    public getAllRestaurants = async (req: Request, res: Response) => {
        try {
            const { page, pageSize } = req.query;
            const restaurants = await this.restaurantService.getAllRestaurants(Number(page), Number(pageSize));
            return this.sendResponse(res, 200, { success: true, data: restaurants });
        } catch (error) {
            this.sendError(res, 500, "Internal server error");
            throw error;
        }
    }

    public getMenuByRestaurant = async (req: Request, res: Response) => {
        try {
            const { restauranId } = req.params;
            const menu = await this.restaurantService.getMenuByRestaurant(String(restauranId));
            return this.sendResponse(res, 200, { success: true, data: menu });
        } catch (error) {
            this.sendError(res, 500, "Internal server error");
            throw error;
        }
    }

    public getFoodByCategory = async (req: Request, res: Response) => {
        try {
            const { restauranId, categoryId } = req.params;
            const foods = await this.restaurantService.getFoodByCategory(String(restauranId), Number(categoryId));
            return this.sendResponse(res, 200, { success: true, data: foods });
        } catch (error) {
            this.sendError(res, 500, "Internal server error");
            throw error;
        }
    }

    public getBestSeller = async (req: Request, res: Response) => {
        try {
            const { restauranId } = req.params;
            const bestSeller = await this.restaurantService.get6FoodsBestSeller(String(restauranId));
            return this.sendResponse(res, 200, { success: true, data: bestSeller });
        } catch (error) {
            this.sendError(res, 500, "Internal server error");
            throw error;
        }
    }
}