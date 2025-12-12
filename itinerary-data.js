const tripData = {
    // 預算與金流
    budget: {
        title: "費用明細",
        jpyRate: 4.7, // 預估匯率 1 TWD ≈ 4.7 JPY (用於換算參考)
        items: [
            { category: '住宿', description: '京都屋 + 靜鐵PREZIO', amount: 38543, currency: 'TWD' },
            { category: '交通', description: '機票 (TPE ⇄ FUK)', amount: 12000, currency: 'TWD' },
            { category: '交通', description: '日本國內交通 (JR Pass, 地鐵等)', amount: 18144, currency: 'TWD' },
            { category: '餐飲', description: '預估餐飲費', amount: 20000, currency: 'JPY' }
        ],
        notes: [
            "所有費用為「每人」預估金額。",
            "住宿費用 TWD 38,543 (京都屋 TWD 23,366 + 靜鐵PREZIO TWD 15,177) 已付清。",
            "機票費用 TWD 12,000 已付清。",
            "金流狀態: 11/15 Nash/小陳已支付 ¥12,847 住宿費給阿啾"
        ]
    },

    // 住宿資訊
    accommodation: [
        {
            name: "百年溫泉旅館 京都屋",
            dates: "12/13 - 12/15",
            mapLink: "https://maps.app.goo.gl/MBTCPWAJGxtcnSKu8?g_st=ipc",
            description: "位於武雄溫泉，體驗傳統日式溫泉旅館。"
        },
        {
            name: "博多站前靜鐵PREZIO飯店",
            dates: "12/15 - 12/17",
            mapLink: "https://maps.app.goo.gl/Kco2HLEARREGqReE7?g_st=ipc",
            description: "鄰近博多車站，交通便利的現代化飯店。"
        }
    ],

    // 交通資訊
    transportation: {
        flights: {
            departure: "臺灣桃園機場 (TPE) CI 110 → 福岡 (FUK) | 12/13 06:50 - 10:00",
            return: "福岡 (FUK) CI 117 → 臺灣桃園機場 (TPE) | 12/17 20:35 - 22:20"
        },
        passes: [
            "九州3日JR Pass (主要使用於 Day 2, 3, 4)",
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
                    time: "10:00",
                    activity: "抵達福岡機場 (FUK)",
                    description: "辦理入境手續，準備前往博多車站。",
                    duration: "約 1.5 小時",
                    transport: "地鐵機場線",
                    mapLink: "https://www.google.com/maps/search/?api=1&query=Fukuoka+Airport"
                },
                {
                    time: "11:30",
                    activity: "博多車站午餐 & 任務",
                    description: "在車站享用午餐 (可參考美食地圖中的「鐵板燒 天神內臟」)，並完成劃位(JR Pass)、購買努努雞等任務。",
                    duration: "約 2 小時",
                    transport: "步行",
                    mapLink: "https://maps.app.goo.gl/orveDgkH829tuRzw7"
                },
                {
                    time: "14:00",
                    activity: "前往武雄溫泉 & Check-in",
                    description: "搭乘JR特急列車前往武雄溫泉，並入住飯店。",
                    duration: "約 1.5 小時",
                    transport: "JR特急列車",
                    mapLink: "https://maps.app.goo.gl/MBTCPWAJGxtcnSKu8?g_st=ipc"
                },
                {
                    time: "16:00",
                    activity: "武雄市區漫遊",
                    description: "自由探索武雄圖書館、御船山樂園、武雄溫泉樓門等景點。",
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
                    description: "各組根據自己的JR Pass路線進行一日遊 (可選長崎、佐賀、豪斯登堡等)，晚上返回武雄溫泉。",
                    duration: "全天",
                    transport: "JR (使用JR Pass)",
                    mapLink: "https://www.google.com/maps/search/?api=1&query=Nagasaki"
                },
                {
                    time: "長崎組",
                    activity: "長崎組路線參考",
                    description: "10:01出發10:32抵達。藍線觀光通下車吃午餐逛商店街。13:00眼鏡橋集合，綠線到西浜町轉藍線到原爆資料館（半小時），週邊有原爆彈落遺址、平和公園。16:00藍線前往體育場城南站轉稻佐山搭纜車上山看夜景，18:00下山回長崎車站吃晚餐。21:18啟程回武雄（最後班次22:10）。",
                    duration: "-",
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
                    activity: "返回博多 & 飯店 Check-in",
                    description: "在武雄用完早餐後，搭乘JR返回博多，並在15:30前完成飯店入住。",
                    duration: "約 3-4 小時",
                    transport: "JR、地鐵",
                    mapLink: "https://maps.app.goo.gl/Kco2HLEARREGqReE7?g_st=ipc"
                },
                {
                    time: "16:15",
                    activity: "下午茶：炭劇場 武藏坐",
                    description: "享受獨特的端爐下午茶體驗 (已預約)。",
                    duration: "約 1.5 小時",
                    transport: "步行10分鐘到博多車站，搭地鐵綠線至天神南站下車，步行3分鐘 (路程約20分鐘)。",
                    mapLink: "https://maps.app.goo.gl/DrmKzv1ZQVcccFXN6?g_st=ipc"
                },
                {
                    time: "下午",
                    activity: "自由活動",
                    description: "在天神或博多地區自由逛街購物。",
                    duration: "至 22:00 前",
                    transport: "步行/地鐵", // 保持原樣，因為更詳細的交通資訊是針對特定地點的
                    mapLink: "https://www.google.com/maps/search/?api=1&query=Tenjin"
                },
                {
                    time: "22:00",
                    activity: "晚餐：藥院燒肉NIKUICHI 博多店",
                    description: "品嚐高品質的美味燒肉，為一天畫下句點。",
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
                    time: "09:30",
                    activity: "前往小倉 & 旦過市場",
                    description: "09:23從博多出發，09:38抵達小倉站，步行十分鐘抵達有「北九州的廚房」之稱的旦過市場享用早餐。",
                    duration: "約 2.5 小時",
                    transport: "JR (使用JR Pass)",
                    mapLink: "https://www.google.com/maps/search/?api=1&query=Tanga+Market"
                },
                {
                    time: "12:00",
                    activity: "小倉城周邊散策",
                    description: "12:00集合，步行10分鐘前往小倉城，參觀其周邊的八坂神社、松本清張紀念館等景點。",
                    duration: "約 4 小時",
                    transport: "步行",
                    mapLink: "https://www.google.com/maps/search/?api=1&query=Kokura+Castle"
                },
                {
                    time: "16:30",
                    activity: "返回博多",
                    description: "從小倉車站集合，搭乘JR返回博多 (暫定16:34班次，傍晚五點前抵達)。",
                    duration: "約 1 小時",
                    transport: "JR (使用JR Pass)",
                    mapLink: "https://www.google.com/maps/search/?api=1&query=Kokura+Station"
                },
                {
                    time: "18:00",
                    activity: "晚餐：座離宮 博多本店",
                    description: "享用精緻的日式料理晚餐。",
                    duration: "約 2 小時", // 保持原樣，因為更詳細的交通資訊是針對特定地點的
                    transport: "從博多車站搭地鐵機場線步行9分鐘，或地鐵七隈線步行12分鐘 (路程約20分鐘)。",
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
                    time: "白天",
                    activity: "自由活動 & 購物",
                    description: "最後的購物衝刺時間，可前往Torai Amu Sankakuya Yakuinten (織毛線手工材料店)，或在博多車站、運河城、天神地區購買伴手禮。",
                    duration: "半天",
                    transport: "步行/地鐵",
                    mapLink: "https://maps.app.goo.gl/bwbQFjZHiE1bpxHa6"
                },
                {
                    time: "17:30",
                    activity: "集合前往福岡機場",
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
            mapLink: "https://www.google.com/maps/search/?api=1&query=努努雞+博多",
            coords: { lat: 33.5898, lng: 130.4206 } // 博多車站內
        },
        {
            name: "炭劇場 武藏坐",
            category: "甜點",
            description: "體驗獨特的日式端爐下午茶。",
            mapLink: "https://www.google.com/maps/search/?api=1&query=炭劇場+武藏坐",
            coords: { lat: 33.5878, lng: 130.3999 }
        },
        {
            name: "藥院燒肉NIKUICHI 博多店",
            category: "燒肉",
            description: "提供高品質佐賀牛等肉品的美味燒肉店。",
            mapLink: "https://www.google.com/maps/search/?api=1&query=藥院燒肉NIKUICHI+博多店",
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
            mapLink: "https://www.google.com/maps/search/?api=1&query=座離宮+博多本店",
            coords: { lat: 33.5933, lng: 130.4151 }
        },
        {
            name: "中洲屋台",
            category: "屋台",
            description: "福岡夜生活的象徵，體驗道地的路邊攤文化。",
            mapLink: "https://www.google.com/maps/search/?api=1&query=中洲屋台",
            coords: { lat: 33.5910, lng: 130.4059 }
        }
    ]
};
