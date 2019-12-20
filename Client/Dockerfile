FROM node:12.2.0-alpine

# Define Workdir
WORKDIR /app

# Use ENV PATH for now
ENV PATH /app/node_modules/.bin:$PATH

# Copy package.json to Workdir
COPY package.json /app/package.json

# Install packages
RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent

# Expose Container to 5005
EXPOSE 5005

CMD [ "npm", "start" ]