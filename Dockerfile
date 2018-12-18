FROM node:carbon-alpine

RUN mkdir -p /app

# Set default NODE_ENV to local, we will "fix" this later
# ARG NODE_ENV=local
# ENV NODE_ENV $NODE_ENV

WORKDIR /
COPY package.json package-lock.json* /
RUN npm install -g @angular/cli
RUN npm install

ENV PATH /node_modules/.bin:$PATH

WORKDIR /app
COPY . /app

CMD [ "ng", "serve" ]
