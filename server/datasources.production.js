    module.exports = {
      db: {
        connector: 'loopback-connector-mongodb',
        url: process.env.MONGO_DB_URL
      },
      transient: {
        name: 'transient',
        connector: 'transient'
      }
    };;
