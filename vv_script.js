//выводим текущие размеры окна
// const tempX = 18;
// let windowInnerWidth = document.documentElement.clientWidth+tempX;
// let windowInnerHeight = document.documentElement.clientHeight+tempX;
// let windowSizes = document.createElement("span");
// windowSizes.style.color = "white";
// windowSizes.style.position = "absolute";
// // windowSizes.style.top = 1000 + "px";

// windowSizes.innerHTML = windowInnerWidth + " " + windowInnerHeight;
// document.body.prepend(windowSizes);
// window.addEventListener("resize", () => {
//     windowInnerWidth = document.documentElement.clientWidth+tempX;
//     windowInnerHeight = document.documentElement.clientHeight+tempX;
//     windowSizes.innerHTML = windowInnerWidth + " " + windowInnerHeight;
// });


//настраиваем взаимодействие с кнопкой меню
let menuBtn = document.querySelector("#menu_btn_frame");
let menuBtnLines = document.querySelectorAll(".menu_btn_line");
let menu = document.querySelector("#menu_div");
let isMenuActive = false;

menuBtn.addEventListener("mouseover", function(){
    menuBtnLines.forEach(line => {
        line.classList.add('menu_btn_line_orange');
    });
});
menuBtn.addEventListener("mouseout", function(){
    menuBtnLines.forEach(line => {
        line.classList.remove('menu_btn_line_orange');
    });
});

menuBtn.addEventListener("click", () => {
    if(!isMenuActive) {
        menu.style.display = 'block';
        crossDissolve(menu);
        isMenuActive = true;
        menuBtnLines[0].hidden = true;
        menuBtnLines.forEach(line => {
            line.classList.add('menu_btn_line_longer');
        });
        menuBtnLines[1].style.transform = 'rotate(45deg)';
        menuBtnLines[2].style.transform = 'rotate(-45deg)';
    } else {
        closeMenu();    
    }
});

function closeMenu() {
    menu.style.display = 'none';
    menu.style.opacity = 0;
    isMenuActive = false;
    menuBtnLines[0].hidden = false;
    menuBtnLines.forEach(line => {
        line.classList.remove('menu_btn_line_longer');
    });
    menuBtnLines[1].style.transform = 'unset';
    menuBtnLines[2].style.transform = 'unset';
}

// Настраиваем кнопку "Х" для меню SIGN IN
let signInWin = document.querySelector("#sign_in_window");
let windowBtn = document.querySelector("#window_btn_frame");
let windowBtnX = Array.from(windowBtn.children);
let signWindows = document.querySelectorAll(".sign_in_up");

windowBtn.addEventListener("mouseover", () => {
    windowBtnX.forEach(line => {
        line.style.borderColor = `#b49c6e`;
    });
});
windowBtn.addEventListener("mouseout", () => {
    windowBtnX.forEach(line => {
        line.style.borderColor = `#b4b4b4`;
    });
});
windowBtn.addEventListener("click", () => {
    signInWin.style.display = 'none';
    signInWin.style.opacity = 0;
});

function showSignIn(){
    signInWin.style.display = 'flex';
    crossDissolve(signInWin);
}
signWindows.forEach(win => {
    win.addEventListener("click", function(e){
        showSignIn();
    });
});

//Функция плавного появления окна
function crossDissolve(elem, which = true) {
    if(which){
        let x = 0;
        let t = setInterval(() => {
            x += 0.05;
            elem.style.opacity = x;
            if(x >= 1)
                clearInterval(t);
        }, 15);
    } else {
        let x = 1;
        let t = setInterval(() => {
            x -= 0.05;
            elem.style.opacity = x;
            if(x == 0)
                clearInterval(t);
        }, 15);
    }
}

// Скроллинг кнопкой arrow_down

let bodyWidth = parseInt(getComputedStyle(document.body).width);

