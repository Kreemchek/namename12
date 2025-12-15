"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  useEffect,
  useState,
  type ElementType,
  type FormEvent,
  type ReactNode,
} from "react";
import { twMerge } from "tailwind-merge";
import {
  ArrowUpRight,
  BookOpen,
  Boxes,
  Building2,
  Car,
  FileText,
  Globe2,
  GraduationCap,
  Handshake,
  Laptop2,
  Layers,
  LineChart,
  QrCode,
  ScrollText,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Store,
} from "lucide-react";

const easeOutBezier = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOutBezier },
  },
};

const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.14 },
  },
};

const buttonClasses = (variant: "primary" | "secondary" = "primary") =>
  twMerge(
    "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:px-6 sm:py-3",
    variant === "primary"
      ? "bg-[#635bff] text-white shadow-lg shadow-[#635bff]/20 hover:bg-[#0a2540] hover:shadow-xl focus-visible:outline-[#635bff]"
      : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-400 focus-visible:outline-slate-500"
  );

const heroStats = [
  {
    label: "KYB",
    value: "< 5 дней",
    description: "Средний срок подключения бизнеса",
  },
  {
    label: "Выплаты",
    value: "ежедневно",
    description: "Гибкий график расчётов и кассовых разрывов",
  },
  {
    label: "Доступность",
    value: "99,95%",
    description: "Стабильная платёжная инфраструктура",
  },
];

const capabilities = [
  {
    title: "Приём платежей",
    description:
      "Быстрый и безопасный приём платежей через единый API, виджеты и платёжные страницы.",
    icon: Sparkles,
    badge: "Omni-channel",
  },
  {
    title: "QR-эквайринг",
    description:
      "Поддержка национальных QR-кодов и бесшовная оплата офлайн и онлайн.",
    icon: QrCode,
    badge: "National QR",
  },
  {
    title: "Международные переводы",
    description:
      "Легальные трансграничные переводы в основные валюты с финмониторингом.",
    icon: Globe2,
    badge: "Cross-border",
  },
  {
    title: "API и iFrame интеграции",
    description:
      "Гибкие SDK, вебхуки и iFrame для встраивания X-HUB в существующие процессы.",
    icon: Layers,
    badge: "Dev-ready",
  },
  {
    title: "Личный кабинет",
    description:
      "Управление транзакциями, статусы, роли команды и доступ к отчётности.",
    icon: ShieldCheck,
    badge: "Control",
  },
  {
    title: "Аналитика и финмониторинг",
    description:
      "Расширенные отчёты, сигналы по подозрительным операциям и экспорт данных.",
    icon: LineChart,
    badge: "Insights",
  },
];

const advantages = [
  {
    title: "Быстрая обработка операций",
    description:
      "Платформа обеспечивает мгновенные платежи, что позволяет ускорить финансовые операции.",
  },
  {
    title: "Высокий уровень безопасности",
    description:
      "Платформа применяет современные технологии для защиты данных и транзакций клиентов.",
  },
  {
    title: "Соответствие международным стандартам",
    description:
      "Платформа соответствует мировым стандартам, что гарантирует надёжность и безопасность операций.",
  },
  {
    title: "Удобный интерфейс",
    description:
      "Простой и понятный интерфейс облегчает работу с платформой, снижая время на обучение сотрудников.",
  },
  {
    title: "Стабильность",
    description:
      "Платформа обеспечивает стабильную работу и надёжность, минимизируя риски простоев и сбоев.",
  },
  {
    title: "Ежедневные выплаты",
    description:
      "Возможность ежедневных выплат упрощает управление денежными потоками и повышает ликвидность.",
  },
  {
    title: "Гибкие тарифы",
    description:
      "Платформа предлагает гибкие тарифные планы, адаптированные под потребности различных бизнесов.",
  },
  {
    title: "Интеграция с API",
    description:
      "Поддержка API-интеграций позволяет легко внедрить платформу в существующие бизнес-процессы.",
  },
];

