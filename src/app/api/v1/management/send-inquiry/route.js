import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request) {
  try {
    const { name, email, phone, referrer, message, services, duration } =
      await request.json();

    if (!name || !email) {
      return NextResponse.json(
        { success: false, message: "Name and Email are required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { success: false, message: "Server configuration error" },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    let parsedServices = "";
    if (Array.isArray(services)) {
      parsedServices = services.join(", ");
    } else if (typeof services === "string") {
      parsedServices = services;
    } else if (services && typeof services === "object") {
      parsedServices = Object.values(services).join(", ");
    } else {
      parsedServices = "None specified";
    }

    const subject = `🔥 New Lead: ${name} is looking for ${parsedServices}`;

    const htmlBody = `
      <table style="width: 100%; max-width: 600px; border-collapse: collapse; font-family: 'Segoe UI', Arial, sans-serif; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
        <thead>
          <tr style="background-color: #ffd400; color: #000000; text-align: left;">
            <th colspan="2" style="padding: 18px 24px; font-size: 18px; font-weight: bold; border-bottom: 2px solid #e6be00; text-transform: uppercase; letter-spacing: 0.5px;">New Project Inquiry</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 14px 20px; font-weight: bold; color: #555555; width: 35%; border-bottom: 1px solid #f0f0f0;">Client Name:</td>
            <td style="padding: 14px 20px; color: #000000; border-bottom: 1px solid #f0f0f0;">${name}</td>
          </tr>
          <tr style="background-color: #fcfcfc;">
            <td style="padding: 14px 20px; font-weight: bold; color: #555555; border-bottom: 1px solid #f0f0f0;">Client Email:</td>
            <td style="padding: 14px 20px; color: #000000; border-bottom: 1px solid #f0f0f0;"><a href="mailto:${email}" style="color: #0066cc; text-decoration: none;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 14px 20px; font-weight: bold; color: #555555; border-bottom: 1px solid #f0f0f0;">Phone Number:</td>
            <td style="padding: 14px 20px; color: #000000; border-bottom: 1px solid #f0f0f0;">${phone || "N/A"}</td>
          </tr>
          <tr style="background-color: #fcfcfc;">
            <td style="padding: 14px 20px; font-weight: bold; color: #555555; border-bottom: 1px solid #f0f0f0;">Attribution (Source):</td>
            <td style="padding: 14px 20px; color: #000000; border-bottom: 1px solid #f0f0f0;">${referrer || "Not specified"}</td>
          </tr>
          <tr>
            <td style="padding: 14px 20px; font-weight: bold; color: #555555; border-bottom: 1px solid #f0f0f0;">Services Needed:</td>
            <td style="padding: 14px 20px; color: #000000; border-bottom: 1px solid #f0f0f0; font-weight: bold;">${parsedServices}</td>
          </tr>
          <tr style="background-color: #fcfcfc;">
            <td style="padding: 14px 20px; font-weight: bold; color: #555555; border-bottom: 1px solid #f0f0f0;">Timeline Requested:</td>
            <td style="padding: 14px 20px; color: #000000; border-bottom: 1px solid #f0f0f0;"><span style="background-color: #ffeef0; color: #d73a49; padding: 4px 8px; border-radius: 4px; font-size: 13px; font-weight: bold;">${duration || "Not specified"}</span></td>
          </tr>
          <tr>
            <td colspan="2" style="padding: 20px;">
              <div style="font-weight: bold; color: #555555; margin-bottom: 8px;">Message Details:</div>
              <div style="color: #333333; line-height: 1.6; background-color: #f9f9f9; padding: 15px; border-radius: 6px; border-left: 4px solid #ffd400; font-style: italic;">
                "${message || "No message provided"}"
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    `;

    const result = await resend.emails.send({
      from: "Dramantram Inquiry <onboarding@resend.dev>",
      to: "Dramantram@gmail.com",
      subject,
      html: htmlBody,
    });

    if (result.error) {
      return NextResponse.json(
        { success: false, message: "Failed to send email", error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Inquiry Email Sent Successfully",
      data: result.data,
    });
  } catch (error) {
    console.error("Error in sendInquiry:", error);
    return NextResponse.json(
      { success: false, message: "Error in processing inquiry" },
      { status: 500 }
    );
  }
}
