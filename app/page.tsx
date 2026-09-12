'use client';

import { useState } from 'react';

const projects = [
  { id:'tob', number:'01', short:'TOB', title:'ToB 企业销售手册', category:'品牌叙事 · 编辑设计', description:'从品牌介绍进入产品系统，为企业客户建立清晰、专业且具有品质感的销售内容。', cover:'/work/tob-02.jpg', pages:['/work/tob-06.jpg','/work/tob-14.jpg'], color:'#e9e6dc', ink:'#151515' },
  { id:'toc', number:'02', short:'TOC', title:'ToC 产品销售手册', category:'产品内容 · 消费沟通', description:'以生活场景、产品卖点和参数结构，完成从感受建立到信息转化。', cover:'/work/toc-01.jpg', pages:['/work/toc-11.jpg','/work/toc-16.jpg'], color:'#89b7df', ink:'#111' },
  { id:'culture', number:'03', short:'CULTURE', title:'雇主品牌文化手册', category:'文化叙事 · 信息编排', description:'将抽象的企业文化转化为员工能够阅读、理解与传播的共同语言。', cover:'/work/culture-01.jpg', pages:['/work/culture-06.jpg','/work/culture-13.jpg'], color:'#d93832', ink:'#fff' },
  { id:'promo', number:'04', short:'COLLATERAL', title:'企业宣传物料', category:'展板海报 · 空间传播', description:'针对真实观看距离与使用场景，重新组织卖点、焦点和阅读层级。', cover:'/work/promo-board.jpg', pages:['/work/promo-elevator.jpg','/work/promo-board.jpg'], color:'#20201f', ink:'#fff' },
  { id:'mini', number:'05', short:'MINI APP', title:'微信小程序整体设计', category:'数字产品 · 视觉定制', description:'在既有功能模板上完成整体视觉设计，让品牌体验延伸至移动端。', cover:'/work/toc-15.jpg', pages:['/work/toc-17.jpg','/work/toc-04.jpg'], color:'#f0cf38', ink:'#171715' },
];

export default function Home() {
  const [activeProject, setActiveProject] = useState(0);
  const active = projects[activeProject];
  return <main>
    <section className="desk" id="top" aria-labelledby="hero-title">
      <img className="desk-image" src="/concepts/homepage-workdesk-v1.png" alt="徐嘉妮的设计工作台，由品牌手册、简历、小程序与设计物件组成" />
      <div className="desk-shade" />
      <header className="site-nav"><a className="site-name" href="#top">JIANI XU</a><nav aria-label="主导航"><a href="#work">作品</a><a href="#about">关于</a><a href="#contact">联系</a></nav></header>
      <div className="hero-label"><p>PORTFOLIO / 2026</p><h1 id="hero-title">徐嘉妮<br /><span>品牌与产品视觉设计</span></h1></div>
      <a className="desk-entry desk-entry-work" href="#work"><span>01</span>查看项目</a>
      <a className="desk-entry desk-entry-about" href="#about"><span>02</span>个人档案</a>
      <a className="desk-entry desk-entry-contact" href="#contact"><span>03</span>联系我</a>
      <a className="scroll-note" href="#work">向下浏览 <span>↓</span></a>
    </section>

    <section className="project-index" id="work">
      <header className="index-heading"><p>SELECTED WORK / 2023—2026</p><h2>项目书架</h2><span>点击书脊，展开项目档案</span></header>
      <div className="bookshelf" aria-label="作品项目书架">
        <div className="shelf-brand"><span>JIANI XU</span><b>VISUAL ARCHIVE</b></div>
        <div className="book-row">{projects.map((project,index) => <button
          type="button"
          className={`book-spine book-spine-${index + 1}${activeProject === index ? ' is-active' : ''}`}
          style={{background:project.color,color:project.ink}}
          onClick={() => setActiveProject(index)}
          aria-pressed={activeProject === index}
          aria-label={`展开${project.title}`}
          key={project.id}
        ><small>{project.number}</small><strong>{project.short}</strong><span>{project.category}</span></button>)}</div>
        <p className="shelf-hint">SELECT A VOLUME <span>→</span></p>
      </div>

      <article className="book-open" id={active.id} key={active.id}>
        <div className="open-images">
          <figure className="inside-page inside-page-back"><img src={active.pages[1]} alt={`${active.title}内页细节`} /></figure>
          <figure className="inside-page inside-page-front"><img src={active.pages[0]} alt={`${active.title}内页预览`} /></figure>
          <figure className="book-cover"><img src={active.cover} alt={`${active.title}封面`} /></figure>
        </div>
        <div className="open-copy"><span>{active.number} / SELECTED WORK</span><p>{active.category}</p><h3>{active.title}</h3><em>{active.description}</em><a href="#contact">了解项目详情 <b>↗</b></a></div>
      </article>
    </section>

    <section className="about" id="about">
      <div className="about-kicker"><span>PERSONAL FILE</span><b>05</b></div>
      <div className="about-copy"><h2>让复杂内容<br />变得清楚、好看，<br />也真正有用。</h2><p>我是徐嘉妮，品牌与产品视觉设计师。我的工作覆盖企业品牌、销售手册、宣传物料、官网与微信小程序，习惯从信息结构出发，把内容转化为有辨识度、能够被使用的视觉系统。</p><div className="about-meta"><span>品牌视觉系统</span><span>编辑与销售内容</span><span>产品视觉</span><span>微信小程序</span><span>AI 辅助创作</span></div></div>
    </section>

    <footer id="contact"><div><p>CONTACT / AVAILABLE FOR OPPORTUNITIES</p><h2>如果你喜欢我的工作，<br />欢迎和我聊聊。</h2></div><a className="mail" href="mailto:250220669@qq.com">250220669@qq.com <span>↗</span></a><div className="footer-line"><span>徐嘉妮 / JIANI XU</span><span>品牌与产品视觉设计师</span><a href="#top">返回顶部 ↑</a></div></footer>
  </main>;
}
