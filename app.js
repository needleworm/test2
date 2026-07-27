// 안동 관광 안내 포털 - 메인 애플리케이션 JS (한국어 번역본)
// 기능: 테마 전환, 지도 클릭 제어, 명소 정렬 및 필터링, 여정 플래너 계산, 하회탈 소리 합성, 실시간 날씨 데이터 시뮬레이터.

// 1. 관광 명소 데이터베이스
const attractions = [
    {
        id: "hahoe",
        name: "하회마을 (Hahoe Village)",
        category: "heritage",
        rating: "4.8",
        reviews: "3,120",
        description: "2010년 유네스코 세계문화유산으로 지정된 한국의 대표적인 동족 마을입니다. 조선 시대 양반 가옥과 서민들의 초가집이 낙동강의 S자형 물줄기에 둘러싸여 있으며, 오늘날에도 주민들이 거주하며 풍산 류씨의 유교적 전통과 전통 주거 양식을 이어가고 있습니다.",
        transitTime: "안동역/터미널에서 210번 시내버스로 45분",
        transitVal: 45,
        fee: "₩5,000",
        feeVal: 5000,
        travelCostVal: 1500,
        img: "images/hahoe_hero.png",
        hours: "09:00 - 18:00 (하절기) | 09:00 - 17:00 (동절기)",
        address: "경상북도 안동시 풍천면 하회종가길 40"
    },
    {
        id: "woryeonggyo",
        name: "월영교 (Woryeonggyo Bridge)",
        category: "nature",
        rating: "4.7",
        reviews: "2,450",
        description: "낙동강을 가로지르는 한국에서 가장 긴 목조 인도교입니다. 먼저 떠난 남편을 위해 자신의 머리카락을 엮어 미투리(짚신)를 만들었던 아내의 숭고하고 애절한 사랑 이야기를 형상화하여 건설되었습니다. 특히 황혼과 야간 조명이 켜질 때의 풍경이 일품입니다.",
        transitTime: "시내에서 512번 버스로 15분 / 택시로 10분",
        transitVal: 15,
        fee: "무료",
        feeVal: 0,
        travelCostVal: 1500,
        img: "images/woryeonggyo_night.png",
        hours: "연중무휴 (야간 조명은 23:00까지 점등)",
        address: "경상북도 안동시 상아동 영락로 569"
    },
    {
        id: "dosanseowon",
        name: "도산서원 (Dosanseowon Academy)",
        category: "heritage",
        rating: "4.6",
        reviews: "1,120",
        description: "조선 시대 퇴계 이황 선생이 학문을 닦고 제자들을 가르치던 도산서당의 옛 터에 사후 서원으로 중건된 곳입니다. 낙동강이 감돌아 흐르는 수려한 산기슭에 자리하고 있으며, 서원 건축 특유의 정갈함과 기품을 느낄 수 있습니다. 성리학 연구의 중심지였습니다.",
        transitTime: "안동 터미널에서 567번 버스로 50분",
        transitVal: 50,
        fee: "₩2,000",
        feeVal: 2000,
        travelCostVal: 1500,
        img: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=800&auto=format&fit=crop",
        hours: "09:00 - 18:00",
        address: "경상북도 안동시 도산면 도산서원길 277"
    },
    {
        id: "bongjeongsa",
        name: "봉정사 (Bongjeongsa Temple)",
        category: "heritage",
        rating: "4.5",
        reviews: "820",
        description: "유네스코 세계문화유산 '산사, 한국의 산지승원' 중 하나입니다. 천등산 기슭에 자리한 이 사찰은 한국에서 현존하는 가장 오래된 목조 건물인 극락전(국보 제15호, 12세기 중건 추정)과 조선 초기의 대웅전이 조화를 이루는 고즈넉하고 평화로운 천년 고찰입니다.",
        transitTime: "시내에서 351번 버스로 40분",
        transitVal: 40,
        fee: "₩2,000",
        feeVal: 2000,
        travelCostVal: 1500,
        img: "https://images.unsplash.com/photo-1578469550956-0e16b69c6a3d?q=80&w=800&auto=format&fit=crop",
        hours: "08:00 - 18:00",
        address: "경상북도 안동시 서후면 봉정사길 222"
    },
    {
        id: "downtown",
        name: "안동 시내 (갈비 & 찜닭골목)",
        category: "culture",
        rating: "4.5",
        reviews: "1,940",
        description: "안동의 오랜 전통시장인 구시장(Gu-sijang)이 있는 상권의 중심지입니다. 매콤달콤한 소스로 유명한 안동찜닭 식당 수십 곳이 모여 있는 '찜닭골목'과 불향 가득한 갈비를 구워내는 '갈비골목'이 인접해 있어 식도락 여행의 핵심 코스입니다.",
        transitTime: "안동역/버스터미널에서 도보 혹은 버스로 10~15분",
        transitVal: 10,
        fee: "입장 무료",
        feeVal: 0,
        travelCostVal: 0,
        img: "https://images.unsplash.com/photo-1590301157890-4810ed352733?q=80&w=800&auto=format&fit=crop",
        hours: "일반적으로 10:00 - 22:00 (식당별 상이)",
        address: "경상북도 안동시 서부동 구시장길 일대"
    },
    {
        id: "nakgang",
        name: "낙강물길공원 (Secret Garden)",
        category: "nature",
        rating: "4.6",
        reviews: "950",
        description: "안동댐 옆에 숨겨진 숲속 쉼터로, 최근 누리꾼들 사이에서 '안동의 비밀의 정원' 혹은 '한국의 지베르니'라 불리는 힐링 명소입니다. 길쭉하게 뻗은 메타세쿼이아 나무들과 이국적인 분수, 연못 위 징검다리가 어우러져 그림 같은 풍경을 만듭니다.",
        transitTime: "시내에서 512번 버스로 20분 / 택시로 12분",
        transitVal: 20,
        fee: "무료",
        feeVal: 0,
        travelCostVal: 1500,
        img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=800&auto=format&fit=crop",
        hours: "연중무휴 상시 개방",
        address: "경상북도 안동시 상아동 423"
    },
    {
        id: "sinsedong",
        name: "신세동 벽화마을",
        category: "culture",
        rating: "4.2",
        reviews: "340",
        description: "안동 성진골 언덕에 자리한 옛 주거지에 형형색색의 벽화와 아기자기한 입체 조형물을 그려 넣어 탄생시킨 테마 예술 마을입니다. 언덕 끝자락에 오르면 안동 시내 전경이 한눈에 들어오며, 골목길 곳곳에 숨겨진 트릭아트 그림들이 재미를 줍니다.",
        transitTime: "안동 구시장에서 도보로 15분",
        transitVal: 15,
        fee: "무료",
        feeVal: 0,
        travelCostVal: 0,
        img: "https://images.unsplash.com/photo-1561055657-b9e0bf0fa360?q=80&w=800&auto=format&fit=crop",
        hours: "상시 개방 (주민 거주 지역으로 야간 소음 주의)",
        address: "경상북도 안동시 동부동 성진길 일대"
    }
];