let arrowDownBtn = document.querySelector("#arrow_down");
let scrollToServices = 1000;
let scrollToPortfolio = 2050;
let scrollToFeedbacks = 3050;
let scrollToContacts = 4050;
let scrollToContactUS = 3050;
if(window.matchMedia("(max-width: 1400px) and (orientation: landscape)").matches) {
    scrollToServices = 820;
    console.log("1");
} else if (window.matchMedia("(orientation: portrait) and (max-device-width: 412px)").matches && bodyWidth <= 412) {
    scrollToServices = 960;
    scrollToPortfolio = 1770;
    scrollToFeedbacks = 2650;
    scrollToContacts = 4050;
    scrollToContactUS = 3250;
    console.log("5");
} else if (window.matchMedia("(max-width: 1300px) and (orientation: landscape)").matches) {
    scrollToServices = 800;
    console.log("2");
} else if (window.matchMedia("(orientation: portrait)").matches && window.matchMedia("(max-width: 1023px)").matches) {
    scrollToServices = 950;
    console.log("3");
} else if (window.matchMedia("(orientation: portrait)").matches && window.matchMedia("(min-width: 1024px)").matches) {
    scrollToServices = 1300;
    console.log("4");
}
arrowDownBtn.addEventListener("click", () => {
    scrollWindowTo(scrollToServices);
});
function scrollWindowTo(distance = scrollToServices){
    window.scrollTo({
        top: distance,
        behavior: "smooth"
    });
};

//SERVICES

let services = document.querySelector("#services");
//создадим массив из эл-в li
let serviceElements = Array.from(document.querySelector("#services_list").querySelector("ul").children);
//создадим массив из описаний (эл-в p)
// let serviceDescrBlock = document.querySelector(".service_descr_block");

let serviceDescriptions = Array.from(document.querySelectorAll(".service_description"));

//созданим класс, в котором будут храниться настройки стилей для фоновых изобр-й
class StyleSets {
    constructor(url, positionX, positionY){
        this.url = url;
        this.x = positionX;
        this.y = positionY;
    }
}
let ServicesBGStyles = [];
let sbgs1 = new StyleSets("img/services/service_1_test.jpg", 60, 60);
let sbgs2 = new StyleSets("img/services/service_2_test.jpg", 80, 80);
let sbgs3 = new StyleSets("img/services/service_3_test.jpg", 102, 60);
let sbgs4 = new StyleSets("img/services/service_4_test.jpg", 80, 0);
let sbgs5 = new StyleSets("img/services/service_5_test.jpg", 100, -10);
let sbgs6 = new StyleSets("img/services/service_6_test.jpg", 80, 30);
ServicesBGStyles.push(sbgs1, sbgs2, sbgs3, sbgs4, sbgs5, sbgs6);

