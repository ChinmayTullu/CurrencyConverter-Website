let base_url="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/inr.json";

let dropdowns=document.querySelectorAll(".dropdown select");
let rateBtn=document.querySelector("#exchange-rate-btn");
let fromCurrency=document.querySelector("#select-from");
let toCurrency=document.querySelector("#select-to");
let msg=document.querySelector(".msg");

// for(let code in countryList) {
//     console.log(code, countryList[code]);
// }

window.addEventListener("load", () => {
    updateExchangeRate();
})

let i=0;
for(let select of dropdowns) {
    for(let currencyCode in countryList) {
        let newOption=document.createElement("option");
        newOption.innerText=currencyCode;
        newOption.value=currencyCode;

        if(select.name==="from" && currencyCode==="USD")
            newOption.selected="selected";
        if(select.name==="to" && currencyCode==="INR")
            newOption.selected="selected";

        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

let updateFlag=(element) => {
    let currencyCode=element.value;
    let countryCode=countryList[currencyCode]; 
    let newSrc=`https://flagsapi.com/${countryCode}/shiny/64.png`;
    let image=element.parentElement.querySelector("img");
    image.src=newSrc;
}

rateBtn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

let updateExchangeRate= async () => {
    let amt=document.querySelector("#amount-input");
    let amtValue=amt.value;

    if(amtValue==="" || Number.parseFloat(amtValue)<=0)
        amt.value="1";
    
    let url=`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${fromCurrency.value.toLowerCase()}/${toCurrency.value.toLowerCase()}.json`;

    let response=await fetch(url);    
    let data=await response.json();
    let rate=data[toCurrency.value.toLowerCase()];
    let finalAmount=Number.parseFloat(amtValue)*rate;

    msg.innerText=`${amtValue}\t${fromCurrency.value} = ${finalAmount}\t${toCurrency.value}`;
}
