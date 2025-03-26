const root = document.documentElement;
const styles = getComputedStyle(root);

const primaryColor = styles.getPropertyValue("--primary-color").trim();
const primaryColorLight = styles.getPropertyValue("--primary-color-light").trim();
const buttonHoverColor = styles.getPropertyValue("--button-hover-color").trim();
const darkColor = "#242323";
let pageColor = "#242323";
let textColor = "white";

const inputBoxColor = styles.getPropertyValue("--inputBox-color").trim();
const inputBoxColorLight = "#cecece";
const inputBoxPlaceholderColor = styles.getPropertyValue("--inputBox-placeholder-color").trim();

const mathSymbolsColor = styles.getPropertyValue("--mathSymbols-color").trim();
const symbolsHoverColor = styles.getPropertyValue("--symbols-hover-color").trim();
const symbolsClickColor = styles.getPropertyValue("--symbols-click-color").trim();
const switchSymbolsHoverColor = styles.getPropertyValue("--switchSymbols-hover-color").trim();
const switchSymbolsClickColor = styles.getPropertyValue("--switchSymbols-click-color").trim();

const dotsClickColor = "#999b9e";
const copyColor = styles.getPropertyValue("--copy-color").trim();
const copyColorLight = styles.getPropertyValue("--copy-color-light").trim();

const pageButtonsHoverColorLight = "#e0d9d9";
const pageButtonsClickColorLight = "#c0bbbb";
const pageButtonsHoverColorDark = "#353232";
const pageButtonsClickColorDark = "#474444";
let pageButtonsHoverColor = pageButtonsHoverColorDark;
let pageButtonsClickColor = pageButtonsClickColorDark;

const buttonSettingsElements = ["darkmode", "function1", "function2", "function3", "keepOpenSettings"];
const buttonSettings = [];

const moveTTElements = ["deleteSymbol", "leftSymbol", "rightSymbol", "solve"];
const moveTT = [];
const moveTTEvents = ["Backspace", "Left", "Right", "Enter"];

const symbolsElements = [
    [" 7 ", " 8 ", " 9 ",
     " 4", " 5 ", " 6 ",
     " 1 ", " 2 ", " 3 ",
     " , ", " 0 ", " = ",
     " + ", " - ", " \\left(x\\right) ",
     " \\times ", " \\div ", " \\frac{x}{x} ",
     " 123 ", " \\sqrt[\\varphi]{\\pi^{e}}", " f(x) "],

    [" \\left|x\\right| ", " \\% ", " i ",
     " < ", " > ", " ! ",
     " x ", " y ", " z ",
     " x^2 ", " x^3 ", " x^x ",
     " \\sqrt{x} ", " \\sqrt[3]{x} ", " \\sqrt[x]{x} ",
     " \\pi ", " e ", " \\varphi "],

    [" f(x) ", " e^x ", " 10^x ",
     " ^\\circ ", " \\prime ", " \\prime\\prime ",
     " \\sin(x) ", " \\cos(x) ", " \\tan(x) ",
     " \\sec(x) ", " \\csc(x) ", " \\cot(x) ",
     " \\sin^{-1}(x) ", " \\cos^{-1}(x) ", " \\tan^{-1}(x) ",
     " \\ln(x) ", " \\log(x) ", " \\log_{x}(x) "] 
    ]; 

const inputSymbolsElements = [
    [" 7 ", " 8 ", " 9 ",
    " 4", " 5 ", " 6 ",
    " 1 ", " 2 ", " 3 ",
    " , ", " 0 ", "=",
    " + ", " - ", "(",
    " \\times ", " \\div ", "/",
    " 123 ", " \\sqrt[\\varphi]{\\pi^{e}}", " f(x) "],

    ["|", " \\% ", " i ",
     " < ", " > ", " ! ",
     " x ", " y ", " z ",
     " ^{2} ", " ^{3} ", "^",
     "\\sqrt", " \\sqrt[3]{} ", " \\sqrt[]{} ",
     " \\pi ", " e ", " \\varphi "],

    [" f\\left(\\right) ", " e^{} ", " 10^{} ",
     " ^\\circ ", " \\prime ", " \\prime\\prime ",
     " \\sin\\left(\\right) ", " \\cos\\left(\\right) ", " \\tan\\left(\\right) ",
     " \\sec\\left(\\right) ", " \\csc\\left(\\right) ", " \\cot\\left(\\right) ",
     " \\sin^{-1}\\left(\\right) ", " \\cos^{-1}\\left(\\right) ", " \\tan^{-1}\\left(\\right) ",
     " \\ln\\left(\\right) ", " \\log\\left(\\right) ", " \\log_{}\\left(\\right) "] 
]

const alternativeSymbols = [" x) ", " x\\frac{x}{x} "];
const inputAlternativeSymbols = [")", " \\frac{}{} "];

const symbolsMoveLeft = [
    [0, 0, 0,
     0, 0, 0,
     0, 0, 0,
     0, 0, -1,
     0, 0, -1,
     0, 0, -1,],

    [-1, 0, 0,
     0, 0, 0,
     0, 0, 0,
     0, 0, -1,
     -1, 1, 2,
     0, 0, 0,],

    [1, 1, 1,
     0, 0, 0,
     1, 1, 1,
     1, 1, 1,
     1, 1, 1,
     1, 1, 3,],
]
const symbolsButtons = [];

const pageButtonsElements = ["addButton", "upButton", "downButton"];
const pageButtons = [];
const actionButtonsElements = ["editButton", "removeButton", "deleteButton"];
const actionButtons = [];

let setup = false;
let menuOpen = false;
let showSymbols = false;
let click = 18;
let box = 0;
let inputEmpty = true;
let moveTTTimeout;
let moveTTInterval;

let messageTimeout;
let messageTransitionTimeout;
let showMessage;
let messageShowPosition;
let messageHidePosition;
let messagePreventMove = false;

let changeSymbolTimeout;
let alternativeSymbol = false;

let pageButtonsTimeout;
let pageButtonsInterval;
let pageButtonsTmTriggered = false;
let addButtonTm;

let input = "";
let lastInput = "";
let output;

let exp = [];
let currentExp = 0;
let expCount = 0;
let pressedExpId = 0;
let pressedExpCountId = 0;
let expAmount = 0;

let newExp = false;
let storeAvailable = false;
let disableOutput = false;

let expInputHistory = [];
let expHistoryPosition = 0;

let collapseButtonTm;

let actionButtonsMenuTm;
let actionButtonsXPosition;
let actionButtonsYPosition;

const cmd = {};
const command = {};
const commandsList = ["list", "clear", "history"];
const commandObjects = [cmd, command];
let cmdExecuted = false;

let windowWidth = window.innerWidth;
let lastWindowWidth = 0;
const checkCompactValues = [1350, 1000, 850, 700, 550, 0];

