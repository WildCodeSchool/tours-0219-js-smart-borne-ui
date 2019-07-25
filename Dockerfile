# build
FROM node:10.15.3 AS builder
WORKDIR /workdir
COPY . /workdir
RUN yarn install
RUN yarn build --prod

# run
FROM nginx:1.14.2
RUN sed -i 's|index  index.html index.htm;|index  index.html index.htm;\ntry_files \$uri \$uri/ /index.html;|' /etc/nginx/conf.d/default.conf
COPY --from=builder /workdir/dist/browser /usr/share/nginx/html
