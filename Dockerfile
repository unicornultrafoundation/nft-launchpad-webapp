FROM node:18.17-alpine3.17
RUN apk add git
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
ENV NODE_OPTIONS=--max_old_space_size=3072
RUN npm run build
CMD ["npm", "start"]
