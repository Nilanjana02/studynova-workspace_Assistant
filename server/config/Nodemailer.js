import nodemailer from "nodemailer";

const transpoter = nodemailer.createTransport({
 
    host:'smtp-relay.brevo.com',
    port:587,
    secure: false, 
    auth:{
        user:process.env.SMTP_USER,
        pass:process.env.SMTP_PASSWORD 
    },
   tls: {
    rejectUnauthorized: false
  }

});
transpoter.verify((error, success) => {
  if (error) {
    console.log("SMTP ERROR:", error);
  } else {
    console.log("SMTP is ready");
  }
});
export default transpoter;
