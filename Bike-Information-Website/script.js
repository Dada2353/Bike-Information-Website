const bikes=[
{id:1,name:"Royal Enfield Classic 350",brand:"Royal Enfield",category:"street",type:"Retro roadster",price:"₹1.93–2.25 lakh",engine:"349 cc",power:"20.2 bhp",mileage:"Approx. 35 km/l",weight:"195 kg",desc:"A relaxed retro-style motorcycle for everyday rides and weekend cruising."},
{id:2,name:"KTM Duke 390",brand:"KTM",category:"street",type:"Street naked",price:"₹3.00–3.40 lakh",engine:"399 cc",power:"Approx. 45 bhp",mileage:"Approx. 28 km/l",weight:"168 kg",desc:"A sporty naked motorcycle with an energetic engine and agile handling."},
{id:3,name:"Yamaha R15",brand:"Yamaha",category:"sport",type:"Sport",price:"₹1.70–1.90 lakh",engine:"155 cc",power:"18.4 bhp",mileage:"Approx. 45 km/l",weight:"141 kg",desc:"A lightweight sport-styled motorcycle with a focused riding position."},
{id:4,name:"Kawasaki Ninja 650",brand:"Kawasaki",category:"sport",type:"Sport tourer",price:"₹7.00–7.50 lakh",engine:"649 cc",power:"Approx. 68 PS",mileage:"Approx. 21 km/l",weight:"196 kg",desc:"A middleweight motorcycle combining sporty performance and touring comfort."},
{id:5,name:"BMW G 310 GS",brand:"BMW",category:"adventure",type:"Adventure",price:"₹3.00–3.50 lakh",engine:"313 cc",power:"34 PS",mileage:"Approx. 29 km/l",weight:"175 kg",desc:"An approachable adventure-style motorcycle for city roads and light touring."},
{id:6,name:"Hero Xpulse 200 4V",brand:"Hero",category:"adventure",type:"Adventure",price:"₹1.50–1.70 lakh",engine:"199.6 cc",power:"19.1 PS",mileage:"Approx. 36 km/l",weight:"159 kg",desc:"A lightweight adventure motorcycle for exploring beyond paved roads."}
];
const grid=document.getElementById("bikeGrid"),dialog=document.getElementById("details");
function renderBikes(filter="all"){
 grid.innerHTML="";
 bikes.filter(b=>filter==="all"||b.category===filter).forEach(b=>{
  const card=document.createElement("article");card.className="bike-card";
  card.innerHTML=`<div class="bike-art"><span class="tag">${b.category}</span><span class="bike-emoji">🏍️</span></div><div class="bike-info"><h3>${b.name}</h3><p>${b.type} · ${b.brand}</p><div class="meta"><span>${b.engine}</span><span>${b.power}</span></div><p class="price">${b.price}</p><div class="actions"><button class="small-btn" data-details="${b.id}">View details</button><button class="small-btn" data-compare="${b.id}">Compare</button></div></div>`;
  grid.appendChild(card);
 });
}
function details(id){
 const b=bikes.find(x=>x.id===Number(id));
 document.getElementById("detailsContent").innerHTML=`<p class="eyebrow">${b.category.toUpperCase()} MOTORCYCLE</p><h2>${b.name}</h2><p class="detail-copy">${b.desc}</p><div class="detail-copy"><p><b>Engine:</b> ${b.engine}</p><p><b>Power:</b> ${b.power}</p><p><b>Estimated mileage:</b> ${b.mileage}</p><p><b>Weight:</b> ${b.weight}</p><p><b>Indicative price:</b> ${b.price}</p></div><p class="note">Demo information. Verify specifications and prices with the manufacturer or dealer.</p>`;
 dialog.showModal();
}
function setupCompare(){
 ["bikeOne","bikeTwo"].forEach(id=>{document.getElementById(id).innerHTML=bikes.map(b=>`<option value="${b.id}">${b.name}</option>`).join("");});
 document.getElementById("bikeOne").value="1";document.getElementById("bikeTwo").value="2";
 document.getElementById("bikeOne").addEventListener("change",compare);document.getElementById("bikeTwo").addEventListener("change",compare);compare();
}
function compare(){
 const a=bikes.find(b=>b.id===+document.getElementById("bikeOne").value),b=bikes.find(b=>b.id===+document.getElementById("bikeTwo").value);
 const rows=[["Specification",a.name,b.name],["Category",a.category,b.category],["Engine",a.engine,b.engine],["Power",a.power,b.power],["Mileage",a.mileage,b.mileage],["Weight",a.weight,b.weight],["Indicative price",a.price,b.price]];
 document.getElementById("compareTable").innerHTML=rows.map(r=>`<tr>${r.map(v=>`<td>${v}</td>`).join("")}</tr>`).join("");
}
document.getElementById("filters").addEventListener("click",e=>{const btn=e.target.closest("[data-filter]");if(!btn)return;document.querySelectorAll(".filters button").forEach(x=>x.classList.remove("active"));btn.classList.add("active");renderBikes(btn.dataset.filter);});
grid.addEventListener("click",e=>{const d=e.target.closest("[data-details]"),c=e.target.closest("[data-compare]");if(d)details(d.dataset.details);if(c){document.getElementById("bikeOne").value=c.dataset.compare;compare();document.getElementById("compare").scrollIntoView({behavior:"smooth"});}});
document.getElementById("closeDialog").addEventListener("click",()=>dialog.close());
dialog.addEventListener("click",e=>{if(e.target===dialog)dialog.close();});
document.getElementById("contactForm").addEventListener("submit",e=>{e.preventDefault();const name=document.getElementById("name").value.trim();document.getElementById("formMessage").textContent=`Thanks, ${name}! This demo form has not sent an email.`;e.target.reset();});
document.getElementById("menuBtn").addEventListener("click",()=>document.getElementById("nav").classList.toggle("open"));
document.querySelectorAll("#nav a").forEach(a=>a.addEventListener("click",()=>document.getElementById("nav").classList.remove("open")));
renderBikes();setupCompare();