window.onload = function() {
    const settingsIcon = document.getElementById("settingsIcon");
    const settings = document.getElementById("settings");
    const settingsHideout = document.getElementById("settingsHideout");
    const settingsMouseLeave = document.getElementById("settingsMouseLeave");
    const header = document.getElementById("header");
    const footer = document.getElementById("footer");
    const main = document.getElementById("main");
    const compactContainer = document.getElementById("compactContainer");
    const showMathSymbols = document.getElementById("showMathSymbols");
    const mathSymbols = document.getElementById("mathSymbols");
    const mathSymbolsHideout = document.getElementById("mathSymbolsHideout");
    const symbols = document.getElementsByClassName("symbols");
    const switchMathSymbols = document.getElementsByClassName("switchMathSymbols");
    const moveThroughText = document.getElementById("moveThroughText");
    const inputBox = document.getElementById("inputBox");
    const inputBoxPlaceholder = document.getElementById("inputBoxPlaceholder");
    const outputBox = document.getElementById("outputBox");
    const actionButtonsMenu = document.getElementById("actionButtonsMenu");
    const actionButtonsMenuHideout = document.getElementById("actionButtonsMenuHideout");
    const messageBox = document.getElementById("messageBox");
    const invalidInputBox = document.getElementById("invalidInputBox");

    elementsPosition();
    loadSymbols();

    document.addEventListener("keydown", function(event) {
        if (event.key === "Tab") {
            event.preventDefault();
            mathField.focus();
        }
        if ((event.ctrlKey || event.metaKey) && event.key === 'a') {
            event.preventDefault();
        }
    });

// settings

    for (let i = 0; i < 5; i++) {
        buttonSettings[i] = {
            status: false,
            element: document.getElementById(buttonSettingsElements[i]),
            child: document.getElementById(buttonSettingsElements[i]).querySelector("img")
        };
        buttonSettings[i].element.addEventListener("click", function() {
            buttonSettings[i].child.classList.toggle("showIconSettings");
            settingsFunctions(i); 
            buttonSettings[i].status = !buttonSettings[i].status;
        });
    }

    settings.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
        }
    });

    document.addEventListener("mousemove", function(event) {
        if (menuOpen) {
            let rect = settingsMouseLeave.getBoundingClientRect();
            let mouseX = event.clientX;
            let mouseY = event.clientY;
            if (mouseX < rect.left || mouseX > rect.right ||
                mouseY < rect.top || mouseY > rect.bottom) {
                if (!buttonSettings[4].status) {
                    settings.setAttribute("aria-hidden", "true");
                    if (windowWidth <= 550) {
                        settings.style.transform = "translate(-115px, -290px)";
                    } else if (windowWidth <= 850){
                        settings.style.transform = "translate(-150px, -290px)";
                    }
                    else if (windowWidth <= 1150 && windowWidth > 850) {
                        let distance = Math.round((1150 - windowWidth) / 2);
                        let settingsDistance = -450 + distance + "px";
                        settings.style.transform = "translate(" + settingsDistance + ", -282px)";
                    } else {
                        settings.style.transform = "translate(-450px, -280px)";
                    }
                    if (!buttonSettings[0].status) {
                        document.documentElement.style.setProperty('--menu-color', darkColor);
                    }
                    menuOpen = false;
                }
            }
        }
    });
    settingsIcon.addEventListener("mouseenter", function() {
        menuOpen = true;
        settings.setAttribute("aria-hidden", "false");
        if (windowWidth <= 550) {
            settings.style.transform = "translate(-115px, 10px)";
        } else if (windowWidth <= 850) {
            settings.style.transform = "translate(-150px, 10px)";
        } else if (windowWidth <= 1150 && windowWidth > 850) {
            let distance = Math.round((1150 - windowWidth) / 2);
            let settingsDistance = -450 + distance + "px";
            settings.style.transform = "translate(" + settingsDistance + ", 20px)";
        } else {
            settings.style.transform = "translate(-450px, 20px)";
        }
        if (!buttonSettings[0].status) {
            document.documentElement.style.setProperty('--menu-color', "white");
        }
    });

// inputBox
    
    let mathField = MQ.MathField(inputBox, {
        supSubsRequireOperand: true,
        restrictMismatchedBrackets: true,
        autoCommands: "times cdot div frac pi varphi sqrt circ prime le ge pm",
        autoOperatorNames: "sin cos tan sec csc cot arcsin arccos arctan ln log",
        handlers: {
            edit: function() {
                mathField.focus();
                inputBox.style.border = "none";
                inputBox.style.boxShadow = "none";
                inputBox.style.fontSize = "30px";
                input = mathField.latex();
                if (input.includes("\\ ")) {   
                    mathField.blur();
                    clearTimeout(messageTimeout);
                    clearTimeout(messageTransitionTimeout);
                    messageBox.innerText = "Commands via \\ are disabled";
                    if (!showMessage) {
                        messageBox.style.transition = "transform 0.2s ease-out";
                    }
                    showMessage = true;
                    messageBox.style.visibility = "visible";
                    messageBox.style.transform = "translateY(" + messageShowPosition + ")";
                    messageTransitionTimeout = setTimeout(() => {
                        messageBox.style.transition = "none";
                    }, 200)
                    messageTimeout = setTimeout(() => {
                        showMessage = false;
                        messageBox.style.visibility = "hidden";
                        messageBox.style.transform = "translateY(" + messageHidePosition + ")";
                    }, 2000);
                    setTimeout(() => {
                        mathField.keystroke("Backspace");
                        mathField.blur();
                    }, 0)
                }
            }
        }
    });
    mathField.latex("");

    mathField.el().addEventListener("keydown", (event) => {
        if (event.key === "\\") {
            messagePreventMove = true;
        }
        if (event.key === "Spacebar" || event.key === " ") {
            event.preventDefault();
            outputBoxCentral("add");
        }
    });

    function isElementInFocus() {    
        if (document.activeElement.parentElement === inputBox.firstChild) {
            inputBoxPlaceholder.style.border = "1px solid " + primaryColorLight;
            inputBoxPlaceholder.style.outline = "2px solid " + primaryColor;
        } else {
            inputBoxPlaceholder.style.border = "1px solid var(--text-color)";
            inputBoxPlaceholder.style.outline = "none";
        }
    }
    function placeholder() {
        if (input === "") {
            inputBoxPlaceholder.innerText = "Enter a mathematical expression";
        } else {
            inputBoxPlaceholder.innerText = "";
        }
    }

    setInterval(isElementInFocus, 20);
    setInterval(placeholder, 20);

