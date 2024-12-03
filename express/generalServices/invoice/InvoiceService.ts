import prisma from "../../configs/prisma";

export default class InvoiceService {
    public getAllInvoices = async () => {
        return await prisma.invoices.findMany();
    };

    public getInvoiceById = async (id: number) => {
        return await prisma.invoices.findUnique({
            where: { id }
        });
    };

    public createInvoice = async (data: any) => {
        return await prisma.invoices.create({
            data,
        });
    };

    public updateInvoice = async (id: number, data: any) => {
        return await prisma.invoices.update({
            where: { id },
            data,
        });
    };

    public deleteInvoice = async (id: number) => {
        return await prisma.invoices.delete({
            where: { id },
        });
    };
}