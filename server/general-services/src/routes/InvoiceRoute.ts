import InvoiceController from "../controllers/InvoiceController";
import { authenticate } from "../middlewares/authenticate";
import verifyToken from "../middlewares/revokeToken";
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
    this.router.get("/", verifyToken, authenticate, this.invoiceController.getInvoices);
    this.router.get("/:userId", verifyToken, authenticate, this.invoiceController.getInvoiceById);
  }
}
// /invoices/
const createInvoicesRoute = () => {
  const invoiceService = new InvoiceService();
  const invoiceController = new InvoiceController(invoiceService);
  return new InvoiceRoute(invoiceController);
};

export default createInvoicesRoute;
