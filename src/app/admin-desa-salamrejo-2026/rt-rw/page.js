'use client';
import { useState } from 'react';
import { useDataStore } from '@/hooks/useDataStore';
import { DEFAULTS, saveData } from '@/lib/dataStore';

export default function AdminRtRw() {
  const [data, setData] = useDataStore('rtRw');
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({ dukuh: '', rw: '', rt: '', ketua: '', kontak: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editItem) {
      setData(data.map(d => d.id === editItem.id ? { ...d, ...form } : d));
    } else {
      setData([...data, { id: Date.now(), ...form }]);
    }
    setForm({ dukuh: '', rw: '', rt: '', ketua: '', kontak: '' });
    setShowForm(false);
    setEditItem(null);
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setForm(item);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (confirm('Yakin ingin menghapus data RT/RW ini?')) {
      setData(data.filter(d => d.id !== id));
    }
  };

  return (
    <>
      <div className="admin-header">
        <div>
          <h1 className="admin-header__title">🏘️ Pendataan RT / RW & Padukuhan</h1>
          <p style={{ color: 'var(--desa-muted)', fontSize: 14, marginTop: 4 }}>
            Kelola struktur kepengurusan RT, RW, dan Dukuh di Desa Salamrejo
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="admin-btn" style={{ background: 'var(--desa-paper)', color: 'var(--desa-ink)' }} onClick={() => {
            if (confirm('Yakin ingin mereset semua data RT/RW ke nama-nama asli bawaan sistem?')) {
              saveData('rtRw', DEFAULTS.rtRw);
              setData(DEFAULTS.rtRw);
              alert('Data RT/RW berhasil direset ke bawaan sistem.');
            }
          }}>
            🔄 Reset Data Asli
          </button>
          <button className="admin-btn admin-btn--primary" onClick={() => { setShowForm(!showForm); setEditItem(null); setForm({ dukuh: '', rw: '', rt: '', ketua: '', kontak: '' }); }}>
            {showForm ? '❌ Tutup Form' : '➕ Tambah Data RT/RW'}
          </button>
        </div>
      </div>

      {showForm && (
        <div className="admin-card" style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>
            {editItem ? '✏️ Edit Data RT/RW' : '➕ Tambah RT/RW Baru'}
          </h3>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
              <div className="admin-form-group">
                <label>Nama Padukuhan / Dusun</label>
                <input type="text" value={form.dukuh} onChange={e => setForm({...form, dukuh: e.target.value})} required placeholder="Contoh: Dusun Salam" />
              </div>
              <div className="admin-form-group">
                <label>Nomor RW</label>
                <input type="text" value={form.rw} onChange={e => setForm({...form, rw: e.target.value})} required placeholder="Contoh: 01" />
              </div>
              <div className="admin-form-group">
                <label>Nomor RT</label>
                <input type="text" value={form.rt} onChange={e => setForm({...form, rt: e.target.value})} required placeholder="Contoh: 02" />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div className="admin-form-group">
                <label>Nama Ketua RT / RW</label>
                <input type="text" value={form.ketua} onChange={e => setForm({...form, ketua: e.target.value})} required placeholder="Nama Ketua..." />
              </div>
              <div className="admin-form-group">
                <label>Nomor WhatsApp / Telepon</label>
                <input type="text" value={form.kontak} onChange={e => setForm({...form, kontak: e.target.value})} placeholder="0812-xxxx-xxxx" />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
              <button type="submit" className="admin-btn admin-btn--primary">
                {editItem ? '💾 Simpan Perubahan' : '✨ Simpan RT/RW'}
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
              <th>Padukuhan</th>
              <th>RW</th>
              <th>RT</th>
              <th>Ketua RT</th>
              <th>Kontak WhatsApp</th>
              <th style={{ textAlign: 'right' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td style={{ fontWeight: 700 }}>{item.dukuh}</td>
                <td><span style={{ background: 'rgba(212,136,42,0.1)', color: 'var(--desa-gold)', padding: '4px 10px', borderRadius: 50, fontSize: 12, fontWeight: 700 }}>RW {item.rw}</span></td>
                <td><span style={{ background: '#E3F2FD', color: '#1565C0', padding: '4px 10px', borderRadius: 50, fontSize: 12, fontWeight: 700 }}>RT {item.rt}</span></td>
                <td style={{ fontWeight: 600 }}>{item.ketua}</td>
                <td>{item.kontak}</td>
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
