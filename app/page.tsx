const heroImages = [
  { src: '/work/tob-02.jpg', alt: 'ToB 销售手册封面设计', className: 'hero-image hero-image-main' },
  { src: '/work/promo-board.jpg', alt: '企业展板宣传设计', className: 'hero-image hero-image-board' },
  { src: '/work/toc-11.jpg', alt: 'ToC 产品销售手册场景页', className: 'hero-image hero-image-toc' },
  { src: '/work/culture-01.jpg', alt: '企业文化手册封面设计', className: 'hero-image hero-image-culture' },
];

const experience = [
  { time: '2025.11 至今', company: '云纳智能科技（苏州）有限公司', role: '品牌视觉设计师', detail: '品牌视觉系统、企业官网、ToB 与 ToC 销售内容、微信小程序整体视觉设计与模板定制、产品材质视觉开发。' },
  { time: '2022.11 至 2023.05', company: '雅庭景观', role: '设计相关实践', detail: '参与设计项目推进，在真实业务协作中积累视觉表达与落地经验。' },
];

export default function Home() {
  return (
    <main>
      <section className="hero" id="top">
        <header className="site-nav">
          <a className="site-name" href="#top" aria-label="返回首页">JIANI XU</a>
          <nav aria-label="主导航"><a href="#work">作品</a><a href="#about">关于</a><a href="#experience">经历</a><a href="#contact">联系</a></nav>
        </header>
        <div className="hero-copy">
          <p className="hero-role">徐嘉妮 / 品牌与产品视觉设计师</p>
          <h1><span>品牌与产品的</span><span>视觉表达</span></h1>
          <p className="hero-intro">聚焦企业品牌、销售内容、产品视觉与数字体验。</p>
          <a className="primary-link" href="#work">查看作品</a>
        </div>
        <div className="hero-collage" aria-label="代表作品预览">
          {heroImages.map((image) => <figure className={image.className} key={image.src}><img src={image.src} alt={image.alt} /></figure>)}
        </div>
      </section>

      <section className="work-intro" id="work">
        <div className="work-heading"><p className="eyebrow">SELECTED WORK</p><h2>从企业叙事到产品体验</h2></div>
        <div className="work-preview">
          <figure className="preview-primary"><img src="/work/tob-06.jpg" alt="ToB 销售手册材质表达页面" loading="lazy" /></figure>
          <figure className="preview-secondary"><img src="/work/toc-15.jpg" alt="ToC 销售手册产品结构页面" loading="lazy" /></figure>
          <div className="preview-copy"><p>企业品牌与销售内容</p><h3>让复杂产品被清晰理解</h3><span>ToB 销售手册 / ToC 产品手册 / 企业宣传物料</span></div>
        </div>
      </section>

      <article className="project project-dark" id="tob">
        <header className="project-header">
          <div><p className="eyebrow">B2B SALES MANUAL</p><h2>ToB 企业销售手册</h2></div>
          <div className="project-meta"><p>品牌介绍 / 产品系统 / 材质表达</p><p>编辑设计与视觉叙事</p></div>
        </header>
        <p className="project-lead">从品牌定位进入产品系统，以克制的黑白结构、材质细节与深红识别色，让专业信息保持清晰，也建立面向企业客户的品质感。</p>
        <div className="gallery gallery-tob">
          <figure className="g-wide"><img src="/work/tob-06.jpg" alt="ToB 手册材质章节版式" loading="lazy" /></figure>
          <figure className="g-tall"><img src="/work/tob-14.jpg" alt="ToB 手册产品与材质设计" loading="lazy" /></figure>
          <figure className="g-small"><img src="/work/tob-19.jpg" alt="ToB 手册细节页面" loading="lazy" /></figure>
          <figure className="g-land"><img src="/work/tob-28.jpg" alt="ToB 手册产品场景页面" loading="lazy" /></figure>
          <figure className="g-end"><img src="/work/tob-44.jpg" alt="ToB 手册产品展示页面" loading="lazy" /></figure>
        </div>
      </article>

      <article className="project project-light" id="toc">
        <header className="project-header">
          <div><p className="eyebrow">B2C PRODUCT MANUAL</p><h2>ToC 产品销售手册</h2></div>
          <div className="project-meta"><p>消费场景 / 产品卖点 / 参数结构</p><p>内容梳理与视觉设计</p></div>
        </header>
        <p className="project-lead">以更直接的产品语言连接消费者：用生活化场景建立感受，再通过结构图、功能与参数页面完成信息转化。</p>
        <div className="toc-stage">
          <figure className="toc-cover"><img src="/work/toc-01.jpg" alt="ToC 销售手册封面" loading="lazy" /></figure>
          <figure className="toc-life"><img src="/work/toc-11.jpg" alt="ToC 手册生活方式场景" loading="lazy" /></figure>
          <figure className="toc-detail"><img src="/work/toc-16.jpg" alt="ToC 手册产品细节页面" loading="lazy" /></figure>
          <figure className="toc-spec"><img src="/work/toc-17.jpg" alt="ToC 手册产品参数页面" loading="lazy" /></figure>
        </div>
      </article>

      <article className="project project-culture" id="culture">
        <header className="project-header">
          <div><p className="eyebrow">EMPLOYER BRAND</p><h2>雇主品牌与企业文化手册</h2></div>
          <div className="project-meta"><p>文化叙事 / 组织价值 / 信息编排</p><p>手册视觉体系</p></div>
        </header>
        <div className="culture-grid">
          <div className="culture-copy"><p className="project-lead">把抽象的企业文化转化为可阅读、可传播的组织内容。红蓝系统承接品牌识别，图像与版式共同维持长篇信息的节奏。</p><span>品牌文化不是口号，而是一套能够被员工看见和理解的共同语言。</span></div>
          <figure className="culture-main"><img src="/work/culture-06.jpg" alt="企业文化手册品牌章节" loading="lazy" /></figure>
          <figure className="culture-secondary"><img src="/work/culture-13.jpg" alt="企业文化手册内页" loading="lazy" /></figure>
          <figure className="culture-tertiary"><img src="/work/culture-17.jpg" alt="企业文化手册价值观页面" loading="lazy" /></figure>
          <figure className="culture-end"><img src="/work/culture-24.jpg" alt="企业文化手册结尾页面" loading="lazy" /></figure>
        </div>
      </article>

      <article className="project project-promo" id="promo">
        <header className="project-header">
          <div><p className="eyebrow">CORPORATE COLLATERAL</p><h2>企业宣传物料</h2></div>
          <div className="project-meta"><p>空间传播 / 展板 / 场景海报</p><p>线下视觉延展</p></div>
        </header>
        <div className="promo-grid">
          <figure className="promo-elevator"><img src="/work/promo-elevator.jpg" alt="电梯场景企业宣传海报" loading="lazy" /></figure>
          <div className="promo-note"><p>让品牌进入真实空间</p><span>针对电梯、展陈等不同观看距离与环境，重新组织产品卖点、画面焦点与阅读层级。</span></div>
          <figure className="promo-board"><img src="/work/promo-board.jpg" alt="企业产品展板设计" loading="lazy" /></figure>
        </div>
      </article>

      <section className="about" id="about">
        <div className="about-title"><p className="eyebrow">ABOUT</p><h2>设计不止是好看，更要让内容发生作用。</h2></div>
        <div className="about-body">
          <p>我是徐嘉妮，视觉传达设计背景，专注品牌与产品视觉。我的工作横跨品牌内容、销售手册、企业官网、线下物料与数字界面，习惯从信息结构出发，把复杂内容转化为清楚、有辨识度、能够被使用的视觉系统。</p>
          <div className="capabilities">
            <div><span>01</span><h3>品牌与内容</h3><p>品牌视觉系统、企业宣传、销售内容与编辑设计</p></div>
            <div><span>02</span><h3>产品视觉</h3><p>产品卖点梳理、材质表达、场景图与传播物料</p></div>
            <div><span>03</span><h3>数字体验</h3><p>企业官网与微信小程序整体视觉设计、模板定制</p></div>
            <div><span>04</span><h3>AI 辅助创作</h3><p>将生成式工具纳入概念探索、图像制作与工作流程</p></div>
          </div>
        </div>
      </section>

      <section className="experience" id="experience">
        <p className="eyebrow">EXPERIENCE</p>
        <div className="experience-list">
          {experience.map((item) => <article key={item.time + item.company}><time>{item.time}</time><h3>{item.company}</h3><div><strong>{item.role}</strong><p>{item.detail}</p></div></article>)}
        </div>
        <div className="education"><p>教育背景</p><span>徐州工程学院 · 视觉传达设计本科 · 2023.08 至 2025.06</span><span>苏州高博职业学院 · 建筑室内设计专科 · 2020.09 至 2023.06</span></div>
        <div className="tools"><p>TOOLS</p><span>Photoshop</span><span>Illustrator</span><span>InDesign</span><span>Affinity</span><span>SketchUp</span><span>Midjourney</span><span>Stable Diffusion</span><span>ComfyUI</span></div>
      </section>

      <footer id="contact">
        <p className="eyebrow">CONTACT</p>
        <h2>一起做有用、<br />也有记忆点的设计。</h2>
        <a href="mailto:250220669@qq.com">250220669@qq.com <span>↗</span></a>
        <div className="footer-bottom"><span>徐嘉妮 / JIANI XU</span><a href="#top">返回顶部 ↑</a></div>
      </footer>
    </main>
  );
}
