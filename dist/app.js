const products=[
  {id:1,name:'Apto Cobertura Duplex',desc:'3 quartos, 2 suítes, piscina e churrasqueira',price:3500,category:'duplex',icon:'🏠',badge:'-15%'},
  {id:2,name:'Studio Executivo',desc:'1 quarto, hall, garagem coberta',price:1800,category:'studio',icon:'🏢',badge:'NOVO'},
  {id:3,name:'Apto Frente Mar',desc:'2 quartos, varanda gourmet, vista parcial',price:2800,category:'duplex',icon:'🌊',badge:'DESTAQUE'},
  {id:4,name:'Studio Compacto',desc:'Kitnet, banheiro, bem localizado',price:1200,category:'studio',icon:'🏘️',badge:null}
];
let cart=[];let currentFilter='all';let query='';
const $=s=>document.querySelector(s);const money=v=>v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
function renderProducts(){const visible=products.filter(p=>(currentFilter==='all'||p.category===currentFilter)&&(`${p.name} ${p.desc}`.toLowerCase().includes(query)));$('#productGrid').innerHTML=visible.map(p=>`<article class="product-card"><div class="product-visual">${p.badge?`<span class="product-badge">${p.badge}</span>`:''}<span class="product-emoji" aria-hidden="true">${p.icon}</span></div><div class="product-body"><h3>${p.name}</h3><p>${p.desc}</p><div class="price-row"><div class="price"><small>a partir de</small><strong>${money(p.price)}</strong><small>por mês</small></div><button class="add-btn" data-id="${p.id}" aria-label="Agendar visita em ${p.name}">+</button></div></div></article>`).join('');$('#emptyState').hidden=visible.length>0;document.querySelectorAll('.add-btn').forEach(b=>b.addEventListener('click',()=>addToCart(Number(b.dataset.id))))}
function addToCart(id){cart.push(products.find(p=>p.id===id));renderCart();showToast('Visita agendada com sucesso')}
function renderCart(){$('#cartCount').textContent=cart.length;$('#cartItems').innerHTML=cart.map((p,i)=>`<div class="cart-item"><div class="cart-item-icon">${p.icon}</div><div><strong>${p.name}</strong><small>${money(p.price)}/mês</small></div><button class="remove-btn" data-index="${i}" aria-label="Remover ${p.name}">×</button></div>`).join('');$('#cartEmpty').hidden=cart.length>0;$('#cartFooter').hidden=cart.length===0;$('#cartTotal').textContent=money(cart.reduce((s,p)=>s+p.price,0));document.querySelectorAll('.remove-btn').forEach(b=>b.addEventListener('click',()=>{cart.splice(Number(b.dataset.index),1);renderCart()}))}
function openCart(){$('#cartDrawer').classList.add('open');$('#overlay').classList.add('open');$('#cartDrawer').setAttribute('aria-hidden','false');$('#cartClose').focus()}
function closeCart(){ $('#cartDrawer').classList.remove('open');$('#overlay').classList.remove('open');$('#cartDrawer').setAttribute('aria-hidden','true')}
function showToast(text){const t=$('#toast');t.textContent=text;t.classList.add('show');clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>t.classList.remove('show'),2200)}
$('#cartOpen').addEventListener('click',openCart);$('#cartClose').addEventListener('click',closeCart);$('#overlay').addEventListener('click',closeCart);
$('#searchToggle').addEventListener('click',()=>{const bar=$('#searchBar');bar.classList.toggle('open');$('#searchToggle').setAttribute('aria-expanded',bar.classList.contains('open'));if(bar.classList.contains('open'))$('#searchInput').focus()});
$('#searchInput').addEventListener('input',e=>{query=e.target.value.trim().toLowerCase();renderProducts()});
document.querySelectorAll('.filter').forEach(b=>b.addEventListener('click',()=>{document.querySelector('.filter.active').classList.remove('active');b.classList.add('active');currentFilter=b.dataset.filter;renderProducts()}));
$('#checkoutBtn').addEventListener('click',()=>{closeCart();$('#checkoutDialog').showModal()});$('#dialogClose').addEventListener('click',()=>$('#checkoutDialog').close());$('#finishBtn').addEventListener('click',()=>{cart=[];renderCart();$('#checkoutDialog').close();showToast('Agendamentos concluídos com sucesso')});
$('#newsletterForm').addEventListener('submit',e=>{e.preventDefault();e.target.reset();showToast('Você se inscreveu na nossa newsletter!')});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeCart()});renderProducts();renderCart();
