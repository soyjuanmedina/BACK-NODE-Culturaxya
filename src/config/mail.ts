import nodemailer from 'nodemailer';

export const transporter=nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'culturaxya@gmail.com',
    pass: 'aktn dsmh xspu jwwq'
  }
});
