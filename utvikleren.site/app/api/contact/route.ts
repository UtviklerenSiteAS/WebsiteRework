import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
    try {
        const { name, email, message } = await req.json();

        if (!name || !email || !message) {
            return NextResponse.json({ error: "Vennligst fyll ut alle felt." }, { status: 400 });
        }

        // 1. Setup Transporters
        // Common SMTP settings for PrivateEmail
        const baseConfig = {
            host: process.env.SMTP_HOST || "mail.privateemail.com",
            port: parseInt(process.env.SMTP_PORT || "465"),
            secure: true, // true for 465, false for other ports
        };

        // Notification Transporter (Admin)
        const notificationTransporter = nodemailer.createTransport({
            ...baseConfig,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // Confirmation Transporter (User)
        const confirmationTransporter = nodemailer.createTransport({
            ...baseConfig,
            auth: {
                user: process.env.CONFIRMATION_SMTP_USER,
                pass: process.env.CONFIRMATION_SMTP_PASS,
            },
        });

        // 2. Send Notification Email (to post@utvikleren.site)
        const notificationMailOptions = {
            from: `"${name}" <${process.env.SMTP_USER}>`,
            to: process.env.CONTACT_RECIPIENT,
            replyTo: email,
            subject: `Ny melding: ${name}`,
            text: `Navn: ${name}\nE-post: ${email}\n\nMelding:\n${message}`,
            html: `
                <div style="background-color: #000000; color: #ffffff; font-family: Helvetica, Arial, sans-serif; padding: 40px 20px; line-height: 1.5;">
                    <div style="max-width: 600px; margin: 0 auto; background-color: #0a0a0a; border: 1px solid #1a1a1a; borderRadius: 24px; padding: 40px; overflow: hidden;">
                        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 32px;">
                            <img src="https://utvikleren.site/assets/images/Logo.png" alt="Logo" style="width: 32px; height: 32px; border-radius: 8px;" />
                            <h1 style="font-size: 32px; font-weight: 500; letter-spacing: -0.05em; margin: 0; color: #ffffff;">
                                Ny henvendelse
                            </h1>
                        </div>
                        
                        <div style="margin-bottom: 40px;">
                            <div style="margin-bottom: 24px;">
                                <p style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; color: #666666; margin: 0 0 8px 0;">Fra</p>
                                <p style="font-size: 18px; color: #ffffff; margin: 0;">${name}</p>
                            </div>
                            
                            <div style="margin-bottom: 24px;">
                                <p style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; color: #666666; margin: 0 0 8px 0;">E-post</p>
                                <p style="font-size: 18px; color: #ffffff; margin: 0;"><a href="mailto:${email}" style="color: #ffffff; text-decoration: none; border-bottom: 1px solid #333333;">${email}</a></p>
                            </div>
                        </div>

                        <div style="background-color: #111111; border-radius: 16px; padding: 32px; border: 1px solid #1a1a1a;">
                            <p style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; color: #666666; margin: 0 0 16px 0;">Melding</p>
                            <p style="font-size: 18px; color: #cccccc; margin: 0; white-space: pre-wrap; line-height: 1.6;">${message}</p>
                        </div>

                        <div style="margin-top: 48px; padding-top: 32px; border-top: 1px solid #1a1a1a; text-align: center;">
                            <p style="font-size: 12px; color: #444444; margin: 0;">Sent via Utvikleren.site Kontaktskjema</p>
                        </div>
                    </div>
                </div>
            `,
        };

        // 3. Send Confirmation Email (to user)
        const confirmationMailOptions = {
            from: `"Utvikleren.site" <${process.env.CONFIRMATION_SMTP_USER}>`,
            to: email,
            subject: "Takk for din henvendelse!",
            text: `Hei ${name},\n\nTakk for at du tok kontakt. Vi har mottatt din melding og svarer deg så snart som mulig.\n\nMvh,\nUtvikleren.site`,
            html: `
                <div style="background-color: #000000; color: #ffffff; font-family: Helvetica, Arial, sans-serif; padding: 40px 20px; line-height: 1.5;">
                    <div style="max-width: 600px; margin: 0 auto; background-color: #0a0a0a; border: 1px solid #1a1a1a; border-radius: 24px; padding: 40px; overflow: hidden;">
                        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 24px;">
                            <img src="https://utvikleren.site/assets/images/Logo.png" alt="Logo" style="width: 32px; height: 32px; border-radius: 8px;" />
                            <h1 style="font-size: 32px; font-weight: 500; letter-spacing: -0.05em; margin: 0; color: #ffffff;">
                                Hei ${name}.
                            </h1>
                        </div>
                        
                        <p style="font-size: 18px; color: #cccccc; margin-bottom: 40px; font-weight: 300;">
                            Takk for at du tok kontakt med Utvikleren.site. Vi har mottatt din henvendelse og vil se over den så snart som mulig.
                        </p>

                        <div style="background-color: #111111; border-radius: 16px; padding: 32px; border: 1px solid #1a1a1a;">
                            <p style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; color: #666666; margin: 0 0 16px 0;">Kopi av din melding</p>
                            <p style="font-size: 18px; color: #888888; margin: 0; white-space: pre-wrap; line-height: 1.6;">${message}</p>
                        </div>

                        <div style="margin-top: 48px; padding-top: 32px; border-top: 1px solid #1a1a1a;">
                            <p style="font-size: 18px; font-weight: 500; color: #ffffff; margin: 0;">Med vennlig hilsen,</p>
                            <p style="font-size: 16px; color: #666666; margin: 4px 0 0 0;">Utvikleren.site</p>
                        </div>

                        <div style="margin-top: 40px; text-align: center;">
                            <a href="https://utvikleren.site" style="display: inline-block; background-color: #ffffff; color: #000000; padding: 16px 32px; border-radius: 12px; text-decoration: none; font-weight: 500; font-size: 16px;">
                                Besøk nettsiden
                            </a>
                        </div>
                    </div>
                </div>
            `,
        };

        // Execute both email sends
        await Promise.all([
            notificationTransporter.sendMail(notificationMailOptions),
            confirmationTransporter.sendMail(confirmationMailOptions),
        ]);

        return NextResponse.json({ message: "E-post sendt suksessfullt!" }, { status: 200 });
    } catch (error: any) {
        console.error("SMTP Error:", error);
        return NextResponse.json(
            { error: "Det oppsto en feil ved sending av e-post. Vennligst prøv igjen senere." },
            { status: 500 }
        );
    }
}
