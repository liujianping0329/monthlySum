# 使用官方 OpenJDK 21 运行时作为父镜像
FROM openjdk:21-slim

# 设置工作目录
WORKDIR /app

# 将构建好的 JAR 文件复制到容器中
COPY target/monthlySum-0.0.1-SNAPSHOT.jar /app/monthlySum-0.0.1-SNAPSHOT.jar

# 使端口 8080 可供此容器外的环境使用
EXPOSE 8080

# 在容器启动时运行应用程序
CMD ["java", "-jar", "monthlySum-0.0.1-SNAPSHOT.jar"]