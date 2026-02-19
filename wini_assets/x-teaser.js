/* eslint-disable */
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

window.customElements.define(
  'x-teaser',
  class extends HTMLElement {
    constructor() {
      super();
      this.classList.add('swiper');
      this.swiper = new Swiper(this, {
        modules: [Navigation],
        loop: true,
        navigation: {
          prevEl: this.querySelector('.swiper-button-prev'),
          nextEl: this.querySelector('.swiper-button-next'),
        },
      });
    }
  }
);

window.preloadNextVideo = function () {
  const number = window.headerVideoPlaying + 1;
  let video = document.querySelectorAll('.teaser-slide video')[number];
  if (video) {
    let currentSrc = video.currentSrc;
    if (!window.videosLoaded.includes(currentSrc)) {
      window.videosLoaded.push(currentSrc);
      video.removeAttribute('poster');
      video.load();
      video.removeEventListener('ended', playNextVideo, false);
      video.addEventListener('ended', playNextVideo, false);
    }
  }
};

window.playNextVideo = function () {
  let nowPlaying = document.querySelectorAll('.teaser-slide video')[
    window.headerVideoPlaying
  ];
  if (nowPlaying) {
    nowPlaying.pause();
    nowPlaying.currentTime = 0;
    nowPlaying.style.display = 'none';
  }
  window.headerVideoPlaying++;
  let video = document.querySelectorAll('.teaser-slide video')[
    window.headerVideoPlaying
  ];
  if (!video) {
    window.headerVideoPlaying = 0;
    // alle anderen einmal ausblenden
    //document.querySelectorAll('.teaser-slide video')
  }
  video = document.querySelectorAll('.teaser-slide video')[
    window.headerVideoPlaying
  ];
  if (video) {
    video.currentTime = 0;
    video.style.display = 'block';
    video.play();
    preloadNextVideo();
  } else {
    console.log('no video');
  }
};

window.headerVideoPlaying = 0;
window.videosLoaded = [];
const teasers = document.querySelectorAll('.teaser-slide');

teasers.forEach((teaser) => {
  const videos = teaser.querySelectorAll('video');
  if (videos.length > 1) {
    // wir muessen die Videos nacheinander abspielen

    const video = videos[0];
    video.currentTime = 0;
    const currentSrc = video.currentSrc;
    window.videosLoaded.push(currentSrc);
    video.setAttribute('preload', 'auto');
    video.style.display = 'block';
    video.play();
    video.addEventListener('ended', playNextVideo, false);
    preloadNextVideo();
  }
});
