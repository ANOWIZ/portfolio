import { useState } from 'react'

const projects = [
  {
    title: 'Supplier Scout',
    label: 'Тестовое задание',
    description: 'Сервис для выбора поставщика кофе в Екатеринбурге. Собрал условия 10 компаний с их официальных сайтов: минимальный заказ, цены, доставку и контакты.',
    details: ['Фильтрация по объёму заказа и доставке.', 'Сравнение до трёх поставщиков и выгрузка в CSV.', 'Ссылки на источники и объяснение оценки.'],
    stack: 'React · TypeScript · FastAPI · SQLite',
    links: [
      { label: 'Открыть сервис', href: 'https://anowiz.github.io/supplier-scout/' },
      { label: 'Код на GitHub', href: 'https://github.com/ANOWIZ/supplier-scout' },
    ],
  },
  {
    title: 'Sensoria',
    label: 'Личный проект · прототип',
    description: 'База знаний из сообщений Telegram. Сохраняет материалы, составляет краткие пересказы и позволяет искать заметки по смыслу.',
    details: ['Автоматические теги и пересказ с помощью языковой модели.', 'Поиск по содержанию сохранённых материалов.', 'Несколько AI-провайдеров и ограничения расходов.'],
    stack: 'Next.js · LLM API · PostgreSQL · Telegram',
    links: [],
  },
  {
    title: 'Веха',
    label: 'Личный проект · прототип',
    description: 'Система учёта проектов и работы команды. Объединяет задачи, трудозатраты, загрузку сотрудников и плановые и фактические расходы.',
    details: ['Учёт времени и загрузки по проектам.', 'Разграничение доступа и история действий.', 'Клиентский портал и фоновые задачи.'],
    stack: 'FastAPI · React · PostgreSQL · Keycloak · Celery',
    links: [{ label: 'Код на GitHub', href: 'https://github.com/ANOWIZ/PSA_VEHA' }],
  },
]

function Arrow() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 10h13M11 5l5 5-5 5" /></svg>
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <>
      <header className="site-header">
        <a href="#top" className="wordmark">Михаил Колпаков</a>
        <nav id="site-nav" className={menuOpen ? 'open' : ''} aria-label="Навигация">
          <a href="#work" onClick={() => setMenuOpen(false)}>Проекты</a>
          <a href="#experience" onClick={() => setMenuOpen(false)}>Опыт</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Контакты</a>
        </nav>
        <a className="header-contact" href="https://t.me/CALLPAQ" target="_blank" rel="noreferrer">Написать <Arrow /></a>
        <button className="menu-button" onClick={() => setMenuOpen(value => !value)} aria-controls="site-nav" aria-expanded={menuOpen} aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}>{menuOpen ? 'Закрыть' : 'Меню'}</button>
      </header>
      <main id="top">
        <section className="hero">
          <div className="hero-content">
            <p className="kicker">Екатеринбург · AI Generalist / AI Automation Specialist</p>
            <h1>Михаил<br />Колпаков</h1>
            <p className="hero-role">Системный анализ, автоматизация и AI</p>
            <p className="hero-copy">Больше пяти лет работаю с бизнес-процессами и требованиями к ПО. Разрабатываю прототипы, связываю сервисы через API и применяю языковые модели для обработки информации.</p>
            <div className="hero-actions">
              <a href="#work" className="button-primary">Смотреть проекты <Arrow /></a>
              <a href="https://github.com/ANOWIZ" className="text-link" target="_blank" rel="noreferrer">GitHub</a>
            </div>
          </div>
          <a className="featured-link" href="https://anowiz.github.io/supplier-scout/">
            <span>Тестовое задание</span>
            <strong>Выбор поставщика кофе</strong>
            <span>Открыть Supplier Scout <Arrow /></span>
          </a>
        </section>

        <section className="work section" id="work">
          <div className="section-heading"><p className="section-mark">01 / Проекты</p><h2>Что я разрабатываю</h2></div>
          <div className="projects">
            {projects.map(project => (
              <article className="project" key={project.title}>
                <div className="project-copy">
                  <p className="project-label">{project.label}</p>
                  <h3>{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="project-links">{project.links.map(link => <a href={link.href} target="_blank" rel="noreferrer" key={link.label}>{link.label} <Arrow /></a>)}</div>
                </div>
                <div className="project-details">
                  <h4>В прототипе</h4>
                  <ul>{project.details.map(detail => <li key={detail}>{detail}</li>)}</ul>
                  <p className="stack">{project.stack}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="experience section" id="experience">
          <div className="section-heading"><p className="section-mark">02 / Опыт</p><h2>Работа и образование</h2></div>
          <div className="timeline">
            <article><time>2024 — сейчас</time><div><h3>Менеджер продукта</h3><p className="company">Уральский центр систем безопасности</p><p>Развиваю направление автоматизации бизнес-процессов: планирую задачи, запускаю MVP и проверяю гипотезы вместе с командой.</p></div></article>
            <article><time>2021 — 2024</time><div><h3>Системный аналитик → руководитель команды</h3><p className="company">Unity in Development</p><p>Описывал требования, проектировал интеграции и руководил командой из пяти аналитиков.</p></div></article>
            <article><time>2025</time><div><h3>Магистратура по программной инженерии</h3><p className="company">Уральский федеральный университет</p></div></article>
          </div>
        </section>

        <section className="approach section" id="approach">
          <div className="section-heading"><p className="section-mark">03 / Работа над задачей</p><h2>Как начинаю проект</h2></div>
          <ol className="approach-track">
            <li><h3>Разбираюсь в процессе</h3><p>Уточняю, кто выполняет работу, какие данные нужны и где возникают задержки.</p></li>
            <li><h3>Собираю прототип</h3><p>Реализую один сценарий, который можно проверить на реальных данных.</p></li>
            <li><h3>Проверяю с пользователем</h3><p>Сравниваю время работы и ошибки до и после. По результатам определяю следующие доработки.</p></li>
          </ol>
        </section>

        <section className="contact section" id="contact">
          <p className="section-mark">Контакты</p>
          <h2>Напишите мне</h2>
          <div className="contact-links"><a href="https://t.me/CALLPAQ" target="_blank" rel="noreferrer">Telegram <Arrow /></a><a href="mailto:mishpeople@gmail.com">mishpeople@gmail.com <Arrow /></a><a href="https://github.com/ANOWIZ" target="_blank" rel="noreferrer">GitHub <Arrow /></a></div>
          <div className="footer-line"><span>Михаил Колпаков</span><span>Екатеринбург · UTC+5</span></div>
        </section>
      </main>
    </>
  )
}
