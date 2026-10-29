'use client';

import { useEffect } from 'react';
import { CONFIG } from '../lib/config';

export default function Effects() {
  useEffect(() => {
    const $ = (selector) => document.querySelector(selector);
    const $$ = (selector) => [...document.querySelectorAll(selector)];
    const video = $('#bgv');
    const soundButton = $('#snd');
    video?.play().catch(() => {});
    $('#open')?.addEventListener('click', () => $('#gate')?.classList.add('off'));
    soundButton?.addEventListener('click', () => {
      if (!video) return;
      video.muted = !video.muted;
      soundButton.textContent = video.muted ? '♪' : '◼';
      video.play().catch(() => {});
    });

    const pad = (number) => String(number).padStart(2, '0');
    const tick = () => {
      const elapsed = Math.max(0, Date.now() - new Date(CONFIG.start));
      $('#d').textContent = Math.floor(elapsed / 864e5);
      $('#h').textContent = pad(Math.floor(elapsed / 36e5) % 24);
      $('#m').textContent = pad(Math.floor(elapsed / 6e4) % 60);
      $('#s').textContent = pad(Math.floor(elapsed / 1e3) % 60);
    };
    tick();
    const timer = window.setInterval(tick, 1000);
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('in');
    }), { threshold: 0.18 });
    $$('.rv').forEach((element) => observer.observe(element));

    $$('.ph').forEach((card) => card.addEventListener('click', () => {
      const image = card.querySelector('img');
      const lightboxImage = $('#lb img');
      if (image && lightboxImage) {
        lightboxImage.src = image.currentSrc || image.src;
        $('#lb')?.classList.add('on');
      }
    }));
    $('#lb')?.addEventListener('click', () => $('#lb')?.classList.remove('on'));
    $('#sur')?.addEventListener('click', () => $('#surprise')?.classList.add('on'));
    return () => { window.clearInterval(timer); observer.disconnect(); };
  }, []);
  return null;
}
