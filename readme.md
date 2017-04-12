# Customers List & Mailchimp Sync # WIP
[![Build Status](https://travis-ci.org/zelazna/NodeApi.svg?branch=master)](https://travis-ci.org/zelazna/NodeApi)

* Sequelize
* Express
* Mocha & Chai

### Commands

run the API ( rely on nodemon for now)
```
$ npm test
```
launch tests (generate code coverage with istanbul as well )
```
$ npm test
```
debug the application
```
$ DEBUG=express* node index.js
```
lint files
```
$ ./node_modules/.bin/eslint --fix --no-ignore filename
```

### TODO

* basic Auth & tokens managment with redis
* externalize MailchimpClient
* complete tests
