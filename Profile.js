document.addEventListener('DOMContentLoaded', function() {
  const slides = Array.from(document.querySelectorAll('.fade-in'));
  let current = 0;
  let isScrolling = false;
  function showSlide(index) {
    if (index >= slides.length) index = slides.length - 1;
    if (index < 0) index = 0;
    slides.forEach((slide, i) => {
      slide.classList.toggle('visible', i === index);
    });
    current = index;
  }
  function handleScroll(e) {
    if (isScrolling) return;
    isScrolling = true;
    const direction = e.deltaY > 0 ? 1 : -1;
    showSlide(current + direction);
    setTimeout(() => { isScrolling = false; }, 800);
  }
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
          }, 500);
        }
      };
      
      slideUpToPrev();
    });
  }
  const toggle = document.getElementById('theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      document.body.classList.toggle('light-mode');
      toggle.innerHTML = document.body.classList.contains('light-mode')
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';
    });
  }
  const langToggle = document.getElementById('lang-toggle');
  let isVietnamese = true;
  if (langToggle) {
    langToggle.addEventListener('click', () => {
      isVietnamese = !isVietnamese;
      document.querySelector('.profile-basic .name').textContent = isVietnamese ? 'Nguyễn Hữu Giàu' : 'Nguyen Huu Giau';
      document.querySelector('.profile-basic .major').textContent = isVietnamese ? 'Chuyên ngành Công nghệ Thông tin' : 'Information Technology Major';
      document.querySelector('.profile-basic .school').textContent = isVietnamese ? 'Đại Học Nguyễn Tất Thành (Viện Quốc Tế)' : 'Nguyen Tat Thanh University (International Institute)';
      document.querySelector('.skills-title').textContent = isVietnamese ? 'Kỹ Năng' : 'Skills';
      document.querySelector('.project-page h2').textContent = isVietnamese ? 'Dự Án' : 'Projects';

      
      document.querySelector('.personal-info h2').textContent = isVietnamese ? 'Thông Tin Cá Nhân' : 'Personal Information';
      document.querySelector('.personal-info ul li strong').textContent = isVietnamese ? 'Email:' : 'Email:';
      document.querySelector('.personal-info ul li:nth-child(2) strong').textContent = isVietnamese ? 'Số điện thoại:' : 'Phone:';
      document.querySelector('.personal-info ul li:nth-child(3) strong').textContent = isVietnamese ? 'Địa chỉ:' : 'Address:';
      document.querySelector('.personal-info ul li:nth-child(3) .contact-text').textContent = isVietnamese ? 'TP. Hồ Chí Minh, Việt Nam' : 'Ho Chi Minh City, Vietnam';
      document.querySelector('.social-media h2').textContent = isVietnamese ? 'Theo dõi tôi' : 'Follow Me';
      document.querySelector('.social-media p').textContent = isVietnamese ? 'Hãy theo dõi tôi trên các nền tảng mạng xã hội:' : 'Follow me on social platforms:';
      document.querySelector('.cta-button').innerHTML = isVietnamese
        ? '<i class="fas fa-star"></i> Xem ngay dự án mới nhất!'
        : '<i class="fas fa-star"></i> See the latest project now!';
      document.querySelectorAll('.project-desc').forEach(function(desc) {
        desc.textContent = isVietnamese ? desc.getAttribute('data-vi') : desc.getAttribute('data-en');
      });
    });
  }
  showSlide(0);
});