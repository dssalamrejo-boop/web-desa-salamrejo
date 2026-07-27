'use client';
import { useState } from 'react';
import { useDataStore } from '@/hooks/useDataStore';

export default function AdminPembangunan() {
  const [data, setData] = useDataStore('pembangunan');
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({ proyek: '', anggaran: '', progres: '0%', sumber: 'Dana Desa' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editItem) {
      setData(data.map(d => d.id === editItem.id ? { ...d, ...form } : d));
    } else {
      setData([...data, { id: Date.now(), ...form }]);
    }
    setForm({ proyek: '', anggaran: '', progres: '0%', sumber: 'Dana Desa' });
    setShowForm(false);
    setEditItem(null);
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setForm(item);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (confirm('Yakin ingin menghapus proyek pembangunan ini?')) {
      setData(data.filter(d => d.id !== id));
    }
  };

  return (
    <>
      <div className="admin-header">
        <div>
          <h1 className="admin-header__title">🏗️ Proyek Pembangunan Desa</h1>
          <p style={{ color: 'var(--desa-muted)', fontSize: 14, marginTop: 4 }}>
            Kelola data dan persentase progres pembangunan fisik di Desa Salamrejo
          </p>
        </div>
        <button className="admin-btn admin-btn--primary" onClick={() => { setShowForm(!showForm); setEditItem(null); setForm({ proyek: '', anggaran: '', progres: '0%', sumber: 'Dana Desa' }); }}>
          {showForm ? '❌ Tutup Form' : '➕ Tambah Proyek Pembangunan'}
        </button>
      </div>

      {showForm && (
        <div className="admin-card" style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>
            {editItem ? '✏️ Edit Proyek Pembangunan' : '➕ Tambah Proyek Baru'}
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="admin-form-group">
              <label>Nama Proyek Pembangunan</label>
              <input type="text" value={form.proyek} onChange={e => setForm({...form, proyek: e.target.value})} required placeholder="Contoh: Pengaspalan Jalan Dusun Salam" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
              <div className="admin-form-group">
                <label>Nominal Anggaran</label>
                <input type="text" value={form.anggaran} onChange={e => setForm({...form, anggaran: e.target.value})} required placeholder="Rp 350.000.000" />
              </div>
              <div className="admin-form-group">
                <label>Progres (%)</label>
                <input type="text" value={form.progres} onChange={e => setForm({...form, progres: e.target.value})} required placeholder="85%" />
              </div>
              <div className="admin-form-group">
                <label>Sumber Dana</label>
                <input type="text" value={form.sumber} onChange={e => setForm({...form, sumber: e.target.value})} required placeholder="Dana Desa 2026" />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
              <button type="submit" className="admin-btn admin-btn--primary">
                {editItem ? '💾 Simpan Perubahan' : '✨ Simpan Proyek'}
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
              <th>Nama Proyek</th>
              <th>Anggaran</th>
              <th>Progres Lapangan</th>
              <th>Sumber Dana</th>
              <th style={{ textAlign: 'right' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td style={{ fontWeight: 700 }}>{item.proyek}</td>
                <td style={{ fontWeight: 600 }}>{item.anggaran}</td>
                <td>
                  <span style={{ background: 'rgba(212,136,42,0.1)', color: 'var(--desa-gold)', padding: '4px 10px', borderRadius: 50, fontSize: 12, fontWeight: 700 }}>
                    {item.progres}
                  </span>
                </td>
                <td style={{ fontSize: 13, color: 'var(--desa-muted)' }}>{item.sumber}</td>
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
