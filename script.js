document.addEventListener("DOMContentLoaded", () => {
  const slides = Array.from(document.querySelectorAll(".fade-panel"));
  const dots = Array.from(document.querySelectorAll(".progress-dot"));
  const tiltCards = Array.from(document.querySelectorAll(".tilt-card"));
  const themeToggle = document.getElementById("theme-toggle");
  const langToggle = document.getElementById("lang-toggle");
  const backBtn = document.getElementById("backToFirstPage");
  const mobileBreakpoint = window.matchMedia("(max-width: 900px)");
  const preloader = document.getElementById("preloader");
  const percentEl = document.getElementById("load-percentage");
  const barEl = document.querySelector(".preloader-bar");
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

  const revealSelectors = [
    ".eyebrow",
    ".hero-name",
    ".hero-summary",
    ".meta-chip",
    ".avatar-frame",
    ".skill-block",
    ".section-head",
    ".project-item",
    ".contact-card",
    ".cta-button",
    ".social-link-card",
    ".back-to-top-btn"
  ];

  const translations = {
    vi: {
      brandKicker: "Sáng tạo & Lập trình",
      brandName: "Nguyễn Hữu Giàu",
      heroEyebrow: "Ngành Công nghệ thông tin - Chuyên ngành Kỹ sư phần mềm",
      name: "Nguyễn Hữu Giàu",
      heroSummary:
        "Tôi là một người yêu thích việc biến những ý tưởng phức tạp thành các sản phẩm kỹ thuật số mượt mà. Với tư duy của một kỹ sư và tâm hồn của một người làm sản phẩm, tôi tập trung vào việc tối ưu hóa hiệu suất và trải nghiệm người dùng.",
      majorLabel: "Chuyên ngành",
      majorValue: "Kỹ sư phần mềm",
      schoolLabel: "Học tại",
      schoolValue: "Đại học Nguyễn Tất Thành",
      skillsTitle: "Kỹ năng nổi bật",
      statProjectValue: "02+",
      statProjectLabel: "Dự án đã hoàn thành",
      statFocusValue: "UI + Logic",
      statFocusLabel: "Tập trung vào trải nghiệm và thuật toán",
      projectsTitle: "Dự án tiêu biểu",
      projectsSubtitle: "Những thử nghiệm và sản phẩm thực tế, nơi tôi áp dụng kiến thức để giải quyết các bài toán cụ thể.",
      project1Title: "Sudoku Game",
      project1Desc: "Trải nghiệm giải đố mượt mà được xây dựng trên thuật toán quay lui (Backtracking), mang lại những thử thách trí tuệ vô tận.",
      project2Title: "SummarEase Django",
      project2Desc: "Giải pháp thông minh giúp 'gạn đục khơi trong', trích xuất những tinh túy từ các văn bản dài chỉ trong tích tắc.",
      project3Title: "Fashion Website",
      project3Desc: "Hệ thống thương mại điện tử hiện đại, chú trọng vào quy trình mua hàng mượt mà và quản lý dữ liệu chính xác.",
      project4Title: "YOLO12 AI Vision System",
      project4Desc: "Hệ thống thị giác máy tính tiên tiến, kết hợp nhận dạng đối tượng YOLO12 và phân tích cử chỉ tay thời gian thực, tối ưu hóa cho hiệu năng GPU.",
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
      scrollHint: "Cuộn hoặc dùng phím mũi tên để xem tiếp",
      navIntro: "Giới thiệu",
      navProjects: "Dự án tiêu biểu",
      navContact: "Thông tin liên hệ",
      navSocial: "Kết nối với tôi"
    },
    en: {
      brandKicker: "Creative Engineering",
      brandName: "Nguyen Huu Giau",
      heroEyebrow: "Information Technology - Software Engineering",
      name: "Nguyen Huu Giau",
      heroSummary:
        "Passionate about transforming complex ideas into seamless digital experiences. Combining an engineering mindset with a product-driven heart to deliver performance and user-centric designs.",
      majorLabel: "Major",
      majorValue: "Software Engineering",
      schoolLabel: "Studies at",
      schoolValue: "Nguyen Tat Thanh University",
      skillsTitle: "Key skills",
      statProjectValue: "02+",
      statProjectLabel: "Completed projects",
      statFocusValue: "UI + Logic",
      statFocusLabel: "Focused on experience and algorithms",
      projectsTitle: "Featured projects",
      projectsSubtitle: "A showcase of real-world solutions and experiments where logic meets user experience.",
      project1Title: "Sudoku Game",
      project1Desc: "A smooth puzzle-solving experience powered by Backtracking algorithms, offering endless intellectual challenges.",
      project2Title: "SummarEase Django",
      project2Desc: "A smart solution to extract the essence from long-form text, saving time and improving information processing.",
      project3Title: "Fashion Website",
      project3Desc: "Modern e-commerce architecture focused on smooth user journeys and robust data management.",
      project4Title: "YOLO12 AI Vision System",
      project4Desc: "Advanced computer vision pipeline combining YOLO12 object detection with real-time hand gesture analysis, optimized for high-performance GPU inference.",
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
      scrollHint: "Scroll or use arrow keys to continue",
      navIntro: "Introduction",
      navProjects: "Featured projects",
      navContact: "Contact info",
      navSocial: "Connect with me"
    }
  };

  let currentSlide = 0;
  let wheelLocked = false;
  let currentLang = "vi";

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

  /* ══════════════════════════════════════
     PRELOADER
  ══════════════════════════════════════ */
  function runPreloader() {
    if (!preloader || !percentEl || !barEl) {
      document.body.classList.add("is-ready");
      return;
    }

    let pct = 0;
    // Fast at start, slow in middle, fast at end
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

      // Pick speed based on current percentage
      while (speedIdx < speeds.length - 1 && pct >= speeds[speedIdx].target) {
        speedIdx++;
      }
      setTimeout(tick, speeds[speedIdx].ms);
    }

    setTimeout(tick, 120);
  }

  function dismissPreloader() {
    if (!preloader) return;
    // Short pause at 100% before hiding
    setTimeout(() => {
      document.body.classList.add("is-ready");
      preloader.classList.add("hidden");
      // Remove from DOM after transition
      preloader.addEventListener("transitionend", () => {
        preloader.remove();
      }, { once: true });
    }, 400);
  }

  runPreloader();

  /* ══════════════════════════════════════
     PARTICLE COLOR SYNC
  ══════════════════════════════════════ */
  function updateParticleColors(isLight) {
    const canvas = document.querySelector("#particles-js canvas");
    if (!canvas) return;

    // Attempt to re-initialise particles.js with new colour config
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
      } catch (e) {
        // Silently fail if particles.js API is unavailable
      }
    }
  }

  /* ══════════════════════════════════════
     SLIDE NAVIGATION
  ══════════════════════════════════════ */
  function clampIndex(index) {
    return Math.max(0, Math.min(index, slides.length - 1));
  }

  function syncDots(index) {
    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("active", dotIndex === index);
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
    syncDots(currentSlide);
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

    // Kiểm tra nếu đang cuộn trên .scrollable-panel thì ưu tiên cuộn nội dung bên trong
    const scrollable = event.target.closest(".scrollable-panel");
    if (scrollable) {
      const direction = event.deltaY > 0 ? 1 : -1;
      const atTop = scrollable.scrollTop === 0;
      const atBottom = Math.abs(scrollable.scrollHeight - scrollable.clientHeight - scrollable.scrollTop) < 2;

      // Nếu cuộn xuống mà chưa tới cuối, hoặc cuộn lên mà chưa tới đầu → cuộn nội dung card
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

  /* ══════════════════════════════════════
     THEME TOGGLE
  ══════════════════════════════════════ */
  function applyThemeIcon() {
    themeToggle.innerHTML = document.body.classList.contains("light-mode")
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';
  }

  /* ══════════════════════════════════════
     I18N
  ══════════════════════════════════════ */
  function updateLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang === "vi" ? "vi" : "en";

    document.querySelectorAll("[data-i18n]").forEach((node) => {
      const key = node.dataset.i18n;
      if (translations[lang][key]) {
        node.textContent = translations[lang][key];
      }
    });
  }

  /* ══════════════════════════════════════
     3D TILT
  ══════════════════════════════════════ */
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

  /* ══════════════════════════════════════
     EVENT LISTENERS
  ══════════════════════════════════════ */
  window.addEventListener("wheel", handleWheel, { passive: false });
  window.addEventListener("keydown", handleKeydown);

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      showSlide(Number(dot.dataset.slideTarget));
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
  showSlide(0);
});
