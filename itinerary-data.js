const tripData = {
    // 預算與金流
    budget: {
        title: "費用明細 (六人總額)",
        jpyRate: 4.7, // 預估匯率 1 TWD ≈ 4.7 JPY (用於換算參考)
        items: [
            { category: '住宿', description: '京都屋 (TWD 23,366) + 靜鐵PREZIO (TWD 15,177)', amount: 38543, currency: 'TWD' },
            { category: '交通', description: '機票 (TWD 12,000/人)', amount: 72000, currency: 'TWD' },
            { category: '交通', description: '日本國內交通', amount: 18144, currency: 'TWD' },
            { category: '餐飲', description: '預估餐飲費', amount: 20000, currency: 'JPY' }
        ],
        notes: [
            "機票與住宿費用已付清。",
            "金流狀態: 11/15 Nash/小陳已支付 ¥12,847 住宿費給阿啾"
        ]
    },

    // 住宿資訊
    accommodation: [
        {
            name: "百年溫泉旅館 京都屋",
            dates: "12/13 - 12/15 (2晚)",
            mapLink: "https://maps.app.goo.gl/MBTCPWAJGxtcnSKu8?g_st=ipc",
            description: "位於武雄溫泉，體驗傳統日式溫泉旅館。"
        },
        {
            name: "博多站前靜鐵PREZIO飯店",
            dates: "12/15 - 12/17 (2晚)",
            mapLink: "https://maps.app.goo.gl/Kco2HLEARREGqReE7?g_st=ipc",
            description: "鄰近博多車站，交通便利的現代化飯店。"
        }
    ],

    // 交通資訊
    transportation: {
        flights: {
            departure: "臺灣桃園 (TPE) CI 110 → 福岡 (FUK) | 12/13 06:50 - 10:00",
            return: "福岡 (FUK) CI 117 → 臺灣桃園 (TPE) | 12/17 20:35 - 22:20"
        },
        passes: [
            "九州3日JR Pass (北九州)",
            "福岡機場 ⇄ 博多車站 地鐵乘車券"
        ],
        notes: "建議準備 SUICA 或 ICOCA 等全國通用的 IC 卡，用於搭乘 JR Pass 範圍外的交通工具。"
    },

    // 每日行程
    itinerary: [
        {
            day: 1,
            theme: "抵達福岡，直奔武雄溫泉",
            date: "12/13 (五)",
            schedule: [
                {
                    time: "10:00 - 11:30",
                    activity: "抵達福岡機場 (FUK)",
                    description: "辦理入境手續，領取行李後搭乘地鐵前往博多車站。",
                    duration: "約 1.5 小時",
                    transport: "地鐵機場線",
                    mapLink: "https://www.google.com/maps/search/?api=1&query=Fukuoka+Airport"
                },
                {
                    time: "11:30 - 14:00",
                    activity: "博多車站午餐 & 任務",
                    description: "在車站享用午餐 (推薦：鐵板燒天神內臟)，並完成 JR Pass 劃位、購買努努雞等任務。",
                    duration: "約 2.5 小時",
                    transport: "步行",
                    mapLink: "https://maps.app.goo.gl/orveDgkH829tuRzw7"
                },
                {
                    time: "14:00 - 16:00",
                    activity: "前往武雄溫泉 & Check-in",
                    description: "搭乘JR特急列車前往武雄溫泉，並入住「百年溫泉旅館 京都屋」。",
                    duration: "約 2 小時",
                    transport: "JR特急列車",
                    mapLink: "https://maps.app.goo.gl/MBTCPWAJGxtcnSKu8?g_st=ipc"
                },
                {
                    time: "16:00 - 晚上",
                    activity: "武雄市區漫遊",
                    description: "在溫泉小鎮輕鬆漫步，可探訪知名的武雄圖書館、武雄溫泉樓門等景點。",
                    duration: "自由安排",
                    transport: "步行",
                    mapLink: "https://www.google.com/maps/search/?api=1&query=Takeo+Onsen+Romon"
                }
            ]
        },
        {
            day: 2,
            theme: "兵分多路大冒險 (長崎/佐賀/豪斯登堡)",
            date: "12/14 (六)",
            schedule: [
                {
                    time: "全日",
                    activity: "分組一日遊",
                    description: "使用JR Pass進行一日遊，可選擇長崎、佐賀或豪斯登堡等目的地，晚上返回武雄溫泉。",
                    duration: "全天",
                    transport: "JR (使用JR Pass)",
                    mapLink: "https://www.google.com/maps/search/?api=1&query=Nagasaki"
                },
                {
                    time: "長崎組",
                    activity: "長崎組路線參考",
                    description: "10:01搭乘新幹線出發(約30分抵達)。午餐後遊覽眼鏡橋、原爆資料館、平和公園。傍晚前往稻佐山欣賞夜景，晚餐後搭乘21:18班次回武雄(末班車22:10)。",
                    duration: "參考行程",
                    transport: "JR、長崎路面電車",
                    mapLink: "https://www.google.com/maps/search/?api=1&query=Mount+Inasa"
                }
            ]
        },
        {
            day: 3,
            theme: "返回博多，美食與自由之夜",
            date: "12/15 (日)",
            schedule: [
                {
                    time: "上午",
                    activity: "返回博多 & 寄放行李",
                    description: "在武雄享用早餐後，搭乘JR返回博多。先至「博多站前靜鐵PREZIO飯店」寄放行李。",
                    duration: "至 15:30",
                    transport: "JR、地鐵",
                    mapLink: "https://maps.app.goo.gl/Kco2HLEARREGqReE7?g_st=ipc"
                },
                {
                    time: "16:15",
                    activity: "下午茶：炭劇場 武藏坐 (已預約)",
                    description: "享受獨特的日式端爐下午茶體驗。",
                    duration: "約 1.5 小時",
                    transport: "從博多車站搭地鐵至天神南站，步行前往 (總路程約20分鐘)。",
                    mapLink: "https://maps.app.goo.gl/DrmKzv1ZQVcccFXN6?g_st=ipc"
                },
                {
                    time: "18:00 - 22:00",
                    activity: "天神/博多自由活動",
                    description: "在下午茶後，可於天神地區自由逛街購物，稍作休息。",
                    duration: "至 22:00",
                    transport: "步行/地鐵",
                    mapLink: "https://www.google.com/maps/search/?api=1&query=Tenjin"
                },
                {
                    time: "22:00",
                    activity: "晚餐：藥院燒肉 NIKUICHI 博多店",
                    description: "品嚐高品質的美味燒肉，為一天畫下完美的句點。",
                    duration: "約 2 小時",
                    transport: "步行/地鐵",
                    mapLink: "https://maps.app.goo.gl/dzvtJJwMFXHGZ5EY7?g_st=ipc"
                }
            ]
        },
        {
            day: 4,
            theme: "北九州探險：旦過市場與小倉城",
            date: "12/16 (一)",
            schedule: [
                {
                    time: "09:30 - 12:00",
                    activity: "前往小倉 & 旦過市場",
                    description: "從博多搭乘新幹線或JR特急至小倉，步行至有「北九州的廚房」之稱的旦過市場享用早午餐。",
                    duration: "約 2.5 小時",
                    transport: "JR (使用JR Pass)",
                    mapLink: "https://www.google.com/maps/search/?api=1&query=Tanga+Market"
                },
                {
                    time: "12:00 - 16:30",
                    activity: "小倉城周邊散策",
                    description: "集合後前往小倉城，參觀城堡本身及其周邊的八坂神社、松本清張紀念館等景點。",
                    duration: "約 4 小時",
                    transport: "步行",
                    mapLink: "https://www.google.com/maps/search/?api=1&query=Kokura+Castle"
                },
                {
                    time: "16:30 - 18:00",
                    activity: "返回博多",
                    description: "從小倉車站集合，搭乘JR返回博多，準備享用晚餐。",
                    duration: "約 1 小時",
                    transport: "JR (使用JR Pass)",
                    mapLink: "https://www.google.com/maps/search/?api=1&query=Kokura+Station"
                },
                {
                    time: "18:00",
                    activity: "晚餐：座離宮 博多本店 (已預約)",
                    description: "享用氣氛絕佳的精緻日式料理晚餐。",
                    duration: "約 2 小時",
                    transport: "從博多車站搭乘地鐵或步行前往 (路程約20分鐘)。",
                    mapLink: "https://maps.app.goo.gl/KcAWPPDG5tcGNjzc9?g_st=ipc"
                },
                {
                    time: "22:00",
                    activity: "宵夜場：中洲屋台",
                    description: "如果還沒吃飽，可以到中洲體驗福岡獨特的屋台文化。",
                    duration: "自由安排",
                    transport: "步行/地鐵",
                    mapLink: "https://maps.app.goo.gl/8ZyRZnCr6UXntLuU9?g_st=ipc"
                }
            ]
        },
        {
            day: 5,
            theme: "最後衝刺，滿載而歸",
            date: "12/17 (二)",
            schedule: [
                {
                    time: "上午 - 17:30",
                    activity: "自由活動 & 購物",
                    description: "最後的購物衝刺時間！可前往 Torai Amu Sankakuya (手工材料店)，或在博多車站、運河城、天神地區購買伴手禮。",
                    duration: "大半天",
                    transport: "步行/地鐵",
                    mapLink: "https://maps.app.goo.gl/bwbQFjZHiE1bpxHa6"
                },
                {
                    time: "17:30",
                    activity: "集合，前往福岡機場",
                    description: "整理行囊，準備搭機返回台灣，結束愉快的社畜解放之旅。",
                    duration: "約 3 小時",
                    transport: "地鐵機場線",
                    mapLink: "https://www.google.com/maps/search/?api=1&query=Fukuoka+Airport"
                }
            ]
        }
    ],

    // 美食地圖
    food: [
        {
            name: "鐵板燒 天神內臟 博多一番街",
            category: "日式料理",
            description: "位於博多車站內的熱門鐵板燒餐廳，適合當作抵達後的第一餐。",
            mapLink: "https://www.google.com/maps/search/?api=1&query=鐵板燒+天神內臟+博多一番街",
            coords: { lat: 33.5891, lng: 130.4208 }
        },
        {
            name: "努努雞",
            category: "特產",
            description: "冰著吃也美味的炸雞，福岡特色伴手禮。",
            mapLink: "https://maps.app.goo.gl/ZXq8sLeEFiHetFxz7?g_st=ipc",
            coords: { lat: 33.5898, lng: 130.4206 } // 博多車站內
        },
        {
            name: "炭劇場 武藏坐",
            category: "甜點",
            description: "體驗獨特的日式端爐下午茶。",
            mapLink: "https://www.google.com/maps/search/?api=1&query=炭劇場+武藏坐",
            coords: { lat: 33.5878, lng: 130.4000 }
        },
        {
            name: "藥院燒肉NIKUICHI 博多店",
            category: "燒肉",
            description: "提供高品質佐賀牛等肉品的美味燒肉店。",
            mapLink: "https://maps.app.goo.gl/dzvtJJwMFXHGZ5EY7?g_st=ipc",
            coords: { lat: 33.5851, lng: 130.4193 }
        },
        {
            name: "旦過市場",
            category: "海鮮",
            description: "北九州的廚房，可以品嚐到新鮮的海產與當地小吃。",
            mapLink: "https://www.google.com/maps/search/?api=1&query=旦過市場",
            coords: { lat: 33.8823, lng: 130.8788 }
        },
        {
            name: "座離宮 博多本店",
            category: "日式料理",
            description: "氣氛佳的精緻日式料理餐廳。",
            mapLink: "https://maps.app.goo.gl/KcAWPPDG5tcGNjzc9?g_st=ipc",
            coords: { lat: 33.5933, lng: 130.4151 }
        },
        {
            name: "中洲屋台",
            category: "屋台",
            description: "福岡夜生活的象徵，體驗道地的路邊攤文化。",
            mapLink: "https://maps.app.goo.gl/8ZyRZnCr6UXntLuU9?g_st=ipc",
            coords: { lat: 33.5910, lng: 130.4059 }
        }
    ]
};
