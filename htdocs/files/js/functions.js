document.addEventListener("DOMContentLoaded",function () {
    let gen = new Generate();
    genPwd();
    gen.setCheckboxEvent(genPwd);
    gen.setInputEvent(genPwd);
    document.getElementById("CREATE_OPTION").addEventListener("click",genPwd);

    document.getElementById("CREATE_MORE").addEventListener("click",function () {
        gen.getValues();
        gen.generate();
        printPasswords(gen.getElement("#BOX"));
    });

    document.getElementById("OPEN_INFO").addEventListener("click",function () {
        document.getElementById("INFO_BOX").classList.toggle("open")
    });

    document.getElementById("INFO_BOX_CLOSE").addEventListener("click",function () {
        document.getElementById("INFO_BOX").classList.remove("open");
    });

    function genPwd() {
        gen.clearPasswords();
        gen.getValues();
        gen.generate();
        printPasswords(gen.getElement("#BOX"));
    }
    function printPasswords(element) {
        let outputHtml = "";
        element.innerHTML = outputHtml;
        for (let i=0;i<gen.passwords.length;i++){
            let password = gen.passwords[i].password;
            outputHtml +='<div class="fielset">'+'<span class="id white">'+(i+1)+'</span>';
            outputHtml +='<input type="checkbox" id="'+password+'" name="used" class="used" data-elementNr="'+i+'" value="'+password+'" onclick="copyToClipboard(this)">';
            outputHtml +='<label for="'+password+'">'+password+'</label></div>';
        }
        element.innerHTML = outputHtml;
    }
});


/**
 * @param element
 */
function copyToClipboard(element) {
    let tmpInputElement = document.createElement("input");
    tmpInputElement.setAttribute("id","tmpInputElement");
    tmpInputElement.style.textTransform = "none";
    tmpInputElement.value = element.value;
    tmpInputElement = document.body.appendChild(tmpInputElement);
    tmpInputElement.focus();
    tmpInputElement.select();
    let outPutElem = document.getElementById("OUTPUT_MSG");
    try {
        let textMSG = 'Copying to clipboard was ' + ((document.execCommand('copy')) ? 'successful: '+element.value : 'unsuccessful');
        if(outPutElem){
            showInTime(outPutElem,1000);
            outPutElem.innerText = textMSG;
        }
    } catch (err) {
        if(outPutElem){
            showInTime(outPutElem,1000);
            outPutElem.innerText = 'Unable to copy';
        }
    }
    document.body.removeChild(tmpInputElement);
}

function showInTime(element,time) {
    element.classList.add("open");
    setTimeout(function () {
        element.classList.remove("open");
    },time)
}