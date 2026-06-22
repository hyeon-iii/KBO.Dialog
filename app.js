const stadiums = {
"LG 트윈스":"잠실야구장",
"두산 베어스":"잠실야구장",
"SSG 랜더스":"인천 SSG 랜더스필드",
"키움 히어로즈":"고척스카이돔",
"KT 위즈":"수원 KT 위즈파크",
"한화 이글스":"대전 한화생명 볼파크",
"삼성 라이온즈":"대구 삼성 라이온즈 파크",
"KIA 타이거즈":"광주 기아 챔피언스필드",
"롯데 자이언츠":"사직야구장",
"NC 다이노스":"창원 NC 파크"
};

const logos = {
"LG 트윈스":"logos/lg.png",
"두산 베어스":"logos/doosan.png",
"SSG 랜더스":"logos/ssg.png",
"키움 히어로즈":"logos/kiwoom.png",
"KT 위즈":"logos/kt.png",
"한화 이글스":"logos/hanwha.png",
"삼성 라이온즈":"logos/samsung.png",
"KIA 타이거즈":"logos/kia.png",
"롯데 자이언츠":"logos/lotte.png",
"NC 다이노스":"logos/nc.png"
};

let uploadedPhotos = [];

team.addEventListener("change",function(){

stadium.value = stadiums[this.value] || "";

teamLogo.src = logos[this.value] || "";

});

photos.addEventListener("change",function(){

const files = [...this.files];

if(files.length > 5){
alert("사진은 최대 5장입니다.");
this.value="";
return;
}

uploadedPhotos=[];

preview.innerHTML="";

files.forEach(file=>{

const reader = new FileReader();

reader.onload = e=>{

uploadedPhotos.push(e.target.result);

const img=document.createElement("img");
img.src=e.target.result;

preview.appendChild(img);

};

reader.readAsDataURL(file);

});

});

function saveRecord(){

const record = {
team:team.value,
stadium:stadium.value,
date:date.value,
opponent:opponent.value,
result:result.value,
score:score.value,
memo:memo.value,
photos:uploadedPhotos
};

const records =
JSON.parse(localStorage.getItem("kboRecords")) || [];

records.push(record);

localStorage.setItem(
"kboRecords",
JSON.stringify(records)
);

loadRecords();

alert("저장 완료");

}

function loadRecords(){

const records =
JSON.parse(localStorage.getItem("kboRecords")) || [];

let html="";

let win=0;
let lose=0;

records.forEach(r=>{

if(r.result==="승") win++;
if(r.result==="패") lose++;

let photosHTML="";

if(r.photos){

r.photos.forEach(photo=>{

photosHTML +=
`<img src="${photo}">`;

});

}

html += `

<div class="record">
<h3>${r.date}</h3>
<p><b>응원팀:</b> ${r.team}</p>
<p><b>구장:</b> ${r.stadium}</p>
<p><b>상대팀:</b> ${r.opponent}</p>
<p><b>결과:</b> ${r.result}</p>
<p><b>점수:</b> ${r.score}</p>
<p><b>메모:</b> ${r.memo}</p>
<div>${photosHTML}</div>
</div>
`;

});

recordsDiv = document.getElementById("records");
recordsDiv.innerHTML = html;

const total = win + lose;

let rate = 0;

if(total > 0){

rate =
((win / total) * 100)
.toFixed(1);

}

document.getElementById(
"winRate"
).innerText =
`${rate}% (${win}승 ${lose}패)`;

}

loadRecords();
