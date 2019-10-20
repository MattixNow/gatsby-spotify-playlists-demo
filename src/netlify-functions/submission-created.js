require('dotenv').config()
// const fetch = require('node-fetch')
const sendgrid = require('@sendgrid/mail')

const { SENDGRID_API_KEY } = process.env

sendgrid.setApiKey(SENDGRID_API_KEY);

exports.handler = function(event,context,callback) {
    
    //console.log(`Sendgrid API Key ${SENDGRID_API_KEY}`)
    console.log("v7")

    let jsonData = JSON.parse(event.body)
    let request = jsonData.payload
    
    if(request.form_name == 'contact'){
        
        const { name, email, phone, message } = request
        
        let mailParams = {
            to: 'zachary.peyton@gmail.com',
            from: 'Web form <admin@quizmaniapp.com>',
            replyTo: `${name} <${email}>`,
            subject: 'Contact Form',
            text: `${name} - ${email}\n\n ${message}`
        }
        sendgrid.send(mailParams)
        console.log(`Recieved a submission: ${email}`)
    }

    console.log("End Form Submission")
    
    return true
}