import { Request, Response } from "express";
import { BaseController } from "../utils/BaseController";
import UserService from "../services/UserService";
import InvoiceService from "../services/InvoiceService";

export default class InvoiceController extends BaseController {
  private invoiceService: InvoiceService;
  constructor(invoiceService: InvoiceService) {
    super();
    this.invoiceService = invoiceService;
  }

  public getInvoices = async (req: Request, res: Response) => {
    try {
      const invoices = await this.invoiceService.getInvoices();
      if (!invoices) {
        return this.sendResponse(res, 200, { success: false, result: [] });
      }
      return this.sendResponse(res, 200, invoices);
    } catch (error) {
      this.sendError(res, 500, "Internal server error");
      throw error;
    }
  };

  public getInvoiceById = async (req: Request, res: Response) => {
    try {
      const invoiceId = req.params.invoiceId;
      const invoice = await this.invoiceService.getInvoiceById(invoiceId);
      if (!invoice) {
        return this.sendResponse(res, 400, { success: false, result: {} });
      }
      return this.sendResponse(res, 200, invoice);
    } catch (error) {
      this.sendError(res, 500, "Internal server error");
      throw error;
    }
  };
}
