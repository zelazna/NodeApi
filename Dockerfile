FROM node:8.6

# set working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# add requirements (to leverage Docker cache)
ADD ./package.json /usr/src/app/package.json

# install requirements
RUN npm install

# add app
ADD . /usr/src/app

# run server
CMD npm start
