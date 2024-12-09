import InvoiceController from "../controllers/InvoiceController";
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
    this.router.get("/", this.invoiceController.getInvoices);
    this.router.get("/:userId", this.invoiceController.getInvoiceById);
  }
}
// /invoices/
const createInvoicesRoute = () => {
  const invoiceService = new InvoiceService();
  const invoiceController = new InvoiceController(invoiceService);
  return new InvoiceRoute(invoiceController);
};

export default createInvoicesRoute;
