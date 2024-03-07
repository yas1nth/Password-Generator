const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyBtnMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const nummbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

let password = "";
let passwordLength = 10;
let checkCount = 0;
handleSlider();

function handleSlider(){
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
}

function sufflePassword(array){
    for (let i = array.length - 1; i > 0; i--) {
        // find out random j
        const j = Math.floor(Math.random() * (i + 1));
        // swap 2 numbers
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      let str = "";
      // array.forEach((el) => (str += el));
      str = array.join("");
      return str;
}

function setColor(color){
     indicator.style.backgroundColor = color;
}

function getRndInteger(min,max){
    return Math.floor(Math.random() * (max-min))+min;
}

function getRandomNumber(){
    return getRndInteger(0,9);
}

function generateLowerCase(){
    return String.fromCharCode(getRndInteger(97,123));
}

function generateUpperCase(){
    return String.fromCharCode(getRndInteger(65,91));
}

function generateSymbol(){
    const index = getRandomNumber(0,symbols.length);
    return symbols.charAt(index);
}

// calculate password strength
// set Indicator
function setIndicator(color){
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

setIndicator("#ccc");

function calcStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNumber = false;
    let hasSymbol = false;

    if(uppercaseCb.checked) hasUpper = true;
    if(lowercaseCb.checked) hasLower = true;
    if(numberCb.checked) hasNumber = true;
    if(symbolCb.checked) hasSymbol = true;

    if(hasUpper && hasLower && (hasNumber || hasSymbol) && passwordLength >= 8){
        setIndicator("#0f0");
    }
    else if((hasUpper || hasLower) && (hasNumber || hasSymbol) && passwordLength >= 6){
        setIndicator("#ff0");
    }
    else{
        setIndicator("#f00");
    }
}

async function copyContent(){
    try {
         await navigator.clipboard.writeText(passwordDisplay.value);
         copyBtnMsg.innerText = "Copied";
    } catch (error) {
        copyBtnMsg.innerText = "Failed";
    }
    copyBtnMsg.classList.add("active");
    setTimeout(()=>{
        copyBtnMsg.classList.remove("active");
    },2000);
}

inputSlider.addEventListener('input',(e) =>{
   passwordLength =  e.target.value;
   handleSlider();
});

copyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value){
        copyContent();
    }
})

function handleCheckBoxChange(){
    checkCount = 0;
    allCheckBox.forEach((checkBox)=>{
        if(checkBox.checked){
            checkCount++;
        }
    })

    if(passwordLength<checkCount){
        passwordLength = checkCount;
        handleSlider();
    }
}

allCheckBox.forEach((checkBox)=>{
    checkBox.addEventListener('change',handleCheckBoxChange);
})

generateBtn.addEventListener('click',()=>{

    if(checkCount <= 0)
        return;

    if(passwordLength<checkCount){
        passwordLength = checkCount;
        handleSlider();
    }


    if (password.length) password = "";
    
    let funcArr = [];

    if(uppercaseCheck.checked)
        funcArr.push(generateUpperCase);
    
    if(lowercaseCheck.checked)
        funcArr.push(generateLowerCase);
    
    if(nummbersCheck.checked)
        funcArr.push(getRandomNumber);
    
    if(symbolsCheck.checked)
        funcArr.push(generateSymbol);    

    for(let i=0;i<funcArr.length;i++)
    {
        password+= funcArr[i]();
    }  
    
    for(let i=0;i<(passwordLength-funcArr.length);i++)
    {
        let randIndex = getRndInteger(0,funcArr.length);
        password+=funcArr[randIndex]();
    }  

    //Shuffling the Passowrd
    password = sufflePassword(Array.from(password));

    passwordDisplay.value = password;
    calcStrength();
}
)