// resize

    const inputBoxResizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) { 
            height = inputBox.offsetHeight;
            inputBoxPlaceholder.style.height = height + "px";
            let outputBoxPosition = height + 50;
            outputBox.style.transform = "translateY(" + outputBoxPosition + "px)";
            if (windowWidth <= 1350) {
                let compactMathSymbolsTop = height - 50;
                mathSymbolsHideout.style.top = compactMathSymbolsTop + "px";
                mathSymbols.style.top = compactMathSymbolsTop + "px";
                moveThroughText.style.top = compactMathSymbolsTop + "px";
            } 

            if (!messagePreventMove) {
                messageShowPosition = height + 50 + "px";
                messageHidePosition = height - 30 + "px";
                if (showMessage) {
                    messageBox.style.transform = "translateY(" + messageShowPosition + ")";
                } else if (!showMessage) {
                    messageBox.style.transform = "translateY(" + messageHidePosition + ")";
                }
            } else {
                messagePreventMove = false;
            }
        }
    })
    inputBoxResizeObserver.observe(inputBox);

    function elementsPosition() {
        let mainTop = header.offsetHeight + compactContainer.offsetHeight;
        let mainHeight = window.innerHeight - header.offsetHeight;
        let minFooterBottom = getMinFooterBottom();
        let footerBottomDistance = outputBox.offsetHeight;
        footerBottomDistance += Math.abs(outputBox.getBoundingClientRect().top - header.getBoundingClientRect().top);
        let footerTop = Math.max(footerBottomDistance, mainHeight, minFooterBottom);
        footer.style.top = footerTop + "px";
        main.style.top = mainTop + "px";
        compactContainer.style.top = header.offsetHeight + "px";
    }

    function getMinFooterBottom() {
        if (windowWidth <= 550) {
            return 480
        } else if (windowWidth <= 700) {
            return 500
        } else if (windowWidth <= 850) {
            return 550
        } else if (windowWidth <= 1350) {
            return 500;
        } else {
            return 700;
        }
    }

    function compactMathSymbols() {
        if (windowWidth <= 1350) {
            mathSymbols.style.gridTemplateRows = "repeat(3, 1fr)";
            mathSymbols.style.gridTemplateColumns = "repeat(7, 1fr)";
            mathSymbols.style.height = "205px";
            mathSymbols.style.width = "560px";
            mathSymbolsHideout.style.height = "205px";
            mathSymbolsHideout.style.width = "630px";
            moveThroughText.style.height = "205px";
            let compactMathSymbolsTop = inputBox.offsetHeight - 50;
            mathSymbolsHideout.style.top = compactMathSymbolsTop + "px";
            mathSymbols.style.top = compactMathSymbolsTop + "px";
            moveThroughText.style.top = compactMathSymbolsTop + "px";
        } 
        if (windowWidth > 700) {
            mathSymbols.style.gap = "2px";
        } else {
            mathSymbolsHideout.style.transform = "translateY(-114px)";
            mathSymbols.style.gap = "0px";
        }

        if (windowWidth <= 550) {
            if (showSymbols) {
                mathSymbols.style.transform = "translate(-25px, 60px) scale(0.7)";
                moveThroughText.style.transform = "translate(197px, 60px) scale(0.7)";
                outputBox.style.marginTop = moveThroughText.offsetHeight * 0.7 + 25 + "px";
            } else {
                mathSymbols.style.transform = "translate(-25px, -84px) scale(0.7)";
                moveThroughText.style.transform = "translate(197px, -84px) scale(0.7)";
            }
        } else if (windowWidth <= 700) {
            if (showSymbols) {
                mathSymbols.style.transform = "translate(-26px, 70px) scale(0.8)";
                moveThroughText.style.transform = "translate(226px, 70px) scale(0.8)";
                outputBox.style.marginTop = moveThroughText.offsetHeight * 0.8 + 25 + "px";
            } else {
                mathSymbols.style.transform = "translate(-26px, -94px) scale(0.8)";
                moveThroughText.style.transform = "translate(226px, -94px) scale(0.8)";
            }
        } else if (windowWidth <= 1350) {
            mathSymbolsHideout.style.transform = "translateY(-105px)";
            if (showSymbols) {
                mathSymbols.style.transform = "translate(-30px, 100px)";
                moveThroughText.style.transform = "translate(285px, 100px)";
                outputBox.style.marginTop = moveThroughText.offsetHeight + 25 + "px";
            } else {
                mathSymbols.style.transform = "translate(-30px, -105px)";
                moveThroughText.style.transform = "translate(285px, -105px)";
            }
        } else {
            outputBox.style.marginTop = "0px";
            mathSymbols.style.height = "490px";
            mathSymbols.style.width = "245px";
            mathSymbols.style.gridTemplateRows = "repeat(7, 1fr)";
            mathSymbols.style.gridTemplateColumns = "repeat(3, 1fr)";
            moveThroughText.style.height = "210px";
            mathSymbolsHideout.style.height = "492px";
            mathSymbolsHideout.style.width = "310px";
            mathSymbolsHideout.style.transform = "translate(485px, -430px)";
            mathSymbolsHideout.style.top = "0px";
            mathSymbols.style.top = "0px";
            moveThroughText.style.top = "0px";
            if (showSymbols) {
                mathSymbols.style.transform = "translate(453px, 62px)";
                moveThroughText.style.transform = "translate(610px, 62px)";
            } else {
                mathSymbols.style.transform = "translate(453px, -430px)";
                moveThroughText.style.transform = "translate(610px, -210px)";
            }
        } 
    }

    function compactSettingsMove() {
        if (windowWidth <= 1150 && windowWidth > 850) {
            let distance = Math.round((1150 - windowWidth) / 2);
            let settingsIconDistance = -525 + distance + "px";
            let settingsDistance = -450 + distance + "px";
            settingsIcon.style.transform = "translate(" + settingsIconDistance + ", 35px)";
            settingsHideout.style.transform = "translate(" + settingsDistance + ", -282px)";
            settingsMouseLeave.style.transform = "translate(" + settingsDistance + ", 20px)";
            if (menuOpen) {
                settings.style.transform = "translate(" + settingsDistance + ", 20px)";
            } else {
                settings.style.transform = "translate(" + settingsDistance + ", -282px)";
            }
        }
    }

    function compactSettings() {
         if (windowWidth <= 550){
            settingsIcon.style.transform = "translate(-190px, 25px)";
            settingsHideout.style.transform = "translate(-115px, -290px)";
            settingsMouseLeave.style.transform = "translate(-115px, 10px)";
            if (menuOpen) {
                settings.style.transform = "translate(-115px, 10px)";
            } else {
                settings.style.transform = "translate(-115px, -290px)";
            }
        } else if (windowWidth <= 850) {
            settingsIcon.style.transform = "translate(-225px, 25px)";
            settingsHideout.style.transform = "translate(-150px, -290px)";
            settingsMouseLeave.style.transform = "translate(-150px, 10px)";
            if (menuOpen) {
                settings.style.transform = "translate(-150px, 10px)";
            } else {
                settings.style.transform = "translate(-150px, -290px)";
            }
        } else {
            settingsIcon.style.transform = "translate(-525px, 35px)";
            settingsHideout.style.transform = "translate(-450px, -280px)";
            settingsMouseLeave.style.transform = "translate(-450px, 20px)";
            if (menuOpen) {
                settings.style.transform = "translate(-450px, 20px)";
            } else {
                settings.style.transform = "translate(-450px, -280px)";
            }
        } 
    }

    function compactShowSymbols() {
        if (windowWidth > 550) {
            showMathSymbols.style.width = "140px";
            showMathSymbols.style.height = "40px";
            showMathSymbols.style.fontSize = "16px";
        }
        if (windowWidth <= 550) {
            showMathSymbols.style.width = "110px";
            showMathSymbols.style.transform = "translate(160px, 15px)";
            showMathSymbols.style.fontSize = "14px";
        } else if (windowWidth <= 850) {
            showMathSymbols.style.transform = "translate(180px, 15px)";
        } else if (windowWidth <= 1000) {
            showMathSymbols.style.width = "80px";
            showMathSymbols.style.height = "60px";
            showMathSymbols.style.transform = "translate(355px, 20px)";
        } else{
            showMathSymbols.style.transform = "translate(400px, 20px)";
        }
    }

    function compactPageButtons() {
        if (windowWidth <= 550) {
            pageButtons[0].style.transform = "translate(80px, 15px)";
            pageButtons[1].style.transform = "translate(40px, 18px)";
            pageButtons[2].style.transform = "translate(5px, 18px)";
        } else if (windowWidth <= 700) {
            pageButtons[0].style.transform = "translate(70px, 15px)";
            pageButtons[1].style.transform = "translate(15px, 18px)";
            pageButtons[2].style.transform = "translate(-20px, 18px)";
        } else {
            pageButtons[0].style.transform = "translate(280px, 25px)";
            pageButtons[1].style.transform = "translate(-275px, 27px)";
            pageButtons[2].style.transform = "translate(-310px, 27px)";
        }
    }

    function compactLayout_MainAppend() {
        if (windowWidth <= 850) {
            compactContainer.style.height = "50px";
            compactContainer.appendChild(showMathSymbols);
            compactContainer.appendChild(settingsIcon);
            compactContainer.appendChild(settings);
            compactContainer.appendChild(settingsHideout);
            compactContainer.appendChild(settingsMouseLeave);
        } else {
            compactContainer.style.height = "0px";
            main.appendChild(showMathSymbols);
            main.appendChild(settingsIcon);
            main.appendChild(settings);
            main.appendChild(settingsHideout);
            main.appendChild(settingsMouseLeave);
        }
        if (windowWidth <= 700) {
            for (let i = 0; i < 3; i++) {
                compactContainer.appendChild(pageButtons[i]);
            }
        } else {
            for (let i = 0; i < 3; i++) {
                main.appendChild(pageButtons[i]);
            }
        }
    }

    function actionButtonMove() {
        if (windowWidth <= 620) {
            actionButtonsXPosition = main.offsetWidth / 2 - 55;  
        } else {
            actionButtonsXPosition = 255;
        }
        actionButtonsMenu.style.transform = "translate(" + actionButtonsXPosition + "px, " + actionButtonsYPosition + "px)";
    }

    function disableTransition() {
        settings.style.transition = "none";
        mathSymbols.style.transition = "none";
        moveThroughText.style.transition = "none";
        outputBox.style.transition = "none";
        actionButtonsMenu.style.transition = "none";
    }

    function enableTransition() {
        setTimeout(() => {
            settings.style.transition = "transform 0.5s ease-out";
            mathSymbols.style.transition = "transform 0.5s ease-out";
            moveThroughText.style.transition = "transform 0.5s ease-out";
            outputBox.style.transition = "margin-top 0.5s ease-out";
            actionButtonsMenu.style.transition = "transform 0.3s ease-out";
        }, 0);
    }
    
    function windowWidthCheck() {
        if (windowWidth > 1350 && lastWindowWidth <= 1350) {return true;}
        for (let i = 0; i < 5; i++) {
            if (windowWidth <= checkCompactValues[i] && windowWidth > checkCompactValues[i + 1] && (lastWindowWidth > checkCompactValues[i] || lastWindowWidth <= checkCompactValues[i + 1])) {return true}
        }
        return false;
    }

    function compactLayout() {
        windowWidth = window.innerWidth;
        disableTransition();
        if (windowWidthCheck()) {
            compactLayout_MainAppend();
            compactMathSymbols();
            compactSettings();
            compactShowSymbols();
            compactPageButtons();
            lastWindowWidth = windowWidth;
        }
        actionButtonMove();
        compactSettingsMove();
        enableTransition();
    }

    window.addEventListener("resize", compactLayout);
    setInterval(elementsPosition, 20);

