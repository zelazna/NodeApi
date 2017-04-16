const environment = process.env.NODE_ENV || 'DEVELOPMENT'

require(`./environments/${environment.toLowerCase()}`)
