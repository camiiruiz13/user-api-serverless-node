const UserRoute = require('./rest/routes/user_route');

const userRoute = new UserRoute();

module.exports.createUser = async (event) => {
  return userRoute.createUser(event);
};

module.exports.getUsers = async (event) => {
  return userRoute.getUser(event);
};

module.exports.updateUser = async (event) => {
  return userRoute.updateUser(event);
};

module.exports.deleteUser = async (event) => {
  return userRoute.deleteUser(event);
};

module.exports.getUserById = async (event) => {
  return userRoute.getUserById(event);
};

module.exports.sendEmail = async (event) => {
  const AWS = require("aws-sdk");
  const sns = new AWS.SNS();
  const record = event.Records[0];
  const messageBody = JSON.parse(record.body);

  const htmlBody = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; }
          .container { background-color: #ffffff; padding: 20px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
          .footer { font-size: 12px; color: #888888; margin-top: 30px; }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>Confirmación de radicación</h2>
          <p>Hola <strong>${messageBody.name}</strong>,</p>
          <p>Tu solicitud de vinculación ha sido recibida exitosamente.</p>
          <p>Estamos validando la información proporcionada. Te contactaremos próximamente para continuar con la etapa de afiliación.</p>
          <br/>
          <p>Gracias por confiar en nosotros.</p>
          <div class="footer">
            <p>Este correo ha sido enviado desde una cuenta no monitoreada. Por favor, no respondas a este mensaje.</p>
            <p>Enviado por: notificaciones@tuempresa.com</p>
          </div>
        </div>
      </body>
    </html>
  `;

  const params = {
    Message: htmlBody,
    Subject: "Confirmación de radicación",
    TopicArn: process.env.SNS_TOPIC_ARN,
    MessageStructure: "raw",
  };

  try {
    await sns.publish(params).promise();
    console.log("Correo HTML enviado correctamente");
  } catch (error) {
    console.error("Error enviando correo HTML:", error);
    throw error;
  }
};
