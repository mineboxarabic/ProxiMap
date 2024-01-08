FROM node:20.10.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001
#install dependencies
RUN npm install
RUN npm rebuild bcrypt --build-from-source
#start app
CMD ["npm", "start"]




