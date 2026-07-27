'use client';
import { useDataStore } from '@/hooks/useDataStore';
import { useState, useMemo } from 'react';

export default function DanaDesaPage() {
  const [danaData] = useDataStore('danaDesa');
  const items = danaData || [];
  
  // Get unique years for filter
  const years = [...new Set(items.map(item => item.tahun))].sort().reverse();
  const [selectedYear, setSelectedYear] = useState(years[0] || '2026');

  // Filter items by selected year
  const filteredItems = items.filter(item => item.tahun === selectedYear);

  // Group by type
  const groupedData = useMemo(() => {
    const grouped = {
      Pendapatan: [],
      Belanja: [],
      Pembiayaan: []
    };
    filteredItems.forEach(item => {
      if (grouped[item.jenis]) {
        grouped[item.jenis].push(item);
      }
    });
    return grouped;
  }, [filteredItems]);

  // Helper to parse currency string to number
  const parseCurrency = (str) => {
    if (!str) return 0;
    const num = parseInt(str.replace(/[^0-9]/g, ''));
    return isNaN(num) ? 0 : num;
  };

  // Helper to format number to IDR
  const formatCurrency = (num) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);
  };

  const totalPendapatan = groupedData.Pendapatan.reduce((acc, curr) => acc + parseCurrency(curr.jumlah), 0);
  const totalBelanja = groupedData.Belanja.reduce((acc, curr) => acc + parseCurrency(curr.jumlah), 0);

  return (
    <main>
      <div className="desa-page-header" style={{
        background: 'linear-gradient(135deg, var(--desa-ink) 0%, #1A2530 100%)',
        borderBottom: '4px solid var(--desa-gold)',
        padding: '80px 20px 60px',
        textAlign: 'center',
        color: '#FFF'
      }}>
        <h1 style={{ fontSize: 36, fontFamily: 'var(--desa-serif)', marginBottom: 16 }}>
          Transparansi Dana Desa
        </h1>
        <p style={{ opacity: 0.9, maxWidth: 600, margin: '0 auto', lineHeight: 1.6 }}>
          Laporan Anggaran Pendapatan dan Belanja Desa (APBDes) Salamrejo sebagai wujud transparansi dan akuntabilitas tata kelola pemerintahan desa.
        </p>
      </div>

      <div className="desa-container" style={{ padding: '60px 20px' }}>
        {years.length > 0 ? (
          <>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 40 }}>
              <div style={{ background: 'var(--desa-paper)', padding: '6px 20px', borderRadius: 50, display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--desa-muted)' }}>Tahun Anggaran:</span>
                <select 
                  value={selectedYear} 
                  onChange={(e) => setSelectedYear(e.target.value)}
                  style={{ 
                    background: 'transparent', border: 'none', fontSize: 16, fontWeight: 800, 
                    color: 'var(--desa-ink)', outline: 'none', cursor: 'pointer' 
                  }}
                >
                  {years.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
            </div>

            {/* APBDes Summary */}
            <div className="desa-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginBottom: 50 }}>
              <div className="desa-glass-card" style={{ padding: 24, background: 'linear-gradient(135deg, #F1F8E9 0%, #DCEDC8 100%)', border: '1px solid #C5E1A5' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#33691E', textTransform: 'uppercase', marginBottom: 8 }}>Total Pendapatan</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: '#1B5E20' }}>{formatCurrency(totalPendapatan)}</div>
              </div>
              <div className="desa-glass-card" style={{ padding: 24, background: 'linear-gradient(135deg, #FFEBEE 0%, #FFCDD2 100%)', border: '1px solid #EF9A9A' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#B71C1C', textTransform: 'uppercase', marginBottom: 8 }}>Total Belanja</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: '#B71C1C' }}>{formatCurrency(totalBelanja)}</div>
              </div>
            </div>

            {/* Detailed Tables */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 40 }}>
              {/* Pendapatan */}
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--desa-ink)', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ width: 32, height: 32, borderRadius: 8, background: '#E8F5E9', color: '#2E7D32', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{'\u{1F4B5}'}</span>
                  Rincian Pendapatan Desa
                </h3>
                {groupedData.Pendapatan.length > 0 ? (
                  <div className="desa-card" style={{ overflowX: 'auto' }}>
                    <table className="desa-table" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ borderBottom: '2px solid var(--desa-line)' }}>
                          <th style={{ padding: '16px 20px', color: 'var(--desa-muted)' }}>Sumber Dana</th>
                          <th style={{ padding: '16px 20px', color: 'var(--desa-muted)', textAlign: 'right' }}>Jumlah (Rp)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {groupedData.Pendapatan.map(item => (
                          <tr key={item.id} style={{ borderBottom: '1px solid var(--desa-line)' }}>
                            <td style={{ padding: '16px 20px', fontWeight: 600 }}>{item.bidang}</td>
                            <td style={{ padding: '16px 20px', fontWeight: 700, color: '#2E7D32', textAlign: 'right' }}>{item.jumlah}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p style={{ color: 'var(--desa-muted)' }}>Tidak ada data pendapatan untuk tahun ini.</p>
                )}
              </div>

              {/* Belanja */}
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--desa-ink)', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ width: 32, height: 32, borderRadius: 8, background: '#FFEBEE', color: '#C62828', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{'\u{1F6D2}'}</span>
                  Rincian Belanja Desa
                </h3>
                {groupedData.Belanja.length > 0 ? (
                  <div className="desa-card" style={{ overflowX: 'auto' }}>
                    <table className="desa-table" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ borderBottom: '2px solid var(--desa-line)' }}>
                          <th style={{ padding: '16px 20px', color: 'var(--desa-muted)' }}>Bidang Pengeluaran</th>
                          <th style={{ padding: '16px 20px', color: 'var(--desa-muted)', textAlign: 'right' }}>Jumlah (Rp)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {groupedData.Belanja.map(item => (
                          <tr key={item.id} style={{ borderBottom: '1px solid var(--desa-line)' }}>
                            <td style={{ padding: '16px 20px', fontWeight: 600 }}>{item.bidang}</td>
                            <td style={{ padding: '16px 20px', fontWeight: 700, color: '#C62828', textAlign: 'right' }}>{item.jumlah}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p style={{ color: 'var(--desa-muted)' }}>Tidak ada data belanja untuk tahun ini.</p>
                )}
              </div>

              {/* Pembiayaan */}
              {groupedData.Pembiayaan.length > 0 && (
                <div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--desa-ink)', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ width: 32, height: 32, borderRadius: 8, background: '#E3F2FD', color: '#1565C0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{'\u{1F4B0}'}</span>
                    Pembiayaan Desa
                  </h3>
                  <div className="desa-card" style={{ overflowX: 'auto' }}>
                    <table className="desa-table" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ borderBottom: '2px solid var(--desa-line)' }}>
                          <th style={{ padding: '16px 20px', color: 'var(--desa-muted)' }}>Bidang Pembiayaan</th>
                          <th style={{ padding: '16px 20px', color: 'var(--desa-muted)', textAlign: 'right' }}>Jumlah (Rp)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {groupedData.Pembiayaan.map(item => (
                          <tr key={item.id} style={{ borderBottom: '1px solid var(--desa-line)' }}>
                            <td style={{ padding: '16px 20px', fontWeight: 600 }}>{item.bidang}</td>
                            <td style={{ padding: '16px 20px', fontWeight: 700, color: '#1565C0', textAlign: 'right' }}>{item.jumlah}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--desa-muted)' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>{'\u{1F4B0}'}</div>
            <h3>Belum ada data Dana Desa</h3>
            <p>Data APBDes akan ditampilkan di sini.</p>
          </div>
        )}
      </div>
    </main>
  );
}
