import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

const TARGET_EMAIL = 'itzpatilmayur@gmail.com';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const patientName = (formData.get('patientName') as string) || '';
    const mobileNumber = (formData.get('mobileNumber') as string) || '';
    const address = (formData.get('address') as string) || '';
    const requiredTests = (formData.get('requiredTests') as string) || 'General Blood Test / Checkup';
    const preferredSlot = (formData.get('preferredSlot') as string) || 'Earliest Available';
    const prescriptionFile = formData.get('prescription') as File | null;

    if (!patientName.trim() || !mobileNumber.trim() || !address.trim()) {
      return NextResponse.json(
        { success: false, error: 'Patient name, mobile number, and address are required.' },
        { status: 400 }
      );
    }

    const timestamp = new Date().toISOString();
    const bookingId = `CF-${Date.now()}`;
    let savedFileName = '';
    let savedFileUrl = '';
    let fileBuffer: Buffer | null = null;
    let fileContentType = '';
    let originalFileName = '';

    // Handle prescription image / file attachment
    if (prescriptionFile && prescriptionFile.size > 0) {
      originalFileName = prescriptionFile.name;
      fileContentType = prescriptionFile.type;
      const arrayBuffer = await prescriptionFile.arrayBuffer();
      fileBuffer = Buffer.from(arrayBuffer);

      // Clean filename and save to public/uploads/prescriptions/
      const cleanFileName = originalFileName.replace(/[^a-zA-Z0-9.-]/g, '_');
      savedFileName = `${Date.now()}_${cleanFileName}`;
      const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'prescriptions');

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const filePath = path.join(uploadDir, savedFileName);
      fs.writeFileSync(filePath, fileBuffer);
      savedFileUrl = `/uploads/prescriptions/${savedFileName}`;
    }

    // Save booking to persistent data/bookings.json log
    try {
      const dataDir = path.join(process.cwd(), 'data');
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      const bookingsLogPath = path.join(dataDir, 'bookings.json');
      let currentBookings = [];
      if (fs.existsSync(bookingsLogPath)) {
        try {
          const content = fs.readFileSync(bookingsLogPath, 'utf-8');
          currentBookings = JSON.parse(content);
        } catch {
          currentBookings = [];
        }
      }
      currentBookings.unshift({
        bookingId,
        timestamp,
        patientName,
        mobileNumber,
        address,
        requiredTests,
        preferredSlot,
        prescriptionFileName: originalFileName || null,
        prescriptionFileUrl: savedFileUrl || null,
      });
      fs.writeFileSync(bookingsLogPath, JSON.stringify(currentBookings, null, 2));
    } catch (logErr) {
      console.error('Error logging booking to disk:', logErr);
    }

    // Send Email to itzpatilmayur@gmail.com
    let emailSent = false;
    let emailStatusNote = '';

    const smtpUser = process.env.SMTP_USER || process.env.GMAIL_USER;
    const smtpPass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASS;

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
        <div style="background-color: #0f172a; color: #ffffff; padding: 20px; text-align: center;">
          <h2 style="margin: 0; color: #38bdf8; font-size: 20px;">CareFirst Pathology Laboratory</h2>
          <p style="margin: 5px 0 0 0; color: #94a3b8; font-size: 13px;">New Patient Home Collection & Test Request</p>
        </div>
        
        <div style="padding: 24px; background-color: #ffffff;">
          <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 12px 16px; margin-bottom: 20px;">
            <strong style="color: #166534; font-size: 14px;">Booking ID: ${bookingId}</strong>
            <p style="margin: 4px 0 0 0; color: #15803d; font-size: 12px;">Received on ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</p>
          </div>

          <table style="width: 100%; border-collapse: collapse; font-size: 14px; text-align: left;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; width: 38%;"><strong>Patient Name:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-weight: bold;">${patientName}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b;"><strong>Mobile (WhatsApp):</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a;">
                <a href="tel:+91${mobileNumber.replace(/\D/g, '')}" style="color: #0284c7; text-decoration: none; font-weight: bold;">+91 ${mobileNumber}</a>
                &nbsp;|&nbsp;
                <a href="https://wa.me/91${mobileNumber.replace(/\D/g, '')}" style="color: #16a34a; text-decoration: none; font-weight: bold;">Chat on WhatsApp</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b;"><strong>Complete Address:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${address}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b;"><strong>Preferred Time Slot:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${preferredSlot}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b;"><strong>Required Tests / Prescription:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-weight: bold;">${requiredTests}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #64748b;"><strong>Prescription File Attached:</strong></td>
              <td style="padding: 10px 0; color: #0f172a;">
                ${
                  prescriptionFile && prescriptionFile.size > 0
                    ? `<span style="color: #16a34a; font-weight: bold;">✓ Attached: ${originalFileName}</span>`
                    : '<span style="color: #94a3b8;">No file uploaded (entered manually)</span>'
                }
              </td>
            </tr>
          </table>

          <div style="margin-top: 24px; padding: 14px; background-color: #f8fafc; border-radius: 8px; font-size: 12px; color: #64748b; text-align: center;">
            This email was sent automatically from CareFirst Pathology Laboratory Website to <strong>${TARGET_EMAIL}</strong>.
          </div>
        </div>
      </div>
    `;

    // Try sending email via SMTP
    if (smtpUser && smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST || 'smtp.gmail.com',
          port: Number(process.env.SMTP_PORT) || 465,
          secure: Number(process.env.SMTP_PORT) === 465 || true,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        const attachments = [];
        if (fileBuffer && originalFileName) {
          attachments.push({
            filename: originalFileName,
            content: fileBuffer,
            contentType: fileContentType || undefined,
          });
        }

        await transporter.sendMail({
          from: `"CareFirst Lab Booking" <${smtpUser}>`,
          to: TARGET_EMAIL,
          replyTo: TARGET_EMAIL,
          subject: `🚨 New Patient Booking: ${patientName} - ${mobileNumber}`,
          html: htmlContent,
          attachments,
        });

        emailSent = true;
        emailStatusNote = `Email successfully dispatched to ${TARGET_EMAIL}`;
      } catch (smtpErr: unknown) {
        console.error('SMTP send error:', smtpErr);
        const errMsg = smtpErr instanceof Error ? smtpErr.message : 'Check credentials';
        emailStatusNote = `SMTP attempt failed: ${errMsg}. Submission preserved on server.`;
      }
    } else {
      emailStatusNote = `Stored on server and ready for ${TARGET_EMAIL}. Add SMTP_USER and SMTP_PASS in .env.local for live Gmail sending.`;
    }

    return NextResponse.json({
      success: true,
      bookingId,
      emailSent,
      targetEmail: TARGET_EMAIL,
      emailStatusNote,
      patientName,
      prescriptionSaved: Boolean(savedFileName),
      prescriptionFileUrl: savedFileUrl || null,
      message: `Booking received! Details and prescription for ${patientName} processed for ${TARGET_EMAIL}.`,
    });
  } catch (error: unknown) {
    console.error('Error processing booking request:', error);
    const errText = error instanceof Error ? error.message : 'Failed to process booking request.';
    return NextResponse.json(
      { success: false, error: errText },
      { status: 500 }
    );
  }
}
