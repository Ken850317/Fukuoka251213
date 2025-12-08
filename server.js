const express = require('express');
const path = require('path');

const app = express();

// Cloud Run 會透過 process.env.PORT 提供連接埠號碼
const port = process.env.PORT || 8080;

// 設定靜態檔案的根目錄
app.use(express.static(path.join(__dirname, '/')));

// 將所有未匹配的路由都導向 index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'fukuoka-trip-planner.html'));
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});