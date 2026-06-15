let cards = [];
let current = 0;
let front = true;

const card = document.getElementById("card");

document
.getElementById("excelFile")
.addEventListener("change", loadExcel);

async function loadExcel(e){

    const file = e.target.files[0];

    const data = await file.arrayBuffer();

    const workbook = XLSX.read(data);

    const sheet =
        workbook.Sheets[
            workbook.SheetNames[0]
        ];

    cards = XLSX.utils.sheet_to_json(sheet);

    current = 0;

    showCard();
}

function showCard(){

    if(cards.length===0) return;

    card.innerHTML =
        cards[current].Japanese;

    front = true;

    updateStats();
}

card.onclick = ()=>{

    if(cards.length===0) return;

    if(front){

        card.innerHTML =
        `
        ${cards[current].Kana}<br><br>
        ${cards[current].Vietnamese}
        `;

    }else{

        card.innerHTML =
        cards[current].Japanese;
    }

    front=!front;
};

document.getElementById("next")
.onclick = ()=>{

    current++;

    if(current>=cards.length)
        current=0;

    showCard();
};

document.getElementById("speak")
.onclick = ()=>{

    const utter =
    new SpeechSynthesisUtterance(
        cards[current].Japanese
    );

    utter.lang="ja-JP";

    speechSynthesis.speak(utter);
};

document.getElementById("known")
.onclick = ()=>{

    saveProgress(
        cards[current].Japanese,
        true
    );
};

document.getElementById("unknown")
.onclick = ()=>{

    saveProgress(
        cards[current].Japanese,
        false
    );
};

function saveProgress(word,status){

    let progress =
        JSON.parse(
            localStorage.getItem("jlpt")
            || "{}"
        );

    progress[word]=status;

    localStorage.setItem(
        "jlpt",
        JSON.stringify(progress)
    );

    updateStats();
}

function updateStats(){

    let progress =
    JSON.parse(
        localStorage.getItem("jlpt")
        || "{}"
    );

    let known =
    Object.values(progress)
    .filter(v=>v).length;

    document.getElementById(
        "stats"
    ).innerHTML=
    `
    Đã nhớ: ${known}
    `;
}