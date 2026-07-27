'use client';
import { useState } from 'react';
import { useDataStore } from '@/hooks/useDataStore';

export default function AdminAgenda() {
  const [data, setData] = useDataStore('agenda');
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({ judul: '', tanggal: '', jam: '', lokasi: '', status: 'Akan Datang' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editItem) {
      setData(data.map(d => d.id === editItem.id ? { ...d, ...form } : d));
    } else {
      setData([...data, { id: Date.now(), ...form }]);
    }
    setForm({ judul: '', tanggal: '', jam: '', lokasi: '', status: 'Akan Datang' });
    setShowForm(false);
    setEditItem(null);
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setForm(item);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (confirm('Yakin ingin menghapus agenda ini?')) {
      setData(data.filter(d => d.id !== id));
    }
  };

  return (
    <>
      <div className="admin-header">
        <div>
          <h1 className="admin-header__title">📅 Agenda & Kegiatan Desa</h1>
          <p style={{ color: 'var(--desa-muted)', fontSize: 14, marginTop: 4 }}>
            Jadwal kegiatan masyarakat, musyawarah, dan acara di Desa Salamrejo
          </p>
        </div>
        <button className="admin-btn admin-btn--primary" onClick={() => { setShowForm(!showForm); setEditItem(null); setForm({ judul: '', tanggal: '', jam: '', lokasi: '', status: 'Akan Datang' }); }}>
          {showForm ? '❌ Tutup Form' : '➕ Tambah Agenda'}
        </button>
      </div>

      {showForm && (
        <div className="admin-card" style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>
            {editItem ? '✏️ Edit Agenda' : '➕ Tambah Agenda Baru'}
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="admin-form-group">
              <label>Nama Agenda / Acara</label>
              <input type="text" value={form.judul} onChange={e => setForm({...form, judul: e.target.value})} required placeholder="Contoh: Gotong Royong Bersih Desa" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
              <div className="admin-form-group">
                <label>Tanggal Pelaksanaan</label>
                <input type="date" value={form.tanggal} onChange={e => setForm({...form, tanggal: e.target.value})} required />
              </div>
              <div className="admin-form-group">
                <label>Waktu / Jam</label>
                <input type="text" value={form.jam} onChange={e => setForm({...form, jam: e.target.value})} required placeholder="08:00 WIB" />
              </div>
              <div className="admin-form-group">
                <label>Status</label>
                <select value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
                  <option value="Akan Datang">Akan Datang</option>
                  <option value="Berlangsung">Berlangsung</option>
                  <option value="Selesai">Selesai</option>
                </select>
              </div>
            </div>
            <div className="admin-form-group">
              <label>Lokasi Tempat Acara</label>
              <input type="text" value={form.lokasi} onChange={e => setForm({...form, lokasi: e.target.value})} required placeholder="Balai Desa Salamrejo" />
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
              <button type="submit" className="admin-btn admin-btn--primary">
                {editItem ? '💾 Simpan Perubahan' : '✨ Simpan Agenda'}
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
              <th>Judul Agenda</th>
              <th>Tanggal</th>
              <th>Waktu</th>
              <th>Lokasi</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td style={{ fontWeight: 700 }}>{item.judul}</td>
                <td>{item.tanggal}</td>
                <td style={{ fontWeight: 600 }}>{item.jam}</td>
                <td>{item.lokasi}</td>
                <td>
                  <span style={{
                    background: item.status === 'Akan Datang' ? '#E3F2FD' : item.status === 'Berlangsung' ? '#FFF3E0' : '#E8F5E9',
                    color: item.status === 'Akan Datang' ? '#1565C0' : item.status === 'Berlangsung' ? '#E65100' : '#2E7D32',
                    padding: '4px 10px', borderRadius: 50, fontSize: 12, fontWeight: 700
                  }}>
                    {item.status}
                  </span>
                </td>
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
