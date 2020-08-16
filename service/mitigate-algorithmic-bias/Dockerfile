FROM openjdk:11.0-jdk
ADD ./target/mitigate-algorithmic-bias-0.0.1-SNAPSHOT.jar /cfce/mitigate-algorithmic-bias/mitigate-algorithmic-bias-0.0.1-SNAPSHOT.jar
WORKDIR /cfce/mitigate-algorithmic-bias
EXPOSE 8082
ENTRYPOINT ["java", "-jar", "mitigate-algorithmic-bias-0.0.1-SNAPSHOT.jar"]
