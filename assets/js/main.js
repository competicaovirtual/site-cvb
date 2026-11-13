/* CVB · Competições Virtuais Brasileiras — script do site
   ---------------------------------------------------------
   PARA EDITAR: tudo que muda com frequência está em CONFIG.
   Fotos/vídeos ficam em assets/media/ com os nomes indicados
   em assets/media/LEIA-ME.txt. Se um arquivo não existir, o
   site mostra um bloco verde no lugar (com o nome esperado).  */

const CONFIG = {
  // Preencha para ativar o envio do formulário direto no WhatsApp / e-mail.
  whatsapp: "",            // ex.: "5561999999999" (só números, com DDI 55)
  email: "",               // ex.: "contato@competicaovirtual.com.br"
  instagram: "https://www.instagram.com/competicoesvirtuaisbrasileiras/",
  youtube: "https://www.youtube.com/@competicoesvirtuaisbrasileiras",
  linkedin: "https://www.linkedin.com/company/ciclismo-virtual-brasileiro/",
  facebook: "https://www.facebook.com/competicoesvirtuais",

  // Vídeos do canal da CVB exibidos em "Na mídia"
  videos: [
    { id: "rNWhmdgHczc", src: "TV Globo", title: "Esporte Espetacular" },
    { id: "GetjKsxKVo0", src: "TV Globo · MG", title: "Globo Esporte MG" },
    { id: "YDyBgFsjOa4", src: "TV Brasília", title: "Tour de Brasília 2021" },
    { id: "m-22jX5T2zw", src: "Canal Woohoo", title: "Remo Virtual Brasileiro" },
    { id: "5-F3EqaSsmg", src: "GP Brasil CVB", title: "Tour de Aracaju 2024" },
    { id: "E5zBN_HhcSs", src: "Comitê Olímpico do Brasil", title: "Prêmio Esporte e Inovação" }
  ],

  // Galeria: arquivos em assets/media/ (galeria-01.jpg … galeria-12.jpg)
  gallery: 14,

  // Logos em assets/logos/ (PNG ou SVG com fundo transparente).
  // mono:true deixa o logo branco automaticamente; false mantém as cores.
  partners: [
    { name: "ROUVY", file: "rouvy.png", mono: true },
    { name: "Zwift", file: "zwift.png", mono: true },
    { name: "EXR", file: "exr.png", mono: true },
    { name: "Technogym", file: "technogym.png", mono: true },
    { name: "Garmin", file: "garmin.png", mono: true }
  ],
  clients: [
    { name: "IRONMAN", file: "ironman-brasil.png", mono: true },
    { name: "L'Étape Brasil", file: "letape-brasil.png", mono: false },
    { name: "Santander", file: "santander.png", mono: true },
    { name: "Vivo", file: "vivo.png", mono: true },
    { name: "Probiótica", file: "probiotica.png", mono: true },
    { name: "Formação de Atletas CBC", file: "cbc-formacao.png", mono: true },
    { name: "Maricá Games", file: "marica-games.png", mono: false },
    { name: "CF Brasília", file: "cf-brasilia.png", mono: false },
    { name: "Patagonman", file: "patagonman.png", mono: true },
    { name: "Amapá", file: "amapa.png", mono: false },
    { name: "Confederação Brasileira de Remo", file: "cbr.png", mono: false },
    { name: "CBDU", file: "cbdu.png", mono: true },
    { name: "CBDE", file: "cbde.png", mono: true },
    { name: "Federação de Remo de Brasília", file: "frb.png", mono: true }
  ]
};

const MEDIA = "assets/media/";
const LOGOS = "assets/logos/";
const ICONS = {"youtube": "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z", "instagram": "M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077", "facebook": "M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z", "whatsapp": "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z", "linkedin": "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.84-2.05 3.78-2.05C20.6 8.65 21 11.2 21 14.5V21h-4v-5.8c0-1.4-.03-3.2-1.95-3.2-1.95 0-2.25 1.52-2.25 3.1V21H9z", "mail": "M2 5h20v14H2zm2 2v.5l8 5 8-5V7zm16 2.8-8 5-8-5V17h16z"};
const $ = (s, el = document) => el.querySelector(s);
const svg = (name) => `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${ICONS[name]}"/></svg>`;

