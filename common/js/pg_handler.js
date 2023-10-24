document.addEventListener('DOMContentLoaded', () => {
    // const max_pg_num = 3; // 최대 페이지 num 갱신 필요
    var page_num = 1; // 수정 XXX -> 맨 처음 페이지 초기화하기 위함
    const pages = document.querySelectorAll('.page');

    const prevBtn = document.getElementById("prev");
    const nextBtn = document.getElementById("next");

    var selc2Arr = [];
    var accntArr = [];
    var priceArr = [];
    var pwArr = [];
    var pwTrial = 0;

    //+++++++++++현재 사용자 데이터로 셋팅하기+++++++++++++++++
    const user = localStorage.getItem('user_now');//지금 사용자 누구
    const parse_data = JSON.parse(localStorage.getItem(user));//지금 사용자 데이터

    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++
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


    $(document).on("click", "#help_btn", function () {
        $('#modalForInit').modal('show');
        $('.modal-body').html(instruction);
    });

    //스킵 버튼 : 클릭 시 다음 시나리오로 이동, 해당 씬 성공여부 = 0
    $(document).on("click", ".skip_btn", function () {
        var succ = currScn + 'succ';
        parse_data.user_data[parsingNum][succ] = false;
        localStorage.setItem(user, JSON.stringify(parse_data));  //문자열로 바꿔서 로컬저장
        location.href = "../" + nextPage + "/" + nextPage + ".html";
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


    //특정 영역 외 클릭시 이벤트 처리 (class 명으로 가져오기)
    // document.querySelector("page").addEventListener("click", function (e) {//메인 영역에서만 이벤트 발생
    $(document).on("click", ".page", function (e) {
        var myPgNum = $(".active").attr('id');// active 되어있는 페이지 id 값
        var real_pg = myPgNum.slice(1); // id값 앞에 붙은 p 떼어내기
        var clickableArea = "pg_" + real_pg + "_answer";

        let inputableAnswer = inputAnswer[real_pg].inputableAnswer;//페이지별 입력 정답 불러오기

        if (e.target.className.includes(clickableArea)) {//맞게 클릭하면

            // 시나리오 마지막 부분
            if (e.target.className.includes("end_pt")) {
                var succ = currScn + 'succ';
                parse_data.user_data[parsingNum][succ] = true;
                localStorage.setItem(user, JSON.stringify(parse_data));  //문자열로 바꿔서 로컬저장
                location.href = "../" + nextPage + "/" + nextPage + ".html";
            }

            // 자동 페이지 넘김
            // train/p2, p4 
            // answer_auto_txt pg_n_answer n_input
            else if (e.target.className.includes("answer_auto_txt")) {
                $('.' + real_pg + '_input').on("input", function () {
                    let unspacedValue = this.value.split(' ').join('');
                    if (unspacedValue == inputableAnswer) {
                        next();
                    } else {
                        return false;
                    }
                });
            }

            // 1개 선택 시 버튼 활성화
            // train/p15
            //active_selc_input pg_n_answer 
            else if (e.target.className.includes("active_selc_input")) {
                $(".selected").addClass("pg_" + real_pg + "_selected")
                $(".disabled_btn").addClass("pg_" + real_pg + "_answer");
                $(".disabled_btn").removeClass("pg_" + real_pg + "_css_remove");

            }

            // 2개 선택 시 버튼 활성화, 텍스트 변경
            // train/p8
            //selc2_txtChange_btnActive
            else if (e.target.className.includes("selc2_txtChange_btnActive")) {
                for (j = 0; j <= 2; j++) {
                    if (e.target.className.includes("input_" + j)) {
                        selc2Arr.push(j);
                        const set = new Set(selc2Arr);
                        selc2Arr = [...set];
                        if (j == 1) { $(".txt_edit_" + j).html('23일 (토)'); }
                        else if (j == 2) { $(".txt_edit_" + j).html('10:00'); }
                        $(".css_edit_" + j).addClass("pg_" + real_pg + "_selected_css");
                        if (selc2Arr.length == 2) {
                            $(".selc_next_btn").addClass("pg_" + real_pg + "_answer");
                        }
                    }
                }
            }

            // 선택 시 감점 
            // ded_score
            else if (e.target.className.includes("ded_score")) {
                var ded = currScn + 'ded';
                var currDed = parse_data.user_data[parsingNum][ded];
                if (currDed == "") {
                    parse_data.user_data[parsingNum][ded] = 1;
                    localStorage.setItem(user, JSON.stringify(parse_data));  //문자열로 바꿔서 로컬저장
                } else {
                    parse_data.user_data[parsingNum][ded] += 1;
                    localStorage.setItem(user, JSON.stringify(parse_data));  //문자열로 바꿔서 로컬저장
                }
                init();
                if (currScn == 'train' && page_num == 10) { // train/p10
                    page_num = 13;
                } else if (e.target.className.includes("pg_2skip")) { // talk/p3
                    page_num += 2;
                }
                else {
                    page_num += 1;
                }

                showPage('p' + page_num);
                console.log(page_num);
                doubleSubmitFlag = false;
            }

            // 페이지 건너뛰기
            // talk/p2
            // pg_2skip
            else if (e.target.className.includes("pg_2skip")) {
                init();
                page_num += 2;
                showPage('p' + page_num);
                console.log(page_num);
                doubleSubmitFlag = false;
            }

            // 페이지 뒤로가기
            // talk/p2
            // pg_back
            else if (e.target.className.includes("pg_back")) {
                init();
                if (e.target.className.includes("pg_1back")) { // talk/p3
                    page_num -= 1;
                }
                else if (e.target.className.includes("pg_2back")) { // talk/p5
                    page_num -= 2;
                }
                showPage('p' + page_num);
                console.log(page_num);
                doubleSubmitFlag = false;
            }

            // 화면 내 숫자 누를 때 마다 텍스트 변경
            // bank/p5
            //accnt_input pg_n_answer input_(키패드 넘버)
            else if (e.target.className.includes("accnt_input")) {
                //키패드 번호 누르기
                for (j = 0; j < 10; j++) {
                    if (e.target.className.includes("input_" + j)) {
                        //let pressedKey = j;
                        var num_cnt = accntArr.length
                        accntArr.push(j);
                        var accnt_set = accntArr.join('');
                        // 실제 계좌처럼 3글자, 7글자 뒤에 - 넣기
                        var intervalAccnt = '';
                        for (var i = 0; i < accnt_set.length; i++) {
                            if (i === 3 || i === 7) {
                                intervalAccnt += '-';
                            }
                            intervalAccnt += accnt_set[i];
                        }
                        $(".user_accnt_input").html(intervalAccnt);
                        $(".user_accnt_input").addClass("pg_" + real_pg + "_edit_css");

                        console.log('arr', accntArr);
                    }
                }
                //삭제 누르기
                if (e.target.className.includes("pop_input")) {
                    accntArr.splice(-1, 1); // 배열 맨 뒷 요소 지우기
                    var accnt_set = accntArr.join('');
                    var intervalAccnt = '';
                    for (var i = 0; i < accnt_set.length; i++) {
                        if (i === 4 || i === 7) {
                            intervalAccnt += '-';
                        }
                        intervalAccnt += accnt_set[i];
                    }
                    $(".user_accnt_input").html(intervalAccnt);
                }
            }

            // 문자열 길이 맞으면 넘어가기 
            // bank/p5
            // length_chck
            else if (e.target.className.includes("length_chck")) {
                var accnt_set = accntArr.join('');
                var accnt_length = accntArr.length;

                //계좌가 11자리가 맞으면 다음 페이지, 아니면 모달 fail 증가 후 띄우기
                if (accnt_length == 11) {

                    //계좌번호 일치하면 넘어가기 
                    if (accnt_set == inputableAnswer) {
                        next();
                        doubleSubmitFlag = false;
                    } else {//일치하지 않으면 감점 후 넘어가기, 받는분 '국평원'
                        var ded = currScn + 'ded';
                        var currDed = parse_data.user_data[parsingNum][ded];
                        if (currDed == "") {
                            parse_data.user_data[parsingNum][ded] = 1;
                            localStorage.setItem(user, JSON.stringify(parse_data));  //문자열로 바꿔서 로컬저장
                        } else {
                            parse_data.user_data[parsingNum][ded] += 1;
                            localStorage.setItem(user, JSON.stringify(parse_data));  //문자열로 바꿔서 로컬저장
                        }

                        $(".recipient").html('국평원');
                        next();
                        doubleSubmitFlag = false;
                    }


                } else {

                    var fail = currScn + 'fail';
                    var currFail = parse_data.user_data[parsingNum][fail];
                    if (currFail == "") {
                        parse_data.user_data[parsingNum][fail] = 1;
                        localStorage.setItem(user, JSON.stringify(parse_data));  //문자열로 바꿔서 로컬저장
                    } else {
                        parse_data.user_data[parsingNum][fail] += 1;
                        localStorage.setItem(user, JSON.stringify(parse_data));  //문자열로 바꿔서 로컬저장
                    }
                    $('#staticBackdrop').modal('show');
                    $('.modal-body').html('계좌번호를 확인하세요');
                }
            }

            // 화면 내 숫자 누를 때 마다 텍스트 변경2
            // bank/p6
            //price_input pg_n_answer input_(키패드 넘버)
            else if (e.target.className.includes("price_input")) {
                //키패드 번호 누르기
                for (j = 0; j < 10; j++) {
                    if (e.target.className.includes("input_" + j)) {
                        //let pressedKey = j;
                        var num_cnt = priceArr.length
                        priceArr.push(j);
                        var price_set = priceArr.join('');
                        //  3글자 , 넣기
                        var intervalPrice = '';
                        for (var i = 0; i < price_set.length; i++) {
                            if (i > 0 && i % 3 === 0) {
                                intervalPrice += ',';
                            }
                            intervalPrice += price_set[i];
                        }
                        $(".user_price_input").html(intervalPrice);
                        $(".user_price_input").addClass("pg_" + real_pg + "_edit_css");

                        console.log('arr', priceArr);
                    }
                }
                //삭제 누르기
                if (e.target.className.includes("pop_input")) {
                    priceArr.splice(-1, 1); // 배열 맨 뒷 요소 지우기
                    var price_set = priceArr.join('');
                    var intervalPrice = '';
                    for (var i = 0; i < price_set.length; i++) {
                        if (i > 0 && i % 3 === 0) {
                            intervalPrice += ',';
                        }
                        intervalPrice += price_set[i];
                    }
                    $(".user_price_input").html(intervalPrice);
                }
            }

            // 문자열 길이 맞으면 넘어가기2
            // bank/p6
            // length_price_chck
            else if (e.target.className.includes("length_price_chck")) {
                var price_set = priceArr.join('');

                //계좌번호 일치하면 넘어가기 
                if (price_set == inputableAnswer) {
                    next();
                    doubleSubmitFlag = false;
                } else {//일치하지 않으면 감점 후 넘어가기, 받는분 '국평원'
                    var ded = currScn + 'ded';
                    var currDed = parse_data.user_data[parsingNum][ded];
                    if (currDed == "") {
                        parse_data.user_data[parsingNum][ded] = 1;
                        localStorage.setItem(user, JSON.stringify(parse_data));  //문자열로 바꿔서 로컬저장
                    } else {
                        parse_data.user_data[parsingNum][ded] += 1;
                        localStorage.setItem(user, JSON.stringify(parse_data));  //문자열로 바꿔서 로컬저장
                    }
                    next();
                    doubleSubmitFlag = false;
                }
            }

            // 버튼 누르면 텍스트 변환
            // bank/p6
            // user_price_btn_input
            else if (e.target.className.includes("user_price_btn_input")) {
                priceArr = [1, 0, 0, 0, 0, 0];
                $(".user_price_input").addClass("pg_" + real_pg + "_edit_css");
                var price_set = priceArr.join('');
                var intervalPrice = '';
                for (var i = 0; i < price_set.length; i++) {
                    if (i > 0 && i % 3 === 0) {
                        intervalPrice += ',';
                    }
                    intervalPrice += price_set[i];
                }
                $(".user_price_input").html(intervalPrice);
            }

            //----비번4자리 있을 경우 + dot -------------------
            //pw_4_input pg_n_answer input_(키패드 넘버)
            else if (e.target.className.includes("pw_4_input")) {

                //키패드 번호 누르기
                for (j = 0; j < 10; j++) {
                    if (e.target.className.includes("input_" + j)) {
                        //let pressedKey = j;
                        if (pwArr.length < 3) {
                            var num_cnt = pwArr.length
                            pwArr.push(j);
                            var pw_sett = pwArr.join('');
                            console.log(pw_sett);
                            $(".dot" + num_cnt).css("background-color", "#009591");//색칠

                        } else if (pwArr.length = 3) { //배열 길이 3 -> 4개까지 입력하고 일어날 이벤트
                            pwArr.push(j);
                            $(".dot3").css("background-color", "#009591");//색칠
                            var pw_set = pwArr.join('');

                            if (pw_set === inputableAnswer) {
                                next();
                                doubleSubmitFlag = false;
                            } else {
                                var fail = currScn + 'fail';
                                var currFail = parse_data.user_data[parsingNum][fail];
                                if (currFail == "") {
                                    parse_data.user_data[parsingNum][fail] = 1;
                                    localStorage.setItem(user, JSON.stringify(parse_data));  //문자열로 바꿔서 로컬저장
                                } else {
                                    parse_data.user_data[parsingNum][fail] += 1;
                                    localStorage.setItem(user, JSON.stringify(parse_data));  //문자열로 바꿔서 로컬저장
                                }
                                pwTrial += 1;
                                if (pwTrial >= 3) { //회 오류부터는 ded 증가하고 다음 페이지로 넘어가기
                                    var ded = currScn + 'ded';
                                    var currDed = parse_data.user_data[parsingNum][ded];
                                    if (currDed == "") {
                                        parse_data.user_data[parsingNum][ded] = 1;
                                        localStorage.setItem(user, JSON.stringify(parse_data));  //문자열로 바꿔서 로컬저장
                                    } else {
                                        parse_data.user_data[parsingNum][ded] += 1;
                                        localStorage.setItem(user, JSON.stringify(parse_data));  //문자열로 바꿔서 로컬저장
                                    }
                                    next();
                                    doubleSubmitFlag = false;
                                } else {

                                    //입력한 비밀번호 초기화 , css 초기화
                                    pwArr = [];
                            for (i = 0; i < 4; i++) {
                                $(".dot" + i).css("background-color", "#4f4f5a");//버튼누르면 색칠초기화
                            }
                            //모달 띄우기
                                    $('#staticBackdrop').modal('show');
                                $('.modal-body').html('비밀번호를 확인하세요');

                                }
                            }

                        }
                    }
                }
                //삭제 누르기 + 색칠 지우기
                if (e.target.className.includes("pop_input")) {
                    pwArr.splice(-1, 1); // 배열 맨 뒷 요소 지우기
                    var pw_set = pwArr.join('');
                    var pw_length = pw_set.length;
                    // dltNum = pw_length + 1;
                    $(".dot" + pw_length).css("background-color", "#4f4f5a");
                    console.log(pw_set);
                }
            }

            //암것도 없으면 모달 띄우기
            else {
                next();//다음 페이지로 이동
            }

        } else {
            //틀리게 클릭하면
            $('#staticBackdrop').modal('show');

            // page에서 정답 이외의 영역 클릭시 모달 띄우고 fail 횟수 증가
            $('.modal-body').html(tryAginMsg);
            var fail = currScn + 'fail';
            var currFail = parse_data.user_data[parsingNum][fail];
            if (currFail == "") {
                parse_data.user_data[parsingNum][fail] = 1;
                localStorage.setItem(user, JSON.stringify(parse_data));  //문자열로 바꿔서 로컬저장
            } else {
                parse_data.user_data[parsingNum][fail] += 1;
                localStorage.setItem(user, JSON.stringify(parse_data));  //문자열로 바꿔서 로컬저장
            }
        }

    });
});
