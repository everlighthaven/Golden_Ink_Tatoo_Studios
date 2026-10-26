/* Golden Ink Tattoo Studio booking helper.
   Requires config.js to be loaded first.
   Booking requests are not appointment confirmations or payment verification.
*/
(function () {
  "use strict";
  function cfg() { return window.GOLDEN_INK_CONFIG || {}; }

  function message(form, text, error) {
    var node = form.querySelector("[data-booking-message]");
    if (!node) {
      node = document.createElement("p");
      node.setAttribute("data-booking-message", "");
      node.setAttribute("role", "status");
      form.appendChild(node);
    }
    node.textContent = text;
    node.style.color = error ? "#b42318" : "#18794e";
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("form[data-booking-form]").forEach(function (form) {
      form.addEventListener("submit", async function (event) {
        event.preventDefault();
        if (form.reportValidity && !form.reportValidity()) return;
        var endpoint = cfg().bookingFormEndpoint;
        if (!endpoint) {
          message(form, "Booking is not configured. Please email the studio.", true);
          return;
        }
        var button = form.querySelector('[type="submit"]');
        var oldText = button ? button.textContent : "";
        if (button) { button.disabled = true; button.textContent = "Sending request…"; }
        try {
          var response = await fetch(endpoint, {
            method: "POST",
            body: new FormData(form),
            headers: { "Accept": "application/json" }
          });
          if (!response.ok) throw new Error("Request failed");
          message(form, "Your booking request has been sent. This is not an appointment confirmation. The studio will review availability and email you with the appointment details and deposit instructions. Please do not pay until you receive that email.", false);
          form.reset();
        } catch (err) {
          message(form, "We couldn't send your request. Please try again or email " + (cfg().contactEmail || "the studio") + ".", true);
        } finally {
          if (button) { button.disabled = false; button.textContent = oldText || "Submit booking request"; }
        }
      });
    });

    var depositKeys = {
      "100": "paypalDeposit100Link",
      "250": "paypalDeposit250Link",
      "500": "paypalDeposit500Link"
    };
    document.querySelectorAll("[data-deposit-link]").forEach(function (link) {
      var key = depositKeys[link.getAttribute("data-deposit-link")];
      var url = key && cfg()[key];
      if (url) {
        link.href = url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      } else {
        link.hidden = true;
      }
    });

    document.querySelectorAll("[data-studio-email]").forEach(function (el) {
      var email = cfg().contactEmail;
      if (email) {
        if (el.tagName === "A") el.href = "mailto:" + email;
        el.textContent = email;
      }
    });
  });
})();
