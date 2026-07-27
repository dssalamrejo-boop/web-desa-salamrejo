'use client';
import { useState } from 'react';
import { useDataStore } from '@/hooks/useDataStore';

export default function AdminAparatur() {
  const [data, setData] = useDataStore('aparatur');
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({ nama: '', jabatan: '', nip: '', foto: '', status: 'Aktif', tugas: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editItem) {
      setData(data.map(d => d.id === editItem.id ? { ...d, ...form } : d));
    } else {
      setData([...data, { id: Date.now(), ...form }]);
    }
    setForm({ nama: '', jabatan: '', nip: '', foto: '', status: 'Aktif', tugas: '' });
    setShowForm(false);
    setEditItem(null);
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setForm(item);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (confirm('Yakin ingin menghapus data aparatur ini?')) {
      setData(data.filter(d => d.id !== id));
    }
  };

  return (
    <>
      <div className="admin-header">
        <div>
          <h1 className="admin-header__title">👤 Aparatur & Perangkat Desa</h1>
          <p style={{ color: 'var(--desa-muted)', fontSize: 14, marginTop: 4 }}>
            Kelola daftar nama, jabatan, dan struktur organisasi Pamong Desa
          </p>
        </div>
        <button
          className="admin-btn admin-btn--primary"
          onClick={() => { setShowForm(!showForm); setEditItem(null); setForm({ nama: '', jabatan: '', nip: '', foto: '', status: 'Aktif', tugas: '' }); }}
        >
          {showForm ? '❌ Tutup Form' : '➕ Tambah Aparatur'}
        </button>
      </div>

      {showForm && (
        <div className="admin-card" style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>
            {editItem ? '✏️ Edit Data Aparatur' : '➕ Tambah Aparatur Baru'}
          </h3>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div className="admin-form-group">
                <label>Nama Lengkap & Gelar</label>
                <input type="text" value={form.nama} onChange={e => setForm({...form, nama: e.target.value})} required placeholder="Contoh: Drs. H. Sukardi" />
              </div>
              <div className="admin-form-group">
                <label>Jabatan</label>
                <input type="text" value={form.jabatan} onChange={e => setForm({...form, jabatan: e.target.value})} required placeholder="Contoh: Kaur Keuangan" />
              </div>
              <div className="admin-form-group">
                <label>NIP / NIDN (Isi - jika tidak ada)</label>
                <input type="text" value={form.nip} onChange={e => setForm({...form, nip: e.target.value})} placeholder="Contoh: 19820315 200902 2 004" />
              </div>
              <div className="admin-form-group">
                <label>URL Foto Profile</label>
                <input type="text" value={form.foto} onChange={e => setForm({...form, foto: e.target.value})} placeholder="/images/pamong-nama.webp" />
              </div>
            </div>
            <div className="admin-form-group">
              <label>Tugas & Fungsi Pokok</label>
              <textarea rows={3} value={form.tugas || ''} onChange={e => setForm({...form, tugas: e.target.value})} placeholder="Contoh: Menyelenggarakan Pemerintahan Desa..." />
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
              <button type="submit" className="admin-btn admin-btn--primary">
                {editItem ? '💾 Simpan Perubahan' : '✨ Simpan Aparatur'}
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
              <th>Foto</th>
              <th>Nama Lengkap</th>
              <th>Jabatan</th>
              <th>NIP</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--desa-paper)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
                    👤
                  </div>
                </td>
                <td style={{ fontWeight: 700 }}>{item.nama}</td>
                <td><span style={{ background: 'rgba(212,136,42,0.1)', color: 'var(--desa-gold)', padding: '4px 10px', borderRadius: 50, fontSize: 12, fontWeight: 700 }}>{item.jabatan}</span></td>
                <td style={{ fontSize: 13, color: 'var(--desa-muted)' }}>{item.nip}</td>
                <td><span style={{ background: '#E8F5E9', color: '#2E7D32', padding: '4px 10px', borderRadius: 50, fontSize: 12, fontWeight: 700 }}>{item.status}</span></td>
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
