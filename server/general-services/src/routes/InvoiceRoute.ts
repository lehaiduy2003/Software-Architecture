import InvoiceController from "../controllers/InvoiceController";
import { authenticate } from "../middlewares/authenticate";
import { authorize } from "../middlewares/authorize";
import refreshToken from "../middlewares/refreshToken";
import verifyToken from "../middlewares/verifyToken";
import InvoiceService from "../services/InvoiceService";
import { BaseRoute } from "../utils/BaseRoute";

class InvoiceRoute extends BaseRoute {
  private invoiceController: InvoiceController;
  constructor(invoiceController: InvoiceController) {
    super();
    this.invoiceController = invoiceController;
    this.autoBindControllerMethods(this.invoiceController);
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get("/", verifyToken, authenticate, authorize(["getInvoices"]), this.invoiceController.getInvoices);
    this.router.get("/:userId", verifyToken, refreshToken, authenticate, authorize(["getInvoiceById"]), this.invoiceController.getInvoiceById);
  }
}
// /invoices/
const createInvoicesRoute = () => {
  const invoiceService = new InvoiceService();
  const invoiceController = new InvoiceController(invoiceService);
  return new InvoiceRoute(invoiceController);
};

export default createInvoicesRoute;
