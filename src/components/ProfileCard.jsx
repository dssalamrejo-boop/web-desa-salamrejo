export default function ProfileCard({
  name,
  role,
  category = 'APARATUR DESA',
  description,
  photoUrl,
  badgeColor = 'var(--desa-gold)',
  iconColor = 'var(--desa-gold)',
}) {
  return (
    <div className="desa-profile-card">
      <div className="desa-profile-card__photo">
        {photoUrl ? (
          <img src={photoUrl} alt={name} />
        ) : (
          <div className="desa-profile-card__photo-placeholder">
            <div className="desa-profile-card__photo-icon" style={{ color: iconColor }}>
              <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
          </div>
        )}
        <span className="desa-profile-card__badge" style={{ background: badgeColor }}>
          {role}
        </span>
      </div>
      <div className="desa-profile-card__body">
        <div>
          <span className="desa-profile-card__category">{category}</span>
          <h4 className="desa-profile-card__name">{name}</h4>
        </div>
        {description && (
          <div className="desa-profile-card__desc-area">
            <strong className="desa-profile-card__desc-label">
               Deskripsi Tugas:
            </strong>
            <p className="desa-profile-card__desc">{description}</p>
          </div>
        )}
      </div>
    </div>
  );
}
