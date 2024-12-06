import { Request, Response } from "express";
import { BaseController } from "../utils/BaseController";
import StripeService from "../services/StripeService";
import { validateOrderedFood } from "../libs/zod/types/OrderedFood";

export default class StripeController extends BaseController {
  private stripeService: StripeService;
  constructor(stripeService: StripeService) {
    super();
    this.stripeService = stripeService;
  }
  public checkout = async (req: Request, res: Response) => {
    try {
      const data = req.body.foods;
      // Validate the data
      // If the data is an array, validate each object item
      // If the data is an object and put it in an array
      const foods = Array.isArray(data)
        ? data.map((item) => {
            return validateOrderedFood(item);
          })
        : [validateOrderedFood(data)];

      const clientSecret = await this.stripeService.checkout(foods);
      if (!clientSecret) {
        return this.sendResponse(res, 200, { success: false, result: [] });
      }
      return this.sendResponse(res, 200, clientSecret);
    } catch (error) {
      this.sendError(res, 500, "Internal server error");
      throw error;
    }
  };
}