// 2. 하회탈 상세 정보 데이터베이스
const masksData = {
    yangban: {
        badge: "지배 귀족 / 양반 계급",
        title: "양반탈 (Nobleman Mask)",
        quote: "“에헴! 내가 이 고을의 양반이로다! 내 권세와 학식을 감히 누가 넘보겠느냐! 하하하!”",
        role: "오만방자하며 겉으로는 유교적 학식과 품위를 뽐내는 지배 계급입니다. 하지만 결국 하인들의 재치 있는 말장난에 넘어가 위선을 지적받고 부끄러움을 사는 해학적인 인물입니다.",
        symbol: "조선 시대 지배 계층의 얄팍한 위선, 체면치레, 무능함을 풍자합니다.",
        feature: "턱이 완전히 분리되어 있어 배우가 고개를 뒤로 젖히면 입이 크게 벌어지며 시원하게 웃는 얼굴이 되고, 고개를 숙이면 턱이 닫혀 무섭게 화가 난 찡그린 인상이 됩니다.",
        img: "images/hahoe_mask.png"
    },
    bune: {
        badge: "기녀 / 요염한 젊은 여인",
        title: "부네탈 (Damsel Mask)",
        quote: "“헤헤... 어찌 그리 급하십니까요. 양반님네 학식보다 가락 소리가 더 흥겨운 것을요.”",
        role: "애교가 가득한 몸짓으로 양반과 선비를 번갈아 유혹하며, 두 인물이 서로 경쟁하며 격식을 잃고 우스꽝스러운 싸움을 하도록 원인을 제공하는 젊은 여성 캐릭터입니다.",
        symbol: "전통 유교 사회가 억압하려 했던 남녀 간의 에로티시즘과 위선적 격식 파괴를 나타냅니다.",
        feature: "갸름한 계란형 얼굴에 반달 모양의 웃는 실눈, 작고 빨간 하트형 입술이 돋보입니다. 양 볼과 이마에 찍힌 빨간 연지곤지 장식이 화사하고 애교 있는 인상을 줍니다.",
        img: "images/hahoe_mask.png"
    },
    kaksi: {
        badge: "신비로운 성황신 / 신부",
        title: "각시탈 (Bride Mask)",
        quote: "“말없는 마음속에 마을의 안녕과 평화를 담아, 춤사위로 액운을 쫓나이다...”",
        role: "시집살이의 설움을 안고 사는 조용한 각시이자, 마을의 성황신(수호신)을 대리하는 캐릭터입니다. 대사가 전혀 없으며 조용하고 느리게 춤을 춥니다.",
        symbol: "시집살이의 한과 슬픔을 삭이는 동시에, 마을 전체의 액운을 몰아내는 신성성을 상징합니다.",
        feature: "머리가 한쪽으로 단정히 땋아 내려져 있고, 입은 굳게 다물고 눈은 아래를 응시합니다. 말을 할 수 없는 며느리의 처지와 신성한 침묵을 기하학적으로 형상화했습니다.",
        img: "images/hahoe_mask.png"
    },
    choraengi: {
        badge: "재치 있고 빠른 하인",
        title: "초랭이탈 (Servant Mask)",
        quote: "“양반놈들 헛소리한다! 껍데기만 요란해서는, 내 매타작을 맞아야 정신을 차릴라나!”",
        role: "양반의 하인으로, 행동이 가볍고 입이 거칠지만 머리가 매우 명석합니다. 겉으로만 고귀한 척하는 양반들의 실태를 관객들에게 폭로하고 통쾌하게 곯리는 역할을 도맡습니다.",
        symbol: "억압받던 평민 계층의 불만과 비판 정신을 대변하는 웃음의 뇌관 역할을 합니다.",
        feature: "툭 튀어나온 부릅뜬 눈, 삐뚤어진 코와 입 사이로 하얗게 드러난 이빨 등 얼굴의 모든 선이 비대칭입니다. 이는 거침없는 성격과 반항적 에너지를 상징합니다.",
        img: "images/hahoe_mask.png"
    }
};

