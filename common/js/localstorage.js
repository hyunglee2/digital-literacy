//로컬에 저장할 때는 문자열로 바꾸기  (stringify)
// ex) const parse_data = JSON.parse(localStorage.getItem(player));//지금 사용자 데이터
//localStorage.setItem(player, JSON.stringify(parse_data));  //문자열로 바꿔서 로컬저장
// ex) JSON 수정할 때는 객체로 바꾸기      (parse)


// JSON 형태
const user_data = `{
    "user_data": [
      {
        "71succ": "",
        "71fail": "",
        "71ded": ""
      },
      {
        "72succ": "",
        "72fail": "",
        "72ded": ""
      },
      {
        "73succ": "",
        "73fail": "",
        "73ded": ""
      },
      {
        "74succ": "",
        "74fail": "",
        "74ded": ""
      },
      {
        "75succ": "",
        "75fail": "",
        "75ded": ""
      },
      {
        "sum": ""
      }
    ]
  }`;


// Routing 역할 위함
// 현재 페이지의 URL을 가져와 경로부분 추출, 확장자는 제거
var currURL = window.location.href;
var pathArray = currURL.split('/');
var currPage = pathArray[pathArray.length - 1].replace(".html", "");
console.log("현재 HTML 파일 이름: " + currPage);


var currScn;
var nextPage;

if (currPage === "map") {
    currScn = 71;
    parsingNum = 0;
    nextPage = "train";
} else if (currPage === "train") {
    currScn = 72;
    parsingNum = 1;
    nextPage = "order";
} else if (currPage === "order") {
    currScn = 73;
    parsingNum = 2;
    nextPage = "talk";
} else if (currPage === "talk") {
    currScn = 74;
    parsingNum = 3;
    nextPage = "bank";
} else if (currPage === "bank") {
    currScn = 75;
    parsingNum = 4;
} 



// index.html 유저 아이디 입력
const idSubmitBtn = document.getElementById("idSubmitBtn");
const userId = document.getElementById("userId");

idSubmitBtn.addEventListener("click", function () {
    const inputName = userId.value;
    if (inputName == "") {
        $('#staticBackdrop').modal('show');
        $('.modal-body').html('사용자 ID를 입력해야 버튼이 활성화됩니다.');
        return false;
    } else {
        localStorage["user_now"] = inputName;
        localStorage[inputName] = user_data;
        location.href = "./survey/survey.html";
    }
})
