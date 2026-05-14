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
      projectsSubtitle:
        "Hai dự án thể hiện khả năng lập trình, trình bày thông tin và tổ chức trải nghiệm.",
      project1Title: "Sudoku Game",
      project1Desc:
        "Dự án Sudoku được phát triển bằng Python, kết hợp Pygame cho giao diện và Tkinter cho menu. Trọng tâm của dự án là bài toán tạo bảng ngẫu nhiên nhưng vẫn giải được bằng backtracking, đồng thời giúp người chơi kiểm tra nước đi và theo dõi tiến độ.",
      project2Title: "Website Cá Nhân",
      project2Desc:
        "Website profile tập trung vào cách trình bày thông tin rõ ràng, nhận diện cá nhân rõ nét và điều hướng để người xem dễ theo dõi. Mục tiêu là tạo ấn tượng nhanh với nhà tuyển dụng và cho thấy khả năng kết hợp giao diện với nội dung.",
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
      scrollHint: "Cuộn hoặc dùng phím mũi tên để xem tiếp"
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
      projectsSubtitle:
        "Two projects that highlight programming ability, visual presentation, and structured user flow.",
      project1Title: "Sudoku Game",
      project1Desc:
        "The Sudoku project was built in Python with Pygame for the gameplay screen and Tkinter for the menu. Its core challenge was generating random but solvable boards with backtracking, while still giving players validation, guidance, and a clean play flow.",
      project2Title: "Personal Portfolio Website",
      project2Desc:
        "This portfolio site focuses on clear storytelling, stronger personal branding, and section navigation that keeps visitors engaged. The goal is to leave a sharper first impression and show how interface decisions support the content.",
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
      scrollHint: "Scroll or use arrow keys to continue"
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
