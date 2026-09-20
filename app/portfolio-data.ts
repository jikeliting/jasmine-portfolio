export type PosterItem = {
  src: string;
  title: string;
  group: string;
  credit: string;
};

// Keep each series together. The five application images follow the user's exact order.
export const posterItems: PosterItem[] = [
  { src: '/work/promo-board.jpg', title: '品牌宣传展板', group: '品牌宣传物料', credit: '云纳 / 2025' },
  { src: '/work/promo-elevator.jpg', title: '电梯宣传海报', group: '品牌宣传物料', credit: '云纳 / 2025' },
  { src: '/work/recruitment/rollup-redacted.png', title: '校招易拉宝', group: '校招物料', credit: '云纳 / 2026' },
  { src: '/work/recruitment/print-front.png', title: '校招双面印刷品 · 正面', group: '校招物料', credit: '云纳 / 2026' },
  { src: '/work/recruitment/print-back-redacted.png', title: '校招双面印刷品 · 背面', group: '校招物料', credit: '云纳 / 2026' },
  { src: '/work/posters/concept-01.jpg', title: '产品概念海报 · 01', group: '产品概念海报', credit: '云纳 / 2026' },
  { src: '/work/posters/concept-02.jpg', title: '产品概念海报 · 02', group: '产品概念海报', credit: '云纳 / 2026' },
  { src: '/work/posters/application-01.png', title: '产品应用效果图 · 01', group: '产品应用效果图', credit: '云纳 / 2026' },
  { src: '/work/posters/application-02.jpg', title: '产品应用效果图 · 02', group: '产品应用效果图', credit: '云纳 / 2026' },
  { src: '/work/posters/application-03.jpg', title: '产品应用效果图 · 03', group: '产品应用效果图', credit: '云纳 / 2026' },
  { src: '/work/posters/application-04.jpg', title: '产品应用效果图 · 04', group: '产品应用效果图', credit: '云纳 / 2026' },
  { src: '/work/posters/application-05.jpg', title: '产品应用效果图 · 05', group: '产品应用效果图', credit: '云纳 / 2026' },
];