let descriptionStyles = getComputedStyle(document.querySelector("#design_descr"), null);
let getDescrSize = parseFloat(descriptionStyles.fontSize);
Number.isInteger(getDescrSize) ? getDescrSize = parseInt(getDescrSize) : {};
function checkDescrSize() {
    getDescrSize = parseFloat(descriptionStyles.fontSize);
    Number.isInteger(getDescrSize) ? getDescrSize = parseInt(getDescrSize) : {};
    switch(getDescrSize) {
        case 19:
            sbgs1.x = -80; sbgs1.y = 40;
            sbgs2.x = -120; sbgs2.y = 55;
            sbgs3.x = -80; sbgs3.y = 80;
            sbgs4.x = -40; sbgs4.y = -30;
            sbgs5.x = -70; sbgs5.y = 8;
            sbgs6.x = -100; sbgs6.y = 0;
        break;
        case 18:
            sbgs1.x = 120; sbgs1.y = 40;
            sbgs2.x = 140; sbgs2.y = 50;
            sbgs4.x = 120; sbgs4.y = -30;
            sbgs5.x = 120; sbgs5.y = 0;
            sbgs6.x = 140; sbgs6.y = 20;
        break;
        case 17:
            sbgs1.x = 120; sbgs1.y = 20;
            sbgs2.x = 140; sbgs2.y = 40;
            sbgs3.x = 120; sbgs3.y = 50;
            sbgs4.x = 130; sbgs4.y = -15;
            sbgs5.x = 135; sbgs5.y = 5;
            sbgs6.x = 140; sbgs6.y = 0;
        break;
        case 16:
            sbgs1.x = 140; sbgs1.y = 20;
            sbgs2.x = 140; sbgs2.y = 40;
            sbgs3.x = 140; sbgs3.y = 30;
            sbgs4.x = 130; sbgs4.y = -20;
            sbgs5.x = 135; sbgs5.y = -5;
            sbgs6.x = 140; sbgs6.y = 0;
        break;
        case 15:
            sbgs1.x = 150; sbgs1.y = 30;
            sbgs2.x = 140; sbgs2.y = 40;
            sbgs3.x = 140; sbgs3.y = 30;
            sbgs4.x = 130; sbgs4.y = -10;
            sbgs5.x = 135; sbgs5.y = 5;
            sbgs6.x = 140; sbgs6.y = 5;
        break;
        case 14.9:
            sbgs1.url = "img/services/service_1_small.jpg";
            sbgs1.x = 0; sbgs1.y = 250;
            sbgs2.url = "img/services/service_2_small.jpg";
            sbgs2.x = -85; sbgs2.y = 300;
            sbgs3.x = 65; sbgs3.y = 860;
            sbgs4.x = 0; sbgs4.y = -250;
            sbgs5.url = "img/services/service_5_small.jpg";
            sbgs5.x = -100; sbgs5.y = -50;
            sbgs6.x = 8; sbgs6.y = -250;
        break;
        case 24:
            sbgs1.x = 400; sbgs1.y = 100;
            sbgs2.x = 400; sbgs2.y = 120;
            sbgs3.x = 340; sbgs3.y = -10;
            sbgs4.x = 400; sbgs4.y = 10;
            sbgs5.x = 135; sbgs5.y = 55;
            sbgs6.x = 400; sbgs6.y = 35;
        break;
        default:
            sbgs1.x = 60; sbgs1.y = 60;
            sbgs2.x = 60; sbgs2.y = 80;
            sbgs3.x = 60; sbgs3.y = 17;
            sbgs4.x = 60; sbgs4.y = 0;
            sbgs5.x = 50; sbgs5.y = 0;
            sbgs6.x = 40; sbgs6.y = 20;
    }
    if(window.matchMedia("(max-width: 1600px) and (min-height: 1024px) and (orientation: landscape)").matches) {
        sbgs1.x = 60; sbgs1.y = 50;
        sbgs2.x = 60; sbgs2.y = 70;
        sbgs3.x = 60; sbgs3.y = 20;
        sbgs4.x = 80; sbgs4.y = 0;
        sbgs5.x = 70; sbgs5.y = 15;
        sbgs6.x = 60; sbgs6.y = 30;
    }
    else if(window.matchMedia("(max-width: 1300px) and (orientation: landscape)").matches) {
        sbgs1.x = 90; sbgs1.y = 45;
        sbgs2.x = 90; sbgs2.y = 70;
        sbgs3.x = 70; sbgs3.y = 20;
        sbgs4.x = 100; sbgs4.y = 0;
        sbgs5.x = 70; sbgs5.y = 15;
        sbgs6.x = 60; sbgs6.y = 30;
    }
}
checkDescrSize();

function changeBGPosition(imgNumber) {
    services.style.backgroundPosition = ServicesBGStyles[imgNumber].x + "%"+ " "
                                      + ServicesBGStyles[imgNumber].y + "%";
}
changeBGPosition(0);


serviceElements[0].classList.add("services_selected"); //делаем 1-й пункт Services активным по-умолчанию
serviceDescriptions[0].style.opacity = 1;        //а также описание к нему видимым

serviceElements.forEach(li => {
    li.addEventListener("click", () => { //вешаем на каждый li обработчик события
        for(let i=0; i<serviceElements.length; i++) {
            if(serviceElements[i].classList.contains("services_selected")){//выключаем ранее включенный эл-т
                serviceElements[i].classList.remove("services_selected");
                serviceDescriptions[i].style.opacity = 0;
            }
        }
        li.classList.add("services_selected");    //дедаем выбранный эл-т видимым
        let i = serviceElements.indexOf(li);      //получаем его индекс
        services.style.backgroundImage = "url("+ServicesBGStyles[i].url+")";
        checkDescrSize();
        changeBGPosition(i);
        serviceDescriptions[i].style.opacity = 1; //и используем его, чтобы сделать видимым нужное описание
    }, true);
});


