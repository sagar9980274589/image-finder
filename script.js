const acesskey="hMaWSIRm8vIr9ruzSOjA1MRAd4LQvz8p9Ak6Iw-3oww";
const sccrtkey="o5XH8e9QdJR86Ek6KeT1CEozHLkqOMZ7XzOoBxKsNfs";
const imgs=document.querySelector(".resimg");
const resultsdiv=document.querySelector(".results");
const submit=document.querySelector(".submit");
const search=document.querySelector(".search");
const seemore=document.querySelector(".seemore");
const fimg=document.querySelector(".fimg");
const fscreen=document.querySelector(".fscreen");
function getScrollTop() { 
    return window.pageYOffset ||  //most browsers 
         (document.documentElement && 
            document.documentElement.scrollTop) || // 
         document.body.scrollTop; 
  } 
let query;
let pgno=1;
submit.addEventListener('click',()=>{
    pgno=1;
query=`${search.value}`;
getimgs();
seemore.style="display:block";
})
seemore.addEventListener('click',()=>{
    ++pgno;
    getimgs();
});
search.addEventListener('change',()=>{
    
    resultsdiv.innerHTML="";
    if(search.value.trim()=="")
    {
        seemore.style="display:none";
    }
});
async function getimgs()
{   if(pgno==1)
{
    resultsdiv.innerHTML="";

}
    let result= await fetch(`https://api.unsplash.com/search/photos?page=${pgno}&query=${query}&client_id=${acesskey}`);
    let data=await result.json();
 let data1=data.results;
 
    data1.forEach((element,index) => {
       
        const imgss= document.createElement('img');
        imgss.src=`${data.results[index].urls.small}`
        imgss.classList.add("imgc");
        imgss.setAttribute("id",Math.random()*100);
         resultsdiv.appendChild(imgss);

    });
    resultsdiv.addEventListener('click',(e)=>{
        e.preventDefault();
       fimg.src=e.target.src;
       fscreen.style="visibility:visible";
       document.querySelector('body').classList.add('stop-scrolling');
       let res=getScrollTop();

       fscreen.style.top=`${res}px`;
      
           });

window.onclick=(e)=>{
   if(e.target==fscreen)
    {
        document.querySelector('body').classList.remove('stop-scrolling');
        fscreen.style="visibility:none";}
};


}
