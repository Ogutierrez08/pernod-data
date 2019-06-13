module.exports = {
    envioData: (array, onSuccess) => {               
        var nodemailer = require('nodemailer')
        let transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'oscar.biondi.vidasoft@gmail.com',
                pass: 'Invernalia!OB19'
            }
        })
        var msg = {
            from: 'oscar.biondi.vidasoft@gmail.com',
            to: 'oscar.biondi.vidasoft@gmail.com',
            subject: 'TESTING ONLY MAILER',
            text: 'Tabla',
            html: `<b>Los siguientes productos no tienen homologacion: </b><br/><br/><br/>`            
        }
        if(array.length > 0){
            var tableBody = "<table style='width:100%; border: 1px solid black; border-collapse: collapse;'><tr>";
            tableBody += "<th style='border: 1px solid black; border-collapse: collapse; padding: 5px; text-align: left;'>DISTRIBUIDOR</th>"
            tableBody += "<th style='border: 1px solid black; border-collapse: collapse; padding: 5px; text-align: left;'>PRODUCTO</th>"
            tableBody += "<th style='border: 1px solid black; border-collapse: collapse; padding: 5px; text-align: left;'>DESCRIPCION</th>"
            tableBody += "<th style='border: 1px solid black; border-collapse: collapse; padding: 5px; text-align: left;'>EAN</th></tr>"
            for(var i=0; i<array.length; i++){
                tableBody += "<tr>";
                tableBody += "<td style='border: 1px solid black; border-collapse: collapse; padding: 5px; text-align: left;'>" + array[i].CODIGODISTRIBUIDOR + "</td>"
                tableBody += "<td style='border: 1px solid black; border-collapse: collapse; padding: 5px; text-align: left;'>" + array[i].CODIGOPRODUCTODISTRIBUIDOR + "</td>"
                tableBody += "<td style='border: 1px solid black; border-collapse: collapse; padding: 5px; text-align: left;'>" + array[i].DESCRIPCION + "</td>"
                tableBody += "<td style='border: 1px solid black; border-collapse: collapse; padding: 5px; text-align: left;'>" + array[i].CODIGOEAN + "</td>"
                tableBody += "</tr>";
            }
            tableBody += "</table><br/><br/>"
            msg.html += tableBody

            transport.sendMail(msg, (err) => {
                if(err) {
                    msg.subject = 'ERROR EN MAILER PERNOD'
                    msg.html = `${err}`
                }
                onSuccess()
            })
        }
        else {
            msg.subject = 'Data Pernod no cuenta con productos no Homologados'
            msg.html = '<b>No hay productos que les falte CODIGO PERNOD</b><br/>'
            transport.sendMail(msg, (err) => {
                if(err) {
                    msg.subject = 'ERROR EN MAILER PERNOD'
                    msg.html = `${err}`
                }
                onSuccess()
            })
        }
    }
}


