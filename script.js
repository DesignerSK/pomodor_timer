const focusBtn = document.getElementById("focus");
const buttons = document.querySelectorAll(".btn");
const kratkaPauzaBtn = document.getElementById("shortbreak");
const dugaPauzaBtn = document.getElementById("longbreak");
const startBtn = document.getElementById("btn-start");
const resetBtn = document.getElementById("btn-reset");
const pauseBtn = document.getElementById("btn-pause");
const timeVrijeme = document.getElementById("time");

let setSkup;
let countBrojati = 59;
let active = "focus";
let paused = true;
let minCount = 24;

timeVrijeme.textContent = `${minCount + 1}:00`;

//postavimo vrijeme da ima 0 primjer 08:00 a ne 8:00
const dodatiNulu = (value) => {
    value = value < 10 ? `0${value}` : value;
    return value;
};

//restart vremena
resetBtn.addEventListener("click", () => { 
    pauseTimer();
    switch (active)   {
        case "kratko":
            minCount = 4;
            break;
        case "dugo":
            minCount = 14;
            break;
        default:
            minCount = 24;
            break;
    }                                  
    countBrojati = 59;
    timeVrijeme.textContent = `${dodatiNulu(minCount)}:${dodatiNulu(countBrojati)}`;
   });

const uklonitiFokus = () => {
    buttons.forEach((btn) => {
        btn.classList.remove("btn-focus");
    });
};

focusBtn.addEventListener("click", () => {
    uklonitiFokus();
    focusBtn.classList.add("btn-focus");

    pauseTimer();
    countBrojati = 59;
    minCount = 24;
    timeVrijeme.textContent = `${minCount + 1}:00`;
});

dugaPauzaBtn.addEventListener("click", () => {
    active = "dugo";
    uklonitiFokus();
    dugaPauzaBtn.classList.add("btn-focus");

    pauseTimer();
    countBrojati = 59;
    minCount = 14;
    timeVrijeme.textContent = `${minCount + 1}:00`;
});

kratkaPauzaBtn.addEventListener("click", () => {
    active = "kratko";
    uklonitiFokus();
    kratkaPauzaBtn.classList.add("btn-focus");

    pauseTimer();
    countBrojati = 59;
    minCount = 4;
    timeVrijeme.textContent = `${minCount + 1}:00`;
});


pauseBtn.addEventListener("click", (pauseTimer = () => {///////
    paused = true;
    clearInterval(setSkup); //////////////
    startBtn.classList.remove("hide");
    pauseBtn.classList.remove("show");
    resetBtn.classList.remove("show");
})
);

startBtn.addEventListener("click", () => {
    resetBtn.classList.add("show");
    pauseBtn.classList.add("show");
    startBtn.classList.add("hide");
    startBtn.classList.remove("show");

    if(paused) {
        paused = false;
        timeVrijeme.textContent = `${dodatiNulu(minCount)}:${dodatiNulu(countBrojati)}`;
        setSkup = setInterval (() => {
            countBrojati--;
            timeVrijeme.textContent = `${dodatiNulu(minCount)}:${dodatiNulu(countBrojati)}`;
            if(countBrojati == 0) {
                if(minCount != 0) {
                    minCount--;
                    countBrojati = 60;
                } else {
                    clearInterval(setSkup);
                }
            }
        }, 1000);
    }
});

