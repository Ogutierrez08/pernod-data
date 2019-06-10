let sql = require('../util/sqlFactory')
let ftp = require('../util/sftpFactory')
let fs = require('fs')
let mail = 'oscar.vidasoft@gmail.com'
let dataClient = []
let dataStock = []
let dataVentas = []
let dataParam = [`${mail}`]
let d = new Date()
let diaActual = '20190531'
// if(d.getMonth() + 1 >= 10){
//  diaActual = d.getFullYear() + '' + (d.getMonth() + 1) + '' + d.getDate()    
// }else {
//   diaActual = d.getFullYear() + '0' + (d.getMonth() + 1) + '' + d.getDate()
// } 



generateParameter = (onSuccess) => {
    console.log('Cargando info PARAMETER...')
    sql.Go(`EXEC PERNOD_FECHAS`, (result) => {
        result.recordset.map(element => {
            dataParam.push(element["FECHAINICIAL"])
            dataParam.push(element["FECHAFINAL"])
            diaActual = element["FECHADATA"]
        })
        onSuccess()
    }, (err) => {
        console.log(err)
    })
}

generateVentas = (onSuccess) => {
    console.log('Cargando info VENTAS...')
    sql.Go(`EXEC PERNOD_VENTAS`,(result) => {
        result.recordset.forEach(element => {
            dataVentas.push(element)
        })
        onSuccess()
    },(err) => {
        console.log(err)
    })
}

generateStock = (onSuccess) => {
    console.log('Cargando info STOCK...')
    sql.Go(`EXEC PERNOD_STOCK`,(result) => {
        result.recordset.forEach(element => {
            dataStock.push(element)
        })
        onSuccess()
    },(err) => {
        console.log(err)
    })
}

generateClient = (onSuccess) => {
    console.log('Cargando info CLIENT...')
    sql.Go(`EXEC PERNOD_CLIENT`,(result) => {
        result.recordset.forEach(element => {
            dataClient.push(element)
        })
        onSuccess()
    },(err) => {
        console.log(err)
    })
}


generateVentas(() => {
    generateClient(() => {
        generateStock(() => {
            generateParameter(() => {
                //ORDER
                fs.writeFileSync(`./output/PERU_VS_ORDER_${diaActual}.txt`,dataVentas.map((element) => {
                    return Object.values(element).join(';') + '\n'
                }).join('')     
                )
                ftp.sendSft(`PERU_VS_ORDER_${diaActual}.txt`)

                //STOCK
                fs.writeFileSync(`./output/PERU_VS_STOCK_${diaActual}.txt`,dataStock.map((element) => {
                    return Object.values(element).join(';') + '\n'
                }).join('')     
                )
                ftp.sendSft(`PERU_VS_STOCK_${diaActual}.txt`)

                //CUSTOMER
                fs.writeFileSync(`./output/PERU_VS_CUSTOMER_${diaActual}.txt`,dataClient.map((element) => {
                    return Object.values(element).join(';') + '\n'
                }).join('')
                )                
                ftp.sendSft(`PERU_VS_CUSTOMER_${diaActual}.txt`)
                
                //ODERPROMO - AUN NO SE UTILIZA, ASI QUE NO SE ENVIA ( JOEL SAID IT )
                //ftp.sendSft(`PERU_VS_ORDERPROMO_${diaActual}.txt`)

                //STOCKPROMO - AUN NO SE UTILIZA, ASI QUE NO SE ENVIA ( JOEL SAID IT )
                //ftp.sendSft(`PERU_VS_STOCKPROMO_${diaActual}.txt`)

                //PARAMETER-FILES
                dataParam.push(`PERU_VS_ORDER_${diaActual}.txt`+'#'
                              +`PERU_VS_STOCK_${diaActual}.txt`+'#'
                              +`PERU_VS_CUSTOMER_${diaActual}.txt`+'#'
                              //+`PERU_VS_ORDERPROMO_${diaActual}.txt`+'#' 
                              //+`PERU_VS_STOCKPROMO_${diaActual}.txt`+'#'
                              +'\n')

                //PARAMETER
                fs.writeFileSync(`./output/PERU_VS_PARAMETER.txt`,dataParam.map((element) => {
                    return Object.values(element).join('')
                }).join(';')
                )
                ftp.sendSft(`PERU_VS_PARAMETER.txt`)
                console.log('PROCESO TERMINADO...')
            })
        })
    })
})