// 3. 애플리케이션 상태 값
let itinerary = {
    1: [],
    2: []
};
let selectedDay = 1;
let activeTheme = "light";

// 4. 초기화 핸들러 등록
document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initWeather();
    renderAttractionsList(attractions);
    initMapHotspots();
    initItineraryHandlers();
    initMaskHandlers();
    initAccordion();
    initMobileMenu();
    
    // 기본 선택 랜드마크 설정 (안동 시내)
    selectMapLandmark("downtown");
});

// 5. 모바일 메뉴 토글 제어
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const navMenu = document.getElementById("nav-menu");
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener("click", () => {
            navMenu.classList.toggle("active");
            const icon = mobileMenuBtn.querySelector("i");
            if (navMenu.classList.contains("active")) {
                icon.className = "fa-solid fa-xmark";
            } else {
                icon.className = "fa-solid fa-bars";
            }
        });
        
        navMenu.querySelectorAll(".nav-link").forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("active");
                mobileMenuBtn.querySelector("i").className = "fa-solid fa-bars";
            });
        });
    }
}

// 6. 테마 토글 및 로컬 스토리지 연동
function initTheme() {
    const themeToggle = document.getElementById("theme-toggle");
    const savedTheme = localStorage.getItem("andong-theme") || "light";
    
    document.documentElement.setAttribute("data-theme", savedTheme);
    activeTheme = savedTheme;
    updateThemeIcon(savedTheme);
    
    themeToggle.addEventListener("click", () => {
        const nextTheme = activeTheme === "light" ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", nextTheme);
        activeTheme = nextTheme;
        localStorage.setItem("andong-theme", nextTheme);
        updateThemeIcon(nextTheme);
    });
    
    // 다국어 드롭다운 토글
    const langBtn = document.getElementById("lang-btn");
    const langDropdown = document.getElementById("lang-dropdown");
    
    langBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        langDropdown.classList.toggle("show");
    });
    
    document.addEventListener("click", () => {
        langDropdown.classList.remove("show");
    });
}

function updateThemeIcon(theme) {
    const themeToggle = document.getElementById("theme-toggle");
    const icon = themeToggle.querySelector("i");
    if (theme === "dark") {
        icon.className = "fa-solid fa-sun";
    } else {
        icon.className = "fa-solid fa-moon";
    }
}

