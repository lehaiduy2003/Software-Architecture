import { Request, Response } from "express";
import { BaseController } from "../utils/BaseController";
import FoodService from "../services/FoodService";
import { validateUser } from "../libs/zod/types/UserValidation";
import { validateFood } from "../libs/zod/types/FoodValidation";
import { log } from "console";

export default class FoodController extends BaseController {
  private foodService: FoodService;
  constructor(foodService: FoodService) {
    super();
    this.foodService = foodService;
  }

  public getAllFood = async (req: Request, res: Response) => {
    try {
      console.log("Getting all foods");

      const food = await this.foodService.getAllFoods();
      if (!food) {
        return this.sendResponse(res, 200, { success: false, result: [] });
      }
      return this.sendResponse(res, 200, food);
    } catch (error) {
      this.sendError(res, 500, "Internal server error");
      throw error;
    }
  };

  public getFoodById = async (req: Request, res: Response) => {
    try {
      const foodId = req.params.foodId;
      const food = await this.foodService.getFoodById(foodId);
      if (!food) {
        return this.sendResponse(res, 400, { success: false, result: {} });
      }
      return this.sendResponse(res, 200, food);
    } catch (error) {
      this.sendError(res, 500, "Internal server error");
      throw error;
    }
  };

  public createFood = async (req: Request, res: Response) => {
    log("req", (req as any).userData)
    try {
      const data = validateFood(req.body);
        const food = await this.foodService.createFood(data);
        if (!food) {
            return this.sendResponse(res, 400, { success: false, message: "Failed to create food" });
        }
        return this.sendResponse(res, 201, { success: true, result: food });
    } catch (error) {
        this.sendError(res, 500, "Internal server error");
        throw error;
    }
}

  public updateFood = async (req: Request, res: Response) => {
    try {
      const foodId = req.params.foodId;
      const data = req.body;
      const food = await this.foodService.updateFood(foodId, data);
      if (!food) {
        return this.sendResponse(res, 400, { success: false, message: "Failed to update food" });
      }
      return this.sendResponse(res, 200, { success: true, result: food });
    } catch (error) {
      this.sendError(res, 500, "Internal server error");
      throw error;
    }
  };

  public deleteFood = async (req: Request, res: Response) => {
    try {
      const foodId = req.params.foodId;
      const food = await this.foodService.deleteFood(foodId);
      if (!food) {
        return this.sendResponse(res, 400, { success: false, message: "Failed to delete food" });
      }
      return this.sendResponse(res, 200, { success: true, message: "Food deleted successfully" });
    } catch (error) {
      this.sendError(res, 500, "Internal server error");
      throw error;
    }
  };
}
