/*Values*/
var outputHtml = "",
    inputPasswordNumbers = "4",
    inputLowercaseLetters = true,
    inputUppercaseLetters = true,
    inputNumbersLetters = true,
    inputSpecialCharacter = false,
    inputAllowSpecialCharacter = "!?@(){}[]\/=~$%&#*-+.,_",
    inputPasswordLength = "10",

/*Elements*/
    inputElementPasswordNumbers,
    inputElementLowercaseLetters,
    inputElementUppercaseLetters,
    inputElementNumberLetters,
    inputElementSpecialCharacter,
    inputElementAllowSpecialCharacter,
    inputElementPasswordLength,

    optionElementCreatePassword,
    outputTextMSG,
    boxElement,
    inputElementOpenInfoBox,
    elementInfoBox;

document.addEventListener("DOMContentLoaded", function () {
    getElements();
    checkModified();
    addModifiedInput();
}, false);


function getElements() {
    inputElementPasswordNumbers=document.getElementById("INPUT_PASSWORD_NUMBERS");
    inputElementLowercaseLetters=document.getElementById("INPUT_LOWERCASE_LETTERS");
    inputElementUppercaseLetters=document.getElementById("INPUT_UPPERCASE_LETTERS");
    inputElementNumberLetters=document.getElementById("INPUT_NUMBERS_LETTER");
    inputElementSpecialCharacter=document.getElementById("INPUT_SPECIAL_CHARACTER");
    inputElementAllowSpecialCharacter=document.getElementById("INPUT_ALLOW_SPECIAL_CHARACTER");
    inputElementPasswordLength=document.getElementById("INPUT_PASSWORD_LENGTH");

    optionElementCreatePassword=document.getElementById("CREATE_OPTION");
    outputTextMSG=document.getElementById("OUTPUT_MSG");
    boxElement=document.getElementById("BOX");
    inputElementOpenInfoBox = document.getElementById("OPEN_INFO");
    elementInfoBox=document.getElementById("INFO_BOX");
}

function checkModified() {
    var inputElements = document.getElementsByTagName("input");
    for (var i=0;i<inputElements.length;i++){
        inputElements[i].addEventListener("change",addModifiedInput);
    }

    var selectElements = document.getElementsByTagName("select");
    for (var j=0;j<selectElements.length;j++){
        selectElements[j].addEventListener("change",addModifiedInput);
    }

    var closeInfoBoxElements = document.getElementsByClassName("infoBoxClose");
    for (var k=0;k<closeInfoBoxElements.length;k++){
        closeInfoBoxElements[k].addEventListener("click",closeInfoBox);
    }
    optionElementCreatePassword.addEventListener("click",recreatePasswords);
    inputElementOpenInfoBox.addEventListener("click",openCloseInfoBox);
}

function addModifiedInput(){
    switch(this.name){
        case "inputPasswordNumbers":
            inputPasswordNumbers = this.value;
            break;
        case "inputLowercaseLetters":
            inputLowercaseLetters = this.checked;
            break;
        case "inputUppercaseLetters":
            inputUppercaseLetters = this.checked;
            break;
        case "inputNumbersLetters":
            inputNumbersLetters = this.checked;
            break;
        case "inputSpecialCharacter":
            inputSpecialCharacter = this.checked;
            break;
        case "inputAllowSpecialCharacter":
            inputAllowSpecialCharacter = this.value;
            break;
        case "inputPasswordLength":
            inputPasswordLength = this.value;
            break;

    }
    recreatePasswords();
}

function recreatePasswords() {
    updateInput();
    upadteOutputText();
}

function updateInput() {
    inputElementPasswordNumbers.value = inputPasswordNumbers;
    inputElementLowercaseLetters.checked = inputLowercaseLetters;
    inputElementUppercaseLetters.checked = inputUppercaseLetters;
    inputElementNumberLetters.checked = inputNumbersLetters;
    inputElementSpecialCharacter.checked = inputSpecialCharacter;
    inputElementAllowSpecialCharacter.value = inputAllowSpecialCharacter;
    inputElementPasswordLength.value = inputPasswordLength;
}

function upadteOutputText() {
    for (var i=0;i<inputPasswordNumbers;i++){
        var password = createPassword();
        var id= i+1;
        outputHtml +='<div class="fielset">'+'<div class="id white">'+id+'</div>';
        outputHtml +='<input type="checkbox" id="'+password+'" name="used" class="used" value="'+password+'" onclick="copyToClipboard(this)" onclick="return false;">';
        outputHtml +='<label for="'+password+'">'+password+'</label></div>';
    }
    boxElement.innerHTML = outputHtml;
    outputHtml = "";
}

function createPassword() {
    var pwdChars = "";
    var lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
    var uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var numbersLetters = "1234567890";
    if(inputLowercaseLetters){
        pwdChars += lowercaseLetters;
    }
    if(inputUppercaseLetters){
        pwdChars += uppercaseLetters;
    }
    if(inputNumbersLetters){
        pwdChars += numbersLetters;
    }
    if(inputSpecialCharacter){
        pwdChars += inputAllowSpecialCharacter;
    }
    if(pwdChars === ""){
        addRemoveClass(outputTextMSG,"open",1000);
        outputTextMSG.innerText = "Use lowercase letters as default...";
        pwdChars = lowercaseLetters;
    }
    var pwd = "";
    var pwdCharsArray = pwdChars.split("");
    for(var i=0;i<parseInt(inputPasswordLength);i++){
        var random = Math.floor(Math.random() * pwdCharsArray.length);
        pwd += pwdCharsArray[random];
    }
    return pwd;
}

function copyToClipboard(element) {
    var checkboxValue = element.value;
    var tmpInputElement = document.createElement("input");
    document.body.appendChild(tmpInputElement);
    tmpInputElement.setAttribute("id","tmpInputElement");
    tmpInputElement.style.textTransform = "none";
    document.getElementById("tmpInputElement").value = checkboxValue;

    tmpInputElement.focus();
    tmpInputElement.select();
    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful: '+checkboxValue : 'unsuccessful';
        var textMSG = 'Copying to clipboard was ' + msg;
        addRemoveClass(outputTextMSG,"open",1000);
        outputTextMSG.innerText = textMSG;
    } catch (err) {
        outputTextMSG.innerText = 'Unable to copy';
    }
    document.body.removeChild(tmpInputElement);
}

function openCloseInfoBox() {
    if(hasClass(elementInfoBox,"open")){
        removeClass(elementInfoBox,"open");
    }
    else {
        addClass(elementInfoBox,"open");
    }
}

function closeInfoBox() {
    if(hasClass(elementInfoBox,"open")){
        removeClass(elementInfoBox,"open");
    }
}

function hasClass(element,className) {
    if (element.classList.contains(className)) {
        return true;
    }
}

function removeClass(element,className) {
    element.className = element.className.replace(className,'');
    element.className = element.className.replace(" "+className,'');
}

function addClass(element,className) {
    removeClass(element,className);
    className = ' '+className;
    element.className = element.className + className;
}

function addRemoveClass(element,className,timeInMs) {
    addClass(element,className);
    setTimeout(function () {
        removeClass(element,className);
    },timeInMs)
}
