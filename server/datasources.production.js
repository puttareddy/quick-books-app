    module.exports = {
      db: {
        connector: 'loopback-connector-mongodb',
        url: 'mongodb://mongo:27017/demo'
      },
      transient: {
        name: 'transient',
        connector: 'transient'
      }
    };;
