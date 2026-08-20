const CONFIG={whatsappNumber:'919620993137',instagram:'https://instagram.com/gunishjewels'};
const products=[
{id:'E001',name:'Elegant Gold Earrings',category:'Earrings',price:199,image:'images/products/earring1.jpg',description:'Elegant lightweight anti-tarnish earrings designed for everyday wear and special occasions.',badge:'BESTSELLER'},
{id:'E002',name:'Pearl Drop Earrings',category:'Earrings',price:179,image:'images/products/earring2.jpg',description:'A timeless pearl-inspired design that adds a soft, elegant finish to any outfit.',badge:'NEW'},
{id:'R001',name:'Minimal Gold Ring',category:'Rings',price:149,image:'images/products/ring1.jpg',description:'A clean minimal ring that works beautifully with everyday outfits.',badge:''},
{id:'R002',name:'Statement Ring',category:'Rings',price:199,image:'images/products/ring2.jpg',description:'A bold statement piece designed to stand out at parties and special occasions.',badge:'POPULAR'},
{id:'N001',name:'Classic Necklace',category:'Necklaces',price:199,image:'images/products/necklace1.jpg',description:'An elegant necklace that pairs effortlessly with ethnic and western looks.',badge:'NEW'},
{id:'N002',name:'Layered Necklace',category:'Necklaces',price:199,image:'images/products/necklace2.jpg',description:'A modern layered look for customers who love a little extra sparkle.',badge:''},
{id:'B001',name:'Elegant Bracelet',category:'Bracelets',price:189,image:'images/products/bracelet1.jpg',description:'A delicate anti-tarnish bracelet with a premium finish.',badge:'BESTSELLER'},
{id:'B002',name:'Classic Charm Bracelet',category:'Bracelets',price:179,image:'images/products/bracelet2.jpg',description:'A versatile bracelet designed to complement everyday styling.',badge:''}
];
let filter='All',search='',selected=null,qty=1;
const money=n=>'₹'+Number(n).toLocaleString('en-IN');
const wa=(p,q=1)=>`https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(`Hi GunIsh Jewels 👋\n\nI am interested in:\nProduct: ${p.name}\nProduct ID: ${p.id}\nCategory: ${p.category}\nPrice: ${money(p.price)}\nQuantity: ${q}\n\nPlease confirm availability and ordering details.`)}`;
function render(){const list=products.filter(p=>(filter==='All'||p.category===filter)&&`${p.name} ${p.category}`.toLowerCase().includes(search.toLowerCase()));grid.innerHTML=list.map(p=>`<article class="card"><button class="pic" data-id="${p.id}" style="border:0;width:100%;cursor:pointer">${p.badge?`<span class="badge">${p.badge}</span>`:''}<img src="${p.image}" alt="${p.name}" loading="lazy"></button><div class="info"><div class="cat">${p.category}</div><h3 class="name">${p.name}</h3><div class="price">${money(p.price)}</div><div class="actions"><button data-id="${p.id}">VIEW DETAILS</button><a class="wa" href="${wa(p)}" target="_blank">WHATSAPP</a></div></div></article>`).join('');empty.classList.toggle('hidden',!list.length)}
function open(p){selected=p;qty=1;mImg.src=p.image;mImg.alt=p.name;mCat.textContent=p.category;mName.textContent=p.name;mPrice.textContent=money(p.price);mDesc.textContent=p.description;q.textContent=qty;update();modal.classList.remove('hidden');document.body.style.overflow='hidden'}
function update(){mWA.href=wa(selected,qty)}
function close(){modal.classList.add('hidden');document.body.style.overflow=''}
grid.addEventListener('click',e=>{let b=e.target.closest('[data-id]');if(b&&!e.target.closest('.wa')){let p=products.find(x=>x.id===b.dataset.id);if(p)open(p)}});
filters.addEventListener('click',e=>{let b=e.target.closest('[data-filter]');if(!b)return;filter=b.dataset.filter;document.querySelectorAll('#filters button').forEach(x=>x.classList.remove('active'));b.classList.add('active');render()});
search.addEventListener('input',e=>{search=e.target.value;render()});
closeBtn=close;
close.addEventListener?.('click',close);
window.addEventListener('click',e=>{if(e.target===modal)close()});
document.getElementById('close').onclick=close;document.getElementById('minus').onclick=()=>{qty=Math.max(1,qty-1);q.textContent=qty;update()};document.getElementById('plus').onclick=()=>{qty++;q.textContent=qty;update()};
document.querySelectorAll('.collections button').forEach(b=>b.onclick=()=>{filter=b.dataset.cat;document.querySelectorAll('#filters button').forEach(x=>x.classList.toggle('active',x.dataset.filter===filter));render();document.getElementById('products').scrollIntoView({behavior:'smooth'})});
document.getElementById('menu').onclick=()=>document.getElementById('mobileNav').classList.toggle('open');
const generic=`https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent('Hi GunIsh Jewels 👋 I would like to know more about your jewellery collection.')}`;document.getElementById('floatWA').href=generic;document.getElementById('footerWA').href=generic;document.getElementById('year').textContent=new Date().getFullYear();render();
