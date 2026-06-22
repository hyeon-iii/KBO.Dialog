const stadiums = {
"LG 트윈스":"잠실야구장",
"두산 베어스":"잠실야구장",
"SSG 랜더스":"인천 SSG 랜더스필드",
"키움 히어로즈":"고척 스카이돔",
"KT 위즈":"수원 KT 위즈파크",
"한화 이글스":"대전 한화생명 볼파크",
"삼성 라이온즈":"대구 삼성 라이온즈 파크",
"KIA 타이거즈":"광주 기아 챔피언스 필드",
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
let editIndex = -1;

const team = document.getElementById("team");
const stadium = document.getElementById("stadium");
const teamLogo = document.getElementById("teamLogo");
const preview = document.getElementById("preview");

team.addEventListener("change", () => {

```
stadium.value =
    stadiums[team.value] || "";

teamLogo.src =
    logos[team.value] || "";
```

});

document
.getElementById("photos")
.addEventListener("change", function(){

```
const files = [...this.files];

if(files.length > 5){

    alert(
    "사진은 최대 5장까지 업로드 가능합니다."
    );

    this.value = "";

    return;
}

uploadedPhotos = [];

preview.innerHTML = "";

files.forEach(file => {

    const reader = new FileReader();

    reader.onload = e => {

        uploadedPhotos.push(
            e.target.result
        );

        const img =
            document.createElement("img");

        img.src =
            e.target.result;

        preview.appendChild(img);
    };

    reader.readAsDataURL(file);
});
```

});

function saveRecord(){

```
if(!team.value){

    alert(
    "응원팀을 선택해주세요."
    );

    return;
}

const record = {

    team:
    team.value,

    stadium:
    stadium.value,

    date:
    document.getElementById("date")
    .value,

    opponent:
    document.getElementById("opponent")
    .value,

    result:
    document.getElementById("result")
    .value,

    score:
    document.getElementById("score")
    .value,

    memo:
    document.getElementById("memo")
    .value,

    photos:
    uploadedPhotos
};

const records =
JSON.parse(
    localStorage.getItem(
        "kboRecords"
    )
) || [];

if(editIndex === -1){

    records.unshift(record);

}else{

    records[editIndex] =
    record;

    editIndex = -1;

    document.querySelector(
    ".save-btn"
    ).textContent =
    "기록 저장";
}

localStorage.setItem(
    "kboRecords",
    JSON.stringify(records)
);

clearForm();

loadRecords();

alert("저장되었습니다.");
```

}

function clearForm(){

```
team.value = "";

stadium.value = "";

teamLogo.src = "";

document.getElementById("date")
.value = "";

document.getElementById("opponent")
.value = "";

document.getElementById("score")
.value = "";

document.getElementById("memo")
.value = "";

document.getElementById("photos")
.value = "";

preview.innerHTML = "";

uploadedPhotos = [];
```

}

function editRecord(index){

```
const records =
JSON.parse(
    localStorage.getItem(
        "kboRecords"
    )
) || [];

const record =
records[index];

editIndex = index;

team.value =
record.team;

stadium.value =
record.stadium;

teamLogo.src =
logos[record.team] || "";

document.getElementById("date")
.value =
record.date || "";

document.getElementById("opponent")
.value =
record.opponent || "";

document.getElementById("result")
.value =
record.result || "승";

document.getElementById("score")
.value =
record.score || "";

document.getElementById("memo")
.value =
record.memo || "";

uploadedPhotos =
record.photos || [];

preview.innerHTML = "";

uploadedPhotos.forEach(
    photo => {

    const img =
    document.createElement("img");

    img.src = photo;

    preview.appendChild(img);

});

document.querySelector(
".save-btn"
).textContent =
"수정 완료";

window.scrollTo({
    top:0,
    behavior:"smooth"
});
```

}

function deleteRecord(index){

```
const confirmDelete =
confirm(
    "이 기록을 삭제하시겠습니까?"
);

if(!confirmDelete){
    return;
}

const records =
JSON.parse(
    localStorage.getItem(
        "kboRecords"
    )
) || [];

records.splice(index,1);

localStorage.setItem(
    "kboRecords",
    JSON.stringify(records)
);

loadRecords();
```

}

function loadRecords(){

```
const records =
JSON.parse(
    localStorage.getItem(
        "kboRecords"
    )
) || [];

const recordsDiv =
document.getElementById(
    "records"
);

if(records.length === 0){

    recordsDiv.innerHTML =
    `
    <div class="empty">
        저장된 직관 기록이 없습니다.
    </div>
    `;

    updateStats([]);

    return;
}

recordsDiv.innerHTML = "";

records.forEach(
(record,index)=>{

    let photosHTML = "";

    if(record.photos){

        record.photos.forEach(
        photo=>{

            photosHTML += `
            <img
            src="${photo}"
            alt="직관 사진">
            `;

        });
    }

    let resultClass =
    "draw";

    if(record.result==="승"){
        resultClass="win";
    }

    if(record.result==="패"){
        resultClass="lose";
    }

    const card =
    document.createElement("div");

    card.className =
    "record";

    card.innerHTML = `

    <div class="record-header">

        <div class="record-team">
            ${record.team}
        </div>

        <div class="
        record-result
        ${resultClass}">
            ${record.result}
        </div>

    </div>

    <p>
    <strong>날짜</strong>
    :
    ${record.date || "-"}
    </p>

    <p>
    <strong>구장</strong>
    :
    ${record.stadium}
    </p>

    <p>
    <strong>상대팀</strong>
    :
    ${record.opponent || "-"}
    </p>

    <p>
    <strong>점수</strong>
    :
    ${record.score || "-"}
    </p>

    <p>
    <strong>후기</strong>
    :
    ${record.memo || "-"}
    </p>

    <div class="record-gallery">
        ${photosHTML}
    </div>

    <div class="record-actions">

        <button
        class="edit-btn"
        onclick="editRecord(${index})">

        수정

        </button>

        <button
        class="delete-btn"
        onclick="deleteRecord(${index})">

        삭제

        </button>

    </div>
    `;

    recordsDiv.appendChild(
        card
    );

});

updateStats(records);
```

}

function updateStats(records){

```
let wins = 0;
let losses = 0;

records.forEach(record => {

    if(record.result==="승"){
        wins++;
    }

    if(record.result==="패"){
        losses++;
    }
});

const totalGames =
wins + losses;

let rate = 0;

if(totalGames > 0){

    rate =
    (
    (wins / totalGames)
    * 100
    ).toFixed(1);
}

document.getElementById(
"totalGames"
).textContent =
records.length;

document.getElementById(
"wins"
).textContent =
wins;

document.getElementById(
"losses"
).textContent =
losses;

document.getElementById(
"winRate"
).textContent =
rate + "%";
```

}

loadRecords();