const industries = [
  {
    title: "Местные магазины",
    description:
      "Быстрая и безопасная оплата товаров и услуг клиентами со всего мира.",
    points: ["Поддержка eCom и офлайн", "Фискальные отчёты"],
    icon: ShoppingBag,
  },
  {
    title: "Агентства недвижимости",
    description:
      "Инструменты для получения платежей и депозитов от клиентов из разных стран.",
    points: ["Сегрегированные счета", "Гибкая конвертация"],
    icon: Building2,
  },
  {
    title: "Прокат автомобилей",
    description:
      "Гибкие тарифы и интеграции с учётными системами проката и залогами.",
    points: ["Быстрые возвраты", "Поддержка залогов"],
    icon: Car,
  },
  {
    title: "Маркетплейсы",
    description:
      "Международные платежи для продавцов и покупателей с автоматизацией расчётов.",
    points: ["Разделение выплат", "Мультивалютность"],
    icon: Store,
  },
  {
    title: "IT и цифровые товары",
    description:
      "API-интеграции для продажи подписок, софта и цифрового контента.",
    points: ["Webhook-уведомления", "Фрод-модули"],
    icon: Laptop2,
  },
  {
    title: "Онлайн-образование",
    description:
      "Приём платежей от студентов из разных стран с гибкими планами.",
    points: ["Повторяющиеся платежи", "Динамические счета"],
    icon: GraduationCap,
  },
  {
    title: "SaaS-сервисы",
    description:
      "Стабильные выплаты и масштабируемость для разработчиков продуктов.",
    points: ["Billing API", "Метрики LTV"],
    icon: Boxes,
  },
  {
    title: "Другие компании",
    description:
      "Платформа подходит любому легальному бизнесу с международными клиентами.",
    points: ["Команда Success", "Обучение персонала"],
    icon: Handshake,
  },
];

const steps = [
  {
    title: "Знакомство",
    description: "Заполните форму и команда X-HUB подготовит вводный созвон.",
    icon: Sparkles,
  },
  {
    title: "KYB",
    description:
      "Проходим требования регуляторов и подтверждаем легальность бизнеса.",
    icon: ScrollText,
  },
  {
    title: "Интеграция",
    description:
      "Настраиваем API, iFrame или готовые модули под ваши процессы.",
    icon: Layers,
  },
  {
    title: "Обучение",
    description:
      "Делаем воркшопы для команды и запускаем приём платежей без стресса.",
    icon: BookOpen,
  },
];

const pricing = [
  {
    title: "QR-платежи",
    subtitle: "Национальные методы оплат",
    percent: "от 3.5%",
    features: [
      "Локальные QR стеки",
      "Готовые стикеры и виджеты",
      "Трекинг статусов в реальном времени",
    ],
  },
  {
    title: "Интернет-эквайринг",
    subtitle: "Национальные методы оплаты",
    percent: "от 4.5%",
    features: [
      "Приём карт и электронных кошельков",
      "Поддержка токенизации",
      "Гибкие antifraud правила",
    ],
  },
  {
    title: "Эквайринг без ограничений",
    subtitle: "Национальные и международные оплаты",
    percent: "от 5.5%",
    features: [
      "Мультивалютные сценарии",
      "Разделение выплат партнёрам",
      "Персональные условия под оборот",
    ],
    featured: true,
  },
];

const compliance = {
  company: "ОсОО «Алтынкопрю»",
  inn: "ИНН 00807202510038",
  address: "Кыргызстан, г. Бишкек, ул. Целинная 47",
  note: "Резидент High Technology Park of Kyrgyz Republic",
  certificate: "Просмотреть сертификат",
};

type DocumentFile = {
  title: string;
  description: string;
  file: string;
  text: string;
};

const documents: DocumentFile[] = [
  {
    title: "Политика противодействия отмыванию (AML)",
    description: "Регламент процедур мониторинга и контроля операций.",
    file: "/docs/AML_Policy_X-Hub_Tech.pdf",
    text: "/docs/text/AML_Policy_X-Hub_Tech.txt",
  },
  {
    title: "Политика KYC/KYB",
    description: "Подход к идентификации клиентов и партнёров.",
    file: "/docs/KYC_KYB_Policy_X-Hub_Tech.pdf",
    text: "/docs/text/KYC_KYB_Policy_X-Hub_Tech.txt",
  },
  {
    title: "Политика конфиденциальности",
    description: "Сбор, обработка и хранение персональных данных.",
    file: "/docs/Privacy_Policy_X-Hub_Tech.pdf",
    text: "/docs/text/Privacy_Policy_X-Hub_Tech.txt",
  },
  {
    title: "Политика риск-менеджмента",
    description: "Механики управления операционными и финрисками.",
    file: "/docs/Risk_Management_Policy_X-Hub_Tech.pdf",
    text: "/docs/text/Risk_Management_Policy_X-Hub_Tech.txt",
  },
  {
    title: "Политика скоринга и акцепта рисков",
    description: "Методология оценки сделок и клиентов.",
    file: "/docs/Risk_Scoring_Acceptance_Policy_FULL_XHub.pdf",
    text: "/docs/text/Risk_Scoring_Acceptance_Policy_FULL_XHub.txt",
  },
  {
    title: "Агентский договор (двуязычный)",
    description: "Публичный договор для партнёрских подключений.",
    file: "/docs/Agency_Agreement_Public_Bilingual_FULL_for_WWW.pdf",
    text: "/docs/text/Agency_Agreement_Public_Bilingual_FULL_for_WWW.txt",
  },
];

