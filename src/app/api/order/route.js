import { orderAlertHTML, orderAlertText, orderReceivedHTML, orderReceivedText } from "@/lib/emailTemplates/order";
import { sendEmail } from "@/lib/sendEmail";
import { NextResponse } from "next/server";

export const POST = async (req, res) => {
    const { orders, name, email, address } = await req.json();

    try {
        const { host, origin } = new URL(req.url);
        const html = orderReceivedHTML({ host: origin, name, orders, address });
        const text = orderReceivedText({ host: origin, address });
        const subject = `Your order has been received.`;

        
        
        const vHtml = orderAlertHTML({host:origin, name, orders, address, email})
        const vText = orderAlertText({ host: origin, address, name, email, orders });
        const vSubject = `You've got a new order.`;

        console.log({ vSubject, email:process.env.DEVELOPER_EMAIL , vText })

        const vendorRes = await sendEmail({ subject:vSubject, email: process.env.DEVELOPER_EMAIL, text:vText, html:vHtml })
        console.log(vendorRes)
        const customerRes = await sendEmail({ subject, email , text, html })
        
        return NextResponse.json({msg:"success"})

    } catch (error) {
        throw error;
    }
}