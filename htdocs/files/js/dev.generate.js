document.addEventListener("DOMContentLoaded",function () {
    let gen = new Generate();
    gen.getElements();
    gen.setValues();
    gen.setCheckboxEvent(function () {
        gen.getValues();
        gen.generate();
    });
});

let Generate = function (event) {

    /**
     * @type {{}}
     */
    this.passwords = {};

    /**
     * @type {{LOW_LETTERS: {value: string, allow: boolean}, UPPER_LETTERS: {value: string, allow: boolean}, NUMBERS: {value: string, allow: boolean, easy: boolean}, SPECIAL_CHARACTER: {value: string, easy: boolean}, PASSWORD_LENGTH: {value: number}, NUMBERS_PASSWORD: {value: number}}}
     */
    this.elementGroups = {
        LOW_LETTERS       : {value:"abcdefghijklmnopqrstuvwxyz",allow:true},
        UPPER_LETTERS     : {value:"ABCDEFGHIJKLMNOPQRSTUVWXYZ",allow:true},
        NUMBERS           : {value:"1234567890",allow:true,easy:true},
        SPECIAL_CHARACTER : {value:"!?@(){}[]=$%&#*-+.,_",easy:true},
        PASSWORD_LENGTH   : {value:10},
        NUMBERS_PASSWORD  : {value:10}
    };
};

Generate.prototype = {

    generate : function () {
        let password = "";
        for (let i=0; i<this.elementGroups.NUMBERS_PASSWORD.value;i++){
            for (let elements in this.elementGroups){
                if(this.elementGroups[elements].checkbox && this.elementGroups[elements].checkbox.checked && this.elementGroups[elements].value){
                    password = this.generatePasswordString(password,this.elementGroups.PASSWORD_LENGTH.value,this.elementGroups[elements].value,this.elementGroups[elements].easy);
                }
            }
            this.pushPassword(password);
        }
    },

    /**
     * @param password
     * @returns {boolean}
     */
    pushPassword : function (password = "") {
        if(password && typeof password === "string"){
            this.passwords.push(password);
            return true;
        }
        return false;
    },

    /**
     * @param password
     * @param length
     * @param salt
     * @param easy
     * @returns {string}
     */
    generatePasswordString : function (password = "",length = 10,salt="",easy=false) {

        return password;
    },

    /**
     * @returns {boolean}
     */
    getElements : function () {
        for (let elements in this.elementGroups){
            let InputE = this.getElement("#"+'INPUT_'+elements,document);
            if(InputE){
                this.elementGroups[elements].input = InputE;
            }

            let CheckboxE = this.getElement("#"+'ALLOW_'+elements,document);
            if(CheckboxE){
                this.elementGroups[elements].checkbox = CheckboxE;
            }
        }
        return true;
    },

    getValues : function () {
        for (let elements in this.elementGroups){
            if(this.elementGroups[elements].input){
                this.elementGroups[elements].value = this.elementGroups[elements].input.value;
            }

            if(this.elementGroups[elements].checkbox && this.elementGroups[elements].allow !== undefined){
                this.elementGroups[elements].allow = this.elementGroups[elements].checkbox.checked;
            }
        }
    },


    /**
     * @returns {boolean}
     */
    setValues : function () {
        for (let elements in this.elementGroups){
            if(this.elementGroups[elements].input){
                this.elementGroups[elements].input.value = this.elementGroups[elements].value;
            }

            if(this.elementGroups[elements].checkbox && this.elementGroups[elements].allow !== undefined){
                this.elementGroups[elements].checkbox.checked = this.elementGroups[elements].allow;
            }
        }
        return true;
    },

    /**
     * @param callback
     */
    setCheckboxEvent : function (callback = function(){}) {
        for (let elements in this.elementGroups){
            if(this.elementGroups[elements].checkbox && typeof callback === "function"){
                this.elementGroups[elements].checkbox.addEventListener("change",callback);
            }
        }
    },

    /**
     * @param selector
     * @param parent {*}
     * @returns {*}
     */
    getElement : function (selector,parent = document) {
        if(typeof parent === "string"){
            parent = document.querySelector(parent);
        }
        if(parent){
            let elementE = parent.querySelector(selector);
            if(!elementE){
                return false;
            }
            return elementE;
        }
    },

    /**
     * @param elementE
     * @returns {HTMLElement | null}
     */
    getParent : function (elementE) {
        if(!elementE){
            console.error("NOT AN ELEMENT",elementE);
            throw new Error();
        }
        return elementE.parentElement;
    }
};