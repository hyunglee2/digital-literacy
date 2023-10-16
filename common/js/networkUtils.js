// const user = localStorage.getItem('user_now');//지금 사용자 누구
// const parse_data = JSON.parse(localStorage.getItem(user));

// const apiUrl = 'https://api.directual.com/good/api/v5/webHook/getdata_h?appID=2af228bd-44ba-4f16-8f3b-095248a39606'; // 대상 API 엔드포인트 URL
// const jsonData = parse_data; // POST할 JSON 데이터

// fetch(apiUrl, {
//   method: 'POST', // POST 요청
//   headers: {
//     'Content-Type': 'application/json', // JSON 데이터를 보내는 경우 Content-Type 설정
//   },
//   body: JSON.stringify(jsonData), // JSON 데이터를 문자열로 변환하여 요청 본문에 설정
// })
//   .then(response => response.json()) // 서버 응답을 JSON으로 파싱
//   .then(data => {
//     console.log('서버 응답:', data);
//     // 응답 데이터 처리
//   })
//   .catch(error => {
//     console.error('오류:', error);
//     // 오류 처리
//   });
