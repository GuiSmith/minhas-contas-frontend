FROM node:latest as build
WORKDIR /frontend
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:latest
COPY --from=build /frontend/build /usr/share/nginx/html
EXPOSE 80