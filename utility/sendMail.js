const nodemailer = require("nodemailer");




const sendMail = async (email, subject, text) => {

	const transporter = nodemailer.createTransport({
		host: 'smtp.ethereal.email',
		port: 587,
		auth: {
			user: 'aniya.rodriguez15@ethereal.email',
			pass: 'H226cAvGqRfN3h7nF7'
		}
	});

	const options = {
		frome: "aniya.rodriguez15@ethereal.email",
		to: email,
		subject,
		text
	}

	var info = await transporter.sendMail(options);
	return info;
}

module.exports = sendMail;
