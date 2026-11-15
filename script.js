(() => {
  const config = window.SITE_CONFIG || {};
  const $ = (id) => document.getElementById(id);

  // Mobile navigation
  const menuToggle = $("menuToggle");
  const mainNav = $("mainNav");
  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const open = mainNav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(open));
    });
    mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    }));
  }

  // Profile photo (the initials placeholder remains visible if the file is not present)
  const profilePhoto = $("profilePhoto");
  const portraitPlaceholder = $("portraitPlaceholder");
  if (profilePhoto && config.profilePhoto) {
    profilePhoto.src = config.profilePhoto;
    profilePhoto.addEventListener("load", () => {
      profilePhoto.style.display = "block";
      if (portraitPlaceholder) portraitPlaceholder.style.display = "none";
    });
    profilePhoto.addEventListener("error", () => {
      profilePhoto.style.display = "none";
      if (portraitPlaceholder) portraitPlaceholder.style.display = "flex";
    });
  }

  const isPlaceholder = (url) => !url || url.includes("REPLACE_") || url.includes("example.com");

  function renderLinks(targetId, items, buttonMode = false) {
    const target = $(targetId);
    if (!target) return;
    target.innerHTML = "";
    (items || []).forEach(item => {
      const valid = !isPlaceholder(item.url);
      const a = document.createElement(valid ? "a" : "div");
      a.className = buttonMode ? "registration-button" : `resource-link${valid ? "" : " disabled"}`;
      if (valid) {
        a.href = item.url;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
      } else {
        a.setAttribute("aria-disabled", "true");
        a.title = "Replace this sample URL in site-config.js";
      }
      if (buttonMode) {
        const copy = document.createElement("span");
        const strong = document.createElement("strong");
        strong.textContent = item.title || "Open form";
        const small = document.createElement("small");
        small.textContent = valid ? (item.description || "Open registration form") : "Replace the sample URL in site-config.js";
        copy.append(strong, small);
        const arrow = document.createElement("span");
        arrow.className = "arrow";
        arrow.textContent = valid ? "↗" : "✎";
        a.append(copy, arrow);
      } else {
        const title = document.createElement("span");
        title.textContent = item.title || "Untitled link";
        const arrow = document.createElement("span");
        arrow.textContent = valid ? "↗" : "•";
        a.append(title, arrow);
      }
      target.appendChild(a);
    });
    if (!items || !items.length) {
      const empty = document.createElement("p");
      empty.className = "registration-link-placeholder";
      empty.textContent = "Links will be added here.";
      target.appendChild(empty);
    }
  }

  renderLinks("registrationLinks", config.registrationLinks, true);
  renderLinks("circularLinks", config.circulars, false);
  renderLinks("usefulLinks", config.usefulLinks, false);

  // Public contact details: email appears only when the owner adds it to site-config.js.
  const contactDetails = $("contactDetails");
  if (contactDetails && config.contactEmail) {
    const emailBlock = document.createElement("div");
    const label = document.createElement("small");
    label.textContent = "Email";
    const email = document.createElement("a");
    email.href = `mailto:${config.contactEmail}`;
    email.textContent = config.contactEmail;
    email.className = "contact-email";
    emailBlock.append(label, email);
    contactDetails.appendChild(emailBlock);
  }

  // Photo gallery slideshow
  const images = Array.isArray(config.galleryImages) ? config.galleryImages : [];
  const stage = $("slideStage");
  const count = $("slideCount");
  const progress = $("slideProgress");
  const prev = $("prevSlide");
  const next = $("nextSlide");
  const playPause = $("playPause");
  let current = 0;
  let playing = true;
  let timer = null;

  function showSlide(index) {
    if (!stage || !images.length) return;
    current = (index + images.length) % images.length;
    const item = images[current];
    stage.innerHTML = "";
    const img = document.createElement("img");
    img.src = item.src;
    img.alt = item.caption || `Gallery photograph ${current + 1}`;
    img.addEventListener("error", () => {
      stage.innerHTML = '<div class="empty-gallery"><div class="empty-gallery-icon">▧</div><h3>Photo not found</h3><p>Check the image file name and path in <code>site-config.js</code>.</p></div>';
    });
    stage.appendChild(img);
    if (item.caption) {
      const caption = document.createElement("div");
      caption.className = "slide-caption";
      caption.textContent = item.caption;
      stage.appendChild(caption);
    }
    if (count) count.textContent = `${current + 1} / ${images.length}`;
    if (progress) progress.style.width = `${((current + 1) / images.length) * 100}%`;
  }

  function stopTimer() {
    if (timer) window.clearInterval(timer);
    timer = null;
  }
  function startTimer() {
    stopTimer();
    if (images.length > 1 && playing) timer = window.setInterval(() => showSlide(current + 1), 5000);
  }

  if (images.length) {
    showSlide(0);
    [prev, next, playPause].forEach(btn => { if (btn) btn.disabled = false; });
    if (prev) prev.addEventListener("click", () => { showSlide(current - 1); startTimer(); });
    if (next) next.addEventListener("click", () => { showSlide(current + 1); startTimer(); });
    if (playPause) playPause.addEventListener("click", () => {
      playing = !playing;
      playPause.textContent = playing ? "Ⅱ" : "▶";
      playPause.setAttribute("aria-label", playing ? "Pause slideshow" : "Play slideshow");
      if (playing) startTimer(); else stopTimer();
    });
    startTimer();
  } else {
    if (count) count.textContent = "0 / 0";
    [prev, next, playPause].forEach(btn => { if (btn) btn.disabled = true; });
  }

  const year = $("currentYear");
  if (year) year.textContent = new Date().getFullYear();
})();
