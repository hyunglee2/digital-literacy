var total_page = 10;//페이지 수 -> 시나리오마다 total_page 수 바꾸기 

const instruction = [
    `
    <span class='text-bold'>축의금용 현금을 인출하려고 하는 데 ATM 기기가 보이지 않습니다. 
    친구에게 돈을 빌린 후 아래 정보를 활용하여 은행 앱으로 송금(계좌이체)해 보세요.</span>
     
    <div class='modal_info'>
        <div class='info_head'>< 송금 시 필요정보 ><br></div>
        <div class='info_body'>
            ○ 수신인 정보<br>
            &nbsp;- 계 좌 주 : 김도겸<br>
            &nbsp;- 은    행 : 평생은행<br>
            &nbsp;- 계좌번호 : 456-1004-0805<br>
            ○ 이체금액 : 100,000원<br>
            ○ 이체계좌 비밀번호 : 0205<br>
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
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
];

$(document).on("click", ".end_pt", function () {
    location.href = "../bank/bank.html";
});