// 7. 실시간 정보 및 날씨 시뮬레이션
function initWeather() {
    const timeVal = document.getElementById("current-time");
    const weatherVal = document.getElementById("weather-temp");
    const clothingVal = document.getElementById("clothing-tip");
    const refreshBtn = document.getElementById("weather-refresh");
    
    function updateClock() {
        const now = new Date();
        const ampm = now.getHours() >= 12 ? "오후" : "오전";
        let hours = now.getHours() % 12;
        hours = hours ? hours : 12; // 0시는 12시로 표시
        const minutes = now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
        timeVal.textContent = `${ampm} ${hours}:${minutes}`;
    }
    
    const weatherPool = [
        { temp: "26°C / 맑음", tip: "가벼운 셔츠, 자외선 차단제 필치" },
        { temp: "24°C / 산들바람", tip: "가벼운 아우터와 걷기 편한 신발" },
        { temp: "28°C / 고온 다습", tip: "미니 휴대용 선풍기와 수분 섭취" },
        { temp: "25°C / 구름 조금", tip: "야외 도보 여행하기 완벽한 날씨" }
    ];
    
    function updateWeather() {
        const item = weatherPool[Math.floor(Math.random() * weatherPool.length)];
        weatherVal.textContent = item.temp;
        clothingVal.textContent = item.tip;
    }
    
    updateClock();
    updateWeather();
    setInterval(updateClock, 60000);
    
    refreshBtn.addEventListener("click", () => {
        const refreshIcon = refreshBtn.querySelector("i");
        refreshIcon.style.transform = "rotate(360deg)";
        setTimeout(() => { refreshIcon.style.transform = "none"; }, 600);
        updateWeather();
    });
}

// 8. 지도 핫스폿 바인딩
function initMapHotspots() {
    const markers = document.querySelectorAll(".map-marker");
    
    markers.forEach(marker => {
        marker.addEventListener("click", () => {
            markers.forEach(m => m.classList.remove("active"));
            marker.classList.add("active");
            const targetId = marker.getAttribute("data-target");
            selectMapLandmark(targetId);
        });
    });
    
    const mapAddBtn = document.getElementById("map-add-itinerary");
    mapAddBtn.addEventListener("click", () => {
        const activeMarker = document.querySelector(".map-marker.active");
        if (activeMarker) {
            const targetId = activeMarker.getAttribute("data-target");
            const attraction = attractions.find(a => a.id === targetId);
            if (attraction) {
                addToPlanner(attraction);
            }
        }
    });
}

function selectMapLandmark(id) {
    const attraction = attractions.find(a => a.id === id);
    if (!attraction) return;
    
    document.getElementById("map-detail-title").textContent = attraction.name;
    document.getElementById("map-detail-rating").textContent = attraction.rating;
    document.getElementById("map-detail-desc").textContent = attraction.description;
    document.getElementById("map-detail-transit").textContent = attraction.transitTime;
    document.getElementById("map-detail-fee").textContent = attraction.fee;
    
    const imgEl = document.getElementById("map-detail-img");
    imgEl.src = attraction.img;
    imgEl.alt = attraction.name;
    
    const tagEl = document.getElementById("map-detail-tag");
    tagEl.textContent = attraction.category === "heritage" ? "세계유산" : attraction.category === "nature" ? "자연경관" : "문화체험";
}

