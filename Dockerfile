# 使用官方的 Node.js 18 LTS (長期支援) 版本作為基礎映像
FROM node:18-slim

# 在容器中建立一個工作目錄
WORKDIR /usr/src/app

# 複製 package.json 和 package-lock.json (如果有的話)
COPY package*.json ./

# 安裝專案相依套件
RUN npm install

# 將所有專案檔案複製到工作目錄
COPY . .

# 容器啟動時要執行的指令
CMD [ "npm", "start" ]