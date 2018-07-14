/**
 * @param elementGroups
 * @constructor
 */
let Generate = function (elementGroups = null)
{
    /**
     * @type {Array}
     */
    this.passwords = [];

    /**
     * @type {number}
     */
    this.chance = 5;

    if(!elementGroups || typeof elementGroups !== "object"){
        this.elementGroups = {
            LOW_LETTERS       : {value:"abcdefghijklmnopqrstuvwxyz",allow:true},
            UPPER_LETTERS     : {value:"ABCDEFGHIJKLMNOPQRSTUVWXYZ",allow:true},
            NUMBERS           : {value:"1234567890",allow:true,easy:true},
            SPECIAL_CHARACTER : {value:"!?@(){}[]=$%&#*-+.,_",easy:true},
            PASSWORD_LENGTH   : {value:10},
            NUMBERS_PASSWORD  : {value:10}};
    }
    else {
        this.elementGroups = elementGroups;
    }

    this.getElements();
    this.setValues();
};

Generate.prototype = {

    /**
     * @returns {*}
     */
    generate : function () {
        for (let i=0; i<this.elementGroups.NUMBERS_PASSWORD.value;i++){
            let password = "";
            for (let elements in this.elementGroups){

                if(!this.elementGroups.hasOwnProperty(elements)){
                    return false;
                }

                if(this.elementGroups[elements].checkbox && this.elementGroups[elements].checkbox.checked && this.elementGroups[elements].value){
                    password = this.generatePasswordString(password,this.elementGroups.PASSWORD_LENGTH.value,this.elementGroups[elements].value,this.elementGroups[elements].easy);
                }
            }
            this.pushPassword(password);
        }
        return true;
    },

    /**
     *
     */
    clearPasswords : function () {
        this.passwords = [];
    },

    /**
     * @param password
     * @returns {boolean}
     */
    pushPassword : function (password = "") {
        if(password && typeof password === "string"){
            this.passwords.push({password:password,checked:false});
            return true;
        }
        return false;
    },

    /**
     * @param password
     * @param length
     * @param salt
     * @param easy
     * @returns {*}
     */
    generatePasswordString : function (password = "",length = 10,salt="",easy=false) {
        if(length < 1){
            return false;
        }
        if(salt){
            for(let i=0;i<length;i++){
                if(password.length < length){
                    password += salt[this.getRandomBetween(0,salt.length)];
                }
                else {
                    let min = 0,
                        max = length-1;
                    if(easy){
                        min++;
                        max--;
                    }
                    if(this.getRandomBetween(0,100)<this.chance){
                        password = this.replaceStringAt(password,this.getRandomBetween(min,max),salt[this.getRandomBetween(0,salt.length)]);
                    }
                }
            }
            if(!password.match(new RegExp("["+salt.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1")+"]","g"))){
                password = this.generatePasswordString(password,length,salt,easy);
            }
        }
        return password;
    },

    /**
     * @param string
     * @param index
     * @param replace
     * @returns {string}
     */
    replaceStringAt : function replaceAt(string="", index=0, replace="") {
        return string.substring(0, index) + replace + string.substring(index + 1);
    },

    /**
     * @param intO
     * @param intT
     * @returns {number}
     */
    getRandomBetween : function (intO=0,intT=10) {
        return Math.floor(Math.random() * intT) + intO;
    },


    /**
     * @returns {boolean}
     */
    getElements : function () {
        for (let elements in this.elementGroups){

            if(!this.elementGroups.hasOwnProperty(elements)){
                return false;
            }

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

    /**
     *
     */
    getValues : function () {
        for (let elements in this.elementGroups){

            if(!this.elementGroups.hasOwnProperty(elements)){
                return false;
            }

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

            if(!this.elementGroups.hasOwnProperty(elements)){
                return false;
            }

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

            if(!this.elementGroups.hasOwnProperty(elements)){
                return false;
            }

            if(this.elementGroups[elements].checkbox && typeof callback === "function"){
                this.elementGroups[elements].checkbox.addEventListener("change",callback);
            }
        }
    },

    /**
     * @param callback
     */
    setInputEvent : function (callback = function(){}) {
        for (let elements in this.elementGroups){

            if(!this.elementGroups.hasOwnProperty(elements)){
                return false;
            }

            if(this.elementGroups[elements].input && typeof callback === "function"){
                this.elementGroups[elements].input.addEventListener("change",callback);
            }
        }
    },

    /**
     * @param element
     */
    setOutputElement : function (element) {
        this.outputElement = element;
    },

    /**
     * @param element
     */
    setInfoElement : function (element) {
        this.infoElement = element;
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
    }
};