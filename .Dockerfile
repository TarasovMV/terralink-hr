#STAGE 1
FROM nginx:1.17.1-alpine
WORKDIR /usr/src/app
COPY nginx.conf /etc/nginx/nginx.conf
COPY /dist/terralink-hr/browser /usr/share/nginx/html
