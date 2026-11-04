export type PosterItem = {
  src: string;
  previewSrc?: string;
  title: string;
  group: string;
  credit: string;
  relatedImages?: string[];
};

// Keep this list newest-first. Add every newly uploaded poster or sales asset at the top.
export const posterItems: PosterItem[] = [
  { src: '/work/posters/brand-atmosphere-extra-01.jpg', title: '一地暖意，满室舒适', group: '品牌氛围海报｜暖居与东方美学', credit: '云纳 / 2026 · 01/03' },
  { src: '/work/posters/brand-atmosphere-extra-02.jpg', title: '席地而坐，暖意相伴', group: '品牌氛围海报｜暖居与东方美学', credit: '云纳 / 2026 · 02/03' },
  { src: '/work/posters/brand-atmosphere-extra-03.jpg', title: '漆金光入室', group: '品牌氛围海报｜暖居与东方美学', credit: '云纳 / 2026 · 03/03' },
  { src: '/work/posters/brand-atmosphere-03.jpg', title: '暖意，宠先懂', group: '暖意·先懂｜品牌氛围系列海报', credit: '云纳 / 2026 · 01/04' },
  { src: '/work/posters/brand-atmosphere-04.jpg', title: '暖意，她先懂', group: '暖意·先懂｜品牌氛围系列海报', credit: '云纳 / 2026 · 02/04' },
  { src: '/work/posters/brand-atmosphere-05.jpg', title: '暖意，他先懂', group: '暖意·先懂｜品牌氛围系列海报', credit: '云纳 / 2026 · 03/04' },
  { src: '/work/posters/brand-atmosphere-06.jpg', title: '暖意，孩子先懂', group: '暖意·先懂｜品牌氛围系列海报', credit: '云纳 / 2026 · 04/04' },
  { src: '/work/sales-materials/calendar-2027-mockup.png', title: '2027 羊年台历 · 效果图与封面封底', group: '企业日历设计', credit: '2027', relatedImages: ['/work/sales-materials/calendar-2027-cover-back-v2.png'] },
  { src: '/work/sales-materials/national-day-2026.png', title: '国庆主题海报 · 山河锦绣，温暖同行', group: '节日主题海报', credit: '云纳 / 2026' },
  { src: '/work/posters/concept-01.jpg', title: '产品概念海报 · 01', group: '产品概念海报', credit: '云纳 / 2026' },
  { src: '/work/recruitment/print-back-redacted.png', title: '校招双面印刷品 · 背面', group: '易拉宝设计', credit: '云纳 / 2026' },
  { src: '/work/recruitment/print-front.png', title: '校招双面印刷品 · 正面', group: '易拉宝设计', credit: '云纳 / 2026' },
  { src: '/work/recruitment/rollup-redacted.png', title: '校招易拉宝', group: '易拉宝设计', credit: '云纳 / 2026' },
  { src: '/work/posters/concept-02.jpg', title: '产品概念海报 · 02', group: '产品概念海报', credit: '云纳 / 2026' },
  { src: '/work/posters/application-03.jpg', title: '产品应用效果图 · 03', group: '产品应用效果图', credit: '云纳 / 2026' },
  { src: '/work/posters/application-01.png', title: '产品应用效果图 · 01', group: '产品应用效果图', credit: '云纳 / 2026' },
  { src: '/work/posters/application-05.jpg', title: '产品应用效果图 · 05', group: '产品应用效果图', credit: '云纳 / 2026' },
  { src: '/work/sales-materials/trifold-v2-2.jpg', title: '三折页海报 · 产品方案与核心优势', group: '三折页产品介绍', credit: '云纳 / 2026' },
  { src: '/work/sales-materials/trifold-v2-1.jpg', title: '三折页海报 · 品牌介绍与联系', group: '三折页产品介绍', credit: '云纳 / 2026' },
  { src: '/work/sales-materials/value-en.jpg', title: 'Warmth Starts Underfoot · Product Value', group: '英文产品价值海报', credit: '云纳 / 2026' },
  { src: '/work/posters/application-02.jpg', title: '产品应用效果图 · 02', group: '产品应用效果图', credit: '云纳 / 2026' },
  { src: '/work/posters/application-04.jpg', title: '产品应用效果图 · 04', group: '产品应用效果图', credit: '云纳 / 2026' },
  { src: '/work/promo-board.jpg', title: '品牌宣传展板', group: '品牌宣传物料', credit: '云纳 / 2025' },
  { src: '/work/promo-elevator.jpg', title: '电梯宣传海报', group: '品牌宣传物料', credit: '云纳 / 2025' },
  { src: '/work/sales-materials/campaign-cn.jpg', title: '纳米即热电暖主视觉 · 中文版', group: '双语产品宣传海报', credit: '云纳 / 2026' },
  { src: '/work/sales-materials/campaign-en.jpg', title: 'Nano Instant Heating · English', group: '双语产品宣传海报', credit: '云纳 / 2026' },
  { src: '/work/sales-materials/pricing-cn.jpg', title: '暖意，始于足下 · 中文版', group: '双语空间应用海报', credit: '云纳 / 2026' },
  { src: '/work/sales-materials/pricing-en.jpg', title: 'Warmth Starts Underfoot · English', group: '双语空间应用海报', credit: '云纳 / 2026' },
].map(item => ({ ...item, previewSrc: `${item.src}.preview.jpg` }));
