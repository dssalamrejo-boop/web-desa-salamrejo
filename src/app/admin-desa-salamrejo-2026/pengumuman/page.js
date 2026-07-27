'use client';
import { useState } from 'react';
import { useDataStore } from '@/hooks/useDataStore';

export default function AdminPengumuman() {
  const [data, setData] = useDataStore('pengumuman');
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({ judul: '', tanggal: '', kategori: '', isi: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editItem) {
      setData(data.map(d => d.id === editItem.id ? { ...d, ...form, status: 'Aktif' } : d));
    } else {
      setData([...data, { id: Date.now(), ...form, status: 'Aktif' }]);
    }
    setForm({ judul: '', tanggal: '', kategori: '', isi: '' });
    setShowForm(false);
    setEditItem(null);
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setForm({ judul: item.judul, tanggal: item.tanggal, kategori: item.kategori, isi: item.isi || '' });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (confirm('Yakin ingin menghapus pengumuman ini?')) {
      setData(data.filter(d => d.id !== id));
    }
  };

  return (
    <>
      <div className="admin-header">
        <div>
          <h1 className="admin-header__title"> Pengumuman</h1>
          <p style={{ color: 'var(--desa-muted)', fontSize: 14, marginTop: 4 }}>
            Kelola pengumuman dan informasi desa
          </p>
        </div>
        <button
          className="admin-btn admin-btn--primary"
          onClick={() => { setShowForm(!showForm); setEditItem(null); setForm({ judul: '', tanggal: '', kategori: '', isi: '' }); }}
        >
          {showForm ? ' Tutup Form' : '+ Tambah Pengumuman'}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="admin-card" style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>
            {editItem ? '️ Edit Pengumuman' : ' Buat Pengumuman Baru'}
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="admin-form-group">
              <label>Judul Pengumuman</label>
              <input
                type="text"
                value={form.judul}
                onChange={(e) => setForm({ ...form, judul: e.target.value })}
                placeholder="Masukkan judul pengumuman..."
                required
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div className="admin-form-group">
                <label>Tanggal</label>
                <input
                  type="date"
                  value={form.tanggal}
                  onChange={(e) => setForm({ ...form, tanggal: e.target.value })}
                  required
                />
              </div>
              <div className="admin-form-group">
                <label>Kategori</label>
                <select
                  value={form.kategori}
                  onChange={(e) => setForm({ ...form, kategori: e.target.value })}
                  required
                >
                  <option value="">Pilih Kategori</option>
                  <option value="Pemerintahan">Pemerintahan</option>
                  <option value="Sosial">Sosial</option>
                  <option value="Kesehatan">Kesehatan</option>
                  <option value="Pendidikan">Pendidikan</option>
                  <option value="Umum">Umum</option>
                </select>
              </div>
            </div>
            <div className="admin-form-group">
              <label>Isi Pengumuman</label>
              <textarea
                value={form.isi}
                onChange={(e) => setForm({ ...form, isi: e.target.value })}
                placeholder="Tulis isi pengumuman..."
                rows={6}
              />
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button type="submit" className="admin-btn admin-btn--primary">
                {editItem ? ' Simpan Perubahan' : ' Publikasikan'}
              </button>
              <button type="button" className="admin-btn" style={{ background: 'var(--desa-paper)' }}
                onClick={() => { setShowForm(false); setEditItem(null); }}>
                Batal
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Table */}
      <div className="admin-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Judul</th>
              <th>Tanggal</th>
              <th>Kategori</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: 40, color: 'var(--desa-muted)' }}>
                  Belum ada pengumuman. Klik tombol &quot;+ Tambah Pengumuman&quot; untuk membuat yang baru.
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={item.id}>
                  <td style={{ fontWeight: 600 }}>{item.judul}</td>
                  <td>{item.tanggal}</td>
                  <td>
                    <span style={{
                      background: 'rgba(212,136,42,0.1)', color: 'var(--desa-gold)',
                      padding: '4px 10px', borderRadius: 50, fontSize: 12, fontWeight: 700,
                    }}>
                      {item.kategori}
                    </span>
                  </td>
                  <td>
                    <span style={{
                      background: '#E8F5E9', color: '#2E7D32',
                      padding: '4px 10px', borderRadius: 50, fontSize: 12, fontWeight: 700,
                    }}>
                      {item.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                      <button className="admin-btn admin-btn--sm" style={{ background: 'var(--desa-paper)' }}
                        onClick={() => handleEdit(item)}>
                        ️ Edit
                      </button>
                      <button className="admin-btn admin-btn--sm admin-btn--danger"
                        onClick={() => handleDelete(item.id)}>
                        ️ Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
