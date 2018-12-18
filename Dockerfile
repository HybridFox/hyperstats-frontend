FROM node:carbon-alpine

RUN mkdir -p /app

# Set default NODE_ENV to local, we will "fix" this later
# ARG NODE_ENV=local
# ENV NODE_ENV $NODE_ENV

WORKDIR /
COPY package.json package-lock.json* .npmrc /
RUN npm install --silent
ENV PATH /node_modules/.bin:$PATH

WORKDIR /app
COPY . /app

CMD [ "node", "index.js" ]
