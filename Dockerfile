FROM node:8.6

# set working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json package-lock.json ./

# install requirements
RUN npm install

# add app
ADD . /usr/src/app

EXPOSE 8080
# run server
CMD npm start
