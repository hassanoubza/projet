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
  const entities: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };

  return value.replace(/[&<>"']/g, (char) => entities[char]);
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

    const smtpPassword = process.env.MAIL_PASSWORD?.trim();

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

    console.log("SMTP CONFIG:", {
      host: smtpHost,
      port: smtpPort,
      user: smtpUser,
      secure: smtpPort === 465,
      passwordExists: true,
      passwordLength: smtpPassword.length,
    });

    const transporter = nodemailer.createTransport({
      host: smtpHost,

      port: smtpPort,

      // Hostinger SSL 465
      secure: smtpPort === 465,

      auth: {
        user: smtpUser,

        pass: smtpPassword,
      },

      connectionTimeout: 30000,

      greetingTimeout: 20000,

      socketTimeout: 20000,
    });

    // Vérifie la connexion SMTP
    await transporter.verify();

    const safeName = escapeHtml(name);

    const safeEmail = escapeHtml(email);

    const safePhone = escapeHtml(phone || "Not provided");

    const safeMessage = escapeHtml(message).replace(/\n/g, "<br/>");

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
`,

      html: `
<h2>New Contact Request</h2>

<p>
<strong>Name:</strong>
${safeName}
</p>


<p>
<strong>Email:</strong>
${safeEmail}
</p>


<p>
<strong>Phone:</strong>
${safePhone}
</p>


<p>
<strong>Message:</strong>
</p>

<p>
${safeMessage}
</p>
`,
    });

    console.log("Email sent successfully:", {
      messageId: info.messageId,
      accepted: info.accepted,
    });

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
