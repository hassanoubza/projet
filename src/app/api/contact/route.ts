import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, email, phone, message } = body;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,

      port: Number(process.env.SMTP_PORT),

      secure: true,

      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Trips To Marrakech" <${process.env.SMTP_USER}>`,

      to: process.env.CONTACT_EMAIL,

      replyTo: email,

      subject: `New travel request from ${name}`,

      html: `

      <h2>New Contact Request</h2>

      <p>
      <strong>Name:</strong>
      ${name}
      </p>


      <p>
      <strong>Email:</strong>
      ${email}
      </p>


      <p>
      <strong>Phone:</strong>
      ${phone}
      </p>


      <p>
      <strong>Message:</strong>
      </p>

      <p>
      ${message}
      </p>

      `,
    });

    console.log("Email sent successfully");

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("SMTP ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Email sending failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      {
        status: 500,
      },
    );
  }
}
