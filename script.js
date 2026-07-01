document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  const navToggle = document.querySelector(".nav-toggle");

  if (navbar && navToggle) {
    navToggle.addEventListener("click", () => {
      const isOpen = navbar.classList.toggle("menu-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    document.querySelectorAll(".nav-mobile a").forEach((link) => {
      link.addEventListener("click", () => {
        navbar.classList.remove("menu-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const feedbackForm = document.getElementById("feedback-form");
  if (feedbackForm) {
    const status = document.getElementById("form-status");
    feedbackForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const submitBtn = feedbackForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";
      status.className = "form-status";

      try {
        const response = await fetch(feedbackForm.action, {
          method: "POST",
          body: new FormData(feedbackForm),
          headers: { Accept: "application/json" },
        });

        if (response.ok) {
          status.textContent = "Thanks! Your message has been sent.";
          status.classList.add("visible", "success");
          feedbackForm.reset();
        } else {
          throw new Error("Request failed");
        }
      } catch (err) {
        status.textContent =
          "Something went wrong sending your message. Please email us directly instead.";
        status.classList.add("visible", "error");
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "Send feedback";
      }
    });
  }

  document.querySelectorAll(".faq-item").forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    question.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");

      document.querySelectorAll(".faq-item.open").forEach((openItem) => {
        if (openItem !== item) {
          openItem.classList.remove("open");
          openItem.querySelector(".faq-answer").style.maxHeight = null;
        }
      });

      if (isOpen) {
        item.classList.remove("open");
        answer.style.maxHeight = null;
      } else {
        item.classList.add("open");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });
});
