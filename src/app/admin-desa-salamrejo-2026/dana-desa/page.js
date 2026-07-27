'use client';
import { useState } from 'react';
import { useDataStore } from '@/hooks/useDataStore';

export default function AdminDanaDesa() {
  const [data, setData] = useDataStore('danaDesa');
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({ bidang: '', jenis: 'Pendapatan', jumlah: '', tahun: '2026' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editItem) {
      setData(data.map(d => d.id === editItem.id ? { ...d, ...form } : d));
    } else {
      setData([...data, { id: Date.now(), ...form }]);
    }
    setForm({ bidang: '', jenis: 'Pendapatan', jumlah: '', tahun: '2026' });
    setShowForm(false);
    setEditItem(null);
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setForm(item);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (confirm('Yakin ingin menghapus pos anggaran ini?')) {
      setData(data.filter(d => d.id !== id));
    }
  };

  return (
    <>
      <div className="admin-header">
        <div>
          <h1 className="admin-header__title">💰 Transparansi APBDes & Dana Desa</h1>
          <p style={{ color: 'var(--desa-muted)', fontSize: 14, marginTop: 4 }}>
            Kelola rincian Anggaran Pendapatan & Belanja Desa untuk laporan akuntabilitas publik
          </p>
        </div>
        <button className="admin-btn admin-btn--primary" onClick={() => { setShowForm(!showForm); setEditItem(null); setForm({ bidang: '', jenis: 'Pendapatan', jumlah: '', tahun: '2026' }); }}>
          {showForm ? '❌ Tutup Form' : '➕ Tambah Pos Anggaran'}
        </button>
      </div>

      {showForm && (
        <div className="admin-card" style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>
            {editItem ? '✏️ Edit Pos Anggaran' : '➕ Tambah Pos Anggaran Baru'}
          </h3>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div className="admin-form-group">
                <label>Nama Bidang / Sumber Dana</label>
                <input type="text" value={form.bidang} onChange={e => setForm({...form, bidang: e.target.value})} required placeholder="Contoh: Dana Desa (DD)" />
              </div>
              <div className="admin-form-group">
                <label>Jenis Pos</label>
                <select value={form.jenis} onChange={e => setForm({...form, jenis: e.target.value})}>
                  <option value="Pendapatan">Pendapatan Desa</option>
                  <option value="Belanja">Belanja Desa</option>
                  <option value="Pembiayaan">Pembiayaan Desa</option>
                </select>
              </div>
              <div className="admin-form-group">
                <label>Nominal Jumlah (Rp)</label>
                <input type="text" value={form.jumlah} onChange={e => setForm({...form, jumlah: e.target.value})} required placeholder="Rp 1.000.000.000" />
              </div>
              <div className="admin-form-group">
                <label>Tahun Anggaran</label>
                <input type="text" value={form.tahun} onChange={e => setForm({...form, tahun: e.target.value})} required placeholder="2026" />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
              <button type="submit" className="admin-btn admin-btn--primary">
                {editItem ? '💾 Simpan Perubahan' : '✨ Simpan Pos Anggaran'}
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
              <th>Bidang / Pos Anggaran</th>
              <th>Jenis</th>
              <th>Jumlah Nominal</th>
              <th>Tahun</th>
              <th style={{ textAlign: 'right' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td style={{ fontWeight: 700 }}>{item.bidang}</td>
                <td>
                  <span style={{
                    background: item.jenis === 'Pendapatan' ? '#E8F5E9' : 'rgba(231,76,60,0.1)',
                    color: item.jenis === 'Pendapatan' ? '#2E7D32' : '#E74C3C',
                    padding: '4px 10px', borderRadius: 50, fontSize: 12, fontWeight: 700
                  }}>
                    {item.jenis}
                  </span>
                </td>
                <td style={{ fontWeight: 700, color: 'var(--desa-ink)' }}>{item.jumlah}</td>
                <td style={{ fontSize: 13, color: 'var(--desa-muted)' }}>{item.tahun}</td>
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
