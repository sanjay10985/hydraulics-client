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
      html: `

        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Form Submission</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap');
        
        body {
            font-family: 'Roboto', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f7f7f7;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #2c3e50;
            color: white;
            padding: 30px;
            text-align: center;
        }
        .logo {
            width: 80px;
            height: 80px;
            margin-bottom: 20px;
            background-color: #ecf0f1;
            border-radius: 50%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            font-weight: bold;
            color: #2c3e50;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 300;
            letter-spacing: 1px;
        }
        .content {
            padding: 40px;
        }
        .field {
            margin-bottom: 30px;
            position: relative;
        }
        .field::after {
            content: '';
            display: block;
            width: 100%;
            height: 1px;
            background: linear-gradient(to right, #ecf0f1, transparent);
            position: absolute;
            bottom: -15px;
        }
        .field:last-child::after {
            display: none;
        }
        .field-name {
            font-weight: 700;
            color: #34495e;
            text-transform: uppercase;
            font-size: 12px;
            letter-spacing: 1px;
            margin-bottom: 8px;
        }
        .field-value {
            font-size: 16px;
            color: #2c3e50;
        }
        .message {
            background-color: #f9f9f9;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #3498db;
            font-style: italic;
            color: #34495e;
        }
        .footer {
            background-color: #ecf0f1;
            color: #7f8c8d;
            text-align: center;
            padding: 15px;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">CF</div>
            <h1>New Contact Form Submission</h1>
        </div>
        <div class="content">
            <div class="field">
                <div class="field-name">Subject</div>
                <div class="field-value">${subject}</div>
            </div>
            <div class="field">
                <div class="field-name">Name</div>
                <div class="field-value">${name}</div>
            </div>
            <div class="field">
                <div class="field-name">Email</div>
                <div class="field-value">${email}</div>
            </div>
            <div class="field">
                <div class="field-name">Message</div>
                <div class="message">${message}</div>
            </div>
        </div>
        <div class="footer">
            This is an automated message. Please do not reply directly to this email.
        </div>
    </div>
</body>
</html>
      `
        .replace("{name}", name)
        .replace("{email}", email)
        .replace("{subject}", subject)
        .replace("{message}", message),
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
