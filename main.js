// Cursor-reactive gradient only (web overlay removed)
(function () {
  var targetX = 50; // percent of viewport width
  var targetY = 50; // percent of viewport height
  var currentX = 50;
  var currentY = 50;
  var rafId = null;
  var followStrength = 0.045; // softer easing for gradient movement

  function onMove(clientX, clientY) {
    var w = window.innerWidth || document.documentElement.clientWidth;
    var h = window.innerHeight || document.documentElement.clientHeight;
    targetX = (clientX / w) * 100;
    targetY = (clientY / h) * 100;
    if (!rafId) rafId = requestAnimationFrame(tick);
  }

  function tick(now) {
    // ease gradient toward cursor
    currentX += (targetX - currentX) * followStrength;
    currentY += (targetY - currentY) * followStrength;
    document.documentElement.style.setProperty('--bgX', currentX.toFixed(2) + '%');
    document.documentElement.style.setProperty('--bgY', currentY.toFixed(2) + '%');
    rafId = requestAnimationFrame(tick);
  }

  window.addEventListener('mousemove', function (e) {
    onMove(e.clientX, e.clientY);
  }, { passive: true });

  window.addEventListener('touchmove', function (e) {
    if (e.touches && e.touches[0]) {
      onMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });

  // canvas setup

  // kick off
  rafId = requestAnimationFrame(tick);

  // Back to Top behavior
  var topBtn = document.getElementById('backToTop');
  if (topBtn) {
    var toggleTopBtn = function(){
      if (window.scrollY > 300) {
        topBtn.classList.add('show');
      } else {
        topBtn.classList.remove('show');
      }
    };
    window.addEventListener('scroll', toggleTopBtn, { passive: true });
    toggleTopBtn();

    topBtn.addEventListener('click', function(){
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Smooth scrolling for navigation links
  var navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
  navLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      var href = this.getAttribute('href');
      if (href !== '#' && href !== '') {
        e.preventDefault();
        var targetId = href.substring(1);
        var targetElement = document.getElementById(targetId);
        if (targetElement) {
          var navHeight = document.querySelector('.navbar').offsetHeight;
          var targetPosition = targetElement.offsetTop - navHeight;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
})();


