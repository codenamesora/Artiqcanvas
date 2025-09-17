// main.js - ArtiqCanvas (vanilla JS + GSAP)
document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.slide');
  let cur = 0;
  function showSlide(i){
    slides.forEach((s,idx)=> s.style.opacity = idx===i? '1':'0.35');
    slides.forEach((s,idx)=> s.style.transform = idx===i? 'scale(1)':'scale(.97)');
  }
  showSlide(cur);
  setInterval(()=>{ cur=(cur+1)%slides.length; showSlide(cur); }, 4200);

  // Cart logic
  const cart = [];
  const cartItemsEl = document.getElementById('cartItems');
  const cartCount = document.getElementById('cartCount');
  const cartTotal = document.getElementById('cartTotal');
  function renderCart(){
    cartItemsEl.innerHTML = '';
    let total = 0;
    cart.forEach((it,idx)=>{
      total += Number(it.price);
      const div = document.createElement('div');
      div.className = 'cart-item';
      div.innerHTML = `<div>${it.title}</div><div>Rp${Number(it.price).toLocaleString()} <button data-idx="${idx}" class="remove">x</button></div>`;
      cartItemsEl.appendChild(div);
    });
    cartCount.textContent = cart.length;
    cartTotal.textContent = 'Rp' + total.toLocaleString();
  }
  document.querySelectorAll('.add-cart').forEach(btn=>{
    btn.addEventListener('click', e=>{
      const title = btn.dataset.title;
      const price = btn.dataset.price;
      cart.push({title,price});
      renderCart();
      // simple GSAP feedback
      if(window.gsap) gsap.fromTo(btn, {scale:1},{scale:1.08,duration:.18,yoyo:true,repeat:1});
      // open cart
      document.getElementById('cartSidebar').classList.add('open');
    });
  });

  document.getElementById('cartToggle').addEventListener('click', ()=> {
    document.getElementById('cartSidebar').classList.toggle('open');
  });
  document.getElementById('closeCart').addEventListener('click', ()=> {
    document.getElementById('cartSidebar').classList.remove('open');
  });

  cartItemsEl.addEventListener('click', (e)=>{
    if(e.target.classList.contains('remove')){
      const idx = Number(e.target.dataset.idx);
      cart.splice(idx,1);
      renderCart();
    }
  });

  // checkout glow animation
  const checkoutBtn = document.getElementById('checkout');
  checkoutBtn.addEventListener('mouseenter', ()=> checkoutBtn.classList.add('glow'));
  checkoutBtn.addEventListener('mouseleave', ()=> checkoutBtn.classList.remove('glow'));
  checkoutBtn.addEventListener('click', ()=> {
    checkoutBtn.textContent = 'Processing...';
    setTimeout(()=> { alert('Checkout simulated. Ganti dengan pembayaran nyata.'); checkoutBtn.textContent = 'Checkout'; }, 900);
  });

  // Music control
  const music = document.getElementById('bgMusic');
  const muteBtn = document.getElementById('muteBtn');
  // start muted by default for autoplay policy
  music.volume = 0.15;
  music.muted = true;
  muteBtn.textContent = 'Unmute';
  muteBtn.addEventListener('click', ()=> {
    music.muted = !music.muted;
    if(!music.muted){
      music.play().catch(()=>{});
      muteBtn.textContent = 'Mute';
    } else {
      muteBtn.textContent = 'Unmute';
    }
  });

  // small entrance animations with GSAP if available
  if(window.gsap){
    gsap.from('.site-header',{y:-30,opacity:0,duration:.8});
    gsap.from('.slide',{y:20,opacity:0,duration:.8,stagger:.12});
    gsap.to('.leaf-1',{y:-8,repeat:-1,yoyo:true,duration:3,ease:'sine.inOut'});
    gsap.to('.leaf-2',{y:10,repeat:-1,yoyo:true,duration:4,ease:'sine.inOut'});
  }

  // mobile menu
  const menuBtn = document.getElementById('menuBtn');
  const menu = document.getElementById('menu');
  menuBtn && menuBtn.addEventListener('click', ()=> menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex');

});
