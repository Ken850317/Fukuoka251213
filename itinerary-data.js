const tripData = {
    // 預算分配
    budget: {
        jpyRate: 4.7, // 匯率
        items: [
            { category: "機票", amount: 72000, description: "TWD 12,000 / 每人" },
            { category: "交通", amount: 18144, description: "日本國內交通" },
            { category: "住宿", amount: 23366, description: "京都屋" },
            { category: "住宿", amount: 15177, description: "靜鐵PREZIO" }
        ]
    },
    // 交通資訊
    transportation: {
        flights: {
            departure: "CI 110 (12/13 06:50 TPE → 10:00 FUK)",
            return: "CI 117 (12/17 20:35 FUK → 22:20 TPE)"
        },
        passes: [
            "九州3日JR Pass (北九州)",
            "福岡機場 ⇄ 博多車站 地鐵乘車券"
        ],
        notes: "11/15 Nash/小陳已付 ¥12,847 住宿費給阿啾。"
    },
    // 住宿資訊
    accommodation: [
        {
            dates: "12/13 - 12/15",
            name: "百年溫泉旅館 京都屋",
            description: "位於武雄溫泉的傳統日式旅館。",
            mapLink: "https://maps.app.goo.gl/MBTCPWAJGxtcnSKu8"
        },
        {
            dates: "12/15 - 12/17",
            name: "博多站前靜鐵PREZIO飯店",
            description: "位於博多車站附近的現代化飯店。",
            mapLink: "https://maps.app.goo.gl/Kco2HLEARREGqReE7"
        }
    ],
    // 每日行程
    itinerary: [
        {
            day: 1,
            date: "12/13 (五)",
            theme: "抵達福岡，前往武雄溫泉",
            schedule: [
                {
                    time: "中午",
                    activity: "博多車站午餐 & 準備",
                    description: "午餐推薦：鐵板燒 天神內臟。同時完成 JR Pass 劃位並購買努努雞。",
                    duration: "約 2-3 小時",
                    transport: "步行",
                    mapLink: "https://maps.app.goo.gl/orveDgkH829tuRzw7"
                },
                {
                    time: "下午",
                    activity: "前往武雄溫泉 & Check-in",
                    description: "搭乘 JR 前往武雄溫泉，入住「百年溫泉旅館 京都屋」。",
                    duration: "約 1.5 小時",
                    transport: "JR 特急列車",
                    mapLink: "https://maps.app.goo.gl/MBTCPWAJGxtcnSKu8"
                },
                {
                    time: "晚上",
                    activity: "武雄市區散策",
                    description: "自由探索武雄圖書館、武雄溫泉樓門等景點。",
                    duration: "自由安排",
                    transport: "步行",
                    mapLink: "https://www.google.com/maps/search/?api=1&query=武雄溫泉"
                }
            ]
        },
        {
            day: 2,
            date: "12/14 (六)",
            theme: "分組一日遊 (長崎/佐賀/豪斯登堡)",
            schedule: [
                {
                    time: "全日",
                    activity: "自由選擇目的地一日遊",
                    description: "可選擇前往長崎體驗異國風情、佐賀進行文青歷史之旅，或前往豪斯登堡享受夢幻樂園。詳細路線請參考總覽。",
                    duration: "全天",
                    transport: "JR 特急列車 / 新幹線",
                    mapLink: "https://www.google.com/maps/search/?api=1&query=長崎"
                }
            ]
        },
        {
            day: 3,
            date: "12/15 (日)",
            theme: "返回博多，天神下午茶",
            schedule: [
                {
                    time: "上午",
                    activity: "返回博多 & 寄放行李",
                    description: "在武雄享用早餐後，搭車返回博多，並前往「博多站前靜鐵PREZIO飯店」寄放行李。",
                    duration: "約 2-3 小時",
                    transport: "JR 特急列車",
                    mapLink: "https://maps.app.goo.gl/Kco2HLEARREGqReE7"
                },
                {
                    time: "16:15",
                    activity: "炭劇場 武藏坐 (端爐下午茶)",
                    description: "已預約。從博多車站搭乘地鐵至天神南站後步行前往。",
                    duration: "約 2 小時",
                    transport: "地鐵 + 步行",
                    mapLink: "https://maps.app.goo.gl/DrmKzv1ZQVcccFXN6"
                },
                {
                    time: "晚上",
                    activity: "天神/博多自由活動",
                    description: "在下午茶後，自由探索天神或博多地區的商店與景點。",
                    duration: "約 3-4 小時",
                    transport: "步行 / 地鐵",
                    mapLink: "https://www.google.com/maps/search/?api=1&query=天神"
                },
                {
                    time: "22:00",
                    activity: "晚餐：藥院燒肉 NIKUICHI",
                    description: "享用美味的燒肉晚餐。",
                    duration: "約 1.5 小時",
                    transport: "地鐵 / 步行",
                    mapLink: "https://maps.app.goo.gl/dzvtJJwMFXHGZ5EY7"
                }
            ]
        },
        {
            day: 4,
            date: "12/16 (一)",
            theme: "小倉一日遊，旦過市場美食",
            schedule: [
                {
                    time: "早上",
                    activity: "旦過市場 & 小倉城",
                    description: "搭乘新幹線前往小倉，在旦過市場享用早午餐，下午參觀小倉城。",
                    duration: "約 7 小時",
                    transport: "新幹線 + 步行",
                    mapLink: "https://www.google.com/maps/search/?api=1&query=旦過市場"
                },
                {
                    time: "18:00",
                    activity: "晚餐：座離宮 博多本店 (已預約)",
                    description: "返回博多後享用精緻晚餐。",
                    duration: "約 2 小時",
                    transport: "地鐵 / 步行",
                    mapLink: "https://maps.app.goo.gl/KcAWPPDG5tcGNjzc9"
                },
                {
                    time: "22:00",
                    activity: "宵夜場：中洲屋台 (可選)",
                    description: "如果晚餐後仍有餘裕，可以體驗福岡特色的屋台文化。",
                    duration: "自由安排",
                    transport: "步行",
                    mapLink: "https://maps.app.goo.gl/8ZyRZnCr6UXntLuU9"
                }
            ]
        },
        {
            day: 5,
            date: "12/17 (二)",
            theme: "自由購物，滿載而歸",
            schedule: [
                {
                    time: "白天",
                    activity: "自由活動 & 最後購物",
                    description: "把握最後時間購物或探索感興趣的地點，如手工材料店 Torai Amu Sankakuya。",
                    duration: "自由安排",
                    transport: "步行 / 地鐵",
                    mapLink: "https://maps.app.goo.gl/bwbQFjZHiE1bpxHa6"
                },
                {
                    time: "17:30",
                    activity: "集合，前往福岡機場",
                    description: "準備搭機返回台灣。",
                    duration: "約 3 小時",
                    transport: "地鐵",
                    mapLink: "https://www.google.com/maps/search/?api=1&query=福岡空港"
                }
            ]
        }
    ],

    // 美食地圖
    food: [
        { name: "鐵板燒 天神內臟 博多一番街", category: "正餐", description: "Day 1 午餐，位於博多車站內的熱門鐵板燒。", mapLink: "https://maps.app.goo.gl/orveDgkH829tuRzw7", coords: { lat: 33.5897, lng: 130.4206 } },
        { name: "努努雞", category: "點心", description: "Day 1 購買，福岡特色冷炸雞。", mapLink: "https://maps.app.goo.gl/ZXq8sLeEFiHetFxz7", coords: { lat: 33.5898, lng: 130.4213 } },
        { name: "炭劇場 武藏坐", category: "下午茶", description: "Day 3 下午茶，體驗日式端爐燒。", mapLink: "https://maps.app.goo.gl/DrmKzv1ZQVcccFXN6", coords: { lat: 33.5873, lng: 130.4023 } },
        { name: "藥院燒肉 NIKUICHI", category: "燒肉", description: "Day 3 晚餐，高人氣燒肉店。", mapLink: "https://maps.app.goo.gl/dzvtJJwMFXHGZ5EY7", coords: { lat: 33.5818, lng: 130.4002 } },
        { name: "座離宮 博多本店", category: "正餐", description: "Day 4 晚餐，氣氛佳的居酒屋。", mapLink: "https://maps.app.goo.gl/KcAWPPDG5tcGNjzc9", coords: { lat: 33.5931, lng: 130.4181 } },
        { name: "中洲屋台", category: "宵夜", description: "Day 4 宵夜，體驗福岡道地路邊攤文化。", mapLink: "https://maps.app.goo.gl/8ZyRZnCr6UXntLuU9", coords: { lat: 33.5925, lng: 130.4075 } }
    ]
};