// moveThroughText

    for (let i = 0; i < 4; i++) {
        moveTT[i] = document.getElementById(moveTTElements[i]);
        moveTT[i].addEventListener("mousedown", function(event) {
            mathField.focus();
            event.preventDefault();
            moveTT[i].style.backgroundColor = symbolsClickColor;
            if (i != 3) {
                mathField.keystroke(moveTTEvents[i]); 
                moveTTTimeout = setTimeout(() => {
                    moveTTInterval = setInterval(() => {
                        mathField.keystroke(moveTTEvents[i]);  
                    }, 40);  
                }, 460);
            }
        });
        moveTT[i].addEventListener("mouseup", function(event) {
            event.preventDefault();
            moveTT[i].style.backgroundColor = symbolsHoverColor;
            if (i !== 3) {
                clearTimeout(moveTTTimeout);
                clearInterval(moveTTInterval);
            }
        }); 
        moveTT[i].addEventListener("mouseenter", function(event) {
            moveTT[i].style.backgroundColor = symbolsHoverColor;
        });
        moveTT[i].addEventListener("mouseleave", function(event) {
            moveTT[i].style.backgroundColor = mathSymbolsColor;
            if (i !== 3) {
                clearTimeout(moveTTTimeout);
                clearInterval(moveTTInterval);
            }
        });
        if (i === 0) {
            moveTT[i].style.borderTopLeftRadius = "5px";
            moveTT[i].style.borderTopRightRadius = "5px";
        } else if (i === 3) {
            moveTT[i].style.borderBottomLeftRadius = "5px";
            moveTT[i].style.borderBottomRightRadius = "5px";
        }
    }
    moveTT[3].addEventListener("click", function() {
        outputBoxCentral("write");
    });

