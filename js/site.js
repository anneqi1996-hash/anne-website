/* ============================================================
   Site behaviour — plain ES5-compatible script, no dependencies.
   Responsible for:
     1. injecting brand / domain / email / phone / address from
        site.config.js (the only place they are defined)
     2. desktop mega menu + mobile navigation
     3. RFQ prefill (?category=slug) and client-side field checks
   ============================================================ */
(function () {
  "use strict";

  var SITE = window.SITE || {};

  /* ---------- helpers ---------- */
  function qs(sel, root) { return (root || document).querySelector(sel); }
  function qsa(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function categoryBySlug(slug) {
    var list = SITE.categories || [];
    for (var i = 0; i < list.length; i++) { if (list[i].slug === slug) return list[i]; }
    return null;
  }
  function addressText() {
    var a = SITE.address || {};
    var parts = [];
    if (a.line1) parts.push(a.line1);
    if (a.city) parts.push(a.city);
    if (a.region) parts.push(a.region);
    if (a.country) parts.push(a.country);
    return parts.join(", ");
  }

  /* ---------- 1. brand + contact injection ---------- */
  function injectBrand() {
    var brand = SITE.brand || {};
    var map = {
      brand: brand.name,
      brandShort: brand.short,
      legal: brand.legal,
      domain: SITE.domain,
      email: SITE.email,
      hours: SITE.hours,
      address: addressText(),
      phone: SITE.phone || "Number on request",
      year: String(new Date().getFullYear())
    };

    Object.keys(map).forEach(function (key) {
      qsa('[data-site="' + key + '"]').forEach(function (el) {
        el.textContent = map[key] || "";
        if (el.tagName === "A" && key === "email" && SITE.email) {
          el.setAttribute("href", "mailto:" + SITE.email);
        }
        if (el.tagName === "A" && key === "domain" && SITE.domain) {
          el.setAttribute("href", "https://" + SITE.domain);
          el.setAttribute("target", "_blank");
          el.setAttribute("rel", "noopener");
        }
      });
    });

    // title suffix — keeps page <title> free of hard-coded brand text
    if (brand.name && document.title.indexOf(brand.name) === -1) {
      document.title = document.title + " · " + brand.name;
    }

    // phone links
    qsa('[data-site-link="phone"]').forEach(function (el) {
      if (SITE.phone) {
        el.setAttribute("href", "tel:" + SITE.phone.replace(/[^+\d]/g, ""));
      } else {
        el.classList.add("is-pending");
        el.removeAttribute("href");
        el.setAttribute("aria-disabled", "true");
      }
    });

    // whatsapp links
    qsa('[data-site-link="whatsapp"]').forEach(function (el) {
      if (SITE.whatsapp) {
        el.setAttribute("href", "https://wa.me/" + String(SITE.whatsapp).replace(/[^\d]/g, ""));
        el.setAttribute("target", "_blank");
        el.setAttribute("rel", "noopener");
      } else {
        el.classList.add("is-pending");
        el.removeAttribute("href");
        el.setAttribute("aria-disabled", "true");
        var pendingLabel = el.getAttribute("data-pending-label");
        if (pendingLabel) { el.textContent = pendingLabel; }
        el.setAttribute("title", "WhatsApp number not issued yet — add it in js/site.config.js");
      }
    });
  }

  /* ---------- 2. navigation ---------- */
  function initNav() {
    var header = qs(".site-header");
    if (!header) return;
    var toggle = qs("[data-nav-toggle]", header);
    var trigger = qs("[data-mega-trigger]", header);
    var mega = qs("[data-mega]", header);
    var isDesktop = function () { return window.matchMedia("(min-width: 1024px)").matches; };

    function closeMega() {
      if (!mega) return;
      mega.classList.remove("is-open");
      if (trigger) trigger.setAttribute("aria-expanded", "false");
    }
    function openMega() {
      if (!mega) return;
      mega.classList.add("is-open");
      if (trigger) trigger.setAttribute("aria-expanded", "true");
    }
    function closeDrawer() {
      header.classList.remove("is-open");
      if (toggle) toggle.setAttribute("aria-expanded", "false");
      document.documentElement.style.overflow = "";
      closeMega();
    }

    if (toggle) {
      toggle.addEventListener("click", function () {
        var open = header.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
        document.documentElement.style.overflow = open && !isDesktop() ? "hidden" : "";
        if (!open) closeMega();
      });
    }

    if (trigger && mega) {
      trigger.addEventListener("click", function (e) {
        e.preventDefault();
        if (mega.classList.contains("is-open")) { closeMega(); } else { openMega(); }
      });
      if (header) {
        header.addEventListener("mouseenter", function () { if (isDesktop()) openMega(); });
        header.addEventListener("mouseleave", function () { if (isDesktop()) closeMega(); });
      }
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") { closeMega(); if (header.classList.contains("is-open")) closeDrawer(); }
      });
      document.addEventListener("click", function (e) {
        if (!header.contains(e.target)) closeMega();
      });
      mega.addEventListener("click", function (e) {
        if (e.target.tagName === "A" && !isDesktop()) closeDrawer();
      });
    }

    window.addEventListener("resize", function () {
      if (isDesktop()) {
        header.classList.remove("is-open");
        document.documentElement.style.overflow = "";
        if (toggle) toggle.setAttribute("aria-expanded", "false");
      } else {
        closeMega();
      }
    });
  }

  /* ---------- 3. forms ---------- */
  function initQuoteShortForm() {
    qsa("[data-quote-short]").forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var cat = qs("[name=category]", form);
        var qty = qs("[name=quantity]", form);
        var params = [];
        if (cat && cat.value) params.push("category=" + encodeURIComponent(cat.value));
        if (qty && qty.value) params.push("quantity=" + encodeURIComponent(qty.value));
        var url = form.getAttribute("data-target") || "/request-a-quote";
        window.location.href = url + (params.length ? "?" + params.join("&") : "") + "#rfq-form";
      });
    });
  }

  function initRfqPrefill() {
    var select = qs("#rfq-category");
    if (!select) return;
    var params = new URLSearchParams(window.location.search);
    var slug = params.get("category");
    var qty = params.get("quantity");
    if (slug) {
      select.value = slug;
      var note = qs("[data-prefill-note]");
      if (note) {
        var cat = categoryBySlug(slug);
        note.textContent = "Preselected: " + (cat ? cat.name : slug) + " — change it if you need another range.";
        note.hidden = false;
      }
    }
    if (qty) {
      var qtyField = qs("#rfq-quantity");
      if (qtyField && !qtyField.value) qtyField.value = qty;
    }
  }

  /* upload field is a paid-plan feature: hide it and point at the inbox instead */
  function initUploadToggle() {
    var forms = SITE.forms || {};
    if (forms.uploadsEnabled) return;
    qsa("[data-upload-field]").forEach(function (el) { el.hidden = true; });
    // a disabled input is left out of FormData, so no empty file part is posted
    qsa("[data-upload-field] input[type=file]").forEach(function (el) { el.disabled = true; });
    qsa("[data-upload-note]").forEach(function (el) {
      var mail = "mailto:" + SITE.email;
      el.innerHTML = "Attachments are not accepted on this form yet. Email drawings or photos to " +
        '<a href="' + mail + '">' + SITE.email + "</a> and mention your company name.";
      el.hidden = false;
    });
  }

  function showStatus(form, message, isError) {
    var status = qs("[data-form-status]", form);
    if (!status) return;
    status.hidden = false;
    status.className = "form__status" + (isError ? " form__status--error" : "");
    status.innerHTML = message;
  }

  function initValidation() {
    qsa("[data-validate]").forEach(function (form) {
      var endpoint = (SITE.forms || {}).rfqEndpoint;
      var button = qs("[type=submit]", form);
      var success = form.querySelector("[data-form-success]");
      var sending = false;

      form.addEventListener("submit", function (e) {
        e.preventDefault();
        if (sending) return;

        // honeypot: a real visitor never fills this, so stop here quietly
        var trap = form.querySelector('[name="_gotcha"]');
        if (trap && trap.value) return;

        var ok = true;
        qsa("[required]", form).forEach(function (field) {
          if (field.hidden || field.offsetParent === null) return;
          var wrap = field.closest(".field");
          var valid = field.checkValidity() && String(field.value || "").trim() !== "";
          if (wrap) wrap.classList.toggle("field--error", !valid);
          if (!valid && ok) { field.focus(); ok = false; }
        });
        if (!ok) return;

        if (!endpoint) {
          showStatus(form, "The form endpoint is not configured. Please email " +
            '<a href="mailto:' + SITE.email + '">' + SITE.email + "</a>.", true);
          return;
        }

        var data = new FormData(form);
        var category = String(data.get("category") || "");
        data.append("_subject", "Website RFQ" + (category ? " - " + category : ""));

        sending = true;
        if (button) { button.disabled = true; button.setAttribute("data-label", button.textContent); button.textContent = "Sending..."; }
        var status = qs("[data-form-status]", form);
        if (status) { status.hidden = true; status.textContent = ""; }
        if (success) success.hidden = true;

        fetch(endpoint, {
          method: "POST",
          body: data,
          headers: { "Accept": "application/json" }
        })
          .then(function (response) {
            return response.json().catch(function () { return {}; }).then(function (body) {
              return { ok: response.ok, status: response.status, body: body };
            });
          })
          .then(function (result) {
            if (!result.ok) {
              var detail = "";
              if (result.body && result.body.errors && result.body.errors.length) {
                detail = result.body.errors.map(function (item) { return item.message; }).join("; ");
              }
              throw new Error(detail || ("HTTP " + result.status));
            }
            form.reset();
            qsa(".field--error", form).forEach(function (el) { el.classList.remove("field--error"); });
            if (success) {
              success.hidden = false;
              success.scrollIntoView({ block: "center", behavior: "smooth" });
            }
          })
          .catch(function (error) {
            showStatus(form,
              "Sorry, the request did not go through (" + String(error.message || "network error") +
              "). Please try again, or email the same details to " +
              '<a href="mailto:' + SITE.email + '">' + SITE.email + "</a>.", true);
          })
          .then(function () {
            sending = false;
            if (button) {
              button.disabled = false;
              button.textContent = button.getAttribute("data-label") || "Send request";
            }
          });
      });

      qsa("input, select, textarea", form).forEach(function (field) {
        field.addEventListener("input", function () {
          var wrap = field.closest(".field");
          if (wrap) wrap.classList.remove("field--error");
        });
      });
    });
  }

  /* ---------- boot ---------- */
  function boot() {
    injectBrand();
    initNav();
    initQuoteShortForm();
    initRfqPrefill();
    initUploadToggle();
    initValidation();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
