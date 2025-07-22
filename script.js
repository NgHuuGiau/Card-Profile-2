document.addEventListener('DOMContentLoaded', function() {
  const slides = Array.from(document.querySelectorAll('.fade-in'));
  let current = 0;
  let isScrolling = false;

  /* ===== Chức năng chuyển đổi trang (slide) ===== */
  // Hiển thị một trang cụ thể (dựa vào chỉ mục) và ẩn các trang còn lại
  function showSlide(index) {
    if (index >= slides.length) index = slides.length - 1;
    if (index < 0) index = 0;
    slides.forEach((slide, i) => {
      slide.classList.toggle('visible', i === index);
    });
    current = index;
  }

  /* ===== Xử lý sự kiện cuộn chuột để chuyển trang ===== */
  // Ngăn chặn cuộn liên tục và chuyển sang trang kế tiếp hoặc trang trước đó
  function handleScroll(e) {
    if (isScrolling) return;
    isScrolling = true;
    const direction = e.deltaY > 0 ? 1 : -1;
    showSlide(current + direction);
    setTimeout(() => { isScrolling = false; }, 800);
  }

  /* ===== Xử lý sự kiện nhấn phím mũi tên để chuyển trang ===== */
  // Chuyển trang khi người dùng nhấn phím mũi tên lên hoặc xuống
  function handleKeyDown(e) {
    if (e.key === 'ArrowDown') {
      showSlide(current + 1);
      e.preventDefault();
    } else if (e.key === 'ArrowUp') {
      showSlide(current - 1);
      e.preventDefault();
    }
  }

  window.addEventListener('wheel', handleScroll, { passive: false });
  window.addEventListener('keydown', handleKeyDown);

  /* ===== Xử lý nút "Về đầu trang" ===== */
  // Cuộn trở lại trang đầu tiên với hiệu ứng mượt mà
  const backBtn = document.getElementById('backToFirstPage');
  if (backBtn) {
    backBtn.addEventListener('click', function() {
      let currentSlideIndex = slides.length - 1;

      const slideUpToPrev = () => {
        if (currentSlideIndex > 0) {
          slides[currentSlideIndex].classList.add('slide-up-out-smooth');
          setTimeout(() => {
            slides[currentSlideIndex].classList.remove('slide-up-out-smooth');
            currentSlideIndex--;
            showSlide(currentSlideIndex);
            slideUpToPrev(); // Đệ quy để xử lý trang tiếp theo
          }, 1000);
        }
      };

      slideUpToPrev();
    });
  }

  /* ===== Nút chuyển đổi giao diện (theme) ===== */
  // Thêm hoặc xóa class 'light-mode' trên body để thay đổi giao diện
  const toggle = document.getElementById('theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      document.body.classList.toggle('light-mode');
      toggle.innerHTML = document.body.classList.contains('light-mode')
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';
    });
  }

  /* ===== Nút chuyển đổi ngôn ngữ ===== */
  // Dựa vào biến isVietnamese để thay đổi nội dung văn bản trên trang
  const langToggle = document.getElementById('lang-toggle');
  let isVietnamese = true;
  if (langToggle) {
    langToggle.addEventListener('click', () => {
      isVietnamese = !isVietnamese;

      /* ===== Trang 1: Thông tin cơ bản và Kỹ năng ===== */
      document.querySelector('.profile-basic .name').textContent = isVietnamese ? 'Nguyễn Hữu Giàu' : 'Nguyen Huu Giau';
      document.querySelector('.profile-basic .major').textContent = isVietnamese ? 'Chuyên ngành Công nghệ Thông tin' : 'Information Technology Major';
      document.querySelector('.profile-basic .school').textContent = isVietnamese ? 'Đại học Nguyễn Tất Thành (Viện Quốc Tế)' : 'Nguyen Tat Thanh University (International Institute)';
      document.querySelector('.skills-title').textContent = isVietnamese ? 'Kỹ Năng' : 'Skills';

      /* ===== Trang 2: Dự án nổi bật ===== */
      document.querySelector('.project-page h2').textContent = isVietnamese ? 'Dự Án' : 'Projects';
      document.querySelector('.project-item:nth-child(1) .project-title').textContent = isVietnamese ? 'Trò Chơi Sudoku' : 'Sudoku Game';
      document.querySelector('.project-item:nth-child(2) .project-title').textContent = isVietnamese ? 'Website Hồ Sơ Cá Nhân' : 'Personal Portfolio Website';
      document.querySelector('.project-item:nth-child(1) .project-link').innerHTML = isVietnamese ? '<i class="fab fa-github"></i> Xem mã nguồn' : '<i class="fab fa-github"></i> View source code';
      document.querySelector('.project-item:nth-child(2) .project-link').innerHTML = isVietnamese ? '<i class="fab fa-github"></i> Xem mã nguồn' : '<i class="fab fa-github"></i> View source code';
      document.querySelectorAll('.project-desc').forEach(function(desc) {
        desc.textContent = isVietnamese ? desc.getAttribute('data-vi') : desc.getAttribute('data-en');
      });

      /* ===== Trang 3: Thông tin liên hệ cá nhân ===== */
      document.querySelector('.personal-info h2').textContent = isVietnamese ? 'Thông Tin Liên Hệ' : 'Contact Information';
      document.querySelector('.personal-info ul li strong').textContent = isVietnamese ? 'Email:' : 'Email:';
      document.querySelector('.personal-info ul li:nth-child(2) strong').textContent = isVietnamese ? 'Số điện thoại:' : 'Phone:';
      document.querySelector('.personal-info ul li:nth-child(3) strong').textContent = isVietnamese ? 'Địa chỉ:' : 'Address:';
      document.querySelector('.personal-info ul li:nth-child(3) .contact-text').textContent = isVietnamese ? 'TP. Hồ Chí Minh, Việt Nam' : 'Ho Chi Minh City, Vietnam';

      /* ===== Trang 4: Liên kết mạng xã hội ===== */
      document.querySelector('.social-media h2').textContent = isVietnamese ? 'Kết Nối Với Tôi' : 'Connect With Me';
      document.querySelector('.social-media p').textContent = isVietnamese ? 'Hãy theo dõi tôi trên các nền tảng mạng xã hội:' : 'Follow me on social platforms:';

      /* ===== Nút Kêu gọi hành động (CTA) ===== */
      document.querySelector('.cta-button').innerHTML = isVietnamese
          ? '<i class="fas fa-star"></i> Xem dự án mới nhất'
          : '<i class="fas fa-star"></i> View Latest Project';
    });
  }

  // Hiển thị trang đầu tiên khi tải xong
  showSlide(0);
});