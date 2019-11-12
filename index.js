'use strict'
require('dotenv').config()
var express = require('express')
var bodyParser = require('body-parser')
var nodemailer = require('nodemailer')
var app = express()

app.use(bodyParser.urlencoded({ extended: true }))

app.post('/mail', (req, res) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.USER_ES,
      pass: process.env.PASS
    }
  })
  transporter.sendMail({
    from: '"My Awesome Project 👻" <raul.lara.1990@gmail.com>',
    to: req.body.to,
    subject: req.body.subject,
    text: req.body.message
    // you can add any custom template
    // html: `<b>${message}</b>`
  }).then(a => {
    return res.send('Mensaje enviado correctamente')
  }).catch(error => { return res.status(500).send('Todo ha ido mal ' + error) })
})

app.listen(3000, () => {
  console.log('Init service')
})
