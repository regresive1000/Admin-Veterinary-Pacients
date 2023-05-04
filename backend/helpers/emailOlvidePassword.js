import nodemailer from "nodemailer";

const emailOlvidePassword = async ({nombre, token, email}) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
    });

    // Enviar el email
    const info = await transporter.sendMail({
        from: "APV - Administrador de Pacientes de Veterinaria",
        to: email,
        subject: 'Olvide Password - APV',
        text: 'Cambie y recupere su contraseña en APV',
        html: `<p>Hola ${nombre}, recupere su contraseña en APV.</p>
                <p>Para recuperar tu contraseña solo debes ingresar al siguiente enlace: <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Cambiar Contraseña</a> </p>
        `
    });
}

export default emailOlvidePassword;