// PORTFOLIO
// присваиваем select и его опции отдельным переменным
let pfolioSel = document.querySelector("#portfolio_sel");
pfolioSel.value = "all";
let pfolioOptions = pfolioSel.getElementsByTagName("option");
// кноки PREV и NEXT
let portfolioPagesBtnPrev = document.querySelector("#pp_btn_2_prev");
let portfolioPagesBtnNext = document.querySelector("#pp_btn_4_next");
let firstPageBtn = document.querySelector('#pp_btn_1');
let lastPageBtn = document.querySelector('#pp_btn_5');
// сохраняем выбранный option в переменную sIndex
let sIndex = pfolioSel.selectedIndex;
// ранее выбранный option будет в переменной prev
let prev = sIndex;
// делаем изначально выбранный option невидимым в выпадающем списке
pfolioOptions[sIndex].style.display = 'none';
// вешаем на select обработчик события change, который при срабатывании
// обновляет sIndex и в случае, если sIndex отличается от prev,
// делает видимым предыдущий скрытый option и не видимым новый,
// prev обновляется.
pfolioSel.addEventListener("change", ()=>{
    sIndex = pfolioSel.selectedIndex;
    if(prev !== sIndex) {
        pfolioOptions[prev].style.display = 'block';
        pfolioOptions[sIndex].style.display = 'none';
        prev = sIndex;
    }
});

class PortfolioExample {
    bgSize = 100+'%';
    color1 = "rgba"+"("+48+","+48+","+48+","+0.5+")";
    color2 = "rgba"+"("+105+","+86+","+49+","+0.2+")";
    id = this.setId();
    constructor (category, url, header, descr, foot){
        this.category = category;
        this.url = "url"+"("+url+")";
        this.header = header;
        this.descr = descr;
        this.foot = foot;
    }
    setBackground(x = 1) {
        if(x == 1)
            return this.url + " " + this.color1;
        if(x == 0)
            return this.url + " " + this.color2;
    }
    setBgSize() {
        return this.bgSize + " " + this.bgSize;
    }
    setClass() {
        return "portfolio_example";
    }
    setId() {
        let count = document.querySelectorAll(".portfolio_example").length;
        return "pfEx" + parseInt(count+1);
    }
    createAndAddToDOM() {
        let newDiv = document.createElement('div');        
        newDiv.id = this.setId();
        newDiv.classList.add(this.setClass());
        newDiv.style.background = this.setBackground(1);
        newDiv.style.backgroundSize = this.setBgSize();
        
        let cover = document.createElement("div");
        cover.classList.add("cover");
        let h2 = document.createElement("p");
        h2.classList.add("h2");
        h2.textContent = this.header;
        let p = document.createElement("p");
        p.classList.add("small_text");
        p.textContent = this.descr;
        let p1 = document.createElement("p");
        p1.classList.add("italic_text");
        p1.textContent = this.foot;        
        cover.prepend(h2, p, p1);
        newDiv.append(cover);
        document.querySelector("#portfolio_block").append(newDiv);
        // console.log(newDiv.id+" created.");
    }
}

let example1 = new PortfolioExample("webDesign", "./img/portfolio/01.jpg", "SUBSENCE MONOCHROME",
"Web design in monochromatic colors for SUBSENCE agence.", "web design");
example1.createAndAddToDOM();

let example2 = new PortfolioExample("webDesign", "./img/portfolio/02.jpg", "DESIGN AGENCY BUSINESS CARD",
"Logotype and business card design for ARTDESIGN agency.", "branding");
example2.createAndAddToDOM();

let example3 = new PortfolioExample("webDesign", "./img/portfolio/03.jpg", "FIXEDGEAR SHOP PHOTOSHOOT",
"Photoshoot for the annual issue of the fixed gear and road bikes magazine.", "photography");
example3.createAndAddToDOM();

let example4 = new PortfolioExample("webDesign", "./img/portfolio/04.jpg", "EDITOR'S PERSONAL PAGE",
                "Web page created for Ryan Fields a famous US editor.", "web design");
example4.createAndAddToDOM();

let example5 = new PortfolioExample("tdu", "./img/portfolio/05.jpg", "EDITOR'S PERSONAL PAGE",
                "Web page created for Ryan Fields a famous US editor.", "web design");
example5.createAndAddToDOM();

let example6 = new PortfolioExample("tdu", "./img/portfolio/06.jpg", "EDITOR'S PERSONAL PAGE",
                "Web page created for Ryan Fields a famous US editor.", "web design");
example6.createAndAddToDOM();