// outputBox

    mathField.el().addEventListener("keydown", function(event) {
        if (event.shiftKey && event.key === "Enter") {
            outputBoxCentral("store");
        } else if (event.key === "Enter") {
            outputBoxCentral("write");
        }
    });

    function outputBoxCentral(command) {
        if (disableOutput) {
            return;
        }
        if (exp[currentExp] === undefined) {
            if (input === "") {
                return;
            }
            defineExp();
        }
        if (input == "Invalid") {
            invalidInput();
            return
        } else {
            invalidInputBox.style.display = "none";
        }
        switch (command) {
            case "write":
                writeExp();
                break;
            case "add":
                writeExp("check");
                addExp();
                break;
            case "store":
                writeExp();
                addExp();
                storeExp();
                break;
        }
    }

    function invalidInput() {
        invalidInputBox.style.display = "block";
        outputBox.prepend(invalidInputBox);
    }

    function defineExp() {
        exp[currentExp] = {
            expressions: [],
            expCalc: [],
            expHistory: [],
            expCalcHistory: [],
            div: document.createElement("div"),
                expContainer: document.createElement("div"),
                    expDiv: [],
                expCalcContainer: document.createElement("div"),
                    expCalcDiv: [],
                separator: document.createElement("div"),
                collapseButton: undefined,
                buttons: []
        };
        outputBox.prepend(exp[currentExp].div);
        exp[currentExp].div.classList = "relative expDiv";
        exp[currentExp].div.appendChild(exp[currentExp].expContainer);
        exp[currentExp].expContainer.className = "relative";
        exp[currentExp].div.appendChild(exp[currentExp].expCalcContainer);
        exp[currentExp].expCalcContainer.className = "expCalcContainer";
        exp[currentExp].div.prepend(exp[currentExp].separator);
    }

    function writeExp(command) {
        if (command === "check" && input === "") {
            return;
        }
        if (lastInput !== input || newExp) {
            if (newExp) {
                newExp = false;
            }
            if (exp[currentExp].expContainer.childNodes.length < 1 && input == "") {
                storeAvailable = false
            } else {
                storeAvailable = true
            }
            output = input;
            lastInput = input;
            let removeChildren = exp[currentExp].expCalcContainer.querySelectorAll(".exp");
            removeChildren.forEach(child => child.remove());
            exp[currentExp].expCalcDiv.length = 0;
            exp[currentExp].expCalc = output;
            if (input !== "") { //useless input getting stored
                exp[currentExp].expHistory.push(input);
                exp[currentExp].expCalcHistory.push(output);
                expInputHistory.push(input);
                expHistoryPosition = expInputHistory.length - 1;
            }
            for (let i = 0; i < exp[currentExp].expCalc.length; i++) {
                exp[currentExp].expCalcDiv[i] = document.createElement("div");
                exp[currentExp].expCalcDiv[i].innerText = exp[currentExp].expCalc[i];
                exp[currentExp].expCalcDiv[i].className = "exp";
                exp[currentExp].expCalcContainer.appendChild(exp[currentExp].expCalcDiv[i]);
                MQ.StaticMath(exp[currentExp].expCalcDiv[i]);
            }
        }
    }   

    function addExp() {
        if (input !== "") {
            exp[currentExp].expressions[expCount] = input;
            exp[currentExp].expDiv[expCount] = document.createElement("div");
            exp[currentExp].expDiv[expCount].innerText = input;
            exp[currentExp].expDiv[expCount].className = "exp";
            exp[currentExp].expContainer.prepend(exp[currentExp].expDiv[expCount]);
            MQ.StaticMath(exp[currentExp].expDiv[expCount]);
            createButtons();
            expCount++;
            newExp = true;
            mathField.latex("");
        }
    }
    
    function storeExp() {
        if (input !== "" || storeAvailable) {
            storeAvailable = false;
            exp[currentExp].separator.className = "separator";
            exp[currentExp].div.prepend(exp[currentExp].separator);
            createCollapseButton();
            if (exp[expAmount] !== undefined) {
                expAmount++
            }
            currentExp = expAmount;
            expCount = 0; 
            newExp = true;
            mathField.latex("");
        }
    }

    function createCollapseButton() {
        let expId = currentExp;
        if (exp[currentExp].collapseButton === undefined) {
            exp[currentExp].collapseButton = document.createElement("button");
            exp[currentExp].collapseButton.type = "button";
            exp[currentExp].collapseButton.innerText = "Collapse";
            exp[currentExp].collapseButton.className = "collapseButton";
            exp[currentExp].expContainer.appendChild(exp[currentExp].collapseButton);
            exp[currentExp].collapseButton.style.bottom = -exp[currentExp].expCalcContainer.scrollHeight + "px";
            exp[expId].expCalcContainer.style.maxHeight = exp[expId].expCalcContainer.offsetHeight + "px";
            exp[expId].collapseButton.addEventListener("click", function() {
                clearTimeout(collapseButtonTm);
                if (exp[expId].expCalcContainer.offsetHeight > 0 && exp[expId].collapseButton.innerText === "Collapse") {
                    exp[pressedExpId].expCalcContainer.style.transition = "max-height 0.3s ease-out";
                    exp[expId].expCalcContainer.style.maxHeight = "0px";
                    exp[expId].collapseButton.innerText = "Expand";
                    exp[expId].collapseButton.style.bottom = "-5px";
                } else if (exp[expId].expCalcContainer.scrollHeight > exp[expId].expCalcContainer.offsetHeight && exp[expId].collapseButton.innerText === "Expand") {    
                    exp[expId].expCalcContainer.style.maxHeight = exp[expId].expCalcContainer.scrollHeight + "px";
                    exp[expId].collapseButton.innerText = "Collapse";
                    collapseButtonTm = setTimeout(() => {
                        exp[expId].collapseButton.style.bottom = -exp[expId].expCalcContainer.scrollHeight + "px";
                    }, 300)
                }
            });
        } else {
            exp[currentExp].collapseButton.style.display = "block";
            exp[currentExp].expCalcContainer.style.maxHeight = exp[currentExp].expCalcContainer.scrollHeight + "px";
            exp[currentExp].collapseButton.innerText = "Collapse";
            exp[currentExp].collapseButton.style.bottom = -exp[currentExp].expCalcContainer.scrollHeight + "px";
            exp[currentExp].expContainer.appendChild(exp[currentExp].collapseButton);
        }
    }
