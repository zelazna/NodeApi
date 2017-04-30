# Customers List & Mailchimp Sync # WIP
[![Build Status](https://travis-ci.org/zelazna/NodeApi.svg?branch=develop)](https://travis-ci.org/zelazna/NodeApi)
[![Code Climate](https://codeclimate.com/github/zelazna/NodeApi/badges/gpa.svg)](https://codeclimate.com/github/zelazna/NodeApi)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

### 1. `Dependencies et Requirements`

* Sequelize with postgresql
* Redis
* Node with Express
* Mocha & Chai
* ESLint Standard

#### Installation:

```
$ npm install
```
Copy the .sample.env into .env and fill it with your databases Urls and API keys
for run the test create a .test.env

### 2. `Endpoints`

#### Authentification :

| METHOD | URL          | ACTION                                        |
|--------|--------------|-----------------------------------------------|
| GET    | /login       | get a token for perform request on /customers |

#### CRUD  Operation :

Manage a customers list , the endpoints follow the REST API principles :

| METHOD | URL          | ACTION                        |
|--------|--------------|-------------------------------|
| GET    | /customers   | get all customers             |
| GET    | /customers/1 | get the customer with id 1    |
| POST   | /customers   | create a customer             |
| PUT    | /customers/1 | update the customer with id 1 |
| DELETE | /customers/1 | delete the customer with id 1 |

### 3. `Commands`

run the API ( rely on nodemon for now) :
```
$ npm start
```

launch tests (generate code coverage with istanbul as well) :
```
$ npm test
```

debug the application ( with a debugger statement):
```
$ npm run debug
```

generate credentials:
```
$ ./cli.js username password --save
```
