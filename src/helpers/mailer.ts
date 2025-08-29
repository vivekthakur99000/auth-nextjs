import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 360000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 360000,
      });
    }

    // Looking to send emails in production? Check out our Email API/SMTP product!
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });

    // ...existing code...
    const mailOptions = {
      from: "vivek@gmail.com",
      to: email,
      subject:
      emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `
            <div style="font-family: Arial, sans-serif; padding: 20px;">
                <h2>Email Verification</h2>
                <p>Thank you for registering! Please click the button below to verify your email address:</p>
                <a href="${
                  process.env.DOMAIN
                }/verifyemail?token=${hashedToken}" 
                   style="display:inline-block;padding:10px 20px;background:#4F46E5;color:#fff;text-decoration:none;border-radius:5px;">
                   ${
                     emailType === "VERIFY"
                       ? "Verify your email"
                       : "Reset your password"
                   }
                </a>
                <p>If you did not request this, please ignore this email.
                or copy or past link in the browser <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
                </p>
            </div>
        `,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
