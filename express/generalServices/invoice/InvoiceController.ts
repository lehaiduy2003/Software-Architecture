import { Request, Response } from "express";
import { BaseController } from "../utils/BaseController";
import InvoiceService from "./InvoiceService";

export default class InvoiceController extends BaseController {
    private invoiceService: InvoiceService;
    constructor(invoiceService: InvoiceService) {
        super();
        this.invoiceService = invoiceService;
    }

    public getAllInvoices = async (req: Request, res: Response) => {
        try {
            const invoices = await this.invoiceService.getAllInvoices();
            if (!invoices) {
                return this.sendResponse(res, 200, { success: false, result: [] });
            }
            return this.sendResponse(res, 200, invoices);
        } catch (error) {
            this.sendError(res, 500, "Internal server error");
            throw error;
        }
    }

    public getInvoiceById = async (req: Request, res: Response) => {
        try {
            const invoiceId = parseInt(req.params.invoiceId);
            const invoice = await this.invoiceService.getInvoiceById(invoiceId);
            if (!invoice) {
                return this.sendResponse(res, 400, { success: false, result: {} });
            }
            return this.sendResponse(res, 200, invoice);
        } catch (error) {
            this.sendError(res, 500, "Internal server error");
            throw error;
        }
    }

    public createInvoice = async (req: Request, res: Response) => {
        try {
            const invoice = await this.invoiceService.createInvoice(req.body);
            if (!invoice) {
                return this.sendResponse(res, 400, { success: false, message: "Failed to create invoice" });
            }
            return this.sendResponse(res, 201, { success: true, result: invoice });
        } catch (error) {
            this.sendError(res, 500, "Internal server error");
            throw error;
        }
    }

    public updateInvoice = async (req: Request, res: Response) => {
        try {
            const invoiceId = parseInt(req.params.invoiceId);
            const data = req.body;
            const invoice = await this.invoiceService.updateInvoice(invoiceId, data);
            if (!invoice) {
                return this.sendResponse(res, 400, { success: false, message: "Failed to update invoice" });
            }
            return this.sendResponse(res, 200, { success: true, result: invoice });
        } catch (error) {
            this.sendError(res, 500, "Internal server error");
            throw error;
        }
    }

    public deleteInvoice = async (req: Request, res: Response) => {
        try {
            const invoiceId = parseInt(req.params.invoiceId);
            const invoice = await this.invoiceService.deleteInvoice(invoiceId);
            if (!invoice) {
                return this.sendResponse(res, 400, { success: false, message: "Failed to delete invoice" });
            }
            return this.sendResponse(res, 200, { success: true, result: invoice });
        } catch (error) {
            this.sendError(res, 500, "Internal server error");
            throw error;
        }
    }
}