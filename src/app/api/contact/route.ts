import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

interface ContactRequestBody {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  message?: unknown;
}

function escapeHtml(value: string): string {
  const characters: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };

  return value.replace(/[&<>"']/g, (character) => characters[character]);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactRequestBody;

    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!name || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, email and message are required.",
        },
        {
          status: 400,
        },
      );
    }

    const smtpHost = process.env.SMTP_HOST?.trim();
    const smtpUser = process.env.SMTP_USER?.trim();
    const smtpPassword = process.env.SMTP_PASSWORD;
    const contactEmail = process.env.CONTACT_EMAIL?.trim();
    const smtpPort = Number(process.env.SMTP_PORT ?? "465");

    if (
      !smtpHost ||
      !smtpUser ||
      !smtpPassword ||
      !contactEmail ||
      !Number.isFinite(smtpPort)
    ) {
      console.error("Missing SMTP environment variables");

      return NextResponse.json(
        {
          success: false,
          message: "Email service is not configured.",
        },
        {
          status: 500,
        },
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,

      // true pour 465, false pour 587
      secure: smtpPort === 465,

      auth: {
        user: smtpUser,
        pass: smtpPassword,
      },

      connectionTimeout: 15_000,
      greetingTimeout: 10_000,
      socketTimeout: 20_000,
    });

    // Garde temporairement cette ligne pour diagnostiquer le déploiement.
    await transporter.verify();

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone || "Not provided");
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

    const info = await transporter.sendMail({
      from: `"Trips To Marrakech" <${smtpUser}>`,
      to: contactEmail,
      replyTo: email,
      subject: `New travel request from ${name}`,

      text: `
New Contact Request

Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}

Message:
${message}
      `.trim(),

      html: `
        <h2>New Contact Request</h2>

        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Phone:</strong> ${safePhone}</p>

        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>
      `,
    });

    console.log("SMTP email result:", {
      messageId: info.messageId,
      accepted: info.accepted,
      rejected: info.rejected,
      response: info.response,
    });

    if (!info.accepted || info.accepted.length === 0) {
      throw new Error("The SMTP server did not accept the recipient.");
    }

    return NextResponse.json({
      success: true,
      message: "Message sent successfully.",
    });
  } catch (error) {
    console.error(
      "SMTP ERROR:",
      error instanceof Error ? error.message : error,
    );

    return NextResponse.json(
      {
        success: false,
        message: "Email sending failed.",
      },
      {
        status: 500,
      },
    );
  }
}
