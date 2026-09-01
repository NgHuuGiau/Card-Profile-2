document.addEventListener("DOMContentLoaded", () => {
  const slides = Array.from(document.querySelectorAll(".fade-panel"));
  const dots = Array.from(document.querySelectorAll(".progress-dot"));
  const dockBtns = Array.from(document.querySelectorAll(".dock-btn"));
  const tiltCards = Array.from(document.querySelectorAll(".tilt-card"));
  const spotlightCards = Array.from(document.querySelectorAll(".spotlight-card"));
  const magneticBtns = Array.from(document.querySelectorAll(".magnetic-btn"));
  const filterBtns = Array.from(document.querySelectorAll(".filter-btn"));
  const projectItems = Array.from(document.querySelectorAll(".project-item"));
  const copyableCards = Array.from(document.querySelectorAll(".copyable-card"));
  const toast = document.getElementById("toast");
  const toastMsg = document.getElementById("toast-message");
  const typewriterEl = document.getElementById("typewriter");

  const themeToggle = document.getElementById("theme-toggle");
  const langToggle = document.getElementById("lang-toggle");
  const backBtn = document.getElementById("backToFirstPage");
  const mobileBreakpoint = window.matchMedia("(max-width: 900px)");
  const preloader = document.getElementById("preloader");
  const percentEl = document.getElementById("load-percentage");
  const barEl = document.querySelector(".preloader-bar");
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

  const revealSelectors = [
    ".section-index",
    ".eyebrow",
    ".hero-name",
    ".hero-role-wrapper",
    ".hero-summary",
    ".hero-meta",
    ".avatar-frame",
    ".skill-block",
    ".section-head",
    ".project-filters",
    ".project-item",
    ".contact-card",
    ".cta-button",
    ".social-link-card",
    ".back-to-top-btn"
  ];

  const typewriterRoles = {
    vi: [
      "Kỹ sư phần mềm tương lai",
      "Đam mê AI & Computer Vision",
      "Fullstack Web Developer",
      "Người đam mê giải quyết bài toán khó"
    ],
    en: [
      "Future Software Engineer",
      "AI & Computer Vision Enthusiast",
      "Fullstack Web Developer",
      "Passionate Problem Solver"
    ]
  };

  const translations = {
    vi: {
      brandKicker: "Sáng tạo & Lập trình",
      brandName: "Nguyễn Hữu Giàu",
      statusOpen: "Sẵn sàng cho dự án mới",
      heroEyebrow: "Ngành Công nghệ thông tin - Chuyên ngành Kỹ sư phần mềm",
      name: "Nguyễn Hữu Giàu",
      rolePrefix: "Tôi là ",
      heroSummary:
        "Tôi là một người yêu thích việc biến những ý tưởng phức tạp thành các sản phẩm kỹ thuật số mượt mà. Với tư duy của một kỹ sư và tâm hồn của một người làm sản phẩm, tôi tập trung vào việc tối ưu hóa hiệu suất và trải nghiệm người dùng.",
      majorLabel: "Chuyên ngành",
      majorValue: "Kỹ sư phần mềm",
      schoolLabel: "Học tại",
      schoolValue: "Đại học Nguyễn Tất Thành",
      skillsTitle: "Kỹ năng nổi bật",
      projectsTitle: "Dự án tiêu biểu",
      projectsSubtitle: "Những thử nghiệm và sản phẩm thực tế, nơi tôi áp dụng kiến thức để giải quyết các bài toán cụ thể.",
      filterAll: "Tất cả (4)",
      filterAI: "AI / Vision (2)",
      filterFullstack: "Fullstack (1)",
      filterNLP: "NLP / AI Tools (1)",
      project1Title: "OncoVision",
      project1Desc: "Nền tảng hỗ trợ chẩn đoán hình ảnh y khoa: phân tích 7 nhóm ung thư, chat AI cho bác sĩ và pipeline huấn luyện mô hình YOLO/CNN ngay trên máy local.",
      project2Title: "Fashion Website",
      project2Desc: "Hệ thống thương mại điện tử thời trang với Django + Vanilla JS, tích hợp CI/CD, Docker và chuẩn hoá chất lượng mã nguồn.",
      project3Title: "SummarEase Django",
      project3Desc: "Công cụ tóm tắt văn bản thông minh: trích xuất tinh tuý từ văn bản, URL và file (PDF/DOCX/EPUB) bằng TextRank và Gemini AI.",
      project4Title: "YOLO Real-Time Vision",
      project4Desc: "Hệ thống nhận diện vật thể và cử chỉ bàn tay theo thời gian thực với YOLO11 + MediaPipe, tăng tốc TensorRT và web UI trực tiếp.",
      viewSource: "Xem mã nguồn",
      contactTitle: "Thông tin liên hệ",
      contactSubtitle: "Bạn có một ý tưởng thú vị hay một dự án cần cộng tác? Đừng ngần ngại, tôi luôn sẵn lòng lắng nghe và kết nối.",
      emailLabel: "Email",
      phoneLabel: "Điện thoại",
      addressLabel: "Địa chỉ",
      addressValue: "TP. Hồ Chí Minh, Việt Nam",
      ctaText: "Xem dự án mới nhất",
      socialTitle: "Kết nối với tôi",
      socialSubtitle: "Theo dõi để cập nhật dự án, quá trình học tập và những thử nghiệm mới.",
      backTopText: "Quay lại giới thiệu",
      scrollHint: "Cuộn hoặc phím 1-4 để đổi trang",
      navIntro: "Giới thiệu",
      navProjects: "Dự án",
      navContact: "Liên hệ",
      navSocial: "Kết nối",
      toastCopied: "Đã sao chép vào bộ nhớ tạm! ✨"
    },
    en: {
      brandKicker: "Creative Engineering",
      brandName: "Nguyen Huu Giau",
      statusOpen: "Open to opportunities",
      heroEyebrow: "Information Technology - Software Engineering",
      name: "Nguyen Huu Giau",
      rolePrefix: "I am a ",
      heroSummary:
        "Passionate about transforming complex ideas into seamless digital experiences. Combining an engineering mindset with a product-driven heart to deliver performance and user-centric designs.",
      majorLabel: "Major",
      majorValue: "Software Engineering",
      schoolLabel: "Studies at",
      schoolValue: "Nguyen Tat Thanh University",
      skillsTitle: "Key skills",
      projectsTitle: "Featured projects",
      projectsSubtitle: "A showcase of real-world solutions and experiments where logic meets user experience.",
      filterAll: "All (4)",
      filterAI: "AI / Vision (2)",
      filterFullstack: "Fullstack (1)",
      filterNLP: "NLP / AI Tools (1)",
      project1Title: "OncoVision",
      project1Desc: "A medical imaging diagnostic platform analyzing 7 cancer groups, with an AI chat for doctors and a YOLO/CNN model training pipeline running fully on local machines.",
      project2Title: "Fashion Website",
      project2Desc: "A fashion e-commerce system built with Django + Vanilla JS, featuring CI/CD, Docker and strict code-quality standards.",
      project3Title: "SummarEase Django",
      project3Desc: "A smart text summarization tool extracting the essence from text, URLs and files (PDF/DOCX/EPUB) using TextRank and Gemini AI.",
      project4Title: "YOLO Real-Time Vision",
      project4Desc: "A real-time object and hand-gesture recognition system built on YOLO11 + MediaPipe, accelerated with TensorRT and a live web UI.",
      viewSource: "View source code",
      contactTitle: "Contact information",
      contactSubtitle: "Got an exciting idea or a project to collaborate on? Let's connect and build something great together.",
      emailLabel: "Email",
      phoneLabel: "Phone",
      addressLabel: "Address",
      addressValue: "Ho Chi Minh City, Vietnam",
      ctaText: "View latest project",
      socialTitle: "Connect with me",
      socialSubtitle: "Follow for project updates, learning progress, and new experiments.",
      backTopText: "Back to intro",
      scrollHint: "Scroll or press 1-4 to navigate",
      navIntro: "Intro",
      navProjects: "Projects",
      navContact: "Contact",
      navSocial: "Social",
      toastCopied: "Copied to clipboard! ✨"
    }
  };

  let currentSlide = 0;
  let wheelLocked = false;
  let currentLang = localStorage.getItem("portfolio_lang") || "en";

  /* ---------------- Typewriter Effect ---------------- */
  let typeIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeTimer = null;

  function runTypewriter() {
    if (!typewriterEl) return;
    clearTimeout(typeTimer);

    const roles = typewriterRoles[currentLang] || typewriterRoles.vi;
    const currentText = roles[typeIndex % roles.length];

    if (isDeleting) {
      charIndex--;
      typewriterEl.textContent = currentText.substring(0, charIndex);
    } else {
      charIndex++;
      typewriterEl.textContent = currentText.substring(0, charIndex);
    }

    let typeSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentText.length) {
      typeSpeed = 1800; // Pause after typing
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      typeIndex++;
      typeSpeed = 500; // Pause before new word
    }

    typeTimer = setTimeout(runTypewriter, typeSpeed);
  }

  function resetTypewriter() {
    charIndex = 0;
    isDeleting = false;
    if (typewriterEl) typewriterEl.textContent = "";
    runTypewriter();
  }

  /* ---------------- Spotlight Card Effect ---------------- */
  function setupSpotlightCards() {
    spotlightCards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      });
    });
  }

  /* ---------------- Magnetic Buttons ---------------- */
  function setupMagneticButtons() {
    if (!finePointer.matches) return;

    magneticBtns.forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) * 0.28;
        const deltaY = (e.clientY - centerY) * 0.28;
        btn.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
      });

      btn.addEventListener("mouseleave", () => {
        btn.style.transform = "";
      });
    });
  }

  /* ---------------- Project Category Filter ---------------- */
  function setupProjectFilters() {
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const filter = btn.dataset.filter;

        filterBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        projectItems.forEach((item) => {
          const category = item.dataset.category;
          if (filter === "all" || category === filter) {
            item.classList.remove("is-hidden");
          } else {
            item.classList.add("is-hidden");
          }
        });
      });
    });
  }

  /* ---------------- Toast Notification & 1-Click Copy ---------------- */
  let toastTimer = null;
  function showToast(message) {
    if (!toast || !toastMsg) return;
    toastMsg.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 2800);
  }

  function setupCopyableCards() {
    copyableCards.forEach((card) => {
      card.addEventListener("click", async () => {
        const textToCopy = card.dataset.copy;
        if (!textToCopy) return;

        try {
          if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(textToCopy);
          } else {
            const textArea = document.createElement("textarea");
            textArea.value = textToCopy;
            textArea.style.position = "fixed";
            textArea.style.opacity = "0";
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);
          }
          const successMsg = translations[currentLang]?.toastCopied || "Đã sao chép! ✨";
          showToast(`${successMsg} (${textToCopy})`);
        } catch (err) {
          showToast(`Sao chép: ${textToCopy}`);
        }
      });
    });
  }

  function prepareRevealItems() {
    slides.forEach((slide) => {
      let order = 0;
      slide.querySelectorAll(revealSelectors.join(",")).forEach((item) => {
        item.classList.add("reveal-item");
        item.style.setProperty("--reveal-order", order);
        order += 1;
      });
    });
  }

  function setupCursorGlow() {
    if (!finePointer.matches) return;

    const glow = document.createElement("div");
    glow.className = "cursor-glow";
    glow.setAttribute("aria-hidden", "true");
    document.body.appendChild(glow);

    window.addEventListener("pointermove", (event) => {
      document.body.classList.add("has-pointer");
      document.documentElement.style.setProperty("--cursor-x", event.clientX + "px");
      document.documentElement.style.setProperty("--cursor-y", event.clientY + "px");
    });
  }

  function runPreloader() {
    if (!preloader || !percentEl || !barEl) {
      document.body.classList.add("is-ready");
      return;
    }

    let pct = 0;
    const speeds = [
      { target: 30, ms: 18 },
      { target: 70, ms: 28 },
      { target: 92, ms: 14 },
      { target: 100, ms: 8 }
    ];

    let speedIdx = 0;

    function tick() {
      pct += 1;
      percentEl.textContent = pct;
      barEl.style.width = pct + "%";

      if (pct >= 100) {
        dismissPreloader();
        return;
      }

      while (speedIdx < speeds.length - 1 && pct >= speeds[speedIdx].target) {
        speedIdx++;
      }
      setTimeout(tick, speeds[speedIdx].ms);
    }

    setTimeout(tick, 120);
  }

  function dismissPreloader() {
    if (!preloader) return;
    setTimeout(() => {
      document.body.classList.add("is-ready");
      preloader.classList.add("hidden");
      preloader.addEventListener("transitionend", () => {
        preloader.remove();
      }, { once: true });
    }, 400);
  }

  runPreloader();

  function updateParticleColors(isLight) {
    const canvas = document.querySelector("#particles-js canvas");
    if (!canvas) return;

    const config = isLight
      ? {
          color: "#2563eb",
          lineColor: "#2563eb",
          lineOpacity: 0.15,
          opacity: 0.25
        }
      : {
          color: "#0ea5e9",
          lineColor: "#0ea5e9",
          lineOpacity: 0.2,
          opacity: 0.22
        };

    if (window.pJSDom && window.pJSDom.length > 0) {
      try {
        const pJS = window.pJSDom[0].pJS;
        pJS.particles.color.value = config.color;
        pJS.particles.line_linked.color = config.lineColor;
        pJS.particles.line_linked.opacity = config.lineOpacity;
        pJS.particles.opacity.value = config.opacity;
        pJS.fn.particlesRefresh();
      } catch (e) {}
    }
  }

  function clampIndex(index) {
    return Math.max(0, Math.min(index, slides.length - 1));
  }

  function syncNavigation(index) {
    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("active", dotIndex === index);
    });

    dockBtns.forEach((btn, btnIndex) => {
      btn.classList.toggle("active", btnIndex === index);
    });
  }

  function showSlide(index) {
    const next = clampIndex(index);
    const stage = document.querySelector(".slides-stage");
    if (stage) {
      stage.dataset.dir = next > currentSlide ? "1" : next < currentSlide ? "-1" : stage.dataset.dir || "1";
    }
    currentSlide = next;
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-visible", slideIndex === currentSlide || mobileBreakpoint.matches);
    });
    syncNavigation(currentSlide);
  }

  function lockWheel() {
    wheelLocked = true;
    window.setTimeout(() => {
      wheelLocked = false;
    }, 700);
  }

  function handleWheel(event) {
    if (mobileBreakpoint.matches || wheelLocked) {
      return;
    }

    const scrollable = event.target.closest(".scrollable-panel");
    if (scrollable) {
      const direction = event.deltaY > 0 ? 1 : -1;
      const atTop = scrollable.scrollTop === 0;
      const atBottom = Math.abs(scrollable.scrollHeight - scrollable.clientHeight - scrollable.scrollTop) < 2;

      if ((direction === 1 && !atBottom) || (direction === -1 && !atTop)) {
        return;
      }
    }

    event.preventDefault();
    const direction = event.deltaY > 0 ? 1 : -1;
    const nextSlide = clampIndex(currentSlide + direction);

    if (nextSlide !== currentSlide) {
      showSlide(nextSlide);
    }

    lockWheel();
  }

  function handleKeydown(event) {
    // Number keys 1-4 for quick navigation
    if (["1", "2", "3", "4"].includes(event.key)) {
      showSlide(parseInt(event.key, 10) - 1);
      event.preventDefault();
      return;
    }

    if (mobileBreakpoint.matches) {
      return;
    }

    if (event.key === "ArrowDown" || event.key === "PageDown") {
      showSlide(currentSlide + 1);
      event.preventDefault();
    }

    if (event.key === "ArrowUp" || event.key === "PageUp") {
      showSlide(currentSlide - 1);
      event.preventDefault();
    }

    if (event.key === "Home") {
      showSlide(0);
      event.preventDefault();
    }

    if (event.key === "End") {
      showSlide(slides.length - 1);
      event.preventDefault();
    }
  }

  function applyThemeIcon() {
    themeToggle.innerHTML = document.body.classList.contains("light-mode")
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';
  }

  function updateLanguage(lang) {
    currentLang = lang;
    localStorage.setItem("portfolio_lang", lang);
    document.documentElement.lang = lang === "vi" ? "vi" : "en";

    document.querySelectorAll("[data-i18n]").forEach((node) => {
      const key = node.dataset.i18n;
      if (translations[lang] && translations[lang][key]) {
        node.textContent = translations[lang][key];
      }
    });

    resetTypewriter();
  }

  function setTilt(event, card) {
    if (mobileBreakpoint.matches) {
      return;
    }

    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotateX = ((event.clientY - centerY) / rect.height) * -10;
    const rotateY = ((event.clientX - centerX) / rect.width) * 10;

    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  }

  function resetTilt(card) {
    card.style.transform = "";
  }

  window.addEventListener("wheel", handleWheel, { passive: false });
  window.addEventListener("keydown", handleKeydown);

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      showSlide(Number(dot.dataset.slideTarget));
    });
  });

  dockBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = Number(btn.dataset.slideTarget);
      showSlide(target);
      if (mobileBreakpoint.matches) {
        const targetPanel = slides[target];
        if (targetPanel) {
          targetPanel.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });

  tiltCards.forEach((card) => {
    card.addEventListener("mousemove", (event) => setTilt(event, card));
    card.addEventListener("mouseleave", () => resetTilt(card));
  });

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("light-mode");
      applyThemeIcon();
      updateParticleColors(document.body.classList.contains("light-mode"));
    });
  }

  if (langToggle) {
    langToggle.addEventListener("click", () => {
      updateLanguage(currentLang === "vi" ? "en" : "vi");
    });
  }

  if (backBtn) {
    backBtn.addEventListener("click", () => {
      showSlide(0);
      if (mobileBreakpoint.matches) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  }

  mobileBreakpoint.addEventListener("change", () => {
    showSlide(currentSlide);
    tiltCards.forEach(resetTilt);
  });

  applyThemeIcon();
  updateLanguage(currentLang);
  prepareRevealItems();
  setupCursorGlow();
  setupSpotlightCards();
  setupMagneticButtons();
  setupProjectFilters();
  setupCopyableCards();
  showSlide(0);
});