// actionbuttons menu is not shown when outputbox is scaled
    for (let i = 0; i < 3; i++) {
        actionButtons[i] = document.getElementById(actionButtonsElements[i]);
        actionButtons[i].addEventListener("mousedown", function(event) {
            event.preventDefault();
            actionButtons[i].style.backgroundColor = symbolsClickColor;
        });
        actionButtons[i].addEventListener("mouseup", function() {
            actionButtons[i].style.backgroundColor = symbolsHoverColor;
        });
        actionButtons[i].addEventListener("mouseenter", function() {
            actionButtons[i].style.backgroundColor = symbolsHoverColor;
        });
        actionButtons[i].addEventListener("mouseleave", function() {
            actionButtons[i].style.backgroundColor = mathSymbolsColor;
        });
        actionButtons[i].addEventListener("click", function() {
            actionButtonsClick(actionButtonsElements[i]);
        });
        if (i === 0) {
            actionButtons[i].style.borderTopLeftRadius = "5px";
            actionButtons[i].style.borderTopRightRadius = "5px";
        } else if (i === 2) {
            actionButtons[i].style.borderBottomLeftRadius = "5px";
            actionButtons[i].style.borderBottomRightRadius = "5px";
        }
    }

    document.body.addEventListener("click", function(event) {
        if (!event.target.closest('.expButtons')) {
            hideActionButtons();
        }
    });

    document.body.addEventListener("keydown", function() {
        hideActionButtons();
    })

    function hideActionButtons() {
        clearTimeout(actionButtonsMenuTm);
        actionButtonsMenu.style.pointerEvents = "none";
        actionButtonsYPosition = "-170";
        if (windowWidth <= 620) {
            actionButtonsMenu.style.transform = "translate(" + actionButtonsXPosition + "px, -170px)";
        } else {
            actionButtonsMenu.style.transform = "translate(" + actionButtonsXPosition + "px, -170px)";
        }
    }

    function createButtons() {
        if (exp[currentExp].buttons[expCount] === undefined) {
            exp[currentExp].buttons[expCount] = document.createElement("button");
            exp[currentExp].expDiv[expCount].type = "button";
            exp[currentExp].expDiv[expCount].appendChild(exp[currentExp].buttons[expCount]);
            exp[currentExp].buttons[expCount].className = "expButtons";
            for (let i = 0; i < 3; i++) {
                let button = document.createElement("div");
                button.className = "dot";
                exp[currentExp].buttons[expCount].appendChild(button);
            }
            let expId = currentExp;
            let expCountId = expCount;
            exp[expId].buttons[expCountId].addEventListener("click", function() {
                actionButtonsYPosition = Math.abs(this.getBoundingClientRect().top - main.getBoundingClientRect().top) + 13;
                actionButtonsMenu.style.pointerEvents = "none";
                actionButtonsMenu.style.transform = "translate(" + actionButtonsXPosition + "px, " + actionButtonsYPosition + "px)";
                actionButtonsMenuTm = setTimeout(() => {
                    actionButtonsMenu.style.pointerEvents = "auto";
                }, 300)
                pressedExpId = expId;
                pressedExpCountId = expCountId;
            });
            exp[expId].buttons[expCountId].addEventListener("mousedown", function() {
                for (let i = 0; i < 3; i++) {
                    this.children[i].style.backgroundColor = dotsClickColor;
                }
            });
            exp[expId].buttons[expCountId].addEventListener("mouseup", function() {
                for (let i = 0; i < 3; i++) {
                    this.children[i].style.backgroundColor = textColor;
                }
            });
            exp[expId].buttons[expCountId].addEventListener("mouseleave", function() {
                for (let i = 0; i < 3; i++) {
                    this.children[i].style.backgroundColor = textColor;
                }
            });
        }
    }

    function actionButtonsClick(button) {
        if (disableOutput) {
            return
        }
        if (input == "Invalid") {
            mathField.latex("");
        }
        if (exp[pressedExpId] === undefined) {
            return;
        }
        switch(button) {
            case "editButton":
                editExp();
                break;
            case "removeButton":
                removeExp();
                checkExp();
                break;
            case "deleteButton":
                deleteExp();
                break;
        }
    }

    function editExp() {
        if (currentExp === pressedExpId) {
            removeExp();
            outputBoxCentral("add");
        } else {
            outputBoxCentral("store");
            removeExp();
            mathField.latex(exp[pressedExpId].expressions[pressedExpCountId]);
            outputBox.prepend(exp[pressedExpId].div);
            exp[pressedExpId].div.style.maxHeight = "0px"; 
            exp[pressedExpId].expCalcContainer.style.maxHeight = "none";
            exp[pressedExpId].div.style.overflow = "hidden";
            exp[pressedExpId].div.style.maxHeight = exp[pressedExpId].div.scrollHeight + "px";
            exp[pressedExpId].collapseButton.style.display = "none";
            exp[pressedExpId].separator.remove("separator");
            currentExp = pressedExpId;
            disableOutput = true;
            setTimeout(() => {
                exp[pressedExpId].div.style.overflow = "visible";
                exp[pressedExpId].div.style.maxHeight = "none";
                disableOutput = false;
            }, 300);
        }
        newExp = true;
        mathField.latex(exp[currentExp].expressions[pressedExpCountId]);
        expCount = exp[currentExp].expressions.length;
    }

    function removeExp() {
        exp[pressedExpId].expDiv[pressedExpCountId].remove();
    }

    function checkExp() {
        let savedCurrentExp = currentExp;
        currentExp = pressedExpId;
        outputBoxCentral("write");
        currentExp = savedCurrentExp;
        if (currentExp !== pressedExpId && exp[pressedExpId].collapseButton.innerText === "Collapse") {
            exp[pressedExpId].expCalcContainer.style.transition = "none";
            exp[pressedExpId].collapseButton.style.bottom = -exp[pressedExpId].expCalcContainer.scrollHeight + "px";
            exp[pressedExpId].expCalcContainer.style.maxHeight = exp[pressedExpId].expCalcContainer.scrollHeight + "px";
            setTimeout(() => {
                exp[pressedExpId].expCalcContainer.style.transition = "max-height 0.3s ease-out";
            }, 0);
        }
        if (exp[pressedExpId].expContainer.childNodes.length < 2 && currentExp !== pressedExpId) {
            deleteExp();
        }
        newExp = true;
    }

    function deleteExp() {
        if (currentExp !== pressedExpId) {
            exp[pressedExpId].div.style.maxHeight = exp[pressedExpId].div.offsetHeight + "px";
            exp[pressedExpId].div.style.overflow = "hidden";
            disableOutput = true;
            setTimeout(() => {
                exp[pressedExpId].div.style.maxHeight = "0px";
            }, 10);
            setTimeout(() => {
                exp[pressedExpId].div.remove();
                disableOutput = false;
            }, 300);
        } else {
            exp[pressedExpId].expDiv.forEach(element => {
                element.remove();
            });
            outputBoxCentral("write");
        }
    }

    function moveThroughExpHistory(older) {
        if (older && expHistoryPosition > 0) {
            expHistoryPosition--;
            mathField.latex(expInputHistory[expHistoryPosition]);
        } else if (!older && expHistoryPosition < expInputHistory.length -1) {
            expHistoryPosition++;
            mathField.latex(expInputHistory[expHistoryPosition]);
        }
        
    }
                             
// pageButtons

    for (let i = 0; i < 3; i++) {
        pageButtons[i] = document.getElementById(pageButtonsElements[i]);
        pageButtons[i].addEventListener("mousedown", function(event) {
            if (i != 0) {
                pageButtonsTimeout = setTimeout(() => {
                    pageButtonsTmTriggered = true;
                    pageButtonsInterval = setInterval(() => {
                        pageButtonsSwitch(i);
                    }, 100)
                }, 400)
            } else {
                addButtonTm = setTimeout(() => {
                    pageButtonsTmTriggered = true;
                    pageButtons[i].style.outline = "2px solid " + primaryColor + "";
                    outputBoxCentral("store");
                }, 500)
            }
            event.preventDefault();
            pageButtons[i].style.backgroundColor = pageButtonsClickColor;
        })
        pageButtons[i].addEventListener("mouseup", function() {
            if (i === 0) {
                pageButtons[i].style.outline = "none";
            } 
            pageButtons[i].style.backgroundColor = pageButtonsHoverColor;
            clearTimeout(pageButtonsTimeout);
            clearTimeout(addButtonTm);
            clearInterval(pageButtonsInterval);
            if (!pageButtonsTmTriggered) {
                pageButtonsSwitch(i);
            } else {
                pageButtonsTmTriggered = false;
            }
        })
        pageButtons[i].addEventListener("mouseenter", function() {
            pageButtons[i].style.backgroundColor = pageButtonsHoverColor;
        })
        pageButtons[i].addEventListener("mouseleave", function() {
            if (i === 0) {
                pageButtons[i].style.outline = "none";
            } 
            pageButtons[i].style.backgroundColor = pageColor;
            clearTimeout(pageButtonsTimeout);
            clearTimeout(addButtonTm);
            clearInterval(pageButtonsInterval);
        })
    }

    function pageButtonsSwitch(button) {
        switch(button) {
            case 0: 
                outputBoxCentral("add");
                break;
            case 1:
                moveThroughExpHistory(true);
                break;
            case 2:
                moveThroughExpHistory(false);
                break;
        }
    }