/* ---------- placeholder quando a mídia ainda não existe ---------- */
function placeholder(el, file) {
  const box = document.createElement("div");
  box.className = (el.className || "") + " ph" + (el.closest(".gallery") ? " ph-box" : "");
  box.dataset.label = "assets/media/" + file;
  box.setAttribute("role", "img");
  box.setAttribute("aria-label", el.getAttribute("alt") || file);
  el.replaceWith(box);
  return box;
}

function loadMedia(el) {
  const file = el.dataset.media;
  if (!file) return;
  if (el.tagName === "VIDEO") {
    const poster = el.dataset.poster;
    const posterOk = new Promise((res) => {
      if (!poster) return res(false);
      const p = new Image();
      p.onload = () => { el.poster = MEDIA + poster; res(true); };
      p.onerror = () => res(false);
      p.src = MEDIA + poster;
    });
    const s = document.createElement("source");
    s.src = MEDIA + file;
    s.type = "video/mp4";
    s.onerror = async () => { if (!(await posterOk)) placeholder(el, file); };
    el.appendChild(s);
    el.load();
  } else {
    el.onerror = () => placeholder(el, file);
    el.loading = el.closest(".hero") ? "eager" : "lazy";
    el.decoding = "async";
    el.src = MEDIA + file;
  }
}

/* vídeos só tocam quando aparecem na tela (economiza dados no celular) */
const vio = new IntersectionObserver((ents) => {
  ents.forEach((e) => {
    const v = e.target;
    if (v.tagName !== "VIDEO") return;
    if (e.isIntersecting) { v.play && v.play().catch(() => {}); } else { v.pause && v.pause(); }
  });
}, { threshold: 0.15 });

/* ---------- galeria ---------- */
function buildGallery() {
  const g = $("#gallery");
  const ratios = ["4/3", "3/4", "16/10", "1/1", "4/5", "16/9"];
  for (let i = 1; i <= CONFIG.gallery; i++) {
    const n = String(i).padStart(2, "0");
    const fig = document.createElement("figure");
    fig.style.setProperty("--ar", ratios[i % ratios.length]);
    const img = document.createElement("img");
    img.className = "media";
    img.dataset.media = `galeria-${n}.jpg`;
    img.alt = `Galeria CVB ${n}`;
    img.addEventListener("load", () => fig.classList.add("ok"));
    fig.appendChild(img);
    g.appendChild(fig);
  }
  const lb = $("#lightbox");
  g.addEventListener("click", (e) => {
    const img = e.target.closest("figure")?.querySelector("img");
    if (!img) return;
    $("img", lb).src = img.src;
    lb.hidden = false;
  });
  lb.addEventListener("click", (e) => { if (e.target !== $("img", lb)) lb.hidden = true; });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") lb.hidden = true; });
}

/* ---------- YouTube (carrega o player só no clique) ---------- */
function buildVideos() {
  const grid = $("#ytGrid");
  CONFIG.videos.forEach((v) => {
    const card = document.createElement("article");
    card.className = "yt reveal";
    card.innerHTML = `
      <div class="yt__frame ph" data-label="youtube.com/watch?v=${v.id}" role="button" tabindex="0" aria-label="Assistir: ${v.title}">
        <img src="https://i.ytimg.com/vi/${v.id}/hqdefault.jpg" alt="" loading="lazy" onerror="this.remove()">
        <span class="yt__play"></span>
      </div>
      <div class="yt__info"><small>${v.src}</small><h4>${v.title}</h4></div>`;
    const frame = $(".yt__frame", card);
    const play = () => {
      const f = document.createElement("iframe");
      f.src = `https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0`;
      f.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
      f.allowFullscreen = true;
      f.title = v.title;
      f.onerror = () => window.open(`https://www.youtube.com/watch?v=${v.id}`, "_blank");
      frame.innerHTML = "";
      frame.appendChild(f);
      frame.classList.remove("ph");
    };
    frame.addEventListener("click", play);
    frame.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); play(); } });
    grid.appendChild(card);
  });
}

/* ---------- logos ---------- */
function logoEl(item, cls) {
  const wrap = document.createElement("div");
  wrap.className = cls;
  wrap.title = item.name;
  const img = new Image();
  img.alt = item.name;
  if (cls === "logo-card" && !item.mono) img.classList.add("keep");
  if (cls === "client" && item.mono) img.classList.add("mono");
  img.onerror = () => {
    const t = document.createElement("span");
    t.className = "logo-name";
    t.textContent = item.name;
    img.replaceWith(t);
  };
  img.src = LOGOS + item.file;
  wrap.appendChild(img);
  return wrap;
}
function buildLogos() {
  const p = $("#partners");
  CONFIG.partners.forEach((it) => p.appendChild(logoEl(it, "logo-card")));
  const c = $("#clients");
  // duas voltas para o letreiro rodar sem emenda
  [...CONFIG.clients, ...CONFIG.clients].forEach((it, i) => {
    const el = logoEl(it, "client");
    if (i >= CONFIG.clients.length) el.setAttribute("aria-hidden", "true");
    c.appendChild(el);
  });
}

