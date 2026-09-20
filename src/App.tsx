import { useEffect, useRef, useState } from 'react'

type Project = {
  number: string
  title: string
  label: string
  description: string
  outcome: string
  stack: string[]
  links: { label: string; href: string }[]
  visual: 'supplier' | 'sensoria' | 'veha'
}

const projects: Project[] = [
  {
    number: '01',
    title: 'Supplier Scout',
    label: 'Тестовое · 2026',
    description: 'Доказательный поиск и сравнение поставщиков кофе для HoReCa. Каждое условие связано с официальным источником, неизвестные значения не маскируются под ноль.',
    outcome: '10 реальных поставщиков · фильтры · explainable scoring · CSV · API fallback',
    stack: ['React', 'TypeScript', 'FastAPI', 'SQLite', 'Provenance'],
    links: [
      { label: 'Открыть продукт', href: 'https://anowiz.github.io/supplier-scout/' },
      { label: 'GitHub', href: 'https://github.com/ANOWIZ/supplier-scout' },
    ],
    visual: 'supplier',
  },
  {
    number: '02',
    title: 'Sensoria',
    label: 'AI knowledge base · прототип',
    description: 'Конвейер превращает сообщения Telegram в структурированную базу знаний: извлекает содержание, создаёт резюме и теги, строит embeddings и возвращает материалы семантическим поиском.',
    outcome: 'Несколько LLM-провайдеров · fallback · квоты · безопасная обработка URL',
    stack: ['Next.js', 'LLM API', 'Embeddings', 'PostgreSQL', 'Telegram'],
    links: [],
    visual: 'sensoria',
  },
  {
    number: '03',
    title: 'Веха',
    label: 'PSA · инженерный прототип',
    description: 'Система управления портфелем проектов: жизненный цикл, трудозатраты, лицензии, план-факт, ресурсы и клиентский портал в одном контуре.',
    outcome: 'RBAC · аудит · фоновые задачи · интеграционный контур · CI',
    stack: ['FastAPI', 'React', 'PostgreSQL', 'Keycloak', 'Celery'],
    links: [{ label: 'GitHub', href: 'https://github.com/ANOWIZ/PSA_VEHA' }],
    visual: 'veha',
  },
]

function Arrow() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 10h13M11 5l5 5-5 5" /></svg>
}

function PipelineVisual() {
  return (
    <div className="pipeline-visual" aria-label="Схема автоматизации: входящие данные, AI-обработка, API и измеримый результат">
      <svg viewBox="0 0 760 560" role="img">
        <defs><filter id="glow"><feGaussianBlur stdDeviation="5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
        <path className="flow-line line-a" d="M72 118 C210 118 220 278 354 278 S520 432 690 432" />
        <path className="flow-line line-b" d="M72 432 C210 432 224 278 354 278 S522 118 690 118" />
        <path className="flow-line line-c" d="M72 278 H690" />
        <circle className="flow-node source" cx="72" cy="118" r="10"/><circle className="flow-node source" cx="72" cy="278" r="10"/><circle className="flow-node source" cx="72" cy="432" r="10"/>
        <circle className="orbit" cx="354" cy="278" r="82"/><circle className="orbit orbit-two" cx="354" cy="278" r="135"/>
        <circle className="core" cx="354" cy="278" r="46" filter="url(#glow)"/>
        <circle className="flow-node target" cx="690" cy="118" r="10"/><circle className="flow-node target" cx="690" cy="278" r="10"/><circle className="flow-node target" cx="690" cy="432" r="10"/>
        <text x="43" y="87">DOCS</text><text x="43" y="247">DATA</text><text x="43" y="401">EVENTS</text>
        <text x="332" y="284" className="ai-label">AI</text>
        <text x="642" y="87">ACTION</text><text x="642" y="247">ANSWER</text><text x="642" y="401">METRIC</text>
      </svg>
      <div className="pipeline-caption"><span>01 · На входе</span><span>02 · Автоматизация</span><span>03 · На выходе</span></div>
    </div>
  )
}

