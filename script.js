$(function () {
  // Toggle mobile menu
  $(".menu-btn").click(function () {
    $(".navbar ul").toggleClass("open");
    $("body").toggleClass("no-scroll");
  });

  // Close menu on link click + smooth scroll
  $(".navbar ul li a").click(function (e) {
    e.preventDefault();
    const target = $(this).attr("href");
    const offset = target === "#home" ? 0 : $(target).offset().top - 40;

    $("html, body").animate({ scrollTop: offset }, 500);
    $(".navbar ul li a").removeClass("active");
    $(this).addClass("active");

    // close mobile menu
    $(".navbar ul").removeClass("open");
    $("body").removeClass("no-scroll");
  });

  // Sticky header
  $(window).scroll(function () {
    $(".header-area").toggleClass("sticky", $(this).scrollTop() > 1);
    updateActiveSection();
  });

  // Active section detection
  function updateActiveSection() {
    const scrollPosition = $(window).scrollTop();
    if (scrollPosition === 0) {
      $(".navbar ul li a").removeClass("active");
      $(".navbar ul li a[href='#home']").addClass("active");
      return;
    }
    $("section").each(function () {
      const target = $(this).attr("id"),
        offset = $(this).offset().top,
        height = $(this).outerHeight();
      if (scrollPosition >= offset - 40 && scrollPosition < offset + height - 40) {
        $(".navbar ul li a").removeClass("active");
        $(".navbar ul li a[href='#" + target + "']").addClass("active");
      }
    });
  }

// ScrollReveal animations
ScrollReveal({ distance: "50px", duration: 1200, delay: 100, once: true });
ScrollReveal().reveal(".header a, .profile-photo, .about-content, .experience", { origin: "left" });
ScrollReveal().reveal(".navbar ul, .profile-text, .about-skills, .internship, .education", { origin: "right" });
ScrollReveal().reveal(".project-title, .contact-title, .title", { origin: "top" });
ScrollReveal().reveal(".projects, .contact, .certificate-content", { origin: "bottom" });

// Certificates timeline items (staggered reveal)
ScrollReveal().reveal(".timeline-item", { origin: "bottom", interval: 200 });

// EmailJS integration
(function(){
    emailjs.init("sckMEFfS_3xtyOe7w"); // replace with your EmailJS public key
  })();

  const contactForm = document.getElementById("contactForm");
  const msg = document.getElementById("msg");

  contactForm.addEventListener("submit", function(e) {
    e.preventDefault();
    msg.innerText = "⏳ Sending your message it may take some time...";  
    
    // Send email to YOU (admin)
    emailjs.sendForm("service_exdcu53", "template_wpt1drt", this)
      .then(() => {
        // After admin email, send auto-reply to user
        emailjs.sendForm("service_exdcu53", "template_tg05hgg", this)
          .then(() => {
            msg.innerText = "✅ Message sent successfully! You will get a response within 3 working days.";
            contactForm.reset();
            setTimeout(() => msg.innerText = "", 5000);
          })
          .catch(err => {
            msg.innerText = "❌ Error sending auto-reply.";
            console.error(err);
          });
      })
      .catch(err => {
        msg.innerText = "❌ Error sending message. Try again.";
        console.error(err);
      });
  });

  // -----------------------------------------------------

  // Toggle hidden projects
  $("#see-more-btn").click(function () {
    $(".hidden-project").slideToggle(400);
    $(this).text($(this).text() === "See More" ? "See Less" : "See More");
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".timeline-item");

  function reveal() {
    const trigger = window.innerHeight * 0.85;
    items.forEach((item, i) => {
      const top = item.getBoundingClientRect().top;
      if (top < trigger) {
        setTimeout(() => item.classList.add("show"), i * 150);
      }
    });
  }

  window.addEventListener("scroll", reveal);
  reveal(); // run on page load
});
  // Get the button
const backToTopBtn = document.getElementById("backToTop");

// Show button when scrolling down 200px
window.onscroll = function() {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
};

// Scroll to top when button clicked
backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
