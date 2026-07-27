'use client';
import { useState } from 'react';
import { useDataStore } from '@/hooks/useDataStore';

export default function AdminLayanan() {
  const [data, setData] = useDataStore('layanan');
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({ nama: '', estimasi: '1 Hari Kerja', syarat: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editItem) {
      setData(data.map(d => d.id === editItem.id ? { ...d, ...form } : d));
    } else {
      setData([...data, { id: Date.now(), ...form }]);
    }
    setForm({ nama: '', estimasi: '1 Hari Kerja', syarat: '' });
    setShowForm(false);
    setEditItem(null);
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setForm(item);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (confirm('Yakin ingin menghapus layanan ini?')) {
      setData(data.filter(d => d.id !== id));
    }
  };

  return (
    <>
      <div className="admin-header">
        <div>
          <h1 className="admin-header__title">📄 Layanan & Persyaratan Surat</h1>
          <p style={{ color: 'var(--desa-muted)', fontSize: 14, marginTop: 4 }}>
            Kelola daftar layanan administrasi dan persyaratannya untuk masyarakat
          </p>
        </div>
        <button className="admin-btn admin-btn--primary" onClick={() => { setShowForm(!showForm); setEditItem(null); setForm({ nama: '', estimasi: '1 Hari Kerja', syarat: '' }); }}>
          {showForm ? '❌ Tutup Form' : '➕ Tambah Jenis Layanan'}
        </button>
      </div>

      {showForm && (
        <div className="admin-card" style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>
            {editItem ? '✏️ Edit Layanan' : '➕ Tambah Jenis Layanan Baru'}
          </h3>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
              <div className="admin-form-group">
                <label>Nama Surat / Layanan</label>
                <input type="text" value={form.nama} onChange={e => setForm({...form, nama: e.target.value})} required placeholder="Contoh: Surat Keterangan Usaha (SKU)" />
              </div>
              <div className="admin-form-group">
                <label>Estimasi Waktu Proses</label>
                <input type="text" value={form.estimasi} onChange={e => setForm({...form, estimasi: e.target.value})} required placeholder="1 Hari Kerja" />
              </div>
            </div>
            <div className="admin-form-group">
              <label>Persyaratan Dokumen (Pisahkan dengan koma)</label>
              <textarea rows={4} value={form.syarat} onChange={e => setForm({...form, syarat: e.target.value})} required placeholder="KTP, KK, Surat Pengantar RT/RW..." />
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
              <button type="submit" className="admin-btn admin-btn--primary">
                {editItem ? '💾 Simpan Perubahan' : '✨ Simpan Layanan'}
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
              <th>Nama Layanan Surat</th>
              <th>Estimasi Proses</th>
              <th>Persyaratan Dokumen</th>
              <th style={{ textAlign: 'right' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td style={{ fontWeight: 700 }}>{item.nama}</td>
                <td><span style={{ background: '#E8F5E9', color: '#2E7D32', padding: '4px 10px', borderRadius: 50, fontSize: 12, fontWeight: 700 }}>{item.estimasi}</span></td>
                <td style={{ fontSize: 13, color: 'var(--desa-muted)' }}>{item.syarat}</td>
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
