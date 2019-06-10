const config = {
    user: 'sa',
    password: 'Inv3rn4l14!',
    server: '162.213.37.77', // You can use 'localhost\\instance' to connect to named instance
    database: 'STRATEGIO_CONTROL_PERNOD',
      
    options: {
        encrypt: false // Use this if you're on Windows Azure
    }
} 

module.exports = {
    Go (queryText,onSuccess, onError) { 
      const sql = require('mssql')
        let p = false
      new sql.ConnectionPool(config).connect().then(pool => {
          p = pool
        return pool.query(queryText)
      }).then(result => {
        if (p) { p.close() }
        onSuccess(result)
      }).catch(err => {
          if (p) { p.close() }
        onError(err)
      })
    }
  }