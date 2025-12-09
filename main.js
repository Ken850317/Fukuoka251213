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
            budgetChart.data.labels = budgetData.items.map(item => item.label);
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

        dailyItineraryData.forEach(day => {
            const dayElement = document.createElement('div');
            // 為每日行程區塊加上 ID，方便錨點跳轉
            dayElement.id = `day-${day.day}`;
            dayElement.className = 'pt-2'; // 增加一點上邊距，避免跳轉時標題太貼近頂部
            dayElement.innerHTML = `
                <h3 class="text-xl font-bold mb-4 text-blue-600">Day ${day.day} ${day.date}: ${day.theme}</h3>
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

            // 建立對應的日期導覽按鈕
            const dayBtn = document.createElement('a');
            dayBtn.href = `#day-${day.day}`;
            dayBtn.className = 'daily-nav-btn bg-gray-200 hover:bg-blue-500 hover:text-white transition-colors duration-200 py-1 px-4 rounded-full text-sm font-semibold';
            dayBtn.textContent = `Day ${day.day}`;
            dailyNavContainer.appendChild(dayBtn);

            // 增加平滑滾動效果
            dayBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const targetElement = document.getElementById(this.getAttribute('href').substring(1));
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });
    }

    function setupFoodMap() {
        const foodContainer = document.getElementById('food-list-container');
        const filterContainer = document.getElementById('food-filter-container');
        const mapCanvas = document.getElementById('food-map-canvas');
        if (!foodContainer || !filterContainer || !mapCanvas || typeof tripData === 'undefined' || !tripData.food) return;

        // 使用新的資料結構
        const foodData = tripData.food;

        // --- Google Map 初始化 ---
        let map;
        let markers = [];
        const infoWindow = new google.maps.InfoWindow();

        function initMap() {
            // 以博多車站為中心點
            const fukuokaCenter = { lat: 33.590, lng: 130.420 };
            map = new google.maps.Map(mapCanvas, {
                center: fukuokaCenter,
                zoom: 12,
            });
            renderMarkers('all');
        }

        function renderMarkers(category) {
            // 清除舊標記
            markers.forEach(marker => marker.setMap(null));
            markers = [];

            const filteredData = category === 'all' ? foodData : foodData.filter(item => item.category === category);

            filteredData.forEach(food => {
                if (!food.lat || !food.lng) return;
                const marker = new google.maps.Marker({
                    position: { lat: food.lat, lng: food.lng },
                    map: map,
                    title: food.name,
                });
                marker.addListener('click', () => {
                    infoWindow.setContent(`<strong>${food.name}</strong><br>${food.description}`);
                    infoWindow.open(map, marker);
                });
                markers.push(marker);
            });
        }

        const categories = ['all', ...new Set(foodData.map(item => item.category || '其他'))];
        filterContainer.innerHTML = categories.map(category => {
            const isSelected = category === 'all';
            const text = category === 'all' ? '全部' : category;
            const selectedClasses = 'bg-blue-500 text-white';
            const defaultClasses = 'bg-gray-200 hover:bg-gray-300';
            return `
                <button 
                    class="food-filter-btn py-1 px-3 rounded-full text-sm ${isSelected ? selectedClasses : defaultClasses}" 
                    data-category="${category}" 
                    aria-selected="${isSelected}">
                    ${text}
                </button>`;
        }).join('');

        const renderFoodList = (category = 'all') => {
            foodContainer.innerHTML = '';
            const filteredData = category === 'all' ? foodData : foodData.filter(item => item.category === category);

            filteredData.forEach(food => {
                const foodCard = document.createElement('div');
                foodCard.className = 'food-card bg-white rounded-lg shadow overflow-hidden transition-transform duration-300 hover:scale-105';
                foodCard.dataset.category = food.category;
                foodCard.innerHTML = `
                    <div class="p-5">
                        <div class="flex justify-between items-start">
                            <h4 class="text-lg font-bold text-gray-900">${food.name}</h4>
                            <span class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">${food.category}</span>
                        </div>
                        <p class="text-gray-600 mt-2 mb-3">${food.description}</p>
                        <a href="${food.mapLink}" target="_blank" class="font-semibold text-blue-600 hover:underline">
                            地圖位置 ↗
                        </a>
                    </div>
                `;
                foodContainer.appendChild(foodCard);
            });
        };

        filterContainer.addEventListener('click', (e) => {
            const targetBtn = e.target.closest('.food-filter-btn');
            if (!targetBtn) return;

            const category = targetBtn.dataset.category;
            renderFoodList(category);
            renderMarkers(category); // 同步更新地圖上的標記

            filterContainer.querySelectorAll('.food-filter-btn').forEach(b => {
                b.setAttribute('aria-selected', 'false');
                b.classList.remove('bg-blue-500', 'text-white');
                b.classList.add('bg-gray-200', 'hover:bg-gray-300');
            });
            targetBtn.setAttribute('aria-selected', 'true');
            targetBtn.classList.add('bg-blue-500', 'text-white');
            targetBtn.classList.remove('bg-gray-200', 'hover:bg-gray-300');
        });

        // 初始載入
        renderFoodList();

        // 確保 Google Maps API 載入後再初始化地圖
        // HTML 中的 script 標籤有 async，所以需要這樣處理
        window.initMap = initMap;
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
    setupFoodMap();
    setupBackToTopButton();
});