function ProjectVisual({ kind }: { kind: Project['visual'] }) {
  if (kind === 'supplier') return (
    <div className="product-frame supplier-mock">
      <span className="visual-note">Схематичная иллюстрация</span>
      <div className="mock-bar"><span>SS</span><i/><i/><b>API online</b></div>
      <div className="mock-title">Supplier shortlist</div>
      {[['BACCA','95'],['Tasty Coffee','95'],['SnabCoffee','95'],['Ingresso','88']].map(([name,score], index) => (
        <div className="mock-row" key={name} style={{ '--delay': `${index * 90}ms` } as React.CSSProperties}><strong>{name}</strong><span>official source</span><em>{score}</em></div>
      ))}
    </div>
  )
  if (kind === 'sensoria') return (
    <div className="product-frame knowledge-mock">
      <span className="visual-note">Схематичная иллюстрация</span>
      <div className="telegram-node">TG</div><span className="connector c1"/><div className="ai-node">LLM<br/><small>extract · tag</small></div><span className="connector c2"/><div className="vector-node">↗<br/><small>semantic index</small></div>
      <div className="search-result"><small>релевантный контекст</small><strong>Как проверить гипотезу до разработки?</strong><p>Связанные заметки и источники</p></div>
    </div>
  )
  return (
    <div className="product-frame veha-mock">
      <span className="visual-note">Схематичная иллюстрация</span>
      <div className="veha-nav"><b>ВЕХА</b><span>Портфель</span><span>Проекты</span><span>Ресурсы</span></div>
      <div className="veha-main"><small>Портфель проектов</small><strong>Обзор</strong><div className="bars">{[72,48,88,61,77,54,92,68].map((height,index)=><i key={index} style={{height:`${height}%`}}/>)}</div><div className="veha-stats"><span>план <b>Статус</b></span><span>финансы <b>План-факт</b></span></div></div>
    </div>
  )
}

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('visible')), { threshold: .12 })
    ref.current.querySelectorAll('.reveal').forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])
  return ref
}

