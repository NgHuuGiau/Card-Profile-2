document.addEventListener("DOMContentLoaded", () => {
  const slides = Array.from(document.querySelectorAll(".fade-panel"));
  const dots = Array.from(document.querySelectorAll(".progress-dot"));
  const tiltCards = Array.from(document.querySelectorAll(".tilt-card"));
  const themeToggle = document.getElementById("theme-toggle");
  const langToggle = document.getElementById("lang-toggle");
  const backBtn = document.getElementById("backToFirstPage");
  const mobileBreakpoint = window.matchMedia("(max-width: 900px)");

  const translations = {
    vi: {
      brandKicker: "Portfolio Cá Nhân",
      brandName: "Nguyễn Hữu Giàu",
      heroEyebrow: "Ngành Công nghệ thông tin - Chuyên ngành Kỹ sư phần mềm",
      name: "Nguyễn Hữu Giàu",
      heroSummary:
        "Xây dựng sản phẩm giao diện gọn, rõ và hữu ích, kết hợp tư duy lập trình với trải nghiệm người dùng để tạo ra web profile, trò chơi và công cụ phục vụ học tập.",
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
      projectsSubtitle: "Các dự án thể hiện khả năng lập trình, giải quyết vấn đề và tổ chức trải nghiệm người dùng.",
      project1Title: "Sudoku Game",
      project1Desc: "Game Sudoku bằng Python (Pygame, Tkinter) với thuật toán sinh bảng ngẫu nhiên bằng backtracking.",
      project2Title: "SummarEase Django",
      project2Desc: "Ứng dụng web Django giúp tự động tóm tắt văn bản dài thành thông tin ngắn gọn, súc tích.",
      project3Title: "Fashion Website",
      project3Desc: "Trang thương mại điện tử mảng thời trang với đầy đủ tính năng giỏ hàng, thanh toán và quản lý kho.",
      project4Title: "Card Profile",
      project4Desc: "Trang hồ sơ cá nhân với thiết kế hiện đại, tối ưu trải nghiệm UX/UI và hiệu ứng mượt mà.",
      viewSource: "Xem mã nguồn",
      contactTitle: "Thông tin liên hệ",
      contactSubtitle: "Sẵn sàng kết nối cho cơ hội thực tập, cộng tác dự án và trao đổi kỹ thuật.",
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
      brandKicker: "Personal Portfolio",
      brandName: "Nguyen Huu Giau",
      heroEyebrow: "Information Technology - Software Engineering",
      name: "Nguyen Huu Giau",
      heroSummary:
        "I build clean, useful interfaces and connect programming logic with user experience to create profile websites, games, and learning-oriented tools.",
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
      projectsSubtitle: "A selection of projects that highlight my programming ability, problem-solving skills, and structured user flow.",
      project1Title: "Sudoku Game",
      project1Desc: "A Python Sudoku game (Pygame, Tkinter) featuring a backtracking algorithm for random board generation.",
      project2Title: "SummarEase Django",
      project2Desc: "A Django web app that instantly summarizes long-form text into concise and easily digestible content.",
      project3Title: "Fashion Website",
      project3Desc: "A fashion e-commerce website with a complete shopping cart, inventory management, and online payments.",
      project4Title: "Card Profile",
      project4Desc: "A modern personal portfolio designed with optimized UX/UI, clean architecture, and smooth animations.",
      viewSource: "View source code",
      contactTitle: "Contact information",
      contactSubtitle: "Open to internship opportunities, project collaboration, and technical discussion.",
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

  function clampIndex(index) {
    return Math.max(0, Math.min(index, slides.length - 1));
  }

  function syncDots(index) {
    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("active", dotIndex === index);
    });
  }

  function showSlide(index) {
    currentSlide = clampIndex(index);
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

  function applyThemeIcon() {
    themeToggle.innerHTML = document.body.classList.contains("light-mode")
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';
  }

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

  tiltCards.forEach((card) => {
    card.addEventListener("mousemove", (event) => setTilt(event, card));
    card.addEventListener("mouseleave", () => resetTilt(card));
  });

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("light-mode");
      applyThemeIcon();
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
  showSlide(0);
});
