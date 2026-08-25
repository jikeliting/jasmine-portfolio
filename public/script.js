const themeButton = document.querySelector('.theme');
const storedTheme = localStorage.getItem('portfolio-theme');
if (storedTheme === 'dark') document.body.classList.add('dark');
themeButton.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('portfolio-theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});

const filterButtons = document.querySelectorAll('.filters button');
const projects = document.querySelectorAll('.project');
filterButtons.forEach(button => button.addEventListener('click', () => {
  filterButtons.forEach(item => item.classList.remove('active'));
  button.classList.add('active');
  projects.forEach(project => project.classList.toggle('hidden', button.dataset.filter !== 'all' && project.dataset.category !== button.dataset.filter));
}));

const projectData = [
  ['品牌策略 · 视觉识别 · 2026', '「屿」城市文化节', '从“城市如岛屿，文化使我们相连”的概念出发，建立一套可生长的节日视觉系统，覆盖主视觉、导视与数字传播。', '#1d4f43'],
  ['用户研究 · UI/UX · 2025', '慢慢｜情绪记录 App', '面向高压都市青年设计的轻量情绪记录工具。通过访谈、用户旅程和可用性测试，让记录这件事更自然、更少负担。', '#d9b9e7'],
  ['主视觉 · 动态海报 · 2025', '生长｜青年艺术展', '以不稳定的排版与持续变化的文字形态回应青年创作者的多元方向，并延展为一套线上动态传播素材。', '#f05a36'],
  ['品牌重塑 · 包装设计 · 2024', 'MORii 植物护理品牌', '为植物护理品牌重新定义视觉语言，以自然但不俗套的色彩和模块化包装，建立温和、可信赖的品牌感受。', '#c7d4b7']
];
const modal = document.querySelector('.modal');
function openProject(project) {
  const data = projectData[Number(project.dataset.project)];
  document.querySelector('.modal-tag').textContent = data[0];
  document.querySelector('.modal-title').textContent = data[1];
  document.querySelector('.modal-copy').textContent = data[2];
  document.querySelector('.modal-art').style.background = data[3];
  modal.showModal();
}
projects.forEach(project => {
  project.addEventListener('click', () => openProject(project));
  project.addEventListener('keydown', event => { if (event.key === 'Enter') openProject(project); });
});
document.querySelector('.modal-close').addEventListener('click', () => modal.close());
modal.addEventListener('click', event => { if (event.target === modal) modal.close(); });

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
}), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
