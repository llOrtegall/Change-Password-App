FROM node:slim

# Create app directory
WORKDIR /app

# Install app dependencies
COPY . .

RUN yarn && yarn build

EXPOSE 4010

CMD [ "yarn", "preview" ]