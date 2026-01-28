import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    try {
        const { name, email, company, message } = await req.json();

        // Validate input
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Check if SMTP details are provided
        if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
            console.log('⚠️ SMTP not configured. Printing email to console instead:');
            console.log('From:', email);
            console.log('Message:', message);
            // Return success in dev mode so the UI works
            return NextResponse.json({ success: true, message: 'Email logged to console (SMTP not configured)' });
        }

        const port = Number(process.env.SMTP_PORT) || 587;

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: port,
            secure: port === 465, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        try {
            // 1. Send notification to internal admin
            await transporter.sendMail({
                from: process.env.SMTP_FROM || '"Utvikleren.site Contact" <noreply@utvikleren.site>',
                to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
                replyTo: email,
                subject: `Ny forespørsel fra ${name} (${company || 'Ingen bedrift'})`,
                text: `Navn: ${name}\nE-post: ${email}\nBedrift: ${company}\n\nMelding:\n${message}`,
                html: `
          <h3>Ny henvendelse fra Utvikleren.site</h3>
          <p><strong>Navn:</strong> ${name}</p>
          <p><strong>E-post:</strong> ${email}</p>
          <p><strong>Bedrift:</strong> ${company || '-'}</p>
          <br/>
          <p><strong>Melding:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `,
            });

            // 2. Send confirmation email to the user
            try {
                await transporter.sendMail({
                    from: process.env.SMTP_FROM || '"Utvikleren.site" <post@utvikleren.site>',
                    to: email,
                    subject: 'Vi har mottatt din henvendelse',
                    text: `Hei ${name},\n\nTakk for at du tok kontakt. Vi har mottatt din melding og vil komme tilbake til deg så snart som mulig.\n\nMed vennlig hilsen,\nUtvikleren.site Teamet`,
                    html: `
                        <div style="font-family: sans-serif; color: #333;">
                            <h2>Takk for din henvendelse</h2>
                            <p>Hei ${name},</p>
                            <p>Vi bekrefter at vi har mottatt din melding. Vårt team vil se på den og komme tilbake til deg innen kort tid.</p>
                            <br/>
                            <p>Med vennlig hilsen,</p>
                            <p><strong>Utvikleren.site</strong></p>
                        </div>
                    `,
                });
            } catch (confirmError) {
                console.error('Failed to send confirmation email:', confirmError);
                // We don't fail the request if the confirmation email fails, just log it
            }

            return NextResponse.json({ success: true });
        } catch (emailError) {
            console.error('Failed to send email:', emailError);
            return NextResponse.json(
                { error: 'Failed to send email' },
                { status: 500 }
            );
        }

    } catch (error) {
        console.error('Error processing contact request:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
