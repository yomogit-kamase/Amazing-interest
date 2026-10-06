"use strict";

(() => {
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector("#main-nav");
  const mobileQuery = window.matchMedia("(max-width: 820px)");

  const closeMenu = () => {
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "メニューを開く");
    navigation.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  };

  menuButton.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") !== "true";
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "メニューを閉じる" : "メニューを開く");
    navigation.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-open", open);
  });
  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
  mobileQuery.addEventListener("change", closeMenu);

  const slides = [...document.querySelectorAll(".slide")];
  const dotWrap = document.querySelector(".slider-dots");
  const pauseButton = document.querySelector(".slider-pause");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let index = 0;
  let timer = null;
  let paused = reducedMotion.matches;

  slides.forEach((slide, slideIndex) => {
    const dot = document.createElement("button");
    dot.className = `slider-dot${slideIndex === 0 ? " is-active" : ""}`;
    dot.type = "button";
    dot.setAttribute("aria-label", `${slideIndex + 1}枚目を表示`);
    dot.addEventListener("click", () => {
      showSlide(slideIndex);
      restart();
    });
    dotWrap.append(dot);
  });
  const dots = [...dotWrap.children];

  function showSlide(nextIndex) {
    slides[index].classList.remove("is-active");
    dots[index].classList.remove("is-active");
    index = (nextIndex + slides.length) % slides.length;
    slides[index].classList.add("is-active");
    dots[index].classList.add("is-active");
  }
  function start() {
    clearInterval(timer);
    if (!paused) timer = setInterval(() => showSlide(index + 1), 5200);
  }
  function restart() { if (!paused) start(); }
  document.querySelector(".slider-button.prev").addEventListener("click", () => { showSlide(index - 1); restart(); });
  document.querySelector(".slider-button.next").addEventListener("click", () => { showSlide(index + 1); restart(); });
  pauseButton.addEventListener("click", () => {
    paused = !paused;
    pauseButton.setAttribute("aria-pressed", String(paused));
    pauseButton.textContent = paused ? "再生" : "一時停止";
    start();
  });
  if (paused) {
    pauseButton.setAttribute("aria-pressed", "true");
    pauseButton.textContent = "再生";
  }
  start();

  const form = document.querySelector("#contact-form");
  const status = form.querySelector(".form-status");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    status.textContent = "入力内容を確認しました。制作確認用のため、送信はされていません。";
    status.setAttribute("tabindex", "-1");
    status.focus();
  });

  const contact = document.querySelector("#contact");
  const mobileCta = document.querySelector(".mobile-cta");
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(([entry]) => {
      mobileCta.classList.toggle("is-hidden", entry.isIntersecting);
    }).observe(contact);
  }
})();
