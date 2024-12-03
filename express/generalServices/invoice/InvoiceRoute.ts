import { BaseRoute } from "../utils/BaseRoute";
import InvoiceController from "./InvoiceController";

export default class InvoiceRoute extends BaseRoute {
    private invoiceController: InvoiceController;
    constructor(invoiceController: InvoiceController) {
        super();
        this.invoiceController = invoiceController;
        this.autoBindControllerMethods(this.invoiceController);
        this.initRoutes();
    }

    private initRoutes() {
        this.router.get("/", this.invoiceController.getAllInvoices);
        this.router.get("/:invoiceId", this.invoiceController.getInvoiceById);
        this.router.post("/", this.invoiceController.createInvoice);
        this.router.put("/:invoiceId", this.invoiceController.updateInvoice);
        this.router.delete("/:invoiceId", this.invoiceController.deleteInvoice);
    }
}