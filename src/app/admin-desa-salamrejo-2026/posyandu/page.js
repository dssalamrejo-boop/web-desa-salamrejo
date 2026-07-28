'use client';
import { useState, useRef } from 'react';
import { useDataStore } from '@/hooks/useDataStore';

export default function AdminPosyanduMulti() {
  const [activeTab, setActiveTab] = useState('tim'); // 'tim', 'kaderPos', 'kaderKhusus'

  // Data Stores
  const [dataTim, setDataTim] = useDataStore('posyanduTimKesehatan');
  const [dataKaderPos, setDataKaderPos] = useDataStore('posyanduKaderPos');
  const [dataKhusus, setDataKhusus] = useDataStore('posyanduKaderKhusus');

  // Form States
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);

  // Forms mapping
  const initialFormTim = { role: '', name: '', badgeColor: '#2980B9', iconColor: '#3498DB', desc: '', foto: '' };
  const initialFormPos = { pos: '', lokasi: '', kader: '' };
  const initialFormKhusus = { role: '', name: '' };

  const [formTim, setFormTim] = useState(initialFormTim);
  const [formPos, setFormPos] = useState(initialFormPos);
  const [formKhusus, setFormKhusus] = useState(initialFormKhusus);

  const [uploading, setUploading] = useState(false);
  const fileRef = useRef(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0] || e.dataTransfer?.files?.[0];
    if (!file) return;

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
        setFormTim(prev => ({ ...prev, foto: data.url }));
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

  // Handlers
  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    setShowForm(false);
    setEditItem(null);
  };

  const handleEdit = (item) => {
    setEditItem(item);
    if (activeTab === 'tim') setFormTim(item);
    if (activeTab === 'kaderPos') setFormPos(item);
    if (activeTab === 'kaderKhusus') setFormKhusus(item);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (!confirm('Yakin ingin menghapus data ini?')) return;
    if (activeTab === 'tim') setDataTim(dataTim.filter(d => d.id !== id));
    if (activeTab === 'kaderPos') setDataKaderPos(dataKaderPos.filter(d => d.id !== id));
    if (activeTab === 'kaderKhusus') setDataKhusus(dataKhusus.filter(d => d.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isEdit = !!editItem;
    
    if (activeTab === 'tim') {
      const payload = isEdit ? { ...editItem, ...formTim } : { id: Date.now(), ...formTim };
      setDataTim(isEdit ? dataTim.map(d => d.id === payload.id ? payload : d) : [...dataTim, payload]);
      setFormTim(initialFormTim);
    } else if (activeTab === 'kaderPos') {
      const payload = isEdit ? { ...editItem, ...formPos } : { id: Date.now(), ...formPos };
      setDataKaderPos(isEdit ? dataKaderPos.map(d => d.id === payload.id ? payload : d) : [...dataKaderPos, payload]);
      setFormPos(initialFormPos);
    } else if (activeTab === 'kaderKhusus') {
      const payload = isEdit ? { ...editItem, ...formKhusus } : { id: Date.now(), ...formKhusus };
      setDataKhusus(isEdit ? dataKhusus.map(d => d.id === payload.id ? payload : d) : [...dataKhusus, payload]);
      setFormKhusus(initialFormKhusus);
    }

    setShowForm(false);
    setEditItem(null);
  };

  const tabStyle = (isActive) => ({
    padding: '12px 24px',
    cursor: 'pointer',
    borderBottom: isActive ? '3px solid var(--desa-gold)' : '3px solid transparent',
    color: isActive ? 'var(--desa-ink)' : 'var(--desa-muted)',
    fontWeight: isActive ? 700 : 500,
    background: 'none', borderTop: 'none', borderLeft: 'none', borderRight: 'none', fontSize: 16
  });

  return (
    <>
      <div className="admin-header">
        <div>
          <h1 className="admin-header__title">🩺 Tim & Kader Posyandu</h1>
          <p style={{ color: 'var(--desa-muted)', fontSize: 14, marginTop: 4 }}>
            Kelola data Tim Kesehatan, Kader per Pos, dan Kader Khusus secara terpusat.
          </p>
        </div>
        <button className="admin-btn admin-btn--primary" onClick={() => { setShowForm(!showForm); setEditItem(null); }}>
          {showForm ? '❌ Batal / Tutup Form' : '➕ Tambah Data Baru'}
        </button>
      </div>

      <div style={{ display: 'flex', gap: 16, borderBottom: '1px solid #E2E8F0', marginBottom: 24 }}>
        <button style={tabStyle(activeTab === 'tim')} onClick={() => handleTabSwitch('tim')}>
          Tim Kesehatan Puskesmas/Desa
        </button>
        <button style={tabStyle(activeTab === 'kaderPos')} onClick={() => handleTabSwitch('kaderPos')}>
          Kader Pos (1-4)
        </button>
        <button style={tabStyle(activeTab === 'kaderKhusus')} onClick={() => handleTabSwitch('kaderKhusus')}>
          Kader Khusus
        </button>
      </div>

      {showForm && (
        <div className="admin-card" style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>
            {editItem ? '✏️ Edit Data' : '➕ Tambah Data Baru'} 
            {activeTab === 'tim' ? ' Tim Kesehatan' : activeTab === 'kaderPos' ? ' Kader Pos' : ' Kader Khusus'}
          </h3>
          
          <form onSubmit={handleSubmit}>
            {/* FORM TIM KESEHATAN */}
            {activeTab === 'tim' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div className="admin-form-group">
                  <label>Jabatan (Role)</label>
                  <input type="text" value={formTim.role} onChange={e => setFormTim({...formTim, role: e.target.value})} required placeholder="Contoh: Bidan Desa" />
                </div>
                <div className="admin-form-group">
                  <label>Nama Lengkap</label>
                  <input type="text" value={formTim.name} onChange={e => setFormTim({...formTim, name: e.target.value})} required placeholder="Contoh: Siti Aminah, A.Md.Keb." />
                </div>
                <div className="admin-form-group">
                  <label>Warna Badge (Hex Code)</label>
                  <input type="text" value={formTim.badgeColor} onChange={e => setFormTim({...formTim, badgeColor: e.target.value})} placeholder="#27AE60" />
                </div>
                <div className="admin-form-group">
                  <label>Warna Icon (Hex Code)</label>
                  <input type="text" value={formTim.iconColor} onChange={e => setFormTim({...formTim, iconColor: e.target.value})} placeholder="#2ECC71" />
                </div>
                <div className="admin-form-group" style={{ gridColumn: '1 / -1' }}>
                  <label>Deskripsi Tugas</label>
                  <textarea value={formTim.desc} onChange={e => setFormTim({...formTim, desc: e.target.value})} required rows="3" placeholder="Deskripsi tugas secara singkat..."></textarea>
                </div>
                <div className="admin-form-group" style={{ gridColumn: '1 / -1' }}>
                  <label>Foto Profile (Upload)</label>
                  <div 
                    style={{
                      border: '2px dashed var(--desa-line)', borderRadius: 12, padding: '16px',
                      textAlign: 'center', cursor: 'pointer', background: formTim.foto ? '#F8FAFC' : '#FFF',
                      position: 'relative', overflow: 'hidden'
                    }}
                    onClick={() => fileRef.current?.click()}
                    onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                    onDrop={(e) => { e.preventDefault(); e.stopPropagation(); handleImageUpload(e); }}
                  >
                    <input type="file" ref={fileRef} hidden accept="image/*" onChange={handleImageUpload} />
                    {uploading ? (
                      <div style={{ color: 'var(--desa-gold)', fontWeight: 600 }}>⏳ Mengunggah...</div>
                    ) : formTim.foto ? (
                      <div>
                        <img src={formTim.foto} alt="Preview" style={{ maxWidth: '100%', maxHeight: 120, objectFit: 'contain', borderRadius: 8, marginBottom: 8 }} />
                        <p style={{ margin: 0, fontSize: 11, color: 'var(--desa-muted)' }}>Klik atau tarik untuk mengganti foto</p>
                      </div>
                    ) : (
                      <div style={{ color: 'var(--desa-muted)' }}>
                        <div style={{ fontSize: 24, marginBottom: 4 }}>📸</div>
                        <div style={{ fontSize: 13, fontWeight: 600 }}>Tarik foto ke sini atau klik (Maks 1MB)</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* FORM KADER POS */}
            {activeTab === 'kaderPos' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }}>
                <div className="admin-form-group">
                  <label>Nama Pos</label>
                  <input type="text" value={formPos.pos} onChange={e => setFormPos({...formPos, pos: e.target.value})} required placeholder="Contoh: Pos 1 — Balaidusun" />
                </div>
                <div className="admin-form-group">
                  <label>Lokasi Pelaksanaan</label>
                  <input type="text" value={formPos.lokasi} onChange={e => setFormPos({...formPos, lokasi: e.target.value})} required placeholder="Contoh: Balaidusun Salamrejo" />
                </div>
                <div className="admin-form-group">
                  <label>Daftar Kader (Pisahkan dengan koma)</label>
                  <textarea value={formPos.kader} onChange={e => setFormPos({...formPos, kader: e.target.value})} required rows="3" placeholder="Contoh: Sri W., Mala, Ratna, Endra, Suprihaten"></textarea>
                  <p style={{ fontSize: 12, color: 'var(--desa-muted)', marginTop: 4 }}>Masukkan nama kader dan pisahkan dengan tanda koma.</p>
                </div>
              </div>
            )}

            {/* FORM KADER KHUSUS */}
            {activeTab === 'kaderKhusus' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div className="admin-form-group">
                  <label>Peran / Tugas Khusus</label>
                  <input type="text" value={formKhusus.role} onChange={e => setFormKhusus({...formKhusus, role: e.target.value})} required placeholder="Contoh: Kader Stunting" />
                </div>
                <div className="admin-form-group">
                  <label>Nama Kader (Bisa lebih dari 1, pisahkan dengan koma)</label>
                  <input type="text" value={formKhusus.name} onChange={e => setFormKhusus({...formKhusus, name: e.target.value})} required placeholder="Contoh: Binti, Miraten" />
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: 12, marginTop: 24, gridColumn: '1 / -1' }}>
              <button type="submit" className="admin-btn admin-btn--primary">
                💾 {editItem ? 'Simpan Perubahan' : 'Simpan Data'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TABLE VIEWS */}
      <div className="admin-card">
        {/* TIM KESEHATAN TABLE */}
        {activeTab === 'tim' && (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Jabatan</th>
                <th>Nama Lengkap</th>
                <th>Deskripsi</th>
                <th width="120">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {dataTim?.map(item => (
                <tr key={item.id}>
                  <td>
                    <span style={{ background: item.badgeColor || '#2980B9', color: '#FFF', padding: '4px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600 }}>
                      {item.role}
                    </span>
                  </td>
                  <td style={{ fontWeight: 600 }}>{item.name}</td>
                  <td style={{ fontSize: 14 }}>{item.desc}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button onClick={() => handleEdit(item)} className="admin-btn-icon" title="Edit">✏️</button>
                      <button onClick={() => handleDelete(item.id)} className="admin-btn-icon" title="Hapus">🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* KADER POS TABLE */}
        {activeTab === 'kaderPos' && (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nama Pos</th>
                <th>Lokasi</th>
                <th>Daftar Kader</th>
                <th width="120">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {dataKaderPos?.map(item => (
                <tr key={item.id}>
                  <td style={{ fontWeight: 600 }}>{item.pos}</td>
                  <td>{item.lokasi}</td>
                  <td style={{ fontSize: 14 }}>{item.kader}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button onClick={() => handleEdit(item)} className="admin-btn-icon" title="Edit">✏️</button>
                      <button onClick={() => handleDelete(item.id)} className="admin-btn-icon" title="Hapus">🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* KADER KHUSUS TABLE */}
        {activeTab === 'kaderKhusus' && (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Peran Khusus</th>
                <th>Nama Kader</th>
                <th width="120">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {dataKhusus?.map(item => (
                <tr key={item.id}>
                  <td>
                    <span style={{ background: 'rgba(211, 84, 0, 0.1)', color: '#D35400', padding: '4px 10px', borderRadius: 6, fontSize: 13, fontWeight: 600 }}>
                      {item.role}
                    </span>
                  </td>
                  <td style={{ fontWeight: 600 }}>{item.name}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button onClick={() => handleEdit(item)} className="admin-btn-icon" title="Edit">✏️</button>
                      <button onClick={() => handleDelete(item.id)} className="admin-btn-icon" title="Hapus">🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {(activeTab === 'tim' && (!dataTim || dataTim.length === 0)) ||
         (activeTab === 'kaderPos' && (!dataKaderPos || dataKaderPos.length === 0)) ||
         (activeTab === 'kaderKhusus' && (!dataKhusus || dataKhusus.length === 0)) ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--desa-muted)' }}>
            Belum ada data untuk kategori ini.
          </div>
        ) : null}
      </div>
    </>
  );
}
