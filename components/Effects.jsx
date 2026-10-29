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
    $('#open')?.addEventListener('click', () => {
      $('#gate')?.classList.add('off');
      if (!video) return;
      video.muted = false;
      video.volume = 0.55;
      soundButton.textContent = '♫';
      video.play().catch(() => {
        video.muted = true;
        soundButton.textContent = '♪';
        video.play().catch(() => {});
      });
    });
    soundButton?.addEventListener('click', () => {
      if (!video) return;
      video.muted = !video.muted;
      soundButton.textContent = video.muted ? '♪' : '♫';
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

    const flipCard = (card) => card.classList.toggle('flipped');
    $$('.ph').forEach((card) => {
      card.addEventListener('click', () => flipCard(card));
      card.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          flipCard(card);
        }
      });
    });
    $('#sur')?.addEventListener('click', () => $('#surprise')?.classList.add('on'));
    return () => { window.clearInterval(timer); observer.disconnect(); };
  }, []);
  return null;
}
