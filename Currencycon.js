const BASE_URL="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropdown=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const ToCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");
for(let select of dropdown)
{
    for(let code in countryList)
    {
        let newOption=document.createElement("option");
        newOption.innerText=code;
        newOption.value=code;
        if(select.name==="from" && code==="USD")
        newOption.selected="selected";
         else if(select.name==="to" && code==="INR")
         newOption.selected="selected";
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
}
const updateFlag=(element)=>{
   let currCode=element.value;
   let countryCode=countryList[currCode]; 
   let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
   let img=element.parentElement.querySelector("img");
   img.src=newSrc;
}
const UpdateExchange=async()=>{
    let amount=document.querySelector(".amount input");
    let amtVal=amount.value;
    if(amtVal==="" || amtVal<1)
    {
        amtVal=1;
    amount.value=1;
    }
    const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}/${ToCurr.value.toLowerCase()}.json`;
    let response=await fetch(URL);
    let data=await response.json();
    let rate=data[ToCurr.value.toLowerCase()];
    let finalAmount=amtVal*rate;
    msg.innerText=`${amtVal} ${fromCurr.value}=${finalAmount}${ToCurr.value}`
}
btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    UpdateExchange();
})
window.addEventListener("load",()=>{
    updateFlag();
})