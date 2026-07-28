'use client';
import { useState } from 'react';
import { useDataStore } from '@/hooks/useDataStore';
import { resetData } from '@/lib/dataStore';

export default function AdminKelembagaan() {
  const [data, setData] = useDataStore('kelembagaan');
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({ nama: '', ketua: '', anggota: '', bidang: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editItem) {
      setData(data.map(d => d.id === editItem.id ? { ...d, ...form, anggota: Number(form.anggota) } : d));
    } else {
      setData([...data, { id: Date.now(), ...form, anggota: Number(form.anggota) }]);
    }
    setForm({ nama: '', ketua: '', anggota: '', bidang: '' });
    setShowForm(false);
    setEditItem(null);
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setForm(item);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (confirm('Yakin ingin menghapus lembaga ini?')) {
      setData(data.filter(d => d.id !== id));
    }
  };

  return (
    <>
      <div className="admin-header">
        <div>
          <h1 className="admin-header__title">🏛️ Kelembagaan Desa</h1>
          <p style={{ color: 'var(--desa-muted)', fontSize: 14, marginTop: 4 }}>
            Kelola organisasi dan kelembagaan masyarakat di Desa Salamrejo
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="admin-btn admin-btn--primary" onClick={() => { setShowForm(!showForm); setEditItem(null); setForm({ nama: '', ketua: '', anggota: '', bidang: '' }); }}>
            {showForm ? '❌ Tutup Form' : '➕ Tambah Lembaga'}
          </button>
          <button className="admin-btn" style={{ background: 'var(--desa-paper)' }} onClick={() => { if(confirm('Tarik data dari BAB II.txt? Data saat ini akan tertimpa.')) resetData('kelembagaan'); }}>
            🔄 Tarik Data BAB II
          </button>
        </div>
      </div>

      {showForm && (
        <div className="admin-card" style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>
            {editItem ? '✏️ Edit Kelembagaan' : '➕ Tambah Lembaga Baru'}
          </h3>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div className="admin-form-group">
                <label>Nama Lembaga Desa</label>
                <input type="text" value={form.nama} onChange={e => setForm({...form, nama: e.target.value})} required placeholder="Contoh: PKK Desa Salamrejo" />
              </div>
              <div className="admin-form-group">
                <label>Nama Ketua</label>
                <input type="text" value={form.ketua} onChange={e => setForm({...form, ketua: e.target.value})} required placeholder="Nama Ketua Lembaga..." />
              </div>
              <div className="admin-form-group">
                <label>Jumlah Anggota</label>
                <input type="number" value={form.anggota} onChange={e => setForm({...form, anggota: e.target.value})} required placeholder="25" />
              </div>
              <div className="admin-form-group">
                <label>Bidang / Fokus Utama</label>
                <input type="text" value={form.bidang} onChange={e => setForm({...form, bidang: e.target.value})} required placeholder="Contoh: Kesejahteraan Keluarga" />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
              <button type="submit" className="admin-btn admin-btn--primary">
                {editItem ? '💾 Simpan Perubahan' : '✨ Simpan Lembaga'}
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
              <th>Nama Lembaga</th>
              <th>Ketua</th>
              <th>Jumlah Anggota</th>
              <th>Bidang Kerja</th>
              <th style={{ textAlign: 'right' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td style={{ fontWeight: 700 }}>{item.nama}</td>
                <td style={{ fontWeight: 600 }}>{item.ketua}</td>
                <td><span style={{ background: 'rgba(212,136,42,0.1)', color: 'var(--desa-gold)', padding: '4px 10px', borderRadius: 50, fontSize: 12, fontWeight: 700 }}>{item.anggota} Orang</span></td>
                <td style={{ fontSize: 13, color: 'var(--desa-muted)' }}>{item.bidang}</td>
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
