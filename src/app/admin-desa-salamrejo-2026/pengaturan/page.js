'use client';
import { useState, useRef } from 'react';
import { useDataStore } from '@/hooks/useDataStore';

export default function AdminPengaturan() {
  const [form, setForm] = useDataStore('pengaturan');
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef(null);

  const handleImageUpload = async (e) => {
    e.preventDefault();
    const file = e.target.files?.[0] || e.dataTransfer?.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Hanya file gambar yang diperbolehkan!');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setForm(prev => ({ ...prev, thumbnailVideoProfil: data.url }));
      } else {
        alert(data.error || 'Gagal mengunggah gambar.');
      }
    } catch (err) {
      console.error(err);
      alert('Terjadi kesalahan jaringan.');
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  return (
    <>
      <div className="admin-header">
        <div>
          <h1 className="admin-header__title">⚙️ Pengaturan Umum Desa</h1>
          <p style={{ color: 'var(--desa-muted)', fontSize: 14, marginTop: 4 }}>
            Kelola profil utama, identitas, dan kontak kantor Desa Salamrejo
          </p>
        </div>
      </div>

      {saved && (
        <div style={{
          background: '#E8F5E9', color: '#2E7D32', border: '1px solid #A5D6A7',
          padding: '12px 18px', borderRadius: 12, marginBottom: 20, fontWeight: 600
        }}>
          ✅ Pengaturan berhasil disimpan!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="admin-card" style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20, color: 'var(--desa-ink)' }}>
            📍 Identitas & Alamat Desa
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="admin-form-group">
              <label>Nama Desa</label>
              <input type="text" value={form.namaDesa || ''} onChange={e => handleChange('namaDesa', e.target.value)} required />
            </div>
            <div className="admin-form-group">
              <label>Nama Lurah / Kepala Desa</label>
              <input type="text" value={form.kepalaDesa || ''} onChange={e => handleChange('kepalaDesa', e.target.value)} required />
            </div>
            <div className="admin-form-group">
              <label>Kecamatan</label>
              <input type="text" value={form.kecamatan || ''} onChange={e => handleChange('kecamatan', e.target.value)} required />
            </div>
            <div className="admin-form-group">
              <label>Kabupaten / Kota</label>
              <input type="text" value={form.kabupaten || ''} onChange={e => handleChange('kabupaten', e.target.value)} required />
            </div>
          </div>
          <div className="admin-form-group">
            <label>Alamat Lengkap Kantor Desa</label>
            <textarea rows={3} value={form.alamatKantor || ''} onChange={e => handleChange('alamatKantor', e.target.value)} required />
          </div>
        </div>

        <div className="admin-card" style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20, color: 'var(--desa-ink)' }}>
            📞 Kontak & Jam Operasional
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="admin-form-group">
              <label>Nomor Telepon / WhatsApp</label>
              <input type="text" value={form.telepon || ''} onChange={e => handleChange('telepon', e.target.value)} required />
            </div>
            <div className="admin-form-group">
              <label>Email Resmi</label>
              <input type="email" value={form.email || ''} onChange={e => handleChange('email', e.target.value)} required />
            </div>
          </div>
          <div className="admin-form-group">
            <label>Jam Pelayanan Layanan</label>
            <input type="text" value={form.jamKerja || ''} onChange={e => handleChange('jamKerja', e.target.value)} required />
          </div>
        </div>

        <div className="admin-card" style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20, color: 'var(--desa-ink)' }}>
            🌐 Media Sosial Resmi
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="admin-form-group">
              <label>Link Facebook</label>
              <input type="text" value={form.facebook || ''} onChange={e => handleChange('facebook', e.target.value)} />
            </div>
            <div className="admin-form-group">
              <label>Link Instagram</label>
              <input type="text" value={form.instagram || ''} onChange={e => handleChange('instagram', e.target.value)} />
            </div>
          </div>
          <div className="admin-form-group">
            <label>Link Video Profil Desa (YouTube / Google Drive)</label>
            <input type="text" value={form.videoProfil || ''} onChange={e => handleChange('videoProfil', e.target.value)} placeholder="Contoh: https://drive.google.com/..." />
          </div>
          <div className="admin-form-group" style={{ marginTop: 16 }}>
            <label>Gambar Thumbnail Video (Drag & Drop)</label>
            <div 
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleImageUpload}
              onClick={() => fileRef.current?.click()}
              style={{
                border: '2px dashed #CBD5E1', padding: '32px', textAlign: 'center',
                borderRadius: '16px', cursor: 'pointer', backgroundColor: '#F8FAFC',
                transition: 'all 0.2s ease', position: 'relative'
              }}
            >
              {uploading ? (
                <div style={{ color: 'var(--desa-gold)', fontWeight: 600 }}>⏳ Mengunggah gambar...</div>
              ) : form.thumbnailVideoProfil ? (
                <img src={form.thumbnailVideoProfil} alt="Thumbnail" style={{ height: 120, borderRadius: 8, objectFit: 'cover' }} />
              ) : (
                <div style={{ color: '#64748B' }}>
                  📸 Klik atau Tarik Gambar ke Sini<br/>
                  <span style={{ fontSize: 12, opacity: 0.7 }}>(Maks 1 MB, disarankan resolusi 16:9)</span>
                </div>
              )}
              <input 
                type="file" 
                ref={fileRef}
                onChange={handleImageUpload} 
                accept="image/*" 
                style={{ display: 'none' }} 
              />
            </div>
          </div>
        </div>

        <button type="submit" className="admin-btn admin-btn--primary" style={{ padding: '12px 28px', fontSize: 15 }}>
          💾 Simpan Semua Pengaturan
        </button>
      </form>
    </>
  );
}
