'use client';
import { useState } from 'react';
import { useDataStore } from '@/hooks/useDataStore';

export default function AdminHero() {
  const [form, setForm] = useDataStore('hero');
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Data is already auto-saved by useDataStore, just show confirmation
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
          <h1 className="admin-header__title">🌄 Pengaturan Hero Banner Utama</h1>
          <p style={{ color: 'var(--desa-muted)', fontSize: 14, marginTop: 4 }}>
            Kelola tampilan spanduk utama (Hero Header) di halaman beranda depan website
          </p>
        </div>
      </div>

      {saved && (
        <div style={{ background: '#E8F5E9', color: '#2E7D32', border: '1px solid #A5D6A7', padding: '12px 18px', borderRadius: 12, marginBottom: 20, fontWeight: 600 }}>
          ✅ Hero Banner berhasil diperbarui!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="admin-card" style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>✍️ Teks & Tagline Banner</h3>
          <div className="admin-form-group">
            <label>Tagline / Teks Atas Kecil</label>
            <input type="text" value={form.tagline || ''} onChange={e => handleChange('tagline', e.target.value)} required />
          </div>
          <div className="admin-form-group">
            <label>Judul Utama (H1 Header)</label>
            <input type="text" value={form.judulUtama || ''} onChange={e => handleChange('judulUtama', e.target.value)} required />
          </div>
          <div className="admin-form-group">
            <label>Deskripsi Subjudul</label>
            <textarea rows={3} value={form.subJudul || ''} onChange={e => handleChange('subJudul', e.target.value)} required />
          </div>
        </div>

        <div className="admin-card" style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>🖼️ Gambar Latar Belakang & Tombol Aksi</h3>
          <div className="admin-form-group">
            <label>Path / URL Gambar Latar Belakang</label>
            <input type="text" value={form.gambarBg || ''} onChange={e => handleChange('gambarBg', e.target.value)} required />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="admin-form-group">
              <label>Teks Tombol 1</label>
              <input type="text" value={form.tombol1Text || ''} onChange={e => handleChange('tombol1Text', e.target.value)} required />
            </div>
            <div className="admin-form-group">
              <label>Link Tujuan Tombol 1</label>
              <input type="text" value={form.tombol1Link || ''} onChange={e => handleChange('tombol1Link', e.target.value)} required />
            </div>
            <div className="admin-form-group">
              <label>Teks Tombol 2</label>
              <input type="text" value={form.tombol2Text || ''} onChange={e => handleChange('tombol2Text', e.target.value)} required />
            </div>
            <div className="admin-form-group">
              <label>Link Tujuan Tombol 2</label>
              <input type="text" value={form.tombol2Link || ''} onChange={e => handleChange('tombol2Link', e.target.value)} required />
            </div>
          </div>
        </div>

        <button type="submit" className="admin-btn admin-btn--primary" style={{ padding: '12px 28px', fontSize: 15 }}>
          💾 Simpan Pengaturan Hero
        </button>
      </form>
    </>
  );
}
