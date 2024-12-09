import { OrderedFood } from "../libs/zod/types/OrderedFood";

const calculateTotalPrice = (foods: OrderedFood[]) => {
  return foods.reduce((acc, food) => acc + food.price * food.quantity, 0);
};

export default calculateTotalPrice;