// 9. 명소 목록 생성기
function renderAttractionsList(items) {
    const grid = document.getElementById("attractions-grid");
    grid.innerHTML = "";
    
    if (items.length === 0) {
        grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--color-text-muted);">검색 결과에 맞는 관광지가 없습니다.</div>`;
        return;
    }
    
    items.forEach(item => {
        const card = document.createElement("div");
        card.className = "attraction-card";
        card.setAttribute("data-id", item.id);
        
        card.innerHTML = `
            <div class="attr-img-wrap">
                <img src="${item.img}" alt="${item.name}">
                <span class="attr-tag">${item.category === "heritage" ? "세계문화유산" : item.category === "nature" ? "자연경관" : "문화체험"}</span>
            </div>
            <div class="attr-body">
                <div class="attr-meta">
                    <span class="attr-rating"><i class="fa-solid fa-star text-gold"></i> ${item.rating} (${item.reviews}개 리뷰)</span>
                </div>
                <h4 class="attr-title">${item.name}</h4>
                <p class="attr-desc">${item.description.substring(0, 95)}...</p>
                <div class="attr-details">
                    <span><i class="fa-solid fa-clock"></i> 이용 시간: ${item.hours}</span>
                    <span><i class="fa-solid fa-ticket"></i> 입장료: ${item.fee}</span>
                </div>
                <button class="btn btn-primary btn-block attr-add-btn">
                    <i class="fa-solid fa-plus"></i> 일정에 추가
                </button>
            </div>
        `;
        
        card.querySelector(".attr-add-btn").addEventListener("click", (e) => {
            e.stopPropagation();
            addToPlanner(item);
        });
        
        card.addEventListener("click", () => {
            const markers = document.querySelectorAll(".map-marker");
            markers.forEach(m => {
                if (m.getAttribute("data-target") === item.id) {
                    m.click();
                    document.getElementById("map").scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
        
        grid.appendChild(card);
    });
}

// 10. 필터 검색 및 카테고리 필터링 제어
const filterTabs = document.querySelectorAll(".filter-tab");
const attractionSearch = document.getElementById("attraction-search");
const globalSearch = document.getElementById("global-search");
const globalSearchBtn = document.getElementById("global-search-btn");

let activeFilter = "all";
let searchFilterStr = "";

function applyFilters() {
    let filtered = attractions;
    
    if (activeFilter !== "all") {
        filtered = filtered.filter(a => a.category === activeFilter);
    }
    
    if (searchFilterStr.trim() !== "") {
        const query = searchFilterStr.toLowerCase();
        filtered = filtered.filter(a => 
            a.name.toLowerCase().includes(query) || 
            a.description.toLowerCase().includes(query)
        );
    }
    
    renderAttractionsList(filtered);
}

filterTabs.forEach(tab => {
    tab.addEventListener("click", () => {
        filterTabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        activeFilter = tab.getAttribute("data-filter");
        applyFilters();
    });
});

attractionSearch.addEventListener("input", (e) => {
    searchFilterStr = e.target.value;
    applyFilters();
});

// 전역 검색 (Hero 섹션)
if (globalSearchBtn) {
    globalSearchBtn.addEventListener("click", () => {
        const val = globalSearch.value;
        if (val.trim() !== "") {
            searchFilterStr = val;
            attractionSearch.value = val;
            
            filterTabs.forEach(t => t.classList.remove("active"));
            document.querySelector("[data-filter='all']").classList.add("active");
            activeFilter = "all";
            
            applyFilters();
            document.getElementById("explore").scrollIntoView({ behavior: 'smooth' });
        }
    });
    
    globalSearch.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            globalSearchBtn.click();
        }
    });
}

// 11. 여정 플래너 코어 엔진
function initItineraryHandlers() {
    const dayTabs = document.querySelectorAll(".day-tab");
    dayTabs.forEach(tab => {
        tab.addEventListener("click", () => {
            dayTabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            selectedDay = parseInt(tab.getAttribute("data-day"));
            renderTimeline();
        });
    });
    
    document.getElementById("clear-planner-btn").addEventListener("click", () => {
        itinerary[1] = [];
        itinerary[2] = [];
        renderTimeline();
        showToast("일정표를 초기화했습니다.");
    });
    
    // 일정표 모달 제어
    const printBtn = document.getElementById("print-planner-btn");
    const printModal = document.getElementById("print-modal");
    const closePrintModal = document.getElementById("close-print-modal");
    
    printBtn.addEventListener("click", () => {
        const day1List = itinerary[1];
        const day2List = itinerary[2];
        
        if (day1List.length === 0 && day2List.length === 0) {
            alert("일정표에 먼저 관광지를 1개 이상 추가해 주세요!");
            return;
        }
        
        const modalBody = document.getElementById("print-modal-body");
        let html = `
            <div style="text-align: center; border-bottom: 2px solid #1A2B4C; padding-bottom: 20px; margin-bottom: 30px;">
                <h1 style="font-family: var(--font-serif); font-size: 2.2rem; color: #1A2B4C; margin-bottom:10px;">안동 맞춤형 여행 일정표</h1>
                <p style="font-family: var(--font-heading); font-size: 0.85rem; letter-spacing: 1.5px; color: #626B7A; text-transform: uppercase;">ANDONG CUSTOM ITINERARY | 한국 정신문화의 수도</p>
            </div>
        `;
        
        [1, 2].forEach(day => {
            const list = itinerary[day];
            if (list.length > 0) {
                html += `
                    <div style="margin-bottom: 40px;">
                        <h3 style="background-color: #1A2B4C; color: white; padding: 10px 20px; font-family: var(--font-heading); border-radius: 4px;">DAY ${day} 일정 일정표</h3>
                        <div style="padding-top: 15px;">
                `;
                
                list.forEach((item, idx) => {
                    html += `
                        <div style="display: flex; gap: 20px; margin-bottom: 20px; align-items: flex-start;">
                            <span style="background-color: #D4AF37; color: white; width: 26px; height: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; flex-shrink: 0;">${idx + 1}</span>
                            <div>
                                <h4 style="font-family: var(--font-serif); font-size: 1.25rem; margin-bottom: 4px; color: #1A2B4C;">${item.name}</h4>
                                <p style="font-size: 0.85rem; color: #626B7A; margin-bottom: 4px;"><i class="fa-solid fa-map-pin"></i> 주소: ${item.address}</p>
                                <p style="font-size: 0.9rem; color: #2D3139;">${item.description}</p>
                            </div>
                        </div>
                    `;
                    
                    if (idx < list.length - 1) {
                        const transitMin = Math.round(item.transitVal * 0.7);
                        html += `
                            <div style="border-left: 2px dashed #E5E1D8; margin-left: 13px; padding: 10px 0 10px 25px; color: #C84B31; font-size: 0.85rem; font-weight: 600;">
                                <i class="fa-solid fa-taxi"></i> 다음 경유지까지 시내교통(택시/버스) 예상 소요 시간: ~${transitMin}분
                            </div>
                        `;
                    }
                });
                
                html += `</div></div>`;
            }
        });
        
        modalBody.innerHTML = html;
        printModal.classList.add("open");
    });
    
    closePrintModal.addEventListener("click", () => {
        printModal.classList.remove("open");
    });
}

function addToPlanner(item) {
    const list = itinerary[selectedDay];
    
    if (list.some(x => x.id === item.id)) {
        showToast(`${item.name}은(는) 이미 ${selectedDay}일차 일정표에 추가되어 있습니다!`, true);
        return;
    }
    
    list.push(item);
    renderTimeline();
    showToast(`${item.name}을(를) ${selectedDay}일차에 등록했습니다.`);
}

function removeFromPlanner(idx) {
    const name = itinerary[selectedDay][idx].name;
    itinerary[selectedDay].splice(idx, 1);
    renderTimeline();
    showToast(`${name}을(를) 일정표에서 해제했습니다.`);
}

function moveItem(idx, dir) {
    const list = itinerary[selectedDay];
    const targetIdx = idx + dir;
    if (targetIdx < 0 || targetIdx >= list.length) return;
    
    const temp = list[idx];
    list[idx] = list[targetIdx];
    list[targetIdx] = temp;
    
    renderTimeline();
}

function renderTimeline() {
    const container = document.getElementById("timeline-container");
    const list = itinerary[selectedDay];
    
    container.innerHTML = "";
    
    if (list.length === 0) {
        container.innerHTML = `
            <div class="empty-timeline-message" id="empty-timeline-msg">
                <i class="fa-solid fa-calendar-days"></i>
                <p>일정표가 비어 있습니다. 지도 또는 상단의 명소 카드에서 랜드마크를 추가하여 여행 계획을 세워보세요!</p>
            </div>
        `;
        updateSummary();
        return;
    }
    
    list.forEach((item, idx) => {
        const card = document.createElement("div");
        card.className = "timeline-card";
        
        card.innerHTML = `
            <span class="timeline-index">${idx + 1}</span>
            <img src="${item.img}" alt="${item.name}" class="timeline-img">
            <div class="timeline-info">
                <h5>${item.name}</h5>
                <span><i class="fa-solid fa-ticket text-gold"></i> 입장료: ${item.fee}</span>
            </div>
            <div class="timeline-actions">
                <button class="timeline-action-btn move-up-btn" title="위로 이동" ${idx === 0 ? 'disabled style="opacity:0.3"' : ''}>
                    <i class="fa-solid fa-arrow-up"></i>
                </button>
                <button class="timeline-action-btn move-down-btn" title="아래로 이동" ${idx === list.length - 1 ? 'disabled style="opacity:0.3"' : ''}>
                    <i class="fa-solid fa-arrow-down"></i>
                </button>
                <button class="timeline-action-btn delete-btn" title="일정 제외">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </div>
        `;
        
        card.querySelector(".move-up-btn").addEventListener("click", () => moveItem(idx, -1));
        card.querySelector(".move-down-btn").addEventListener("click", () => moveItem(idx, 1));
        card.querySelector(".delete-btn").addEventListener("click", () => removeFromPlanner(idx));
        
        container.appendChild(card);
        
        if (idx < list.length - 1) {
            const estTime = Math.max(10, Math.round(item.transitVal * 0.65));
            const transitDiv = document.createElement("div");
            transitDiv.className = "timeline-transit-card";
            transitDiv.innerHTML = `
                <i class="fa-solid fa-arrows-left-right-to-line"></i>
                <span>다음 목적지 이동: 약 ~${estTime}분 (버스/택시 환승 추천)</span>
            `;
            container.appendChild(transitDiv);
        }
    });
    
    updateSummary();
}

function updateSummary() {
    const stopsCount = document.getElementById("summary-stops-count");
    const admissionCost = document.getElementById("summary-admission-cost");
    const travelCost = document.getElementById("summary-travel-cost");
    const smartTipBody = document.getElementById("planner-smart-tip");
    
    const day1List = itinerary[1];
    const day2List = itinerary[2];
    const combinedList = [...day1List, ...day2List];
    
    stopsCount.textContent = combinedList.length + "개";
    
    let totalAdmission = 0;
    
    combinedList.forEach(item => {
        totalAdmission += item.feeVal;
    });
    
    admissionCost.textContent = `₩${totalAdmission.toLocaleString()}`;
    
    let totalCommutes = Math.max(0, day1List.length - 1) + Math.max(0, day2List.length - 1);
    let transitTotal = totalCommutes * 3500;
    travelCost.textContent = `₩${transitTotal.toLocaleString()}`;
    
    // 일정별 스마트 피드백 조언
    if (combinedList.length === 0) {
        smartTipBody.textContent = "관광 명소를 선택하면 맞춤형 대중교통 이용 루트를 실시간으로 조언해 드립니다.";
    } else {
        const hasHahoe = combinedList.some(item => item.id === "hahoe");
        const hasDosan = combinedList.some(item => item.id === "dosanseowon");
        
        if (hasHahoe && hasDosan) {
            smartTipBody.innerHTML = `<strong>동선 권고:</strong> 하회마을은 안동시 <strong>서쪽</strong> 끝에, 도산서원은 <strong>동북쪽</strong> 끝에 위치하여 동선상 정반대입니다. 이 두 곳을 하루 안에 모두 도는 것은 매우 버겁습니다. 1일차와 2일차로 나누어 방문하는 계획을 적극 권장합니다.`;
        } else if (hasHahoe) {
            smartTipBody.innerHTML = `**하회마을**을 가실 때는 안동역 및 터미널 2번 승강장에서 **210번 시내버스**를 타십시오. (배차 간격 약 1시간 단위이므로 배차표 확인 필수).`;
        } else if (hasDosan) {
            smartTipBody.innerHTML = `**도산서원**은 대중교통 배차 편수가 매우 적은 편입니다. 시간을 아끼시려면 안동역에서 제공하는 **관광택시 대여 패키지(3시간 50,000원)**를 활용하는 것이 편리합니다.`;
        } else {
            smartTipBody.textContent = "강변을 따라 위치한 월영교, 낙강물길공원 등은 비교적 가까운 거리에 모여 있어 연계하여 산책 및 자전거 관광으로 편리하게 이동할 수 있습니다.";
        }
    }
}

// 12. HTML5 Web Audio API 전통 풍물 연주 (장구 장단 합성기)
let audioCtx = null;

function getAudioContext() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioCtx;
}

