'use client';
import { useState } from 'react';
import { useDataStore } from '@/hooks/useDataStore';

export default function AdminKades() {
  const [data, setData] = useDataStore('kades');
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({ nama: '', masa: '', era: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editItem) {
      setData(data.map(d => d.id === editItem.id ? { ...d, ...form } : d));
    } else {
      setData([...data, { id: Date.now(), ...form }]);
    }
    setForm({ nama: '', masa: '', era: '' });
    setShowForm(false);
    setEditItem(null);
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setForm(item);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (confirm('Yakin ingin menghapus riwayat Kades ini?')) {
      setData(data.filter(d => d.id !== id));
    }
  };

  return (
    <>
      <div className="admin-header">
        <div>
          <h1 className="admin-header__title">👨‍💼 Riwayat Kepala Desa</h1>
          <p style={{ color: 'var(--desa-muted)', fontSize: 14, marginTop: 4 }}>
            Kelola rekam jejak kepemimpinan Kepala Desa dari masa ke masa
          </p>
        </div>
        <button
          className="admin-btn admin-btn--primary"
          onClick={() => { setShowForm(!showForm); setEditItem(null); setForm({ nama: '', masa: '', era: '' }); }}
        >
          {showForm ? '❌ Tutup Form' : '➕ Tambah Riwayat'}
        </button>
      </div>

      {showForm && (
        <div className="admin-card" style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>
            {editItem ? '✏️ Edit Riwayat Kades' : '➕ Tambah Riwayat Kades'}
          </h3>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
              <div className="admin-form-group">
                <label>Nama Kepala Desa</label>
                <input type="text" value={form.nama} onChange={e => setForm({...form, nama: e.target.value})} required placeholder="Contoh: FAUZI" />
              </div>
              <div className="admin-form-group">
                <label>Masa Jabatan (Tahun)</label>
                <input type="text" value={form.masa} onChange={e => setForm({...form, masa: e.target.value})} required placeholder="Contoh: 2019 - 2025" />
              </div>
              <div className="admin-form-group">
                <label>Era / Keterangan</label>
                <input type="text" value={form.era} onChange={e => setForm({...form, era: e.target.value})} placeholder="Contoh: Era Reformasi (Petahana)" />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
              <button type="submit" className="admin-btn admin-btn--primary">
                {editItem ? '💾 Simpan Perubahan' : '✨ Simpan Riwayat'}
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
              <th>Nama Kepala Desa</th>
              <th>Masa Jabatan</th>
              <th>Era / Keterangan</th>
              <th style={{ textAlign: 'right' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td style={{ fontWeight: 700 }}>{item.nama}</td>
                <td><span style={{ background: 'rgba(212,136,42,0.1)', color: 'var(--desa-gold)', padding: '4px 10px', borderRadius: 50, fontSize: 12, fontWeight: 700 }}>{item.masa}</span></td>
                <td style={{ fontSize: 13, color: 'var(--desa-muted)' }}>{item.era}</td>
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
