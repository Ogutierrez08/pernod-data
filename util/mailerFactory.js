module.exports = {
    envioData: (array, onSuccess) => {
        var data = array.map( Element => {
            return ("CODIGO DISTRIBUIDOR: "+ Element.CODIGODISTRIBUIDOR
                  + '|'
                  +"CODIGO PRODUCTO: "+ Element.CODIGOPRODUCTODISTRIBUIDOR
                  + '|'
                  +"DESCRIPCION: "+ Element.DESCRIPCION
                  + '|'
                  +"CODIGOEAN: "+ Element.CODIGOEAN
                  ).split('|') 
        }).join('') + '\n'
        
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
            subject: 'dataJS Pernod',
            text: 'Tabla',
            html: `<p>${data}</p>`
            
        }
        transport.sendMail(msg, (err) => {
            if(err) console.log(err)
            onSuccess()
        })
    }
}


