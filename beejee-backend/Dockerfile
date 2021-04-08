FROM node:14-alpine
WORKDIR /app
COPY . ./
RUN npm install -g typescript
RUN npm install
EXPOSE 9090;
CMD npm run start;