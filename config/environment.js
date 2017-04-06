const environment = process.env.ENVIROMNENT || 'DEVELOPMENT'

require(`./environments/${environment.toLowerCase()}`)
