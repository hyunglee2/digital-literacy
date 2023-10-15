var total_page = 4;//페이지 수 -> 시나리오마다 total_page 수 바꾸기 

const instruction = [
    `
    나는 부산에 살고 있습니다.<br>
    다음 주 토요일에 서울에서 친구 결혼식이 있는 데, kTX를 타고 참석할 예정입니다.<br>
    <div class='text-bold'>지도앱으로 우리집(BEXCO)에서 부산역까지 대중교통으로 최소환승해서 가는 방법을 찾아봅시다.</div>
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
    {}
];

 //+++++++++++현재 사용자 데이터로 셋팅하기+++++++++++++++++
 const user = localStorage.getItem('user_now');//지금 사용자 누구
 const parse_data = JSON.parse(localStorage.getItem(user));//지금 사용자 데이터
 var succ = currScn + 'succ';
 var currSucc = parse_data.user_data[parsingNum][succ];


$(document).on("click", ".end_pt", function () {
    alert(fail);
    currSucc = 1;
    localStorage.setItem(user, JSON.stringify(parse_data));  //문자열로 바꿔서 로컬저장
    location.href = "../train/train.html";
});

$(document).on("click", ".skip_btn", function () {
    alert('스킵');
    currSucc = 0;
    localStorage.setItem(user, JSON.stringify(parse_data));  //문자열로 바꿔서 로컬저장
    location.href = "../train/train.html";
});



