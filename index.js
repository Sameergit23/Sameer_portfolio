// script.js
setTimeout(() => {
  document.getElementById('intro').style.display = 'none';
  document.getElementById('main-content').style.display = 'block';
}, 4000);


const circles = document.querySelectorAll('.circle');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const circle = entry.target;
    const target = parseInt(circle.dataset.percent);
    if (entry.isIntersecting) {
      let current = 0;
      const interval = setInterval(() => {
        if (current >= target) {
          clearInterval(interval);
        } else {
          current++;
          circle.style.setProperty('--percent', current);
        }
      }, 10);
      circle.dataset.animating = 'true';
    } else {
      // Reset when out of view
      circle.style.setProperty('--percent', 0);
      circle.dataset.animating = 'false';
    }
  });
}, { threshold: 0.5 });
circles.forEach(circle => observer.observe(circle));

const contactBtn = document.getElementById('contactBtn');
    const contactForm = document.getElementById('contactForm');
    const popup = document.getElementById('popup');

    contactBtn.addEventListener('click', () => {
      contactBtn.classList.add('hidden');
      contactForm.classList.add('open');
    });

    function closeForm() {
      contactForm.classList.remove('open');
      contactBtn.classList.remove('hidden');
    }

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault(); // Prevent default form submit

      const formData = new FormData(contactForm);

      fetch("https://formsubmit.co/ajax/saimpersonal23@gmail.com", {
        method: "POST",
        headers: { 'Accept': 'application/json' },
        body: formData
      })
      .then(response => {
        if (response.ok) {
          popup.classList.add("show");
          contactForm.reset();
          setTimeout(() => popup.classList.remove("show"), 3000);
        } else {
          alert("Failed to send message.");
        }
      })
      .catch(error => {
        alert("Something went wrong.");
        console.error(error);
      });
    });