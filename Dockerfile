# 使用官方的 Nginx 映像檔作為基礎
# Nginx 是一個非常輕量且高效的網頁伺服器
FROM nginx:1.25-alpine

# 將您的網頁相關檔案複製到 Nginx 預設的網站根目錄
COPY ./fukuoka-trip-planner.html /usr/share/nginx/html/index.html
COPY ./main.js /usr/share/nginx/html/main.js
COPY ./itinerary-data.js /usr/share/nginx/html/itinerary-data.js

# 告訴 Cloud Run，您的服務將在哪個 port 上運行 (Nginx 預設為 80)
EXPOSE 80