// mathSymbols

    showMathSymbols.addEventListener("click", function() {
        if (showSymbols) {
            showSymbols = false;
            outputBox.style.marginTop = "0px";
            if (windowWidth <= 550) {
                mathSymbols.style.transform = "translate(-25px, -84px) scale(0.7)";
                moveThroughText.style.transform = "translate(197px, -84px) scale(0.7)";
            } else if (windowWidth <= 700) {
                mathSymbols.style.transform = "translate(-26px, -94px) scale(0.8)";
                moveThroughText.style.transform = "translate(226px, -94px) scale(0.8)";
            } else if (windowWidth <= 1350) {
                mathSymbols.style.transform = "translate(-30px, -105px)";
                moveThroughText.style.transform = "translate(285px, -105px)";
            } else {
                mathSymbols.style.transform = "translate(453px, -430px)";
                moveThroughText.style.transform = "translate(610px, -150px)";
            }
            mathSymbols.setAttribute("aria-hidden", "true");
            showMathSymbols.innerText = "Show symbols";
            moveThroughText.setAttribute("aria-hidden", "true");
        } else { 
            showSymbols = true;
            if (windowWidth <= 550) {
                mathSymbols.style.transform = "translate(-25px, 60px) scale(0.7)";
                moveThroughText.style.transform = "translate(197px, 60px) scale(0.7)";
                outputBox.style.marginTop = moveThroughText.offsetHeight * 0.7 + 25 + "px";
            } else if (windowWidth <= 700) {
                mathSymbols.style.transform = "translate(-26px, 70px) scale(0.8)";
                moveThroughText.style.transform = "translate(226px, 70px) scale(0.8)";  
                outputBox.style.marginTop = moveThroughText.offsetHeight * 0.8 + 25 + "px";
            } else if (windowWidth <= 1350) {
                mathSymbols.style.transform = "translate(-30px, 100px)";
                moveThroughText.style.transform = "translate(285px, 100px)";
                outputBox.style.marginTop = moveThroughText.offsetHeight  + 25 + "px";
            } else {
                mathSymbols.style.transform = "translate(453px, 62px)";
                moveThroughText.style.transform = "translate(610px, 62px)";
            }
            mathSymbols.setAttribute("aria-hidden", "false");
            showMathSymbols.innerText = "Hide symbols";
            moveThroughText.setAttribute("aria-hidden", "false");
        }
    });

    mathSymbols.addEventListener("copy", function(event) {
        event.preventDefault();
    });
    
// settings functions

    buttonSettings[0].child.classList.toggle("showIconSettings");
    buttonSettings[0].status = true;
 
    function settingsFunctions(click) {
        switch (click) {
            case 0: darkmodeFunction();
                    break;
            case 1: function1Function();
                    break;
            case 2: function2Function();
                    break;
            case 3: function3Function();
                    break;
        }
    }

    function darkmodeFunction() {
        if (!buttonSettings[0].status) {
            document.documentElement.style.setProperty('--text-color', "white");
            document.documentElement.style.setProperty('--page-color', darkColor);
            document.documentElement.style.setProperty('--inputBox-color', inputBoxColor);
            document.documentElement.style.setProperty('--copy-color', copyColor);
            pageColor = darkColor;
            textColor = "white";
            pageButtonsHoverColor = pageButtonsHoverColorDark
            pageButtonsClickColor = pageButtonsClickColorDark;
            for (let i = 0; i < 3; i++) {
                pageButtons[i].style.backgroundColor = pageColor;
            }
        } else {
            document.documentElement.style.setProperty('--text-color', darkColor);
            document.documentElement.style.setProperty('--page-color', "white");
            document.documentElement.style.setProperty('--inputBox-color', inputBoxColorLight);
            document.documentElement.style.setProperty('--copy-color', copyColorLight);
            pageColor = "white";
            textColor = darkColor;
            pageButtonsHoverColor = pageButtonsHoverColorLight;
            pageButtonsClickColor = pageButtonsClickColorLight;
            for (let i = 0; i < 3; i++) {
                pageButtons[i].style.backgroundColor = pageColor;
            }
        }
    }

    function function1Function() {}
    function function2Function() {}
    function function3Function() {}  

// mathSymbols functions

    function loadSymbols() {
        for (let i = 0; i < 21; i++) {
            symbolsButtons[i] = document.createElement("button");
            symbolsButtons[i].type = "button";
            mathSymbols.appendChild(symbolsButtons[i]);
            symbolsButtons[i].type = "button";

            let span = document.createElement("span");
            symbolsButtons[i].appendChild(span);
            span.innerHTML = symbolsElements[0][i];
   
            if (i < 18) {
                setSymbolsBackground(i);
                symbolsButtons[i].className = "symbolsButtonsClass";
                symbolsButtons[i].firstChild.className = "symbols";
            } else {
                symbolsButtons[i].className = "switchMathSymbolsButtons";
                symbolsButtons[i].firstChild.className = "switchMathSymbols";
                setSwitchSymbolsBackground(i);
            }
            if (i === 0) {
                symbolsButtons[i].style.borderTopLeftRadius = "5px";
            }
            if (i === 2) {
                symbolsButtons[i].style.borderTopRightRadius= "5px";
            }
            if (i === 18) {
                symbolsButtons[i].style.borderBottomLeftRadius= "5px";
            }
            if (i === 20) {
                symbolsButtons[i].style.borderBottomRightRadius= "5px";
            }
            if (i === 14) {
                symbolsButtons[i].title = "Hold to write right bracket";
            }
            if (i === 17) {
                symbolsButtons[i].title = "Hold to write compound fraction";
            }
            symbolsButtons[i].addEventListener("click", function() {
                symbolClick(i);
            });
        }
        mathSymbols.addEventListener("keydown", function(event) {
            if (event.key === "Enter") {
                event.preventDefault();
            }
        });
        symbolsButtons[18].style.backgroundColor = primaryColor;
        symbolsButtons[18].firstChild.style.backgroundColor = primaryColor;
        loadStaticMath();
        loadSwitchSymbols();
    }

    function setSymbolsBackground(symbol) {
        symbolsButtons[symbol].addEventListener("mousedown", function(event) {
            event.preventDefault();
            mathField.focus(); 
            symbolsButtons[symbol].style.backgroundColor = symbolsClickColor;
            symbolsButtons[symbol].firstChild.style.backgroundColor = symbolsClickColor;
            if (symbol === 14 || symbol === 17) {
                changeSymbol(symbol);
            }
        });
        symbolsButtons[symbol].addEventListener("mouseup", function() {
            symbolsButtons[symbol].style.backgroundColor = symbolsHoverColor;
            symbolsButtons[symbol].firstChild.style.backgroundColor = symbolsHoverColor;
            if (symbol === 14 || symbol === 17) {
                resetSymbol(symbol);
            }
        });
        symbolsButtons[symbol].addEventListener("mouseenter", function() {
            symbolsButtons[symbol].style.backgroundColor = symbolsHoverColor;
            symbolsButtons[symbol].firstChild.style.backgroundColor = symbolsHoverColor;
        });
        symbolsButtons[symbol].addEventListener("mouseleave", function() {
            symbolsButtons[symbol].style.backgroundColor = mathSymbolsColor;
            symbolsButtons[symbol].firstChild.style.backgroundColor = mathSymbolsColor;
            if (symbol === 14 || symbol === 17) {
                resetSymbol(symbol)
                alternativeSymbol = false;
            }
        });
    }
    function setSwitchSymbolsBackground(symbol) {
        symbolsButtons[symbol].addEventListener("mouseenter", function() {
            if (symbol != click) {
                symbolsButtons[symbol].style.backgroundColor = switchSymbolsHoverColor;
                symbolsButtons[symbol].firstChild.style.backgroundColor = switchSymbolsHoverColor;
            }
        });
        symbolsButtons[symbol].addEventListener("mouseleave", function() {
            if (symbol != click) {
                symbolsButtons[symbol].style.backgroundColor = inputBoxColor;
                symbolsButtons[symbol].firstChild.style.backgroundColor = inputBoxColor;
            }
        });
        symbolsButtons[symbol].addEventListener("mousedown", function() {
            if (symbol != click) {
                symbolsButtons[symbol].style.backgroundColor = switchSymbolsClickColor;
                symbolsButtons[symbol].firstChild.style.backgroundColor = switchSymbolsClickColor;
            } 
        });
    }

