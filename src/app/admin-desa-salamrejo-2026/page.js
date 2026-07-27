'use client';
import Link from 'next/link';
import { adminHref } from '@/lib/adminPath';

const statsCards = [
  { icon: '', label: 'Aparatur Desa', value: '10', color: '#D4882A', bg: 'rgba(212,136,42,0.1)', href: adminHref('/aparatur') },
  { icon: '', label: 'Pengumuman', value: '3', color: '#E74C3C', bg: 'rgba(231,76,60,0.1)', href: adminHref('/pengumuman') },
  { icon: '', label: 'Potensi Desa', value: '6', color: '#27AE60', bg: 'rgba(39,174,96,0.1)', href: adminHref('/umkm') },
  { icon: '', label: 'Tim Posyandu', value: '24', color: '#2980B9', bg: 'rgba(41,128,185,0.1)', href: adminHref('/posyandu') },
  { icon: '', label: 'Agenda', value: '0', color: '#8E44AD', bg: 'rgba(142,68,173,0.1)', href: adminHref('/agenda') },
  { icon: '️', label: 'Galeri Foto', value: '0', color: '#16A085', bg: 'rgba(22,160,133,0.1)', href: adminHref('/galeri') },
];

const quickActions = [
  { icon: '', label: 'Buat Pengumuman', href: adminHref('/pengumuman'), color: '#E74C3C' },
  { icon: '', label: 'Tambah Agenda', href: adminHref('/agenda'), color: '#8E44AD' },
  { icon: '', label: 'Tambah Potensi Desa', href: adminHref('/umkm'), color: '#27AE60' },
  { icon: '️', label: 'Upload Galeri', href: adminHref('/galeri'), color: '#2980B9' },
];

export default function AdminDashboard() {
  return (
    <>
      {/* Header */}
      <div className="admin-header">
        <div>
          <h1 className="admin-header__title">Dashboard</h1>
          <p style={{ color: 'var(--desa-muted)', fontSize: 14, marginTop: 4 }}>
            Selamat datang di panel administrasi Website Desa Salamrejo
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{
            background: '#E8F5E9', color: '#2E7D32', padding: '6px 14px',
            borderRadius: 50, fontSize: 12, fontWeight: 700,
          }}>
             Online
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>
        {statsCards.map((stat, i) => (
          <Link key={i} href={stat.href} className="admin-stat-card" style={{ transition: 'all 0.2s' }}>
            <div className="admin-stat-card__icon" style={{ background: stat.bg, color: stat.color }}>
              {stat.icon}
            </div>
            <div>
              <div className="admin-stat-card__value">{stat.value}</div>
              <div className="admin-stat-card__label">{stat.label}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="admin-card" style={{ marginBottom: 32 }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, color: 'var(--desa-ink)' }}>
           Aksi Cepat
        </h3>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {quickActions.map((action, i) => (
            <Link key={i} href={action.href} className="admin-btn admin-btn--primary" style={{ background: action.color }}>
              {action.icon} {action.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Info Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div className="admin-card">
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: 'var(--desa-ink)' }}>
             Panduan Penggunaan
          </h3>
          <ul style={{ padding: '0 0 0 20px', margin: 0, fontSize: 14, color: 'var(--desa-muted)', lineHeight: 2 }}>
            <li>Gunakan menu di sidebar kiri untuk mengelola konten</li>
            <li>Setiap perubahan langsung tampil di website publik</li>
            <li>Upload foto melalui menu masing-masing</li>
            <li>Hero banner bisa diganti di menu &quot;Hero Banner&quot;</li>
          </ul>
        </div>

        <div className="admin-card">
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: 'var(--desa-ink)' }}>
             Link Cepat
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { label: 'Lihat Website Publik', href: '/', icon: '' },
              { label: 'Pengaturan Desa', href: adminHref('/pengaturan'), icon: '️' },
              { label: 'Supabase Dashboard', href: 'https://supabase.com/dashboard', icon: '' },
            ].map((link, i) => (
              <Link key={i} href={link.href} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 14px', borderRadius: 10,
                background: 'var(--desa-paper)', fontSize: 14,
                color: 'var(--desa-ink)', fontWeight: 500,
                transition: 'background 0.2s',
              }}>
                <span>{link.icon}</span> {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