function playTraditionalBeat() {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') {
        ctx.resume();
    }
    
    const now = ctx.currentTime;
    
    // 쿵 (궁편: janggu left low side, sine wave)
    function playKung(time) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = "sine";
        osc.frequency.setValueAtTime(80, time);
        osc.frequency.exponentialRampToValueAtTime(0.01, time + 0.3);
        
        gain.gain.setValueAtTime(0.6, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + 0.3);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start(time);
        osc.stop(time + 0.35);
    }
    
    // 딱 (채편: janggu right high side, triangle wave)
    function playDdak(time) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = "triangle";
        osc.frequency.setValueAtTime(600, time);
        osc.frequency.exponentialRampToValueAtTime(100, time + 0.08);
        
        gain.gain.setValueAtTime(0.4, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + 0.08);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start(time);
        osc.stop(time + 0.1);
    }
    
    // 덩 (동시 연타)
    function playDeong(time) {
        playKung(time);
        playDdak(time);
    }
    
    // 자진모리 장단 연주 스케줄링 (총 4박):
    // 덩 (0s) -> 쿵 (0.2s) -> 딱 (0.35s) -> 쿵 (0.5s) -> 덩 (0.7s) -> 딱 (0.9s)
    playDeong(now);
    playKung(now + 0.2);
    playDdak(now + 0.35);
    playKung(now + 0.5);
    playDeong(now + 0.75);
    playDdak(now + 0.95);
}

