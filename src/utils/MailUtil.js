// //to,from,subject,text
// const mailer = require('nodemailer');

// ///function

// const sendingMail = async(to,subject,text) => {

//     const transporter = mailer.createTransport({
//         service: 'gmail',
//         auth:{
//             user:"shaivan1909@gmail.com",

//         }
//     })

//     const mailOptions = {
//         from: 'shaivan1909@gmail.com',
//         to: to,
//         subject: subject,
//         text: text
//         //html:"<h1>"+text+"</h1>"
//     }

//     const mailresponse = await transporter.sendMail(mailOptions);
//     console.log(mailresponse);
//     return mailresponse;

// }

// module.exports ={
//     sendingMail
// }

const nodemailer = require('nodemailer');

const sendingMail = async (to, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "shaivan1909@gmail.com",
                pass: "hion aqrt aabh tjkt"
            }
        });

        const mailOptions = {
            from: 'shaivan1909@gmail.com',
            to: to,
            subject: subject,
            text: text
        };

        const mailResponse = await transporter.sendMail(mailOptions);
        console.log("✅ Email Sent Successfully:", mailResponse);
        return mailResponse;
    } catch (error) {
        console.error("🔥 Email Sending Error:", error);
        throw error;
    }
};

module.exports = { sendingMail };











// 
