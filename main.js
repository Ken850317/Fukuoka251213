// 將 initMap 提升到全域，讓 Google Maps API callback 可以找到它
// 這個函式將由 Google Maps API 在載入完成後自動呼叫
window.initMap = function() {
    // 在 initMap 內部獲取所有需要的 DOM 元素和資料
    // 確保在函式執行時，DOM 和 tripData 都已準備就緒
    const listContainer = document.getElementById('map-list-container');
    const filterContainer = document.getElementById('map-filter-container');
    const mapCanvas = document.getElementById('map-canvas');
    const locationData = (typeof tripData !== 'undefined') ? tripData.locations : null;

    if (!listContainer || !filterContainer || !mapCanvas || !locationData) {
        console.error("Map section elements or data not found. Map initialization aborted.");
        return;
    }

    let map;
    const markers = [];
    const infoWindow = new google.maps.InfoWindow();

    // 1. 動態生成篩選按鈕
    const categories = ['all', ...new Set(locationData.map(item => item.category || '其他'))];
    filterContainer.innerHTML = categories.map(category => {
        const isSelected = category === 'all';
        const text = category === 'all' ? '全部' : category;
        const selectedClasses = 'bg-blue-500 text-white';
        const defaultClasses = 'bg-gray-200 hover:bg-gray-300';
        return `
            <button 
                class="map-filter-btn py-1 px-3 rounded-full text-sm ${isSelected ? selectedClasses : defaultClasses}" 
                data-category="${category}" 
                aria-selected="${isSelected}">
                ${text}
            </button>`;
    }).join('');

    // 2. 渲染美食卡片列表的函式
    const renderLocationList = (category = 'all') => {
        listContainer.innerHTML = '';
        const filteredData = category === 'all' ? locationData : locationData.filter(item => item.category === category);

        filteredData.forEach(location => {
            const locationCard = document.createElement('div');
            // 加上 data-name 屬性以便後續選取，並優化 transition 效果
            locationCard.className = 'location-card bg-white rounded-lg shadow overflow-hidden transition-all duration-300 hover:scale-105 cursor-pointer border-2 border-transparent';
            locationCard.dataset.name = location.name;
            locationCard.dataset.category = location.category;
            locationCard.innerHTML = `
                <div class="p-5">
                    <div class="flex justify-between items-start">
                        <h4 class="text-lg font-bold text-gray-900">${location.name}</h4>
                        <span class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">${location.category}</span>
                    </div>
                    <p class="text-gray-600 mt-2 mb-3">${location.description}</p>
                    <a href="${location.mapLink}" target="_blank" class="font-semibold text-blue-600 hover:underline">
                        地圖位置 ↗
                    </a>
                </div>
            `;
            listContainer.appendChild(locationCard);

            // 點擊卡片時，觸發地圖標記的點擊事件
            locationCard.addEventListener('click', () => {
                const correspondingMarker = markers.find(m => m.title === location.name);
                if (correspondingMarker) {
                    google.maps.event.trigger(correspondingMarker, 'click');
                    map.panTo(correspondingMarker.getPosition()); // 將地圖中心平移到標記上
                }
            });
        });
    };

    // 3. 篩選按鈕的點擊事件
    filterContainer.addEventListener('click', (e) => {
        const targetBtn = e.target.closest('.map-filter-btn');
        if (!targetBtn) return;

        const category = targetBtn.dataset.category;
        renderLocationList(category);

        // 同步更新地圖標記的可見性
        markers.forEach(marker => {
            marker.setVisible(category === 'all' || marker.category === category);
        });

        // 更新按鈕樣式
        filterContainer.querySelectorAll('.map-filter-btn').forEach(b => {
            b.setAttribute('aria-selected', 'false');
            b.classList.remove('bg-blue-500', 'text-white');
            b.classList.add('bg-gray-200', 'hover:bg-gray-300');
        });
        targetBtn.setAttribute('aria-selected', 'true');
        targetBtn.classList.add('bg-blue-500', 'text-white');
        targetBtn.classList.remove('bg-gray-200', 'hover:bg-gray-300');
    });

    // 4. 初始化地圖
    const fukuokaCenter = { lat: 33.590, lng: 130.420 };
    map = new google.maps.Map(mapCanvas, {
        center: fukuokaCenter,
        zoom: 12,
        mapTypeControl: false,
        streetViewControl: false,
    });

    // 5. 建立所有標記
    locationData.forEach(location => {
        if (!location.coords || !location.coords.lat || !location.coords.lng) return;

        const marker = new google.maps.Marker({
            position: location.coords,
            map: map,
            title: location.name,
            category: location.category,
            animation: google.maps.Animation.DROP,
        });

        // 為每個標記加上點擊事件
        marker.addListener('click', () => {
            const content = `
                <div class="p-1 font-sans">
                    <h4 class="font-bold text-md">${location.name}</h4>
                    <p class="text-gray-600 mt-1">${location.description}</p>
                    <a href="${location.mapLink}" target="_blank" class="text-blue-600 hover:underline text-sm">在 Google Maps 中打開</a>
                </div>`;
            infoWindow.setContent(content);
            infoWindow.open(map, marker);

            // --- 新增：高亮對應的卡片 ---
            // 1. 移除先前的高亮效果
            const previouslyHighlighted = document.querySelector('.location-card.highlighted-card');
            if (previouslyHighlighted) {
                previouslyHighlighted.classList.remove('highlighted-card');
            }

            // 2. 找到並高亮對應的卡片
            const targetCard = document.querySelector(`.location-card[data-name="${location.name}"]`);
            if (targetCard) {
                targetCard.classList.add('highlighted-card');
                // 3. 將卡片捲動到可視區域中央
                targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
        markers.push(marker);
    });

    // 6. 地圖初始化完成後，渲染初始的卡片列表
    renderLocationList();
};

document.addEventListener('DOMContentLoaded', function() {
    function setupNavigation() {
        const navContainer = document.getElementById('nav-container');
        const contentSections = document.querySelectorAll('.content-section');
        const activeBtnClass = 'bg-blue-700';
        const inactiveBtnClass = 'hover:bg-blue-600';

        const overviewBtn = document.querySelector('.nav-btn[data-target="overview"]');
        if (overviewBtn) {
            overviewBtn.classList.add(activeBtnClass);
            overviewBtn.classList.remove(inactiveBtnClass);
        }

        navContainer.addEventListener('click', (e) => {
            const targetBtn = e.target.closest('.nav-btn');
            if (!targetBtn) return;

            const targetId = targetBtn.dataset.target;

            navContainer.querySelectorAll('.nav-btn').forEach(b => {
                b.classList.remove(activeBtnClass);
                b.classList.add(inactiveBtnClass);
                b.setAttribute('aria-selected', 'false');
            });
            targetBtn.classList.add(activeBtnClass);
            targetBtn.classList.remove(inactiveBtnClass);
            targetBtn.setAttribute('aria-selected', 'true');

            contentSections.forEach(section => {
                section.classList.toggle('active', section.id === targetId);
            });
        });
    }

    function setupBudgetChart() {
        const budgetCtx = document.getElementById('budgetChart');
        const currencyBtn = document.getElementById('currency-toggle-btn');
        if (!budgetCtx || !currencyBtn || typeof tripData === 'undefined' || !tripData.budget) return;

        // 註冊 chartjs-plugin-datalabels
        Chart.register(ChartDataLabels);

        const budgetData = tripData.budget;
        const jpyRate = budgetData.jpyRate || 4.7;
        let currentCurrency = 'TWD';
 
        // 再次更換為一組對比鮮明的顏色
        const chartColors = [
            '#14b8a6', // Teal
            '#8b5cf6', // Violet
            '#ec4899', // Pink
            '#f59e0b', // Amber
        ];

        const chartConfig = {
            type: 'doughnut',
            data: {
                datasets: [{
                    label: '預算分配',
                    backgroundColor: chartColors,
                    borderColor: '#fff', // 區塊邊框顏色
                    borderWidth: 3,      // 區塊邊框寬度
                    hoverBorderWidth: 3, // 懸浮時的邊框寬度
                    hoverOffset: 20      // 懸浮時區塊放大的距離
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                // 調整 cutout 讓圓餅圖更大，環狀更細
                cutout: '60%',
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            font: { size: 14 }
                        }
                    },
                    // 設定 datalabels 插件
                    datalabels: {
                        color: '#ffffff',
                        font: {
                            weight: 'bold',
                            size: 12, // 縮小字體以容納更多數字
                        },
                        formatter: (value, context) => {
                            const currency = context.chart.options.plugins.datalabels.currency;
                            const formatter = new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: currency,
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                            });
                            return formatter.format(value);
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                let label = context.label || '';
                                if (label) label += ': ';
                                if (context.parsed !== null) {
                                    label += new Intl.NumberFormat('en-US', {
                                        style: 'currency',
                                        currency: currentCurrency,
                                        minimumFractionDigits: 0
                                    }).format(context.parsed);
                                }
                                return label;
                            }
                        }
                    }
                }
            }
        };

        const budgetChart = new Chart(budgetCtx, chartConfig);

        function updateChart(currency) {
            currentCurrency = currency;
            const isJPY = currency === 'JPY';
            // 修正：將讀取的屬性從 item.label 改為 item.category
            // 並且處理重複的 '交通' 類別，讓圖例顯示更清晰
            budgetChart.data.labels = budgetData.items.map(item => {
                // 如果類別是交通，就使用更詳細的描述
                return item.category === '交通' ? item.description : item.category;
            });
            budgetChart.data.datasets[0].data = budgetData.items.map(item => isJPY ? item.amount * jpyRate : item.amount);
            budgetChart.options.plugins.datalabels.currency = currency;
            budgetChart.update();
            currencyBtn.textContent = `切換至 ${isJPY ? 'TWD' : 'JPY'}`;
        }

        currencyBtn.addEventListener('click', () => {
            updateChart(currentCurrency === 'TWD' ? 'JPY' : 'TWD');
        });

        // 初始載入圖表
        updateChart('TWD');
    }

    function setupAccommodation() {
        const container = document.getElementById('accommodation-container');
        if (!container || typeof tripData === 'undefined' || !tripData.accommodation) return;

        const list = document.createElement('ul');
        list.className = 'space-y-4';
        list.innerHTML = tripData.accommodation.map(item => `
            <li>
                <p class="font-semibold text-gray-800">${item.dates}: ${item.name}</p>
                <p class="text-sm text-gray-600 mt-1">${item.description}</p>
                <a href="${item.mapLink}" target="_blank" class="text-sm text-blue-600 hover:text-blue-800 hover:underline">
                    查看地圖與資訊 ↗
                </a>
            </li>
        `).join('');
        container.appendChild(list);
    }

    function setupTransport() {
        const container = document.getElementById('transport-container');
        if (!container || typeof tripData === 'undefined' || !tripData.transportation) return;

        const transport = tripData.transportation;
        const list = document.createElement('ul');
        list.className = 'list-disc list-inside space-y-3 text-gray-700';
        list.innerHTML = `
            <li>
                <strong>航班資訊:</strong>
                <ul class="list-['-_'] list-inside ml-4 text-sm">
                    <li>去程: ${transport.flights.departure}</li>
                    <li>回程: ${transport.flights.return}</li>
                </ul>
            </li>
            <li>
                <strong>已購票券:</strong>
                <ul class="list-['-_'] list-inside ml-4 text-sm">
                    ${transport.passes.map(pass => `<li>${pass}</li>`).join('')}
                </ul>
            </li>
            <li>
                <strong>備用交通卡:</strong> ${transport.notes}
            </li>
        `;
        container.appendChild(list);
    }

    function setupDailyItinerary() {
        const dailyContainer = document.getElementById('daily-itinerary-container');
        const dailyNavContainer = document.getElementById('daily-nav-container');
        if (!dailyContainer || !dailyNavContainer || typeof tripData === 'undefined' || !tripData.itinerary) return;

        // 使用新的資料結構
        const dailyItineraryData = tripData.itinerary;

        // 預設的更詳細天氣預報資料 (佔位用)，包含早中晚
        const weatherForecasts = [
            { 
                location: '武雄', temp_range: '12°C / 5°C', rain_chance: '10%', humidity: '65%', description: '晴朗',
                periods: [
                    { time: '早上', icon: '☀️', temp: '8°C' }, { time: '中午', icon: '☀️', temp: '12°C' }, { time: '晚上', icon: '🌙', temp: '6°C' }
                ]
            },
            { 
                location: '佐賀', temp_range: '10°C / 4°C', rain_chance: '20%', humidity: '70%', description: '多雲',
                periods: [
                    { time: '早上', icon: '☁️', temp: '7°C' }, { time: '中午', icon: '☁️', temp: '10°C' }, { time: '晚上', icon: '☁️', temp: '5°C' }
                ]
            },
            { 
                location: '福岡', temp_range: '11°C / 6°C', rain_chance: '60%', humidity: '80%', description: '偶有陣雨',
                periods: [
                    { time: '早上', icon: '☁️', temp: '9°C' }, { time: '中午', icon: '🌦️', temp: '11°C' }, { time: '晚上', icon: '🌧️', temp: '7°C' }
                ]
            },
            { 
                location: '小倉', temp_range: '13°C / 7°C', rain_chance: '10%', humidity: '60%', description: '晴時多雲',
                periods: [
                    { time: '早上', icon: '🌤️', temp: '10°C' }, { time: '中午', icon: '☀️', temp: '13°C' }, { time: '晚上', icon: '🌙', temp: '8°C' }
                ]
            },
            { location: '福岡', temp_range: '12°C / 6°C', rain_chance: '30%', humidity: '75%', description: '陰天',
                periods: [
                    { time: '早上', icon: '☁️', temp: '9°C' }, { time: '中午', icon: '☁️', temp: '12°C' }, { time: '晚上', icon: '☁️', temp: '7°C' }
                ]
            },
        ];
        // 1. 動態生成每日行程內容和導覽按鈕
        dailyItineraryData.forEach((day, index) => {
            const dayId = `day${day.day}`;
            const isFirstDay = index === 0;

            // 建立每日行程區塊
            const dayElement = document.createElement('div');
            dayElement.id = dayId;
            dayElement.className = `daily-itinerary-item pt-2 ${isFirstDay ? '' : 'hidden'}`; // 預設只顯示第一個
            
            // 取得對應的天氣資訊，如果沒有就用最後一個當作預設
            const weather = weatherForecasts[index] || weatherForecasts[weatherForecasts.length - 1];

            dayElement.innerHTML = `
                <div class="flex justify-between items-start mb-4">
                    <h3 class="text-xl font-bold text-blue-600">Day ${day.day} ${day.date}: ${day.theme}</h3>
                    <div class="flex-shrink-0 ml-4 p-3 bg-blue-50 rounded-xl shadow-sm w-48">
                        <div class="flex justify-between items-center mb-2">
                            <p class="font-bold text-blue-800">${weather.location}</p>
                            <p class="text-lg font-bold text-gray-800">${weather.temp_range}</p>
                        </div>
                        <div class="text-xs text-gray-600 space-y-1 mb-3">
                            <p>降雨機率: ${weather.rain_chance}</p>
                            <p>濕度: ${weather.humidity}</p>
                        </div>
                        <div class="flex justify-between text-center border-t border-blue-100 pt-2">
                            ${weather.periods.map(p => `
                                <div class="flex-1">
                                    <p class="text-xs text-gray-500">${p.time}</p>
                                    <p class="text-xl">${p.icon}</p>
                                    <p class="text-sm font-semibold">${p.temp}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
                <ol class="space-y-8">
                    ${day.schedule.map(item => `
                        <li class="timeline-item pb-8">
                            <div class="timeline-dot"></div>
                            <div class="flex items-baseline">
                                <p class="font-bold text-md text-gray-800 w-24">${item.time}</p>
                                <h4 class="font-semibold text-lg text-gray-900">${item.activity}</h4>
                            </div>
                            <div class="ml-24 mt-1">
                                <p class="text-gray-600 mb-2">${item.description}</p>
                                <div class="text-sm text-gray-500 space-y-1">
                                    <p>🕒 停留：${item.duration}</p>
                                    <p>🚇 交通：${item.transport}</p>
                                    <a href="${item.mapLink}" target="_blank" class="inline-block mt-1 text-blue-500 hover:underline">
                                        在 Google Maps 上查看 ↗
                                    </a>
                                </div>
                            </div>
                        </li>
                    `).join('')}
                </ol>
            `;
            dailyContainer.appendChild(dayElement);

            // 建立對應的日期導覽按鈕 (使用 button)
            const dayBtn = document.createElement('button');
            dayBtn.dataset.target = dayId;
            const activeClasses = 'bg-blue-500 text-white';
            const inactiveClasses = 'bg-gray-200 hover:bg-blue-500 hover:text-white';
            dayBtn.className = `daily-nav-btn transition-colors duration-200 py-1 px-4 rounded-full text-sm font-semibold ${isFirstDay ? activeClasses : inactiveClasses}`;
            dayBtn.textContent = `Day ${day.day}`;
            dailyNavContainer.appendChild(dayBtn);
        });

        // 2. 為導覽按鈕容器加上點擊事件 (事件委派)
        dailyNavContainer.addEventListener('click', (e) => {
            const targetBtn = e.target.closest('.daily-nav-btn');
            if (!targetBtn) return;

            const targetId = targetBtn.dataset.target;

            // 更新按鈕樣式
            dailyNavContainer.querySelectorAll('.daily-nav-btn').forEach(btn => {
                btn.classList.remove('bg-blue-500', 'text-white');
                btn.classList.add('bg-gray-200', 'hover:bg-blue-500', 'hover:text-white');
            });
            targetBtn.classList.add('bg-blue-500', 'text-white');

            // 顯示/隱藏對應的行程內容
            dailyContainer.querySelectorAll('.daily-itinerary-item').forEach(item => {
                item.classList.toggle('hidden', item.id !== targetId);
            });
        });

    }

    function setupBackToTopButton() {
        const btn = document.getElementById('back-to-top-btn');
        if (!btn) return;

        // 根據滾動位置顯示或隱藏按鈕
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) { // 向下滾動超過 300px 時顯示
                btn.classList.remove('hidden');
            } else {
                btn.classList.add('hidden');
            }
        });

        // 點擊按鈕後平滑滾動到頂部
        btn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    setupNavigation();
    setupBudgetChart();
    setupAccommodation();
    setupTransport();
    setupDailyItinerary();
    setupBackToTopButton();
});