/* ---------- contato ---------- */
function buildContact() {
  const links = [];
  if (CONFIG.whatsapp) links.push(["whatsapp", `https://wa.me/${CONFIG.whatsapp}`, "WhatsApp"]);
  if (CONFIG.email) links.push(["mail", `mailto:${CONFIG.email}`, CONFIG.email]);
  links.push(["instagram", CONFIG.instagram, "@competicoesvirtuaisbrasileiras"]);
  links.push(["youtube", CONFIG.youtube, "YouTube"]);
  $("#contactLinks").innerHTML = links
    .map(([i, h, t]) => `<li><a href="${h}" target="_blank" rel="noopener">${svg(i)}<span>${t}</span></a></li>`)
    .join("");

  const soc = [["instagram", CONFIG.instagram], ["youtube", CONFIG.youtube], ["linkedin", CONFIG.linkedin], ["facebook", CONFIG.facebook]];
  if (CONFIG.whatsapp) soc.unshift(["whatsapp", `https://wa.me/${CONFIG.whatsapp}`]);
  $("#social").innerHTML = soc
    .map(([i, h]) => `<a href="${h}" target="_blank" rel="noopener" aria-label="${i}">${svg(i)}</a>`)
    .join("");

  const form = $("#form");
  const note = $("#formNote");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(form));
    if (!d.nome || !d.contato) { note.textContent = "Preencha nome e contato."; return; }
    const txt = `Olá, CVB! Sou ${d.nome}${d.empresa ? " (" + d.empresa + ")" : ""}.\nInteresse: ${d.tipo}.\n${d.msg || ""}\nContato: ${d.contato}`;
    let url;
    if (CONFIG.whatsapp) url = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(txt)}`;
    else if (CONFIG.email) url = `mailto:${CONFIG.email}?subject=${encodeURIComponent("Contato pelo site: " + d.tipo)}&body=${encodeURIComponent(txt)}`;
    else url = CONFIG.instagram;
    window.open(url, "_blank");
    note.textContent = CONFIG.whatsapp
      ? "Abrimos o WhatsApp com a sua mensagem. É só tocar em enviar."
      : CONFIG.email ? "Abrimos o seu e-mail com a mensagem pronta. É só enviar."
      : "Fale com a gente pelo Instagram: @competicoesvirtuaisbrasileiras";
  });
}


/* ---------- vídeo do YouTube dentro de um bloco (Transmissão ao vivo) ---------- */
function inlineYouTube() {
  document.querySelectorAll(".yt-inline").forEach((box) => {
    const id = box.dataset.yt;
    const thumb = new Image();
    thumb.onload = () => { const img = box.querySelector("img.media"); if (img) img.src = thumb.src; };
    thumb.src = `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
    const play = () => {
      if (box.classList.contains("is-playing")) return;
      const f = document.createElement("iframe");
      f.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
      f.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
      f.allowFullscreen = true;
      f.title = box.dataset.title || "Vídeo";
      box.appendChild(f);
      box.classList.add("is-playing");
    };
    box.addEventListener("click", play);
    box.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); play(); } });
  });
}

/* ---------- header, menu, animações ---------- */
function ui() {
  const hdr = $(".hdr");
  const onScroll = () => hdr.classList.toggle("is-solid", scrollY > 30);
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const burger = $("#burger");
  burger.addEventListener("click", () => {
    const open = document.body.classList.toggle("nav-open");
    burger.setAttribute("aria-expanded", open);
  });
  document.querySelectorAll("#nav a").forEach((a) =>
    a.addEventListener("click", () => { document.body.classList.remove("nav-open"); burger.setAttribute("aria-expanded", "false"); })
  );

  const io = new IntersectionObserver((ents) => {
    ents.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  $("#ano").textContent = new Date().getFullYear();
}

buildGallery();
buildVideos();
buildLogos();
buildContact();
inlineYouTube();
document.querySelectorAll("[data-media]").forEach((el) => {
  loadMedia(el);
  if (el.tagName === "VIDEO") vio.observe(el);
});
ui();