export default function App() {
  const root = useReveal()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div ref={root}>
      <header className="site-header">
        <a href="#top" className="wordmark">MK<span>·26</span></a>
        <nav id="site-nav" className={menuOpen ? 'open' : ''} aria-label="Навигация">
          <a href="#work" onClick={() => setMenuOpen(false)}>Проекты</a>
          <a href="#approach" onClick={() => setMenuOpen(false)}>Подход</a>
          <a href="#experience" onClick={() => setMenuOpen(false)}>Опыт</a>
        </nav>
        <a className="header-contact" href="https://t.me/CALLPAQ" target="_blank" rel="noreferrer">Написать <Arrow /></a>
        <button className="menu-button" onClick={() => setMenuOpen((value) => !value)} aria-controls="site-nav" aria-expanded={menuOpen} aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}><span/><span/></button>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-content">
            <p className="kicker">Михаил Колпаков · Екатеринбург</p>
            <h1>AI Automation<br/><span>Product Builder</span></h1>
            <p className="hero-copy">Превращаю ручные процессы в работающие системы: исследую, собираю MVP, соединяю сервисы через API и проверяю эффект на данных.</p>
            <div className="hero-actions">
              <a href="#work" className="button-primary">Смотреть проекты <Arrow /></a>
              <a href="https://github.com/ANOWIZ" className="button-ghost" target="_blank" rel="noreferrer">GitHub · проекты</a>
            </div>
          </div>
          <PipelineVisual />
          <div className="hero-index"><span>AI</span><span>AUTOMATION</span><span>PRODUCT</span><span>SYSTEMS</span></div>
        </section>

        <section className="proof reveal">
          <div className="proof-intro"><p className="section-mark">Контекст</p><h2>Продуктовое мышление<br/>с инженерной оптикой.</h2></div>
          <div className="proof-numbers">
            <article><strong>5+</strong><span>лет в автоматизации<br/>и системном анализе</span></article>
            <article><strong>−50%</strong><span>времени обработки<br/>в автоматизированном процессе</span></article>
            <article><strong>2 нед.</strong><span>вместо 1–2 месяцев<br/>на запуск инициативы</span></article>
          </div>
          <p className="proof-note">Результаты из опыта в резюме. Метрики относятся к разным проектам и не суммируются.</p>
        </section>

        <section className="work" id="work">
          <div className="section-heading reveal"><p className="section-mark">Выбранные работы · 2025–2026</p><h2>Системы, а не<br/>демонстрации.</h2></div>
          <div className="projects">
            {projects.map((project) => (
              <article className="project reveal" key={project.number}>
                <div className="project-copy">
                  <span className="project-number">{project.number}</span>
                  <p className="project-label">{project.label}</p>
                  <h3>{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <p className="project-outcome">{project.outcome}</p>
                  <div className="stack">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
                  {project.links.length > 0 && <div className="project-links">{project.links.map((link) => <a href={link.href} target="_blank" rel="noreferrer" key={link.label}>{link.label} <Arrow /></a>)}</div>}
                </div>
                <ProjectVisual kind={project.visual} />
              </article>
            ))}
          </div>
        </section>

        <section className="approach reveal" id="approach">
          <div className="section-heading inverse"><p className="section-mark">Как работаю</p><h2>От узкого места<br/>до измеримого пилота.</h2></div>
          <div className="approach-track">
            {[
              ['01','Найти','Наблюдаю процесс, считаю ручные шаги и стоимость ошибки.'],
              ['02','Сформулировать','Фиксирую гипотезу, границы данных и критерий успеха.'],
              ['03','Собрать','Делаю рабочий вертикальный срез вместо длинной презентации.'],
              ['04','Соединить','Интегрирую API, данные, роли и безопасные fallback-сценарии.'],
              ['05','Проверить','Сравниваю результат с baseline и решаю: масштабировать или закрыть.'],
            ].map(([n,title,text]) => <div key={n}><span>{n}</span><h3>{title}</h3><p>{text}</p></div>)}
          </div>
        </section>

        <section className="capabilities reveal">
          <p className="section-mark">Инструменты</p>
          <div className="capability-list">
            <div><h3>AI</h3><p>LLM API · RAG · embeddings · extraction · evaluation · prompt design</p></div>
            <div><h3>Automation</h3><p>Python · FastAPI · REST · webhooks · Telegram · фоновые задачи</p></div>
            <div><h3>Data</h3><p>SQL · PostgreSQL · SQLite · Power BI · метрики · provenance</p></div>
            <div><h3>Build</h3><p>React · TypeScript · Docker · CI · Git · тестирование</p></div>
          </div>
        </section>

        <section className="experience reveal" id="experience">
          <div className="experience-title"><p className="section-mark">Опыт</p><h2>От требований<br/>к продукту.</h2></div>
          <div className="timeline">
            <article><time>2024 — сейчас</time><div><h3>Product Manager</h3><p>Уральский центр систем безопасности</p><span>Стратегия и roadmap направления автоматизации бизнес-процессов, MVP, проверка гипотез, аналитика, работа с кросс-функциональной командой.</span></div></article>
            <article><time>2021 — 2024</time><div><h3>System Analyst → Team Lead</h3><p>Unity in Development</p><span>Интеграции, архитектура, требования и управление командой из пяти аналитиков.</span></div></article>
            <article><time>2025</time><div><h3>Магистр Software Engineering</h3><p>Уральский федеральный университет</p><span>Инженерная база для проектирования и проверки программных систем.</span></div></article>
          </div>
        </section>

        <section className="contact">
          <p className="section-mark">Связаться</p>
          <h2>Есть процесс,<br/><span>который пора упростить?</span></h2>
          <div className="contact-links"><a href="https://t.me/CALLPAQ" target="_blank" rel="noreferrer">Telegram <Arrow /></a><a href="mailto:mishpeople@gmail.com">mishpeople@gmail.com <Arrow /></a><a href="https://github.com/ANOWIZ" target="_blank" rel="noreferrer">GitHub <Arrow /></a></div>
          <div className="footer-line"><span>Михаил Колпаков · 2026</span><span>Екатеринбург · UTC+5</span></div>
        </section>
      </main>
    </div>
  )
}
