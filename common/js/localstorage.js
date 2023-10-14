// JSON 형태
let text = '{"acti_data":[' +
    '{"talk1":"","talk2":"","talk3":"" },' +
    '{"msg1":"","msg2":"","msg3":"" },' +
    '{"cafe1":"","cafe2":"","cafe3":""},' +
    '{"blog1":"","blog2":"","blog3":"" },' +
    '{"video1":"","video2":"","video3":"","video4":"" },' +
    '{"news1":"","news2":"","news3":"","news4":"" },' +
    '{"play_time":"" }  ]} ';

// let result = '{"acti_data":[' +
// '{"talk1":"","talk2":"","talk3":"" },' +
// '{"msg1":"","msg2":"","msg3":"" },' +
// '{"cafe1":"","cafe2":"","cafe3":""},' +
// '{"blog1":"","blog2":"","blog3":"" },' +
// '{"video1":"","video2":"","video3":"","video4":"" },' +
// '{"news1":"","news2":"","news3":"","news4":"" },' +
// '{"play_time":"" }  ]} ';


// index.html 유저 아이디 입력
const idSubmitBtn = document.getElementById("idSubmitBtn");
const userId = document.getElementById("userId");

idSubmitBtn.addEventListener("click", function () {
    const inputName = userId.value;
    alert('click');

    if (inputName == "") {
        alert("이름을 입력해 주세요!")
        return false;
    } else {

        localStorage["player_now"] = inputName;
        localStorage[inputName] = text;
        //const player = localStorage.getItem("player_now");
        //const test_data = localStorage.getItem('player');
        timeInput();
        location.href = "TypeSelection.html";
    }
})


function timeInput() {
    //타임스탬프 저장
    const player = localStorage.getItem('player_now');//지금 사용자 누구
    const parse_data = JSON.parse(localStorage.getItem(player));//지금 사용자 데이터
    const timeData = parse_data.acti_data[6].play_time;
    parse_data.acti_data[6].play_time = returnDate;
    localStorage.setItem(player, JSON.stringify(parse_data));  //문자열로 바꿔서 로컬저장
}