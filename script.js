$(document).ready(function () {
  // Toggle mobile menu
$(".menu-btn").click(function () {
  $(".navbar").toggleClass("open");
  $("body").toggleClass("no-scroll");
});


  // Sticky header
  $(window).scroll(function () {
    if ($(this).scrollTop() > 1) {
      $(".header-area").addClass("sticky");
    } else {
      $(".header-area").removeClass("sticky");
    }

    // Update active section
    updateActiveSection();
  });

  // Smooth scroll to section & active link update
  $(".header ul li a").click(function (e) {
    e.preventDefault();

    var target = $(this).attr("href");

    if (target === "#home") {
      $("html, body").animate(
        {
          scrollTop: 0,
        },
        500
      );
    } else {
      var offset = $(target).offset().top - 40;
      $("html, body").animate(
        {
          scrollTop: offset,
        },
        500
      );
    }

    $(".header ul li a").removeClass("active");
    $(this).addClass("active");

    // Close mobile menu after clicking
    $(".header ul").removeClass("open");
  });

  // Initial content reveal
  ScrollReveal({
    distance: "100px",
    duration: 2000,
    delay: 200,
  });

  ScrollReveal().reveal(".header a, .profile-photo, .about-content, .education", {
    origin: "left",
  });
  ScrollReveal().reveal(".header ul, .profile-text, .about-skills, .internship", {
    origin: "right",
  });
  ScrollReveal().reveal(".project-title, .contact-title", {
    origin: "top",
  });
  ScrollReveal().reveal(".projects, .contact", {
    origin: "bottom",
  });


  // contact form response on whatsapp 

  document.getElementById("whatsappForm").addEventListener("submit", function(e) {
        e.preventDefault();

        var name = document.getElementById("name").value.trim();
        var email = document.getElementById("email").value.trim();
        var subject = document.getElementById("subject").value.trim();
        var message = document.getElementById("message").value.trim();

        var fullMessage = `Name: ${name}%0AEmail: ${email}%0ASubject: ${subject}%0AMessage: ${message}`;

        var phoneNumber = "918447564666"; // ← Replace with your WhatsApp number (with country code)
        var whatsappURL = `https://wa.me/${phoneNumber}?text=${fullMessage}`;

        window.open(whatsappURL, '_blank');
    });

//   // Google Sheets contact form
//   const scriptURL =
//     "https://script.google.com/macros/s/AKfycbzUSaaX3XmlE5m9YLOHOBrRuCh2Ohv49N9bs4bew7xPd1qlgpvXtnudDs5Xhp3jF-Fx/exec";
//   const form = document.forms["submitToGoogleSheet"];
//   const msg = document.getElementById("msg");

//   form.addEventListener("submit", (e) => {
//     e.preventDefault();
//     fetch(scriptURL, { method: "POST", body: new FormData(form) })
//       .then((response) => {
//         msg.innerHTML = "Message sent successfully";
//         setTimeout(function () {
//           msg.innerHTML = "";
//         }, 5000);
//         form.reset();
//       })
//       .catch((error) => console.error("Error!", error.message));
//   });
// });

// Update active header link on scroll
function updateActiveSection() {
  var scrollPosition = $(window).scrollTop();

  if (scrollPosition === 0) {
    $(".header ul li a").removeClass("active");
    $(".header ul li a[href='#home']").addClass("active");
    return;
  }

  $("section").each(function () {
    var target = $(this).attr("id");
    var offset = $(this).offset().top;
    var height = $(this).outerHeight();

    if (
      scrollPosition >= offset - 40 &&
      scrollPosition < offset + height - 40
    ) {
      $(".header ul li a").removeClass("active");
      $(".header ul li a[href='#" + target + "']").addClass("active");
    }
  });
}});
