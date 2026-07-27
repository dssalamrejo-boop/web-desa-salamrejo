'use client';
import { useState, useRef } from 'react';
import { useDataStore } from '@/hooks/useDataStore';

const kategoriOptions = ['Wisata Alam', 'Situs Sejarah', 'Pendidikan', 'Spiritual', 'Kebudayaan', 'Kerajinan'];

export default function AdminPotensiDesa() {
  const [data, setData] = useDataStore('potensiDesa');
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({ nama: '', link: '', kategori: 'Wisata Alam', deskripsi: '', gambar: '' });
  const [previewImg, setPreviewImg] = useState('');
  const fileRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
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
        setForm({ ...form, gambar: data.url });
        setPreviewImg(data.url);
      } else {
        alert(data.error || 'Gagal mengunggah gambar.');
      }
    } catch (err) {
      console.error(err);
      alert('Terjadi kesalahan saat mengunggah gambar.');
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editItem) {
      setData(data.map(d => d.id === editItem.id ? { ...d, ...form } : d));
    } else {
      setData([...data, { id: Date.now(), ...form }]);
    }
    resetForm();
  };

  const resetForm = () => {
    setForm({ nama: '', link: '', kategori: 'Wisata Alam', deskripsi: '', gambar: '' });
    setPreviewImg('');
    setShowForm(false);
    setEditItem(null);
    if (fileRef.current) fileRef.current.value = '';
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setForm(item);
    setPreviewImg(item.gambar || '');
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (confirm('Yakin ingin menghapus item potensi desa ini?')) {
      setData(data.filter(d => d.id !== id));
    }
  };

  return (
    <>
      <div className="admin-header">
        <div>
          <h1 className="admin-header__title">{'\u{1F3D4}\u{FE0F}'} Potensi Desa Salamrejo</h1>
          <p style={{ color: 'var(--desa-muted)', fontSize: 14, marginTop: 4 }}>
            Kelola destinasi wisata, situs sejarah, kerajinan, dan potensi unggulan desa
          </p>
        </div>
        <button className="admin-btn admin-btn--primary" onClick={() => { showForm ? resetForm() : setShowForm(true); }}>
          {showForm ? '\u{274C} Tutup Form' : '\u{2795} Tambah Potensi'}
        </button>
      </div>

      {showForm && (
        <div className="admin-card" style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>
            {editItem ? '\u{270F}\u{FE0F} Edit Potensi Desa' : '\u{2795} Tambah Potensi Desa Baru'}
          </h3>
          <form onSubmit={handleSubmit}>
            {/* Image Upload */}
            <div className="admin-form-group" style={{ marginBottom: 20 }}>
              <label>{'\u{1F4F7}'} Gambar / Foto</label>
              <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                <div style={{ flex: '0 0 auto' }}>
                  <div style={{
                    width: 200, height: 140, borderRadius: 12,
                    border: '2px dashed var(--desa-line)',
                    background: previewImg ? `url(${previewImg}) center/cover no-repeat` : 'var(--desa-paper)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', overflow: 'hidden',
                    transition: 'border-color 0.2s',
                  }}
                    onClick={() => fileRef.current?.click()}
                  >
                    {!previewImg && !uploading && (
                      <div style={{ textAlign: 'center', color: 'var(--desa-muted)' }}>
                        <div style={{ fontSize: 32, marginBottom: 4 }}>{'📸'}</div>
                        <div style={{ fontSize: 12, fontWeight: 600 }}>Klik untuk upload</div>
                        <div style={{ fontSize: 10, opacity: 0.7 }}>Maks. 1MB</div>
                      </div>
                    )}
                    {uploading && (
                      <div style={{ textAlign: 'center', color: 'var(--desa-gold)' }}>
                        <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>⏳</span>
                        <div style={{ fontSize: 12, fontWeight: 600, marginTop: 4 }}>Mengunggah...</div>
                      </div>
                    )}
                  </div>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                  />
                  {previewImg && (
                    <button
                      type="button"
                      onClick={() => { setForm({ ...form, gambar: '' }); setPreviewImg(''); if (fileRef.current) fileRef.current.value = ''; }}
                      style={{
                        display: 'block', margin: '8px auto 0', fontSize: 12,
                        color: '#E74C3C', background: 'none', border: 'none',
                        cursor: 'pointer', fontWeight: 600,
                      }}
                    >
                      {'\u{1F5D1}\u{FE0F}'} Hapus Gambar
                    </button>
                  )}
                </div>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <p style={{ fontSize: 13, color: 'var(--desa-muted)', lineHeight: 1.6, margin: 0 }}>
                    <strong>Tips:</strong><br />
                    {'\u{2022}'} Format: JPG, PNG, atau WebP<br />
                    {'\u{2022}'} Ukuran maksimal: 2MB<br />
                    {'\u{2022}'} Rasio ideal: 16:9 (landscape)<br />
                    {'\u{2022}'} Gambar akan ditampilkan sebagai thumbnail di halaman Potensi Desa
                  </p>
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div className="admin-form-group">
                <label>Nama Destinasi / Potensi</label>
                <input type="text" value={form.nama} onChange={e => setForm({...form, nama: e.target.value})} required placeholder="Contoh: Sumber Preih" />
              </div>
              <div className="admin-form-group">
                <label>Label / Link Singkat</label>
                <input type="text" value={form.link || ''} onChange={e => setForm({...form, link: e.target.value})} placeholder="Contoh: SUMBER PREH" />
              </div>
            </div>
            <div className="admin-form-group">
              <label>Kategori</label>
              <select value={form.kategori} onChange={e => setForm({...form, kategori: e.target.value})}>
                {kategoriOptions.map(k => (
                  <option key={k} value={k}>{k}</option>
                ))}
              </select>
            </div>
            <div className="admin-form-group">
              <label>Deskripsi Lengkap</label>
              <textarea rows={5} value={form.deskripsi || ''} onChange={e => setForm({...form, deskripsi: e.target.value})} required placeholder="Deskripsi detail mengenai potensi desa ini..." />
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
              <button type="submit" className="admin-btn admin-btn--primary">
                {editItem ? '\u{1F4BE} Simpan Perubahan' : '\u{2728} Simpan Potensi'}
              </button>
              <button type="button" className="admin-btn" style={{ background: 'var(--desa-paper)' }} onClick={resetForm}>
                Batal
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Data Table with Thumbnails */}
      <div className="admin-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ width: 70 }}>Foto</th>
              <th>Nama Potensi</th>
              <th>Kategori</th>
              <th>Label</th>
              <th style={{ textAlign: 'right' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>
                  <div style={{
                    width: 56, height: 40, borderRadius: 8, overflow: 'hidden',
                    background: item.gambar ? `url(${item.gambar}) center/cover no-repeat` : 'var(--desa-paper)',
                    border: '1px solid var(--desa-line)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 16, color: 'var(--desa-muted)',
                  }}>
                    {!item.gambar && '\u{1F5BC}\u{FE0F}'}
                  </div>
                </td>
                <td style={{ fontWeight: 700 }}>{item.nama}</td>
                <td>
                  <span style={{ background: 'rgba(212,136,42,0.1)', color: 'var(--desa-gold)', padding: '4px 10px', borderRadius: 50, fontSize: 12, fontWeight: 700 }}>
                    {item.kategori}
                  </span>
                </td>
                <td style={{ fontSize: 12, color: 'var(--desa-muted)' }}>{item.link}</td>
                <td style={{ textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                    <button className="admin-btn admin-btn--sm" style={{ background: 'var(--desa-paper)' }} onClick={() => handleEdit(item)}>{'\u{270F}\u{FE0F}'} Edit</button>
                    <button className="admin-btn admin-btn--sm admin-btn--danger" onClick={() => handleDelete(item.id)}>{'\u{1F5D1}\u{FE0F}'} Hapus</button>
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
