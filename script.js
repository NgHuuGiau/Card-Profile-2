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
      brandKicker: "Portfolio Ca Nhan",
      brandName: "Nguyen Huu Giau",
      heroEyebrow: "Sinh vien Cong nghe Thong tin",
      name: "Nguyen Huu Giau",
      heroSummary:
        "Xay dung san pham giao dien gon, ro va huu ich, ket hop tu duy lap trinh voi trai nghiem nguoi dung de tao ra web profile, tro choi va cong cu phuc vu hoc tap.",
      majorLabel: "Chuyen nganh",
      majorValue: "Cong nghe Thong tin",
      schoolLabel: "Hoc tai",
      schoolValue: "Dai hoc Nguyen Tat Thanh",
      skillsTitle: "Ky nang noi bat",
      statProjectValue: "02+",
      statProjectLabel: "Du an da hoan thanh",
      statFocusValue: "UI + Logic",
      statFocusLabel: "Tap trung vao trai nghiem va thuat toan",
      projectsTitle: "Du an tieu bieu",
      projectsSubtitle:
        "Hai du an the hien kha nang lap trinh, trinh bay thong tin va to chuc trai nghiem.",
      project1Title: "Sudoku Game",
      project1Desc:
        "Du an Sudoku duoc phat trien bang Python, ket hop Pygame cho giao dien va Tkinter cho menu. Trong tam cua du an la bai toan tao bang ngau nhien nhung van giai duoc bang backtracking, dong thoi giup nguoi choi kiem tra nuoc di va theo doi tien do.",
      project2Title: "Website Ca Nhan",
      project2Desc:
        "Website profile tap trung vao cach trinh bay thong tin ro rang, nhan dien ca nhan ro net va dieu huong de nguoi xem de theo doi. Muc tieu la tao an tuong nhanh voi nha tuyen dung va cho thay kha nang ket hop giao dien voi noi dung.",
      viewSource: "Xem ma nguon",
      contactTitle: "Thong tin lien he",
      contactSubtitle: "San sang ket noi cho co hoi thuc tap, cong tac du an va trao doi ky thuat.",
      emailLabel: "Email",
      phoneLabel: "Dien thoai",
      addressLabel: "Dia chi",
      addressValue: "TP. Ho Chi Minh, Viet Nam",
      ctaText: "Xem du an moi nhat",
      socialTitle: "Ket noi voi toi",
      socialSubtitle: "Theo doi de cap nhat du an, qua trinh hoc tap va nhung thu nghiem moi.",
      backTopText: "Quay lai gioi thieu",
      scrollHint: "Cuon hoac dung phim mui ten de xem tiep"
    },
    en: {
      brandKicker: "Personal Portfolio",
      brandName: "Nguyen Huu Giau",
      heroEyebrow: "Information Technology Student",
      name: "Nguyen Huu Giau",
      heroSummary:
        "I build clean, useful interfaces and connect programming logic with user experience to create profile websites, games, and learning-oriented tools.",
      majorLabel: "Major",
      majorValue: "Information Technology",
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