let example7 = new PortfolioExample("tdu", "./img/portfolio/07.jpg", "EDITOR'S PERSONAL PAGE",
                "Web page created for Ryan Fields a famous US editor.", "web design");
example7.createAndAddToDOM();

let example8 = new PortfolioExample("tdu", "./img/portfolio/08.jpg", "EDITOR'S PERSONAL PAGE",
                "Web page created for Ryan Fields a famous US editor.", "web design");
example8.createAndAddToDOM();

let example9 = new PortfolioExample("tdu", "./img/portfolio/09.jpg", "EDITOR'S PERSONAL PAGE",
                "Web page created for Ryan Fields a famous US editor.", "web design");
example9.createAndAddToDOM();

let example10 = new PortfolioExample("tdu", "./img/portfolio/10.jpg", "EDITOR'S PERSONAL PAGE",
                "Web page created for Ryan Fields a famous US editor.", "web design");
example10.createAndAddToDOM();

let example11 = new PortfolioExample("tdu", "./img/portfolio/11.jpg", "EDITOR'S PERSONAL PAGE",
                "Web page created for Ryan Fields a famous US editor.", "web design");
example11.createAndAddToDOM();

let example12 = new PortfolioExample("tdu", "./img/portfolio/12.jpg", "EDITOR'S PERSONAL PAGE",
                "Web page created for Ryan Fields a famous US editor.", "web design");
example12.createAndAddToDOM();

let examplesArray = new Array; //создадим массив из созданных объектов для портфолио
examplesArray.push(example1, example2, example3, example4,
                    example5, example6, example7, example8,
                        example9, example10, example11, example12);
let filtredPortfolio = examplesArray; //копия массива для фильтрации

function show4Examples(array){ //функция для отображения только 4х первых эл-в м-ва
    if(array.length >= 4){
        for(let i=4; i < array.length; i++) {
            document.querySelector("#"+array[i].id).style.display = "none";
            // console.log(array[i].id + " display set to none.");
        }
        for(let i=0; i < 4; i++) {
            document.querySelector("#"+array[i].id).style.display = "flex";
            // console.log(array[i].id + " display set to 'flex'.");
        }
    }
}
show4Examples(examplesArray);

lastPageBtn.textContent = examplesArray.length; //отобразим вместо "99" реальное количество примеров

function hideExamples(array){ //ф-я прячет все эл-ты
    array.forEach(item => {
        document.querySelector("#"+item.id).style.display = 'none';
    })
}

pfolioSel.addEventListener("change", ()=> { //об-к событий для selection
    let i;
    function anyAcceptAll(value){
        filtredPortfolio = examplesArray.filter(item => {
            return item.category == value;
        });
        if(filtredPortfolio.length == 0){
            show4Examples(examplesArray);
            i = findIndexInPortfolio(examplesArray);
            firstPageBtnUpdate(examplesArray, i);
            lastPageBtn.textContent = examplesArray.length;
            pfolioOptions[pfolioSel.selectedIndex].style.display = 'block';
            pfolioSel.selectedIndex = 0;
            alert("в портфолио " + filtredPortfolio.length + " элементов типа Branding");
            return;
        }
        // console.log("в портфолио всего " + filtredPortfolio.length + " элементов типа "+value);
        hideExamples(examplesArray);
        show4Examples(filtredPortfolio);
        i = findIndexInPortfolio(filtredPortfolio);
        firstPageBtnUpdate(filtredPortfolio, i);
        lastPageBtn.textContent = filtredPortfolio.length;
    }
    switch(pfolioSel.value){
        case "all": //в зависимости от св-ва category объектов, проводим фильтрацию
            console.log("в портфолио всего " + examplesArray.length + " элементов");
            show4Examples(examplesArray);
            i = findIndexInPortfolio(examplesArray);
            firstPageBtnUpdate(examplesArray, i);
            lastPageBtn.textContent = examplesArray.length;
        break;
        case "webDesign":
            anyAcceptAll("webDesign");
        break;
        case "tdu":
            anyAcceptAll("tdu");
        break;
        case "branding":
            anyAcceptAll("branding");
        break;
        case "ui":
            anyAcceptAll("ui");
        break;
        case "photography":
            anyAcceptAll("photography");
        break;
        case "graphicDesign":
            anyAcceptAll("graphicDesign");
        break;
    }
});

