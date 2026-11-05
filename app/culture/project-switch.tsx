import styles from './reader.module.css';

export default function ProjectSwitch({ active }: { active: 'culture' | 'company' | 'offline' }) {
  return <>
    <p className={styles.projectKicker}>CULTURE &amp; BRAND</p>
    <nav className={styles.projectSwitch} aria-label="01 企业文化与品牌叙事项目切换">
      <a href="/culture" aria-current={active === 'culture' ? 'page' : undefined}>企业文化手册</a>
      <a href="/company" aria-current={active === 'company' ? 'page' : undefined}>公司介绍 PPT</a>
      <a href="/offline-material-01" aria-current={active === 'offline' ? 'page' : undefined}>线下物料-01</a>
    </nav>
  </>;
}
