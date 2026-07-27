'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminHref } from '@/lib/adminPath';

export default function Login() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', password })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Redirect to admin panel on success
        router.push(adminHref());
      } else {
        setError(data.message || 'Login gagal.');
      }
    } catch (err) {
      setError('Terjadi kesalahan jaringan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#F8FAFC',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#FFFFFF',
        padding: '40px',
        borderRadius: '24px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.05)',
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center'
      }}>
        <div style={{
          width: 64, height: 64, 
          backgroundColor: 'rgba(212,136,42,0.1)', 
          color: 'var(--desa-gold)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '28px',
          margin: '0 auto 20px auto'
        }}>
          🔐
        </div>
        
        <h1 style={{ fontSize: 24, fontWeight: 800, color: 'var(--desa-ink)', marginBottom: 8 }}>
          Admin Login
        </h1>
        <p style={{ fontSize: 14, color: 'var(--desa-muted)', marginBottom: 32 }}>
          Silakan masukkan kata sandi rahasia untuk masuk ke panel pengelolaan Web Desa.
        </p>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <input
            type="password"
            placeholder="Masukkan Kata Sandi"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: '12px',
              border: '2px solid #E2E8F0',
              fontSize: '16px',
              outline: 'none',
              transition: 'all 0.3s'
            }}
          />

          {error && (
            <div style={{ color: '#E74C3C', fontSize: 13, textAlign: 'left', fontWeight: 600 }}>
              ⚠️ {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              backgroundColor: 'var(--desa-gold)',
              color: '#FFF',
              border: 'none',
              padding: '16px',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              marginTop: '8px',
              transition: 'all 0.3s'
            }}
          >
            {loading ? 'Memverifikasi...' : 'Masuk ke Dasbor'}
          </button>
        </form>
        
        <a href="/" style={{ display: 'block', marginTop: 24, fontSize: 14, color: 'var(--desa-muted)', textDecoration: 'none' }}>
          &larr; Kembali ke Beranda
        </a>
      </div>
    </div>
  );
}