function firstPageBtnUpdate(array, index){
    if(index >= 4){
        firstPageBtn.addEventListener("click", ()=>{
            show4Examples(array);
            checkPrevBtnToWork(findIndexInPortfolio(array));
            lastPageBtnUpdate(array);
            if(findIndexInPortfolio(array) == 0){
                btnChangeStatus(firstPageBtn, false);
            }
        });
        btnChangeStatus(firstPageBtn, true);
    }
    if(index < 4){
        firstPageBtn.removeEventListener("click", ()=>{
            show4Examples(array);
            checkPrevBtnToWork(findIndexInPortfolio(array));
            lastPageBtnUpdate(array);
            if(findIndexInPortfolio(array) == 0){
                btnChangeStatus(firstPageBtn, false);
            }
        });
        btnChangeStatus(firstPageBtn, false);
    }
}
firstPageBtnUpdate(examplesArray, 0);


function findIndexInPortfolio(array){
    let _index = array.findIndex(item=>{
        return document.querySelector("#"+item.id).style.display == "flex";
    });
    document.querySelector("#pp_btn_3").textContent = (_index+4)/4;
    checkNextBtnToWork(_index, array);
    return _index;
}
findIndexInPortfolio(examplesArray);

function btnChangeStatus(btn, what) {
    if(what) {
        btn.style.color = "#b4b4b4";
        btn.classList.add("pointer");
    }
    if(!what) {
        btn.style.color = "gray";
        btn.classList.remove("pointer");
    }
}

function checkNextBtnToWork(index, array){
    if(index+4 < array.length && array.length > 4) { //делаем активной кнопку NEXT
        btnChangeStatus(portfolioPagesBtnNext, true);
        portfolioPagesBtnNext.addEventListener("click", nextBtnWork);    
    }
    if(array.length <= 4){
        btnChangeStatus(portfolioPagesBtnNext, false);
        portfolioPagesBtnNext.removeEventListener("click", nextBtnWork);
    }
}
function checkPrevBtnToWork(index){
    if(index < 4){
        btnChangeStatus(portfolioPagesBtnPrev, false);
        portfolioPagesBtnPrev.removeEventListener("click", prevBtnWork);
    }
    if(index >= 4){
        btnChangeStatus(portfolioPagesBtnPrev, true);
        portfolioPagesBtnPrev.addEventListener("click", prevBtnWork);
    }
}

function lastPageBtnUpdate(array){
    if(array.length > 4){
        let index = array.findIndex(item=>{
            return document.querySelector("#"+item.id).style.display == "flex";
        });
        if(index < array.length-4) {
            lastPageBtn.addEventListener("click", lastPageBtnWork);
            btnChangeStatus(lastPageBtn, true);
        } else {
            lastPageBtn.removeEventListener("click", lastPageBtnWork);
            btnChangeStatus(lastPageBtn, false);
        }
    }
    if(array.length <= 4){
        lastPageBtn.removeEventListener("click", lastPageBtnWork);
    }
}
lastPageBtnUpdate(examplesArray);

function lastPageBtnWork(){
    let index = -1;
    if(pfolioSel.value == "all"){
        index = findIndexInPortfolio(examplesArray);
        hideExamples(examplesArray);
        for(let i = examplesArray.length-4; i < examplesArray.length; i++) {
            document.querySelector("#"+examplesArray[i].id).style.display = "flex";
        }
        portfolioPagesBtnPrev.addEventListener("click", prevBtnWork); //делаем активной кнопку PREV
        btnChangeStatus(portfolioPagesBtnPrev, true);
        index = findIndexInPortfolio(examplesArray);
        firstPageBtnUpdate(examplesArray, index); // обновляем кнопку "1"
        btnChangeStatus(portfolioPagesBtnNext, false); //делаем неактивной кнопку NEXT
        portfolioPagesBtnNext.removeEventListener("click", nextBtnWork);
        lastPageBtnUpdate(examplesArray);
    } else {
        index = findIndexInPortfolio(filtredPortfolio);
        hideExamples(filtredPortfolio);
        for(let i = examplesArray.length-4; i < examplesArray.length; i++) {
            document.querySelector("#"+examplesArray[i].id).style.display = "flex";
        }
        portfolioPagesBtnPrev.addEventListener("click", prevBtnWork); //делаем активной кнопку PREV
        btnChangeStatus(portfolioPagesBtnPrev, true);
        index = findIndexInPortfolio(filtredPortfolio);
        firstPageBtnUpdate(filtredPortfolio, index); // обновляем кнопку "1"
        btnChangeStatus(portfolioPagesBtnNext, false); //делаем неактивной кнопку NEXT
        portfolioPagesBtnNext.removeEventListener("click", nextBtnWork);
        lastPageBtnUpdate(filtredPortfolio);
    }

}


