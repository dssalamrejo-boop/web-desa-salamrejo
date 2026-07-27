'use client';
import { useState } from 'react';
import { useDataStore } from '@/hooks/useDataStore';

export default function AdminGaleri() {
  const [data, setData] = useDataStore('galeri');
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({ judul: '', kategori: 'Kegiatan', url: '', tanggal: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editItem) {
      setData(data.map(d => d.id === editItem.id ? { ...d, ...form } : d));
    } else {
      setData([...data, { id: Date.now(), ...form }]);
    }
    setForm({ judul: '', kategori: 'Kegiatan', url: '', tanggal: '' });
    setShowForm(false);
    setEditItem(null);
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setForm(item);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (confirm('Yakin ingin menghapus foto galeri ini?')) {
      setData(data.filter(d => d.id !== id));
    }
  };

  return (
    <>
      <div className="admin-header">
        <div>
          <h1 className="admin-header__title">🖼️ Galeri Foto Desa</h1>
          <p style={{ color: 'var(--desa-muted)', fontSize: 14, marginTop: 4 }}>
            Kelola dokumentasi foto kegiatan, kebudayaan, dan pembangunan desa
          </p>
        </div>
        <button className="admin-btn admin-btn--primary" onClick={() => { setShowForm(!showForm); setEditItem(null); setForm({ judul: '', kategori: 'Kegiatan', url: '', tanggal: '' }); }}>
          {showForm ? '❌ Tutup Form' : '➕ Upload Foto Baru'}
        </button>
      </div>

      {showForm && (
        <div className="admin-card" style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>
            {editItem ? '✏️ Edit Foto Galeri' : '➕ Upload Foto Galeri Baru'}
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="admin-form-group">
              <label>Judul / Keterangan Foto</label>
              <input type="text" value={form.judul} onChange={e => setForm({...form, judul: e.target.value})} required placeholder="Contoh: Kegiatan Merti Desa Salamrejo" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div className="admin-form-group">
                <label>Kategori</label>
                <select value={form.kategori} onChange={e => setForm({...form, kategori: e.target.value})}>
                  <option value="Kegiatan Warga">Kegiatan Masyarakat</option>
                  <option value="Budaya">Kebudayaan & Tradisi</option>
                  <option value="Pembangunan">Pembangunan Desa</option>
                  <option value="Pemerintahan">Pemerintahan</option>
                  <option value="Posyandu">Posyandu</option>
                  <option value="UMKM">UMKM</option>
                </select>
              </div>
              <div className="admin-form-group">
                <label>Tanggal Foto</label>
                <input type="date" value={form.tanggal} onChange={e => setForm({...form, tanggal: e.target.value})} required />
              </div>
            </div>
            <div className="admin-form-group">
              <label>URL Gambar / Path Foto</label>
              <input type="text" value={form.url} onChange={e => setForm({...form, url: e.target.value})} required placeholder="/hero-galeri.webp" />
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
              <button type="submit" className="admin-btn admin-btn--primary">
                {editItem ? '💾 Simpan Perubahan' : '✨ Simpan Foto'}
              </button>
              <button type="button" className="admin-btn" style={{ background: 'var(--desa-paper)' }} onClick={() => setShowForm(false)}>
                Batal
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="admin-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Pratinjau</th>
              <th>Judul Foto</th>
              <th>Kategori</th>
              <th>Tanggal</th>
              <th style={{ textAlign: 'right' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>
                  <div style={{ width: 60, height: 40, borderRadius: 6, background: '#DDD', overflow: 'hidden' }}>
                    <img src={item.url} alt={item.judul} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.style.display = 'none'; }} />
                  </div>
                </td>
                <td style={{ fontWeight: 700 }}>{item.judul}</td>
                <td><span style={{ background: 'rgba(212,136,42,0.1)', color: 'var(--desa-gold)', padding: '4px 10px', borderRadius: 50, fontSize: 12, fontWeight: 700 }}>{item.kategori}</span></td>
                <td style={{ fontSize: 13, color: 'var(--desa-muted)' }}>{item.tanggal}</td>
                <td style={{ textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                    <button className="admin-btn admin-btn--sm" style={{ background: 'var(--desa-paper)' }} onClick={() => handleEdit(item)}>✏️ Edit</button>
                    <button className="admin-btn admin-btn--sm admin-btn--danger" onClick={() => handleDelete(item.id)}>🗑️ Hapus</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
