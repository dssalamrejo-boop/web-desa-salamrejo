import Link from 'next/link';

export default function HeroBanner({
  image = '/images/default-hero.jpg',
  eyebrow,
  eyebrowIcon,
  title,
  description,
  pills = [],
  variant = 'default', // 'default' | 'full'
  actions = [],       // [{ label, href, icon, variant: 'primary'|'secondary' }]
  showVideoPreview = false,
  videoTitle = 'Profil Desa Salamrejo',
  videoSrc = 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-countryside-landscape-41551-large.mp4',
  children,
}) {
  const heroClass = variant === 'full' ? 'desa-hero desa-hero--full' : 'desa-hero';

  return (
    <section
      className={heroClass}
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(18,12,8,0.72) 0%, rgba(18,12,8,0.48) 45%, rgba(18,12,8,0.15) 75%, rgba(18,12,8,0.02) 100%), url('${image}')`,
      }}
    >
      <div className="desa-hero__content">
        {eyebrow && (
          <span className="desa-hero__eyebrow">
            {eyebrowIcon && <span style={{ marginRight: 6, color: 'var(--desa-gold)' }}>{eyebrowIcon}</span>}
            {eyebrow}
          </span>
        )}

        <h1 className="desa-hero__title">{title}</h1>

        {description && <p className="desa-hero__desc">{description}</p>}

        {/* Quick Jump Pills */}
        {pills.length > 0 && (
          <div className="desa-pill-nav">
            {pills.map((pill, i) => (
              <a key={i} href={pill.href} className="desa-pill-nav__link">
                {pill.icon && <span className="icon">{pill.icon}</span>}
                {pill.label}
              </a>
            ))}
          </div>
        )}

        {/* Action Buttons (Homepage) */}
        {actions.length > 0 && (
          <div className="desa-hero__actions">
            {actions.map((action, i) => (
              <Link
                key={i}
                href={action.href}
                className={action.variant === 'secondary' ? 'desa-btn-secondary' : 'desa-btn-primary'}
              >
                {action.icon && <span>{action.icon}</span>}
                {action.label}
              </Link>
            ))}
          </div>
        )}

        {children}
      </div>

      {/* Floating Video Preview Box */}
      {showVideoPreview && (
        <a
          href="#sambutan-kades"
          className="desa-hero-video-preview"
          aria-label="Putar Video Profil Desa"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.88,
            }}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>

          {/* Centered Play Icon Badge */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'radial-gradient(circle, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.45) 100%)',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'var(--desa-gold)',
                color: '#FFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                boxShadow: '0 4px 18px rgba(212, 136, 42, 0.5)',
              }}
            >
              ▶
            </div>
          </div>
        </a>
      )}
    </section>
  );
}