function nextBtnWork(){
    let index = -1;
    if(pfolioSel.value == "all"){
        index = findIndexInPortfolio(examplesArray);
        hideExamples(examplesArray);
        for(let i=index+4; i < index+8; i++) {
            document.querySelector("#"+examplesArray[i].id).style.display = "flex";
        }
        portfolioPagesBtnPrev.addEventListener("click", prevBtnWork); //делаем активной кнопку PREV
        btnChangeStatus(portfolioPagesBtnPrev, true);
        index = findIndexInPortfolio(examplesArray);
        firstPageBtnUpdate(examplesArray, index); // обновляем кнопку "1"
        if(index+5 > examplesArray.length){
            btnChangeStatus(portfolioPagesBtnNext, false); //делаем неактивной кнопку NEXT
            portfolioPagesBtnNext.removeEventListener("click", nextBtnWork);
            lastPageBtnUpdate(examplesArray);//делаем неактивной кнопку "99"
        }
    } else {
        index = findIndexInPortfolio(filtredPortfolio);
        hideExamples(filtredPortfolio);
        for(let i=index+4; i < index+8; i++) {
            document.querySelector("#"+filtredPortfolio[i].id).style.display = "flex";
        }
        portfolioPagesBtnPrev.addEventListener("click", prevBtnWork); //делаем активной кнопку PREV
        btnChangeStatus(portfolioPagesBtnPrev, true);
        index = findIndexInPortfolio(filtredPortfolio);
        firstPageBtnUpdate(filtredPortfolio, index); // обновляем кнопку "1"
        if(index+5 > filtredPortfolio.length){
            btnChangeStatus(portfolioPagesBtnNext, false); //делаем неактивной кнопку NEXT
            portfolioPagesBtnNext.removeEventListener("click", nextBtnWork);
            lastPageBtnUpdate(examplesArray);//делаем неактивной кнопку "99"
        }
    }
}

function prevBtnWork(){
    let index = -1;
    if(pfolioSel.value == "all"){
        index = findIndexInPortfolio(examplesArray);
        checkNextBtnToWork(index, examplesArray);  //делаем активной кнопку NEXT, если нужно
        lastPageBtnUpdate(examplesArray);//делаем активной кнопку "99", если нужно
        if(index >= 4){
            hideExamples(examplesArray);
            for(let i=index-4; i < index; i++) {
                document.querySelector("#"+examplesArray[i].id).style.display = "flex";
            }
            index = findIndexInPortfolio(examplesArray);
            firstPageBtnUpdate(examplesArray, index); // обновляем кнопку "1"
            checkNextBtnToWork(index, examplesArray);  //делаем активной кнопку NEXT, если нужно
            lastPageBtnUpdate(examplesArray);//делаем активной кнопку "99", если нужно
        }
        checkPrevBtnToWork(index); //делаем неактивной кнопку PREV если нужно
    } else {
        index = findIndexInPortfolio(filtredPortfolio);
        checkNextBtnToWork(index, filtredPortfolio);  //делаем активной кнопку NEXT, если нужно
        lastPageBtnUpdate(filtredPortfolio);//делаем активной кнопку "99", если нужно
        hideExamples(filtredPortfolio);
        for(let i=index-4; i < index; i++) {
            document.querySelector("#"+filtredPortfolio[i].id).style.display = "flex";
        }
        index = findIndexInPortfolio(filtredPortfolio);
        checkNextBtnToWork(index, filtredPortfolio);  //делаем активной кнопку NEXT, если нужно
        lastPageBtnUpdate(filtredPortfolio);//делаем активной кнопку "99", если нужно
        checkPrevBtnToWork(index); //делаем неактивной кнопку PREV< если нужно
        firstPageBtnUpdate(filtredPortfolio, index); // обновляем кнопку "1"
    }
}
btnChangeStatus(portfolioPagesBtnPrev, false);

