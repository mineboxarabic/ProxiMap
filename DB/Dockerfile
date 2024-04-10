FROM node
WORKDIR /app

COPY GenerateData.js ./
COPY USERS_DATA.js ./
COPY CATEGORIES_DATA.js ./
COPY SERVICES_DATA.js ./
COPY CHATS_DATA.js ./
COPY MESSAGES_DATA.js ./

RUN npm init -y
RUN apt-get update && apt-get install -y jq
RUN jq '. + {"type":"module"}' package.json > temp.json && mv temp.json package.json
RUN npm install --save-dev @faker-js/faker
RUN npm install mongodb
RUN npm install mongoose
RUN npm install -g nodemon
RUN npm install express
CMD ["node", "GenerateData.js"]
