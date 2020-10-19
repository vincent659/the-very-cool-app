FROM ubuntu

ENV DEBIAN_FRONTEND=nointeractive

RUN apt-get update && apt-get install -y \ 
nodejs \
npm \
redis-server \
git

ADD /app /app
WORKDIR /app
RUN npm install
EXPOSE 5000

CMD ["npm", "start"]