examplesArray.forEach(ex => {
    document.querySelector("#"+ex.id).addEventListener('mouseover', function(){
        document.querySelector("#"+ex.id).style.background = ex.setBackground(0);
        document.querySelector("#"+ex.id).style.backgroundSize = ex.setBgSize();
    });
    document.querySelector("#"+ex.id).addEventListener('mouseout', function(){
        document.querySelector("#"+ex.id).style.background = ex.setBackground(1);
        document.querySelector("#"+ex.id).style.backgroundSize = ex.setBgSize();
    });
})



//сохраним в массив все элементы .portfolio_example
//для каждого эл-та в массиве создаём внутри div с надписью "SEE FULL PROJECT"
//к каждому этому div'у добавляем свой атрибут "data-show" со знач. "false" по ум-ю
let portfolioItems = Array.from(document.querySelector("#portfolio_block").querySelectorAll(".portfolio_example"));
portfolioItems.forEach(item => {
    item.insertAdjacentHTML("afterbegin", '<div class="see_full_project">SEE FULL PROJECT</div>');
    item.firstElementChild.setAttribute('data-show', 'false');
    item.firstElementChild.classList.add("h2");
    //вешаем об-к событий
    item.addEventListener('click' && 'mouseover', (e) => {
        //ф-я check() принимает в параметры эл-т и время для setInterval и создаёт промис
        let promise = check(item, 200);
        promise.then(() => {
            let t2 = setTimeout(()=> { //500мс задержка
                //ищем в м-ве индекс эл-та с атр-м "show" = "true" (это предыдущий активированный эл-т)
                let x = portfolioItems.findIndex(el => { 
                    return el.firstElementChild.dataset.show === "true";
                });
                //если такой индекс найден (не -1), то скрываем обратно надпись и отображаем обложку
                if(x !== -1) {
                    portfolioItems[x].firstElementChild.style.display = 'none';
                    portfolioItems[x].firstElementChild.dataset.show = 'false';
                    portfolioItems[x].lastElementChild.style.display = 'block';
                }
                //а если такого ещё нет, т.е. все надписи "SEE FULL PROJECT" скрыты, то активируем текущий:
                //скрываем обложку и показываем надпись и присваиваем атрибуту "show" знач. "true"
                item.lastElementChild.style.display = 'none';
                item.firstElementChild.style.display = 'flex';
                item.firstElementChild.dataset.show = "true";
            }, 500);
        })
        
    });
});

// функция с промисом, проверяющая задержку курсора над элементом
function check(element, time) {
    return new Promise((resolve)=>{
        let p = 0;
        let t = setInterval(()=>{
            p++;
            // console.log(p);
            if (p >= 2) {
                clearInterval(t);
                resolve(p);
            }
        }, time);
        element.addEventListener('mouseout', ()=>{
            clearInterval(t);
            if (p >= 2) {
                resolve(p);
            }
        })
    })
}

function closeAllItems(){ //ЭТА ФУНКЦИЯ ПОКА НЕ ИСПОЛЬЗУЕТСЯ...
    portfolioItems.forEach(item => {
        if(getComputedStyle(item.lastElementChild).display != 'block')
            item.lastElementChild.style.display = 'block';
        if(getComputedStyle(item.firstElementChild).display != 'none')                
            item.firstElementChild.style.display = 'none';
    })
}


// CONTACT US
// let contactUsForm = document.forms.contact_us_form;
// let contactUsURL = "http://localhost/messages.js";
// let userMessage = {};

// contactUsForm.addEventListener("submit", ()=>{
//     if(contactUsForm.checkValidity()) {
//         userMessage = {
//             userName: contactUsForm.name.value,
//             userEMail: contactUsForm.email.value,
//             userMessage: contactUsForm.message
//         };
//         fetch(contactUsURL, {
//             method: "POST",
//             body: JSON.stringify(userMessage),
//             header: {
//                 'Content-type':'application/json; charset=UTF-8',
//             }
//         })
//         .then((response) => {
//             response.json();
//             alert("Message has been sent.");
//         })
//         .then((json) => alert(json))
//     }
// })