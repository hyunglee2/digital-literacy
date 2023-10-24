var total_page = 16;//페이지 수 -> 시나리오마다 total_page 수 바꾸기 

const instruction = [
    `
    코레일톡 어플리케이션을 활용하여 <span class='text-bold'>기차표를 예약하려고 합니다.</span>
    아래 정보를 활용하여 예매해봅시다.
    <div class='modal_info'>
        <div class='info_head'>< 예매 시 필요정보 ><br></div>
        <div class='info_body'>
            ○ 출 발 역 : 부산역<br>
            ○ 도 착 역 : 서울역<br>
            ○ 출발일시 : 2023년 9월 23일(토) 10시 이후<br>
            ○ 도착일시 : 2시 이전 도착 <br>
            ○ 기차종류 : KTX 일반실<br>
            ○ 승 객 수 : 성인 1명<br>
            ○ 좌석선택 : 창측 정방향<br>
            ○ 결제방법 : 간편결제 > 카카오페이<br>
        </div>
    </div>

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
    {
        page: 2,
        inputableAnswer: "부산"
    },
    {},
    {},
    {
        page: 5,
        inputableAnswer: "서울"
    },
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