// mathSymbols click

    function symbolClick(symbol) {
        if (symbol > 17 && click != symbol) {
            loadNewSymbols(symbol - 18);  
            symbolsButtons[symbol].style.backgroundColor = primaryColor; 
            symbolsButtons[symbol].firstChild.style.backgroundColor = primaryColor;
            click = symbol;
            box = symbol - 18
            for (let i = 18; i < 21; i++) {
                if (i != symbol) {
                    symbolsButtons[i].style.backgroundColor = inputBoxColor;
                    symbolsButtons[i].firstChild.style.backgroundColor = inputBoxColor;
                } 
            }
        } else if (symbol < 18) {
            mathField.focus();
            if (symbolsMoveLeft[box][symbol] === -1) {  
                if (alternativeSymbol) {
                    writeAlterantiveSymbols(symbol)
                } else {
                    mathField.cmd(inputSymbolsElements[box][symbol]);
                }
            } else {
                mathField.write(inputSymbolsElements[box][symbol]);
                moveCursor(symbolsMoveLeft[box][symbol]);
            }
        }
    }

    function changeSymbol(symbol) {
        if (box === 0) {
            changeSymbolTimeout = setTimeout(() => {
                if (symbol === 14) {
                    symbolsButtons[symbol].firstChild.innerHTML = alternativeSymbols[0];
                    MQ.StaticMath(symbols[symbol]);
                } else if (symbol === 17) {
                    symbolsButtons[symbol].firstChild.innerHTML = alternativeSymbols[1];
                    MQ.StaticMath(symbols[symbol]);
                }
                symbolsButtons[symbol].style.outline = "2px solid " + primaryColor + "";
                alternativeSymbol = true;
            }, 500)
        }
    }

    function resetSymbol(symbol) {
        if (box === 0) {
            clearTimeout(changeSymbolTimeout);
            if (symbol === 14) {
                symbolsButtons[symbol].firstChild.innerHTML = symbolsElements[0][symbol];
                MQ.StaticMath(symbols[symbol]);
            } else if (symbol === 17) {
                symbolsButtons[symbol].firstChild.innerHTML = symbolsElements[0][symbol];
                MQ.StaticMath(symbols[symbol]);
            }
            symbolsButtons[symbol].style.outline = "none";
        }
    }

    function writeAlterantiveSymbols(symbol) {
        if (symbol === 14) {
            mathField.cmd(inputAlternativeSymbols[0]);
        } else if (symbol === 17) {
            mathField.write(inputAlternativeSymbols[1]);
            mathField.keystroke("Left");
            mathField.keystroke("Left");
        } 
        alternativeSymbol = false;
    }

    function moveCursor(symbolMove) {
        for (let i = symbolMove; i > 0; i--) {
            mathField.keystroke("Left");
        }
    }

    function loadNewSymbols(box) {
        for (let i = 0; i < 18; i++) {
            symbolsButtons[i].firstChild.innerHTML = symbolsElements[box][i];
            if (box === 0) {
                if (i === 14) {
                    symbolsButtons[i].title = "Hold to write right bracket";
                }
                if (i === 17) {
                    symbolsButtons[i].title = "Hold to write compound fraction";
                }
            } else {
                if (i === 14 || i === 17) {
                    symbolsButtons[i].title = "";
                }
            }
        }
        loadStaticMath();
    }
    setup = true;

    function loadSwitchSymbols() {
        for (let i = 0; i < switchMathSymbols.length; i++) {
            MQ.StaticMath(switchMathSymbols[i]);
        }
    }
    function loadStaticMath() {
        for (let i = 0; i < symbols.length; i++) {
            MQ.StaticMath(symbols[i]);  
          }
    }

// commnads

    commandObjects.forEach((obj) => {
        commandsList.forEach((command) => {
            Object.defineProperty(obj, command, {
                get: function() {
                    commandHandler(command);
                    if (cmdExecuted) {
                        cmdExecuted = false;
                        return "Command executed";
                    } else {
                        return "Command failed to execute";
                    }
                }
            });
        });
    });
    
    function commandHandler(command) {
        switch (command) {
            case "list":
                getCommandsList();
                break;
            case "clear":
                clearOutputBox_History();
                break;
            case "history":
                showExpHistory();
                break;
        }
    }

    function getCommandsList() {
        console.log("Commands: " + commandsList.join(", "));
        cmdExecuted = true;
    }

    function clearOutputBox_History() {
        outputBox.innerHTML = "";
        exp.length = 0;
        currentExp = 0;
        expCount = 0;
        pressedExpId = 0;
        pressedExpCountId = 0;
        expAmount = 0;
        newExp = false;
        storeAvailable = false;
        expInputHistory.length = 0
        expHistoryPosition = 0;
        lastInput = "";
        disableOutput = false;

        cmdExecuted = true;
    }

    function showExpHistory() {
        for (let expression = 0; expression < exp.length; expression++) {
            console.log("Expression: " + expression)
            for (let i = 0; i < exp[expression].expHistory.length; i++) {
                console.log(exp[expression].expHistory[i])
                console.log(exp[expression].expCalcHistory[i]);
                console.log()
            }
        }
        cmdExecuted = true;
    }

    compactLayout();
}