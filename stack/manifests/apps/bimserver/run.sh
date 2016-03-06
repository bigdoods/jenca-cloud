docker run -d \
    -e TOMCAT_USER=xxx \
    -e TOMCAT_PASSWORD=xxx \
    -p 8080:8080 \
    --restart=always \
    jenca/docker-bimserver
    