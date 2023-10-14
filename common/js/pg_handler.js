document.addEventListener('DOMContentLoaded', () => {
    // const max_pg_num = 3; // 최대 페이지 num 갱신 필요
    var page_num = 1; // 수정 XXX -> 맨 처음 페이지 초기화하기 위함
    const pages = document.querySelectorAll('.page');

    const prevBtn = document.getElementById("prev");
    const nextBtn = document.getElementById("next");


    //창 비율 고정
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", `${vh}px`);

window.addEventListener("resize", () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
});


    //*******************************************************************************
    //**************************+   이벤트 동작    +*********************************** 

    // 페이지 초기화
    function init() {
        pages.forEach(page => {
            page.classList.remove('active');
        });
    }

    //페이지 로드 시 전체 동작 코드 (DOM 로딩 후 동작)
    $(document).ready(function () {
        init();
        showPage('p1');
    });


    //*******************************************************************************
    //**************************+   페이지 전환   +*********************************** 



    // 페이지 표시
    function showPage(id) {
        init();
        const page = document.getElementById(id);
        if (page) {
            page.classList.add('active');
        }
    }

    //다음 버튼 : 클릭 시 페이지 이동, 해당 페이지오디오만 재생(배열 인덱스라 페이지 넘버-1) 
    $(document).on("click", "#next_btn", function () {
        if (page_num < total_page) {
            page_num += 1;
            init();
            showPage('p' + page_num);
        }
        console.log(page_num);
    });

    //이전 버튼
    $(document).on("click", "#prev_btn", function () {
        if (page_num > 1) {
            page_num -= 1;
            init();
            showPage('p' + page_num);
        }
        console.log(page_num);
    });

    //다음 버튼 : 클릭 시 페이지 이동, 해당 페이지오디오만 재생(배열 인덱스라 페이지 넘버-1) 
    $(document).on("click", "#help_btn", function () {
        $('#modalForInit').modal('show');
        $('.modal-body').html(instruction);
    });


    //*******************************************************************************
    //**************************+    클릭 제어   +*********************************** 

    //다음으로 가기 함수 
    function next() {

        if (page_num < total_page) {
            page_num += 1;
            init();
            showPage('p' + page_num);
        }
        console.log(page_num);
        doubleSubmitFlag = false;
    }

    var doubleSubmitFlag = false;
    function doubleSubmitCheck() {
        if (doubleSubmitFlag) {
            return doubleSubmitFlag;
        } else {
            doubleSubmitFlag = true;
            return false;
        }
    }

    // document.querySelector("main").addEventListener("click", function (e) {
    //     $('#staticBackdrop').modal('show');
    // }
    // )





    //특정 영역 외 클릭시 이벤트 처리 (class 명으로 가져오기)
    // document.querySelector("page").addEventListener("click", function (e) {//메인 영역에서만 이벤트 발생
        $(document).on("click", ".page", function (e) {
        var myPgNum = $(".active").attr('id');// active 되어있는 페이지 id 값
        var real_pg = myPgNum.slice(1); // id값 앞에 붙은 p 떼어내기
        var clickableArea = "pg_" + real_pg + "_answer";

        //if (page_num == pageClickArea[i].page) {//현재 페이지와 pageClickArea의 페이지 같으면
        // let clickableArea = pageClickArea[real_pg].correctAnswer; //페이지별 선택 영역 정답 불러오기
        let inputableAnswer = inputAnswer[real_pg].inputableAnswer;//페이지별 입력 정답 불러오기
        // let instruction = modalCont[real_pg].instruction;//페이지별 모달 내용 불러오기
        // let introModalCont = modalCont[0].instruction;//첫 번째 페이지 모달 내용
        if (e.target.className.includes(clickableArea)) {
            //맞게 클릭하면

            //----선택 3개 해야 하는 경우 -------------------
            //selc_3_input pg_n_answer input_(셀렉트 넘버)
            if (e.target.className.includes("selc_3")) {
                for (j = 0; j <= 3; j++) {
                    if (e.target.className.includes("input_" + j)) {
                        selc3Arr.push(j);
                        const set = new Set(selc3Arr);
                        selc3Arr = [...set];
                        console.log(selc3Arr);
                        console.log(selc3Arr.length)
                        $(".pg_" + real_pg + "_css_edit_" + j).addClass("pg_" + real_pg + "_selected_css");
                        if (selc3Arr.length == 3) {
                            $(".selc_next_btn").addClass("pg_" + real_pg + "_answer");
                        }
                    }
                }
            }
    
            //암것도 없으면 모달 띄우기
            else {
                next();//다음 페이지로 이동
            }
    
        } else {
            //틀리게 클릭하면
            $('#staticBackdrop').modal('show');
        }
    
    
        //----------- 모달 내부 내용 넣기 -----------------------
        // if (page_num == 0) {
        //     $('.modal-body').text(introModalCont);
        // } else {
        //     $('.modal-body').text(instruction);
        // }
        $('.modal-body').html(tryAginMsg);


    });
});
