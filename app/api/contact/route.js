// app/api/contact/route.js
import { google } from "googleapis";
import { Resend } from "resend";
import { NextResponse } from "next/server";

// Configure Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Configure Google Sheets
const sheets = google.sheets({
  version: "v4",
  auth: new google.auth.GoogleAuth({
    credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  }),
});

export async function POST(request) {
  try {
    const { name, email, subject, message } = await request.json();

    // Send email using Resend
    const sentTheEmail = await resend.emails.send({
      from: process.env.FROM_EMAIL,
      to: process.env.TO_EMAIL,
      subject: `New Contact Form Submission: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });

    console.log(sentTheEmail);

    // Add to Google Sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Sheet1",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[new Date().toISOString(), name, email, subject, message]],
      },
    });

    return NextResponse.json(
      { message: "Form submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
