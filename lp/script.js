"use strict";

// This prototype never sends form data or stores it in browser storage.
(() => {
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector("#main-nav");
  const mobileQuery = window.matchMedia("(max-width: 700px)");

  const closeMenu = (returnFocus = false) => {
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "メニューを開く");
    navigation.classList.remove("is-open");
    document.body.classList.remove("menu-open");
    if (returnFocus) menuButton.focus();
  };

  menuButton.addEventListener("click", () => {
    const opening = menuButton.getAttribute("aria-expanded") !== "true";
    menuButton.setAttribute("aria-expanded", String(opening));
    menuButton.setAttribute("aria-label", opening ? "メニューを閉じる" : "メニューを開く");
    navigation.classList.toggle("is-open", opening);
    document.body.classList.toggle("menu-open", opening);
  });

  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") closeMenu(true);
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".site-header")) closeMenu();
  });

  mobileQuery.addEventListener("change", () => closeMenu());

  // Keep anchor targets focusable for keyboard users after mobile navigation closes.
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => {
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      }
    });
  });

  const form = document.querySelector("#consultation-form");
  const fields = document.querySelector("#form-fields");
  const themes = Array.from(form.querySelectorAll('input[name="themes"]'));
  const themeError = document.querySelector("#theme-error");
  const reviewButton = document.querySelector("#review-button");
  const dialog = document.querySelector("#review-dialog");
  const reviewContent = document.querySelector("#review-content");
  const formStatus = document.querySelector("#form-status");
  const mobileCta = document.querySelector(".mobile-cta");
  let contactVisible = false;

  function updateCta() {
    const hidden = contactVisible || dialog.open;
    mobileCta.classList.toggle("is-hidden", hidden);
    mobileCta.inert = hidden;
  }

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      contactVisible = entries.some((entry) => entry.isIntersecting);
      updateCta();
    }, { threshold: 0 });
    observer.observe(document.querySelector("#contact"));
  }

  // Disabled in HTML so that JavaScript-disabled browsers cannot submit accidentally.
  fields.disabled = false;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    showReview();
  });

  function validateThemes(showMessage = false) {
    const valid = themes.some((checkbox) => checkbox.checked);
    const message = valid ? "" : "相談テーマを1つ以上選択してください。";
    themes[0].setCustomValidity(message);
    if (showMessage || valid) themeError.textContent = message;
    themes[0].setAttribute("aria-invalid", String(!valid && showMessage));
    return valid;
  }

  themes.forEach((checkbox) => checkbox.addEventListener("change", () => validateThemes(true)));

  function showReview() {
    formStatus.textContent = "";
    // Required text must contain a visible character, not only whitespace.
    ["company", "person"].forEach((name) => {
      const input = form.elements.namedItem(name);
      input.setCustomValidity(input.value.trim() ? "" : "空白以外の文字を入力してください。");
    });
    validateThemes(true);
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const rows = [
      ["会社名", data.get("company")],
      ["お名前", data.get("person")],
      ["お立場", data.get("position")],
      ["メールアドレス", data.get("email")],
      ["相談テーマ", data.getAll("themes").join("、")],
      ["ご相談内容", data.get("message")]
    ];
    reviewContent.replaceChildren();
    rows.forEach(([label, value]) => {
      const row = document.createElement("div");
      const term = document.createElement("dt");
      const description = document.createElement("dd");
      term.textContent = label;
      description.textContent = String(value || "").trim() || "未入力";
      row.append(term, description);
      reviewContent.append(row);
    });
    // Focus the title rather than the bottom action, keeping the demo notice visible.
    const dialogTitle = document.querySelector("#dialog-title");
    dialogTitle.setAttribute("tabindex", "-1");
    dialogTitle.setAttribute("autofocus", "");
    dialog.showModal();
    dialogTitle.focus();
    dialog.scrollTop = 0;
    updateCta();
  }

  ["company", "person"].forEach((name) => {
    form.elements.namedItem(name).addEventListener("input", (event) => event.target.setCustomValidity(""));
  });
  reviewButton.addEventListener("click", showReview);
  document.querySelector("#edit-button").addEventListener("click", () => dialog.close());
  document.querySelector("#finish-button").addEventListener("click", () => {
    dialog.close();
    formStatus.textContent = "デモの確認が完了しました。お申込みは送信されていません。";
    formStatus.setAttribute("tabindex", "-1");
    formStatus.focus({ preventScroll: true });
  });
  dialog.addEventListener("close", () => {
    reviewContent.replaceChildren();
    updateCta();
  });
})();
