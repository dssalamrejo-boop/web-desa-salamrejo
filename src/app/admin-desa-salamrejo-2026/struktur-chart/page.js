'use client';
import { useState, useEffect, useRef } from 'react';
import { useDataStore } from '@/hooks/useDataStore';
import { saveData } from '@/lib/dataStore';

export default function AdminStrukturChart() {
  const [charts, setCharts] = useDataStore('strukturCharts');
  const [formData, setFormData] = useState({ pemerintahan: '', posyandu: '' });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState({ pemerintahan: false, posyandu: false });

  const fileInputRefPem = useRef(null);
  const fileInputRefPos = useRef(null);

  useEffect(() => {
    if (charts) {
      setFormData(charts);
    }
  }, [charts]);

  const handleSave = () => {
    setSaving(true);
    saveData('strukturCharts', formData);
    setTimeout(() => {
      setSaving(false);
      alert('Data gambar struktur berhasil disimpan!');
    }, 500);
  };

  const handleFileUpload = async (file, type) => {
    if (!file) return;
    
    // Only allow images
    if (!file.type.startsWith('image/')) {
      alert('Tolong unggah file gambar (JPG, PNG, GIF).');
      return;
    }

    setUploading(prev => ({ ...prev, [type]: true }));

    const form = new FormData();
    form.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: form,
      });

      const data = await response.json();
      
      if (response.ok && data.success) {
        setFormData(prev => ({ ...prev, [type]: data.url }));
      } else {
        alert(data.error || 'Gagal mengunggah gambar.');
      }
    } catch (err) {
      console.error(err);
      alert('Terjadi kesalahan saat mengunggah gambar.');
    } finally {
      setUploading(prev => ({ ...prev, [type]: false }));
    }
  };

  const onDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onDrop = (e, type) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileUpload(file, type);
    }
  };

  const renderDropzone = (type, label, ref) => (
    <div style={{ marginBottom: 32 }}>
      <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>
        {label}
      </label>
      
      <div 
        onClick={() => ref.current?.click()}
        onDragOver={onDragOver}
        onDrop={(e) => onDrop(e, type)}
        style={{
          border: '2px dashed #CBD5E1',
          borderRadius: 12,
          padding: '40px 20px',
          textAlign: 'center',
          cursor: 'pointer',
          background: formData[type] ? '#F8FAFC' : '#FFF',
          transition: 'all 0.2s ease'
        }}
      >
        <input 
          type="file" 
          ref={ref}
          hidden 
          accept="image/*"
          onChange={(e) => {
            if (e.target.files?.[0]) handleFileUpload(e.target.files[0], type);
            e.target.value = ''; // Reset input
          }}
        />
        
        {uploading[type] ? (
          <div style={{ color: 'var(--desa-gold)', fontWeight: 600 }}>
            <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>⏳</span> Sedang mengunggah...
          </div>
        ) : formData[type] ? (
          <div>
            <img 
              src={formData[type]} 
              alt={`Preview ${type}`} 
              style={{ maxWidth: '100%', maxHeight: 250, objectFit: 'contain', borderRadius: 8, marginBottom: 16 }} 
            />
            <p style={{ margin: 0, color: 'var(--desa-muted)', fontSize: 13 }}>
              Klik atau tarik gambar baru ke sini untuk mengganti.
            </p>
          </div>
        ) : (
          <div style={{ color: '#94A3B8' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>{'\u{1F4E4}'}</div>
            <p style={{ margin: '0 0 8px', fontWeight: 600, color: 'var(--desa-ink)' }}>Tarik & Lepas gambar di sini</p>
            <p style={{ margin: 0, fontSize: 13 }}>atau klik untuk memilih file dari komputer</p>
          </div>
        )}
      </div>
      
      {formData[type] && (
        <button 
          onClick={() => setFormData(prev => ({ ...prev, [type]: '' }))}
          style={{
            marginTop: 8, background: 'none', border: 'none', 
            color: '#EF4444', fontSize: 13, cursor: 'pointer',
            padding: '4px 8px', fontWeight: 600
          }}
        >
          Hapus Gambar
        </button>
      )}
    </div>
  );

  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <h1 className="admin-page__title">Pengaturan Gambar Chart Struktur</h1>
        <p className="admin-page__subtitle">Unggah gambar bagan tata kerja untuk Pemerintahan dan Posyandu secara langsung.</p>
      </div>

      <div className="admin-card" style={{ maxWidth: 700 }}>
        {renderDropzone('pemerintahan', 'Gambar Struktur Pemerintahan (SOTK)', fileInputRefPem)}
        {renderDropzone('posyandu', 'Gambar Struktur Posyandu & Tim Kesehatan', fileInputRefPos)}

        <button
          onClick={handleSave}
          disabled={saving}
          style={{
            background: 'var(--desa-gold)',
            color: '#FFF',
            border: 'none',
            padding: '12px 24px',
            borderRadius: 8,
            fontWeight: 700,
            cursor: 'pointer',
            opacity: saving ? 0.7 : 1,
            width: '100%'
          }}
        >
          {saving ? 'Menyimpan...' : 'Simpan Perubahan Publik'}
        </button>
      </div>
    </div>
  );
}