const navLinks = [
  { label: "Возможности", href: "#capabilities" },
  { label: "Преимущества", href: "#advantages" },
  { label: "Сферы", href: "#industries" },
  { label: "Этапы", href: "#steps" },
  { label: "Тарифы", href: "#pricing" },
  { label: "Документы", href: "#documents" },
];

export function LandingPage() {
  const [formState, setFormState] = useState<"idle" | "sent">("idle");
  const [activeDocument, setActiveDocument] = useState<DocumentFile | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormState("sent");
  };

  return (
    <div className="relative overflow-hidden bg-white text-slate-900">
      <div className="gradient-grid absolute inset-0 opacity-[0.15]"></div>
      <div className="noise-overlay"></div>

      <header className="relative z-10 mx-auto w-full max-w-6xl px-4 pt-4 sm:px-6 sm:pt-6 md:px-8 lg:px-0">
        <NavigationBar />
      </header>

      <main className="relative z-10 mx-auto flex max-w-6xl flex-col gap-16 px-4 pb-16 pt-8 sm:gap-20 sm:px-6 sm:pb-20 sm:pt-10 md:gap-24 md:px-8 md:pb-24 lg:px-0">
        <HeroSection />
        <CapabilitiesSection />
        <AdvantagesSection />
        <IndustriesSection />
        <StepsSection />
        <PricingSection />
        <ComplianceSection />
        <DocumentsSection onOpen={setActiveDocument} />
        <ContactSection formState={formState} onSubmit={handleSubmit} />
      </main>

      <AnimatePresence>
        {activeDocument ? (
          <DocumentViewer
            doc={activeDocument}
            onClose={() => setActiveDocument(null)}
          />
        ) : null}
      </AnimatePresence>

      <footer className="relative z-10 border-t border-slate-200 bg-slate-50 px-4 py-8 sm:px-6 sm:py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-base font-semibold text-slate-900">X-HUB</p>
            <p className="text-slate-500">
              Артерия международных финансов. Современная финтех-платформа.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 text-slate-600">
            <Link
              href="#contact"
              className="transition hover:text-slate-900"
              prefetch={false}
            >
              Связаться
            </Link>
            <Link
              href="#pricing"
              className="transition hover:text-slate-900"
              prefetch={false}
            >
              Тарифы
            </Link>
            <Link
              href="#documents"
              className="transition hover:text-slate-900"
              prefetch={false}
            >
              Документы
            </Link>
            <Link
              href="#compliance"
              className="transition hover:text-slate-900"
              prefetch={false}
            >
              Compliance & Legal
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function NavigationBar() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-full border border-slate-200 bg-white/80 px-4 py-3 text-sm shadow-[0_4px_20px_rgba(0,0,0,0.08)] backdrop-blur sm:gap-4 sm:px-5 lg:flex-nowrap">
      <div className="flex items-center gap-2 text-slate-900">
        <div className="h-2 w-2 animate-pulse rounded-full bg-[#635bff]" />
        <span className="text-base font-semibold tracking-tight">X-HUB</span>
      </div>
      <div className="hidden flex-1 items-center justify-center gap-1 text-slate-600 md:gap-2 lg:flex">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-full px-2 py-1 text-xs transition hover:text-slate-900 md:px-3 md:text-sm"
            prefetch={false}
          >
            {link.label}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <Link
          href="#documents"
          className="hidden rounded-full border border-slate-300 px-3 py-2 text-slate-700 transition hover:border-slate-400 hover:text-slate-900 sm:inline-flex sm:px-4"
          prefetch={false}
        >
          Документы
        </Link>
        <Link
          href="#contact"
          className={buttonClasses("primary")}
          prefetch={false}
        >
          Связаться
        </Link>
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      animate="show"
      className="relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50 via-white to-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)] sm:rounded-3xl sm:p-8 lg:p-12"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#635bff]/[0.02] via-transparent to-[#00d4ff]/[0.015] blur-3xl" />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-[0.03] blur-2xl [background:conic-gradient(from_180deg_at_50%_50%,rgba(58,176,255,0.15),rgba(106,91,255,0.25),transparent_70%)]" />
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-slate-200 to-transparent opacity-30" />
        <div className="absolute right-8 top-6 h-24 w-24 rounded-full bg-gradient-to-br from-cyan-400/10 to-purple-500/10 blur-2xl" />
      </div>
      <div className="relative z-10 flex flex-col gap-10 lg:flex-row lg:items-center">
        <div className="flex-1 space-y-6">
          <Badge icon={Sparkles}>Артерия международных финансов</Badge>
          <h1 className="max-w-2xl text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl md:text-5xl lg:text-6xl">
            Когда мир ставит стены — X-HUB создаёт платёжные мосты.
          </h1>
          <p className="max-w-2xl text-base text-slate-600 sm:text-lg">
            Приём платежей, QR-эквайринг, международные переводы, API и iFrame
            интеграции, управление транзакциями, аналитика и финмониторинг —
            всё необходимое для легального бизнеса с международными клиентами.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <Link href="#contact" className={buttonClasses("primary")}>
              Подключиться
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link href="#pricing" className={buttonClasses("secondary")}>
              Узнать тарифы
            </Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {heroStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-slate-200 bg-white p-3 text-sm text-slate-600 shadow-sm sm:p-4"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                  {stat.label}
                </p>
                <p className="mt-2 text-xl font-semibold text-slate-900 sm:text-2xl">
                  {stat.value}
                </p>
                <p>{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
        <HeroVisual />
      </div>
    </motion.section>
  );
}

function HeroVisual() {
  return (
    <div className="relative hidden flex-1 items-center justify-center lg:flex">
      <motion.div
        className="glow-ring-light relative h-80 w-80 rounded-[40px] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
        initial={{ opacity: 0, y: 30, rotate: -15 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 0.9, ease: easeOutBezier }}
      >
        <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-[#635bff]/[0.02] via-transparent to-[#00d4ff]/[0.03]" />
        <div className="absolute inset-[20px] rounded-[30px] border border-slate-100 bg-slate-50/50 p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
            Пульс X-HUB
          </p>
          <div className="mt-6 space-y-4">
            <MetricPill
              label="Международные платежи"
              value="+184%"
              accent="from-[#635bff] to-[#0a2540]"
            />
            <MetricPill
              label="Фрод-алерты"
              value="0.01%"
              accent="from-[#0a2540] to-[#00d4ff]"
            />
            <MetricPill
              label="Скорость API"
              value="180 мс"
              accent="from-[#00d4ff] to-[#635bff]"
            />
          </div>
        </div>
      </motion.div>
      <motion.div
        className="absolute -right-6 -top-6 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm text-slate-700 shadow-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        API uptime · 99,95%
      </motion.div>
      <motion.div
        className="absolute -left-4 bottom-0 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm text-slate-700 shadow-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.75, duration: 0.5 }}
      >
        Ежедневные выплаты
      </motion.div>
    </div>
  );
}

function MetricPill({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm">
      <p className="text-slate-600">{label}</p>
      <span
        className={`bg-gradient-to-r ${accent} bg-clip-text text-base font-semibold text-transparent`}
      >
        {value}
      </span>
    </div>
  );
}

function Badge({
  children,
  icon: Icon,
}: {
  children: ReactNode;
  icon?: ElementType;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-700 sm:gap-2 sm:px-4 sm:text-xs sm:tracking-[0.3em]">
      {Icon ? <Icon className="h-2.5 w-2.5 sm:h-3 sm:w-3" /> : null}
      {children}
    </span>
  );
}

function CapabilitiesSection() {
  return (
    <section id="capabilities" className="space-y-8">
      <SectionHeading
        eyebrow="Возможности платформы"
        title="Всё необходимое для легального бизнеса"
        description="Приём платежей, QR-эквайринг, международные переводы, API-интеграции, личный кабинет и финмониторинг."
      />
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="grid gap-4 sm:gap-5 md:grid-cols-2 md:gap-6"
      >
        {capabilities.map((capability) => {
          const Icon = capability.icon;
          return (
            <motion.div
              key={capability.title}
              variants={fadeUp}
              className="group h-full rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_12px_rgba(0,0,0,0.04)] transition hover:border-slate-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] sm:rounded-3xl sm:p-6"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-2 text-slate-700 sm:rounded-2xl sm:p-3">
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <span className="text-[0.65rem] uppercase tracking-[0.2em] text-slate-500 sm:text-xs sm:tracking-[0.3em]">
                  {capability.badge}
                </span>
              </div>
              <h3 className="mt-3 text-lg font-semibold text-slate-900 sm:mt-4 sm:text-xl">
                {capability.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                {capability.description}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}

function AdvantagesSection() {
  return (
    <section id="advantages" className="space-y-8">
      <SectionHeading
        eyebrow="Преимущества для бизнеса"
        title="Скорость, безопасность и удобство"
        description="X-HUB создаёт стабильную инфраструктуру для международных платежей и ежедневных расчётов."
      />
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4"
      >
        {advantages.map((advantage) => (
          <motion.div
            key={advantage.title}
            variants={fadeUp}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-5"
          >
            <h3 className="text-base font-semibold text-slate-900 sm:text-lg">
              {advantage.title}
            </h3>
            <p className="mt-2 text-sm text-slate-600 sm:mt-3">
              {advantage.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function IndustriesSection() {
  return (
    <section id="industries" className="space-y-8">
      <SectionHeading
        eyebrow="Сферы бизнеса"
        title="Подходит для компаний с международными платежами"
        description="Местные магазины, агентства недвижимости, прокаты автомобилей, маркетплейсы, IT-компании, EdTech, SaaS и другие отрасли."
      />
      <div className="grid gap-6 md:grid-cols-2">
        {industries.map((industry) => {
          const Icon = industry.icon;
          return (
            <motion.div
              key={industry.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_12px_rgba(0,0,0,0.04)] sm:rounded-3xl sm:p-6"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-2 sm:rounded-2xl sm:p-3">
                  <Icon className="h-4 w-4 text-slate-700 sm:h-5 sm:w-5" />
                </div>
                <h3 className="text-base font-semibold text-slate-900 sm:text-lg">
                  {industry.title}
                </h3>
              </div>
              <p className="mt-2 text-sm text-slate-600 sm:mt-3">{industry.description}</p>
              <ul className="mt-3 space-y-1 text-xs text-slate-700 sm:mt-4 sm:text-sm">
                {industry.points.map((point) => (
                  <li key={point} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#635bff]" />
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function StepsSection() {
  return (
    <section id="steps" className="space-y-8">
      <SectionHeading
        eyebrow="Этапы работы"
        title="Простые шаги, чтобы начать приём платежей"
        description="Знакомство, KYB, интеграция и обучение — прозрачный путь запуска."
      />
      <div className="relative grid gap-4 sm:grid-cols-2 sm:gap-5 md:gap-6 lg:grid-cols-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:rounded-3xl sm:p-6"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-2 sm:rounded-2xl sm:p-3">
                  <Icon className="h-4 w-4 text-slate-700 sm:h-5 sm:w-5" />
                </div>
                <span className="text-[0.65rem] uppercase tracking-[0.2em] text-slate-500 sm:text-xs sm:tracking-[0.3em]">
                  Шаг {index + 1}
                </span>
              </div>
              <h3 className="mt-3 text-lg font-semibold text-slate-900 sm:mt-4 sm:text-xl">{step.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{step.description}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section id="pricing" className="space-y-8">
      <SectionHeading
        eyebrow="Тарифы и комиссии"
        title="Прозрачные условия для каждого кейса"
        description="QR-платежи от 3.5%, интернет-эквайринг от 4.5%, международный эквайринг от 5.5%."
      />
      <div className="grid gap-4 sm:gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
        {pricing.map((plan) => (
          <motion.div
            key={plan.title}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className={twMerge(
              "rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_12px_rgba(0,0,0,0.04)] sm:rounded-3xl sm:p-6",
              plan.featured && "border-[#635bff] bg-gradient-to-b from-[#635bff]/[0.02] to-white shadow-[0_8px_24px_rgba(99,91,255,0.12)] lg:-translate-y-4"
            )}
          >
            <p className="text-[0.65rem] uppercase tracking-[0.2em] text-slate-500 sm:text-xs sm:tracking-[0.3em]">
              {plan.subtitle}
            </p>
            <h3 className="mt-2 text-xl font-semibold text-slate-900 sm:mt-3 sm:text-2xl">
              {plan.title}
            </h3>
            <p className="mt-1 text-2xl font-light text-slate-900 sm:mt-2 sm:text-3xl">
              {plan.percent}
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-700 sm:mt-6 sm:space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#635bff]" />
                  {feature}
                </li>
              ))}
            </ul>
            <Link href="#contact" className={twMerge(buttonClasses("primary"), "mt-5 w-full justify-center sm:mt-6")}>
              Запросить условия
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function ComplianceSection() {
  return (
    <section
      id="compliance"
      className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)] sm:rounded-3xl sm:p-8"
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <Badge icon={ShieldCheck}>Compliance & Legal</Badge>
          <h3 className="mt-4 text-2xl font-semibold text-slate-900 sm:text-3xl">
            Соблюдаем стандарты и требования регуляторов
          </h3>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            {compliance.note}. {compliance.company}. {compliance.inn}.{" "}
            {compliance.address}.
          </p>
        </div>
        <Link
          href="https://drive.google.com/file/d/1dc-wy9iBgaOp-rgt3pll9a73wR89P4zx/view"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-900 shadow-sm transition hover:border-slate-300 hover:shadow-lg sm:gap-4 sm:p-5"
        >
          <div className="mb-3 flex w-full items-center justify-between sm:mb-4">
            <p className="text-xs font-semibold sm:text-sm">{compliance.certificate}</p>
            <ArrowUpRight className="h-4 w-4 flex-shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#635bff]" />
          </div>
          <div className="flex w-full items-center justify-start">
            <Image
              src="/htp-logo.png"
              alt="High Technology Park of the Kyrgyz Republic"
              width={200}
              height={80}
              className="h-16 w-auto object-contain sm:h-20"
            />
          </div>
        </Link>
      </div>
    </section>
  );
}

function DocumentsSection({
  onOpen,
}: {
  onOpen: (doc: DocumentFile) => void;
}) {
  return (
    <section id="documents" className="space-y-8">
      <SectionHeading
        eyebrow="Политики и документы"
        title="Комплаенс пакет X-HUB доступен публично"
        description="Откройте действующие политики AML, KYC/KYB, риск-менеджмента и агентский договор — это ускорит due diligence."
      />
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="grid gap-4 sm:gap-5 md:grid-cols-2 md:gap-6"
      >
        {documents.map((doc) => (
          <motion.div
            key={doc.file}
            variants={fadeUp}
            className="flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_12px_rgba(0,0,0,0.04)] sm:rounded-3xl sm:p-6"
          >
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-2 text-slate-700 sm:rounded-2xl sm:p-3">
                <FileText className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-900 sm:text-lg">{doc.title}</h3>
                <p className="mt-1 text-sm text-slate-600 sm:mt-2">{doc.description}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onOpen(doc)}
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#635bff] transition hover:text-[#0a2540] sm:mt-6"
            >
              Открыть документ
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function DocumentViewer({
  doc,
  onClose,
}: {
  doc: DocumentFile | null;
  onClose: () => void;
}) {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    if (!doc) {
      return;
    }
    let cancelled = false;

    const load = async () => {
      try {
        setIsLoading(true);
        setLoadError(null);
        setContent("");
        const response = await fetch(doc.text);
        if (!response.ok) {
          throw new Error("failed");
        }
        const textContent = await response.text();
        if (!cancelled) {
          setContent(textContent.trim());
        }
      } catch {
        if (!cancelled) {
          setLoadError("Не удалось загрузить документ. Попробуйте позже.");
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [doc]);

  if (!doc) {
    return null;
  }

  return (
    <motion.div
      className="fixed inset-0 z-40 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur"
        onClick={onClose}
      />
      <motion.div
        className="relative z-10 flex h-[85vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-[0_40px_120px_rgba(0,0,0,0.3)] sm:h-[80vh] sm:rounded-3xl"
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
      >
        <header className="flex items-start justify-between gap-3 border-b border-slate-200 px-4 py-3 sm:gap-4 sm:px-6 sm:py-4">
          <div className="min-w-0 flex-1">
            <p className="text-[0.65rem] uppercase tracking-[0.2em] text-slate-500 sm:text-xs sm:tracking-[0.3em]">
              Документ
            </p>
            <h3 className="mt-1 text-base font-semibold text-slate-900 sm:text-xl">{doc.title}</h3>
            <p className="mt-1 hidden text-sm text-slate-600 sm:block">{doc.description}</p>
          </div>
          <div className="flex flex-shrink-0 gap-2">
            <Link
              href={doc.file}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-slate-300 px-3 py-2 text-xs text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 sm:text-sm"
            >
              PDF
            </Link>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-slate-300 px-3 py-2 text-xs text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 sm:text-sm"
            >
              Закрыть
            </button>
          </div>
        </header>
        <div className="document-frame-container flex-1">
          {isLoading ? (
            <div className="document-frame flex items-center justify-center text-slate-600">
              Загружаем документ…
            </div>
          ) : loadError ? (
            <div className="document-frame text-red-600">{loadError}</div>
          ) : (
            <div className="document-frame text-slate-900">{content || "Документ пуст."}</div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function ContactSection({
  formState,
  onSubmit,
}: {
  formState: "idle" | "sent";
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <section id="contact" className="grid gap-6 sm:gap-8 lg:grid-cols-2">
      <div className="space-y-4">
        <SectionHeading
          eyebrow="Форма обратной связи"
          title="Заполните форму, чтобы узнать условия подключения"
          description="Менеджер X-HUB свяжется с вами, уточнит детали и проведёт по этапам запуска."
        />
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600 sm:rounded-3xl sm:p-6">
          <p className="text-xs sm:text-sm">ОсОО «Алтынкопрю» · {compliance.inn}</p>
          <p className="mt-2 text-xs sm:text-sm">{compliance.address}</p>
          <p className="mt-2 text-xs text-slate-500 sm:text-sm">
            Команда поддержки отвечает в течение рабочего дня.
          </p>
        </div>
      </div>
      <motion.form
        onSubmit={onSubmit}
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.06)] sm:rounded-3xl sm:p-6"
      >
        <div className="grid gap-4">
          <label className="text-sm text-slate-700">
            Компания
            <input
              type="text"
              required
              placeholder="Название компании"
              className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#635bff] focus:outline-none focus:ring-2 focus:ring-[#635bff]/20 sm:rounded-2xl sm:px-4 sm:py-3"
            />
          </label>
          <label className="text-sm text-slate-700">
            Имя и роль
            <input
              type="text"
              required
              placeholder="Мария, FinOps Lead"
              className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#635bff] focus:outline-none focus:ring-2 focus:ring-[#635bff]/20 sm:rounded-2xl sm:px-4 sm:py-3"
            />
          </label>
          <label className="text-sm text-slate-700">
            Рабочий e-mail
            <input
              type="email"
              required
              placeholder="finance@company.com"
              className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#635bff] focus:outline-none focus:ring-2 focus:ring-[#635bff]/20 sm:rounded-2xl sm:px-4 sm:py-3"
            />
          </label>
          <label className="text-sm text-slate-700">
            Средний оборот в месяц
            <input
              type="text"
              placeholder="Например, 250 000 $"
              className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#635bff] focus:outline-none focus:ring-2 focus:ring-[#635bff]/20 sm:rounded-2xl sm:px-4 sm:py-3"
            />
          </label>
          <label className="text-sm text-slate-700">
            Расскажите о кейсе
            <textarea
              rows={4}
              placeholder="Опишите товары/услуги, географии клиентов и текущие боли."
              className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#635bff] focus:outline-none focus:ring-2 focus:ring-[#635bff]/20 sm:rounded-2xl sm:px-4 sm:py-3"
            ></textarea>
          </label>
        </div>
        <button type="submit" className={`${buttonClasses("primary")} mt-5 w-full justify-center sm:mt-6`}>
          Отправить заявку
          <ArrowUpRight className="h-4 w-4" />
        </button>
        <p
          className="mt-2 text-center text-xs text-slate-500 sm:mt-3 sm:text-sm"
          aria-live="polite"
        >
          {formState === "sent"
            ? "Спасибо! Мы получили заявку и скоро ответим."
            : "Нажимая кнопку, вы подтверждаете согласие с комплаенс-процессами X-HUB."}
        </p>
      </motion.form>
    </section>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="space-y-3">
      <Badge>{eyebrow}</Badge>
      <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl md:text-4xl">{title}</h2>
      <p className="text-sm text-slate-600 sm:text-base">{description}</p>
    </div>
  );
}

export default LandingPage;

