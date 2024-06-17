FROM maven:3.8.5-openjdk-17 AS build
COPY . .
RUN mvn /backend/ clean package/

FROM openjdk:17.0.1-jdk-slim
COPY --from=build /backend/target/backend-0.0.1-SNAPSHOT.jar youtube-clone-backend.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","youtube-clone-backend.jar"]
