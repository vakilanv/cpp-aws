FROM openjdk:17-jdk-slim
WORKDIR /app
COPY target/backend-java-1.0.0.jar backend-java.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "backend-java.jar"]