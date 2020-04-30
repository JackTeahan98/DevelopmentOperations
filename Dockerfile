FROM node:7-onbuild

LABEL maintainer "jteahan98@gmail.com"

HEALTHCHECK --interval=5s \
            --timeout=5s \
            CMD curl -f http:127.0.0.1:3000 || exit 1
            
          RUN curl -fsSLO https://get.docker.com/builds/Linux/x86_64/docker-17.04.0-ce.tgz \
  && tar xzvf docker-17.04.0-ce.tgz \
  && mv docker/docker /usr/local/bin \
  && rm -r docker docker-17.04.0-ce.tgz

          
EXPOSE 3000


