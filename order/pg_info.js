var total_page = 10;//페이지 수 -> 시나리오마다 total_page 수 바꾸기 

const instruction = [
    `
    <span class='text-bold'>KTX를 타고 서울역에 도착하였는데</span> 시간 여유가 있어 커피를 마시려고 합니다. 
    <span class='text-bold'>키오스크로</span> 따뜻한 아메리카노 1잔을 포장 주문해봅시다.
     `
]

const tryAginMsg = [
    `
    다시 시도해보세요!
     `
]

// 페이지 로드 후 0.5초 후 모달로 지시문 띄우기
$(document).ready(function () {
    $( document ).ready(function() {
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
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {}
];

