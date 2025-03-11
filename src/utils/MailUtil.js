//to,from,subject,text
const mailer = require('nodemailer');

///function

const sendingMail = async(to,subject,text) => {

    const transporter = mailer.createTransport({
        service: 'gmail',
        auth:{
            user:"shaivan1909@gmail.com",
            pass:"Shaiv@nR@#1909"
        }
    })

    const mailOptions = {
        from: 'shaivan1909@gmail.com',
        to: to,
        subject: subject,
        text: text
        //html:"<h1>"+text+"</h1>"
    }

    const mailresponse = await transporter.sendMail(mailOptions);
    console.log(mailresponse);
    return mailresponse;

}

module.exports ={
    sendingMail
}