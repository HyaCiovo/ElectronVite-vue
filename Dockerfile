# 使用 Node.js 16 作为基础镜像
FROM node:16 AS build

# 设置工作目录
WORKDIR /app

# 复制package.json和package-lock.json文件
COPY package*.json ./

# 安装依赖项
RUN npm install

# 将项目文件复制到容器中
COPY . .

# # 安装依赖并构建项目
# RUN npm install && npm run build

# # 使用 Nginx 作为运行时镜像
# FROM nginx:stable

# # 复制构建好的前端项目
# COPY --from=build /app/dist /usr/share/nginx/html

# # 复制 Nginx 配置文件
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露 Nginx 的监听端口
EXPOSE 80

# # 启动 Nginx
# CMD ["nginx", "-g", "daemon off;"]

# 启动服务
CMD ["npm","run","dev"]