// 13. 하회탈 반응 핸들러
function initMaskHandlers() {
    const maskCards = document.querySelectorAll(".mask-selector-card");
    const showcaseImg = document.getElementById("mask-showcase-img");
    const danceBtn = document.getElementById("mask-dance-btn");
    const soundBtn = document.getElementById("mask-sound-btn");
    
    const statusBadge = document.getElementById("mask-status-badge");
    const infoTitle = document.getElementById("mask-info-title");
    const infoQuote = document.getElementById("mask-info-quote");
    const roleTxt = document.getElementById("mask-role");
    const symbolTxt = document.getElementById("mask-symbol");
    const featureTxt = document.getElementById("mask-feature");
    
    maskCards.forEach(card => {
        card.addEventListener("click", () => {
            maskCards.forEach(c => c.classList.remove("active"));
            card.classList.add("active");
            
            const targetMask = card.getAttribute("data-mask");
            const data = masksData[targetMask];
            if (!data) return;
            
            showcaseImg.classList.add("animate-shake");
            setTimeout(() => {
                showcaseImg.classList.remove("animate-shake");
            }, 800);
            
            statusBadge.textContent = data.badge;
            infoTitle.textContent = data.title;
            infoQuote.textContent = data.quote;
            roleTxt.textContent = data.role;
            symbolTxt.textContent = data.symbol;
            featureTxt.textContent = data.feature;
        });
    });
    
    danceBtn.addEventListener("click", () => {
        showcaseImg.classList.add("animate-shake");
        playTraditionalBeat();
        setTimeout(() => {
            showcaseImg.classList.remove("animate-shake");
        }, 800);
    });
    
    soundBtn.addEventListener("click", () => {
        playTraditionalBeat();
        showToast("신디사이저로 구현한 풍물 장단을 연주합니다!");
    });
}

