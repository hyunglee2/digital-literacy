var total_page = 5;//페이지 수 -> 시나리오마다 total_page 수 바꾸기 

const instruction = [
    `
    나는 부산에 살고 있습니다. 
    <div class='text-bold'>다음 주에 서울에서 결혼식이 있는 데, kTX를 타고 갈 예정입니다.</div> 
    지도앱으로 우리집(BEXCO)에서 부산역까지 대중교통으로 최소환승해서 가는 방법을 찾아봅시다. 
     `
]

const tryAginMsg = [
    `
    다시 시도해보세요!
     `
]

// 페이지 로드 후 0.5초 후 모달로 지시문 띄우기
$(document).ready(function () {
    $(document).ready(function () {
        setTimeout(function () {
            $('#modalForInit').modal('show');
            $('.modal-body').html(instruction);
        }, 500);
    });
});

//index는 0부터 시작하므로 total_page+1개만큼 {} 작성
// {
//     page: 6,
//     inputableAnswer: "12345678"
// }
const inputAnswer = [
    {},
    {},
    {},
    {
        page: 3,
        inputableAnswer: "부산역"
    },
    {},
    {}
];