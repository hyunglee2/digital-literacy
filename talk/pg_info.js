var total_page = 6;//페이지 수 -> 시나리오마다 total_page 수 바꾸기 

const instruction = [
    `
    <span class='text-bold'>카카오톡으로 받은 온라인 청첩장을 통해</span> 결혼식장 위치를 확인해 보십시오. 
     
    <div class='modal_info'>
        <div class='info_head'>< 필요정보 ><br></div>
        <div class='info_body'>
            ○ 친구 이름 : 이민정<br>
            ○ 결혼식 날짜 : 2023년 9월 23일(토)<br>
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
];
