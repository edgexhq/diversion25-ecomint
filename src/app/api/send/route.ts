import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const {
    email,
    name,
    certificateId,
    certificateUrl,
    species,
    plantedDate,
    carbonOffset,
  } = (await req.json()) as {
    email: string;
    name: string;
    certificateId: string;
    certificateUrl: string;
    species: string;
    plantedDate: string;
    carbonOffset: number;
  };
  try {
    const { data, error } = await resend.emails.send({
      from: `EcoMint <hi@${process.env.RESEND_DOMAIN}>`,
      to: ["xevenbiswas@gmail.com", email],
      subject: "Hello world",
      html: `
<body
    style="margin: 0; padding: 0; font-family: system-ui, -apple-system, sans-serif; line-height: 1.5; background-color: #f8fafc;">
    <div style="max-width: 600px; margin: 0 auto; background-color: white;">
        <!-- Header -->
        <div style="background-color: #059669; color: white; padding: 24px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">🌳 Your Tree is Growing!</h1>
        </div>

        <!-- Main Content -->
        <div style="padding: 32px 24px; background-color: white;">
            <p style="color: #334155; margin-bottom: 24px;">
                Dear ${name},
            </p>

            <p style="color: #334155; margin-bottom: 24px;">
                Amazing news! Your tree has been successfully planted. You've just taken a meaningful step towards a
                greener future. 🌍
            </p>

            <!-- Impact Stats -->
            <div style="background-color: #ecfdf5; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
                <div style="margin-bottom: 16px;">
                    <h3 style="color: #059669; margin: 0 0 8px 0;">Your Impact:</h3>
                    <p style="color: #334155; margin: 0;">
                        • 1 tree planted<br>
                        • ${carbonOffset} kg of CO2 will be offset<br>
                        • Supporting local biodiversity
                    </p>
                </div>
            </div>

            <!-- Tree Details -->
            <div style="background-color: #f8fafc; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
                <h3 style="color: #059669; margin: 0 0 12px 0;">Tree Details:</h3>
                <p style="color: #334155; margin: 0;">
                    <strong>Species:</strong> ${species}<br>
                    <strong>Planted on:</strong>${plantedDate} <br>
                    <strong>Certificate ID:</strong> ${certificateId}
                </p>
            </div>

            <!-- CTA Button -->
            <div style="text-align: center; margin: 32px 0;">
                <a href="${certificateUrl}"
                    style="background-color: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 500;">View
                    Your Certificate</a>
            </div>

            <p style="color: #334155; margin-bottom: 24px;">
                Your tree will be carefully nurtured and monitored by our local partners. We'll keep you updated on its
                growth and impact.
            </p>

            <p style="color: #334155; margin-bottom: 24px;">
                Thank you for being part of our mission to restore Earth's forests!
            </p>

            <p style="color: #334155;">
                Best regards,<br>
                The EcoMint Team 🌱
            </p>
        </div>

        <!-- Footer -->
        <div style="background-color: #ecfdf5; padding: 24px; text-align: center; color: #059669; font-size: 14px;">
            <p style="margin: 0;">
                Copyright © 2025 EcoMint · Futuristic initiatives to save the Planet :)
            </p>
        </div>
    </div>
</body>
      `,
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
