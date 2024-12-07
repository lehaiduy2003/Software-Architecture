import nodemailer from 'nodemailer';
import dns from "dns";
const dnsCache = new Map();
dns.setDefaultResultOrder("ipv4first");
import SMTPTransport from 'nodemailer/lib/smtp-transport';
// Create a transport for sending emails
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "huutruong1410@gmail.com",
        pass: "ofvncjzydyoeeope",
    },
    pool: true,
    dnsCache,
} as SMTPTransport.Options);

export const sendEmail = async (to: string, subject: string, text: string) => {
    try {
        const info = await transporter.sendMail({
            from: 'food-delivery@food.com.vn',
            to,
            subject,
            text,
        });
        console.log('Email sent: ', info.response);
        return true;
    } catch (error) {
        console.error('Error sending email: ', error);
        return false;
    }
};