// 14. 아코디언 핸들러 (음식 설명 FAQ)
function initAccordion() {
    const foodItems = document.querySelectorAll(".food-item");
    
    foodItems.forEach(item => {
        const header = item.querySelector(".food-header");
        header.addEventListener("click", () => {
            if (item.classList.contains("active")) {
                item.classList.remove("active");
                return;
            }
            foodItems.forEach(x => x.classList.remove("active"));
            item.classList.add("active");
        });
    });
    
    const accordionItems = document.querySelectorAll(".accordion-item");
    accordionItems.forEach(item => {
        const header = item.querySelector(".accordion-header");
        header.addEventListener("click", () => {
            if (item.classList.contains("active")) {
                item.classList.remove("active");
                return;
            }
            accordionItems.forEach(x => x.classList.remove("active"));
            item.classList.add("active");
        });
    });
}

// 15. 커스텀 토스트 알림창
function showToast(message, isError = false) {
    let toast = document.getElementById("ui-toast");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "ui-toast";
        toast.style.position = "fixed";
        toast.style.bottom = "30px";
        toast.style.left = "50%";
        toast.style.transform = "translateX(-50%) translateY(100px)";
        toast.style.padding = "12px 28px";
        toast.style.borderRadius = "50px";
        toast.style.fontFamily = "var(--font-heading)";
        toast.style.fontWeight = "600";
        toast.style.fontSize = "0.9rem";
        toast.style.zIndex = "3000";
        toast.style.boxShadow = "var(--shadow-lg)";
        toast.style.transition = "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.4s";
        toast.style.opacity = "0";
        document.body.appendChild(toast);
    }
    
    toast.textContent = message;
    toast.style.backgroundColor = isError ? "var(--color-accent)" : "var(--color-primary)";
    toast.style.color = isError ? "white" : "var(--color-gold)";
    
    toast.style.opacity = "1";
    toast.style.transform = "translateX(-50%) translateY(0)";
    
    if (window.toastTimeout) clearTimeout(window.toastTimeout);
    
    window.toastTimeout = setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateX(-50%) translateY(100px)";
    }, 3000);
}
