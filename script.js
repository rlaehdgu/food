const menus = [
    "김치찌개",
    "비빔밥",
    "불고기",
    "된장찌개",
    "제육볶음",
    "떡볶이",
    "치킨",
    "피자",
    "햄버거",
    "초밥"
];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function resetMenu() {
    const menuContainer = document.getElementById('menuContainer');
    menuContainer.innerHTML = '';
    document.getElementById('selectedMenu').textContent = '추천 메뉴: ';
    createMenuItems();
    cardSelected = false; // 카드 선택 상태 초기화
}

function createMenuItems() {
    const menuContainer = document.getElementById('menuContainer');
    shuffleArray(menus);
    menus.forEach((menu) => {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item';

        const menuName = document.createElement('div');
        menuName.className = 'menu-name';
        menuName.textContent = '클릭하여 음식 이름 보기';

        const menuBack = document.createElement('div');
        menuBack.className = 'menu-back';
        menuBack.textContent = menu;

        menuItem.appendChild(menuName);
        menuItem.appendChild(menuBack);
        menuContainer.appendChild(menuItem);

        // 카드 섞는 모션을 부드럽게
        const randomX = Math.random() * 20 - 10; // -10px ~ 10px
        const randomY = Math.random() * 20 - 10; // -10px ~ 10px
        menuItem.style.transform = `translate(${randomX}px, ${randomY}px) scale(0.8)`;
        setTimeout(() => {
            menuItem.style.transform = `translate(0px, 0px) scale(1)`; // 원래 위치로 돌아옴
        }, 100);
    });

    // 카드가 생성된 후 보이도록 설정
    menuContainer.style.opacity = '1';
}

const menuContainer = document.getElementById('menuContainer');
let cardSelected = false; // 카드 선택 상태를 추적

menuContainer.addEventListener('click', (event) => {
    if (cardSelected) return; // 카드가 이미 선택되었으면 아무 것도 하지 않음

    const target = event.target.closest('.menu-item');
    if (target) {
        const menuBack = target.querySelector('.menu-back');
        const selectedMenu = menuBack.textContent;

        // 선택된 카드의 내용 표시
        document.getElementById('selectedMenu').textContent = `추천 메뉴: ${selectedMenu}`;
        target.classList.toggle('flipped'); // 카드 뒤집기
        
        cardSelected = true; // 카드가 선택된 상태로 변경
    }
});

// 다시 뽑기 버튼 클릭 시 메뉴 초기화
document.getElementById('retryButton').addEventListener('click', resetMenu);

// 초기 메뉴 생성
resetMenu();
