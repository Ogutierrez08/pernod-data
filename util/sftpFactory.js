const config = {
    // host: 'transfer.pramericas.com',
    host: 'transfer-dev.pramericas.com',
    port: '22',
    username: 'pervidasw',
    password: 'VRq7dW1n6B'
}

module.exports = {
    sendSft(fileName){
        let Client = require('ssh2-sftp-client')
        let sftp = new Client()
        sftp.connect(config).then(() => {
            return sftp.put(`./output/${fileName}`,`/${fileName}`,true)
        }).then(() => {
            sftp.end()
        }).catch((err) => {
            console.log(err, 'catch error')
            sftp.end()
        })
    }
}

