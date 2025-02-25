const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs').promises;
const path = require('path');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }

  async sendLibraryConfirmation(library) {
    try {
      // Leer la plantilla HTML
      const templatePath = path.join(__dirname, '../templates/libraryConfirmation.html');
      const template = await fs.readFile(templatePath, 'utf-8');
      
      // Compilar la plantilla con Handlebars
      const compiledTemplate = handlebars.compile(template);
      const html = compiledTemplate({
        libraryName: library.name,
        libraryId: library.id,
        setupLink: `http://localhost:3000/setup-password/${library.id}`,
        libraryData: {
          address: library.address,
          phone: library.phone,
          email: library.email,
          openingHours: library.openingHours
        }
      });

      // Configurar el correo
      const mailOptions = {
        from: `"Sistema de Bibliotecas" <${process.env.SMTP_USER}>`,
        to: process.env.ADMIN_EMAIL,
        subject: `Nueva Biblioteca Registrada: ${library.name}`,
        html: html
      };

      // Enviar el correo
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Correo enviado:', info.messageId);
      return true;
    } catch (error) {
      console.error('Error al enviar el correo:', error);
      throw new Error('Error al enviar el correo de confirmación');
    }
  }
}

module.exports = new EmailService(); 