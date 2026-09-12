const projects = [
  { id:'tob', number:'01', title:'ToB 企业销售手册', category:'品牌叙事 · 编辑设计', description:'从品牌介绍进入产品系统，为企业客户建立清晰、专业且具有品质感的销售内容。', image:'/work/tob-06.jpg', className:'project-card project-card-large' },
  { id:'toc', number:'02', title:'ToC 产品销售手册', category:'产品内容 · 消费沟通', description:'以生活场景、产品卖点和参数结构，完成从感受建立到信息转化。', image:'/work/toc-11.jpg', className:'project-card project-card-tall' },
  { id:'culture', number:'03', title:'雇主品牌文化手册', category:'文化叙事 · 信息编排', description:'将抽象的企业文化转化为员工能够阅读、理解与传播的共同语言。', image:'/work/culture-06.jpg', className:'project-card project-card-wide' },
  { id:'promo', number:'04', title:'企业宣传物料', category:'展板海报 · 空间传播', description:'针对真实观看距离与使用场景，重新组织卖点、焦点和阅读层级。', image:'/work/promo-board.jpg', className:'project-card project-card-small' },
];

export default function Home() {
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
      <header className="index-heading"><p>SELECTED WORK / 2023—2026</p><h2>项目档案</h2><span>品牌内容、产品视觉与数字体验</span></header>
      <div className="project-grid">{projects.map(project => <a className={project.className} href={`#${project.id}`} id={project.id} key={project.id}>
        <figure><img src={project.image} alt={project.title} loading="lazy" /></figure>
        <div className="project-card-copy"><span>{project.number}</span><p>{project.category}</p><h3>{project.title}</h3><em>{project.description}</em><b>打开项目 ↗</b></div>
      </a>)}</div>
    </section>

    <section className="about" id="about">
      <div className="about-kicker"><span>PERSONAL FILE</span><b>05</b></div>
      <div className="about-copy"><h2>让复杂内容<br />变得清楚、好看，<br />也真正有用。</h2><p>我是徐嘉妮，品牌与产品视觉设计师。我的工作覆盖企业品牌、销售手册、宣传物料、官网与微信小程序，习惯从信息结构出发，把内容转化为有辨识度、能够被使用的视觉系统。</p><div className="about-meta"><span>品牌视觉系统</span><span>编辑与销售内容</span><span>产品视觉</span><span>微信小程序</span><span>AI 辅助创作</span></div></div>
    </section>

    <footer id="contact"><div><p>CONTACT / AVAILABLE FOR OPPORTUNITIES</p><h2>如果你喜欢我的工作，<br />欢迎和我聊聊。</h2></div><a className="mail" href="mailto:250220669@qq.com">250220669@qq.com <span>↗</span></a><div className="footer-line"><span>徐嘉妮 / JIANI XU</span><span>品牌与产品视觉设计师</span><a href="#top">返回顶部 ↑</a></div></footer>
  </main>;
}
