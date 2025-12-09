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
        if (!budgetCtx) return;

        new Chart(budgetCtx, {
            type: 'doughnut',
            data: {
                labels: ['住宿 (50%)', '餐飲 (31%)', '交通 (8%)', '門票與雜支 (11%)'],
                datasets: [{
                    label: '預算分配',
                    data: [48000, 30000, 8000, 10000],
                    backgroundColor: ['#60a5fa', '#3b82f6', '#2563eb', '#93c5fd'],
                    borderColor: '#ffffff',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'bottom' },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                let label = context.label || '';
                                if (label) label += ': ';
                                if (context.parsed !== null) {
                                    label += new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(context.parsed);
                                }
                                return label;
                            }
                        }
                    }
                }
            }
        });
    }

    function setupDailyItinerary() {
        const dailyContainer = document.getElementById('daily-itinerary-container');
        const dailyNavContainer = document.getElementById('daily-nav-container');
        if (!dailyContainer || !dailyNavContainer || typeof dailyItineraryData === 'undefined') return;

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
        if (!foodContainer || !filterContainer || typeof foodData === 'undefined') return;

        // 從 foodData 動態生成篩選按鈕
        const categories = ['all', ...new Set(foodData.map(item => item.category))];
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

            filterContainer.querySelectorAll('.food-filter-btn').forEach(b => {
                b.setAttribute('aria-selected', 'false');
                b.classList.remove('bg-blue-500', 'text-white');
                b.classList.add('bg-gray-200', 'hover:bg-gray-300');
            });
            targetBtn.setAttribute('aria-selected', 'true');
            targetBtn.classList.add('bg-blue-500', 'text-white');
            targetBtn.classList.remove('bg-gray-200', 'hover:bg-gray-300');
        });

        renderFoodList();
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
    setupDailyItinerary();
    setupFoodMap();
    setupBackToTopButton();
});