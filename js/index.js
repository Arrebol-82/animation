// 获取页面元素
const doms = {
  body: document.querySelector('body'),
  scrollDist: document.querySelector('.scrollDist'),
  main: document.querySelector('main'),
  mainText: document.querySelector('main svg g text'),
  article: document.querySelector('.article'),
  iconfontLeft: document.querySelector('.article i.left'),
  iconfontRight: document.querySelector('.article i.right'),
  bear: document.querySelector('.article .bear'),
  cloud: document.querySelector('.article .cloud'),
  mainBackground: document.querySelector('main .background'),
  conter: document.querySelector('.conter'),
  sectionContainer: document.querySelector('.section .container'),
  sectionIframe: document.querySelector('.section .container iframe')
};

if (history.scrollRestoration) {
  history.scrollRestoration = "manual";
}

// 注册 SplitText 插件
gsap.registerPlugin(SplitText, ScrollTrigger);

// 开始界面
setTimeout(() => {
  doms.conter.style.opacity = '0';
  doms.body.classList.remove('hidder');
}, 4200);

gsap.timeline({
  scrollTrigger: {
    trigger: '.scrollDist',
    start: '0 0',
    end: '100% 100%',
    scrub: 1
  }
})
  .fromTo('.sky', { y: 0 }, { y: -200 }, 0)
  .fromTo('.cloud1', { y: 100 }, { y: -800 }, 0)
  .fromTo('.cloud2', { y: -150 }, { y: -500 }, 0)
  .fromTo('.cloud3', { y: -50 }, { y: -650 }, 0)
  .fromTo('.mountBg', { y: -10 }, { y: -100 }, 0)
  .fromTo('.mountMg', { y: -30 }, { y: -250 }, 0)
  .fromTo('.mountFg', { y: -50 }, { y: -600 }, 0);

const arrowBtn = document.querySelector('#arrow-btn');

arrowBtn.addEventListener('mouseenter', () => {
  gsap.to('.arrow', { y: 10, duration: 0.8, ease: 'back.inOut(3)', overwrite: 'auto' });
});

arrowBtn.addEventListener('mouseleave', () => {
  gsap.to('.arrow', { y: 0, duration: 0.5, ease: 'power3.out', overwrite: 'auto' });
});

arrowBtn.addEventListener('click', () => {
  gsap.to(window, { scrollTo: innerHeight, duration: 1.5, ease: 'power1.inOut' });
});

// 先隐藏背景
doms.mainBackground.style.opacity = 0;
// 获取视口高度
let threshold = Math.floor(window.innerHeight / 0.7);

// 当监听视口
window.addEventListener('resize', () => {
  threshold = Math.floor(window.innerHeight / 0.7);
});

document.addEventListener('scroll', () => {
  if (document.documentElement.scrollTop > threshold) {
    doms.conter.style.display = 'none';
    doms.mainText.style.opacity = 0;
    doms.iconfontLeft.style.opacity = 0;
    doms.iconfontRight.style.opacity = 0;
    doms.article.style.width = '100%';
    doms.article.style.height = '58vw';
    doms.bear.style.transform = `translateX(45vw)`;
  } else {
    doms.mainText.style.opacity = 1;
    doms.iconfontLeft.style.opacity = 1;
    doms.iconfontRight.style.opacity = 1;
    doms.article.style.width = '5.2vw';
    doms.article.style.height = '5.2vw';
    doms.bear.style.opacity = 1;
    doms.mainBackground.style.opacity = 0;
  }

  doms.mainBackground.style.opacity = document.documentElement.scrollTop > (threshold + 400) ? 1 : 0;
});

/* 第三部分背景图 */

// 创建 SplitText 实例
let split = SplitText.create(".text", {
  type: "chars, words, lines",
  mask: "lines"
});

// 创建 GSAP 动画
const animation = gsap.from(split.chars, {
  yPercent: "random([-100, 100])",
  rotation: "random(-30, 30)",
  ease: "back.out",
  autoAlpha: 0,
  repeat: -1,
  yoyo: true,
  stagger: {
    amount: 6,
    from: "random"
  }
});

// 创建 Intersection Observer 实例
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // 元素进入可视区域，播放动画
      animation.play();
    } else {
      // 元素离开可视区域，暂停动画
      animation.pause();
    }
  });
});

// 开始观察元素
const targetElement = document.querySelector('.text');
observer.observe(targetElement);

// 动态加载 iframe
if (doms.sectionContainer && doms.sectionIframe) {
  ScrollTrigger.create({
    trigger: doms.sectionContainer,
    start: 'top bottom', // 当 .section .container 的顶部到达视口底部时触发
    once: true, // 只触发一次
    onEnter: () => {
      // 显示加载提示
      doms.sectionContainer.classList.add('loading');
      // 动态加载
      doms.sectionIframe.src = doms.sectionIframe.dataset.src;
      // 监听 iframe 加载完成事件
      doms.sectionIframe.addEventListener('load', () => {
        // 隐藏加载提示
        doms.sectionContainer.classList.remove('loading');
      });
    }
  });
}