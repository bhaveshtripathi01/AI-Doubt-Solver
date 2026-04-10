'use client';
import { useState } from 'react';
const S = ['General','Mathematics','Physics','Chemistry','Biology','History','English'];
export default function Home() {
  const [q, setQ] = useState('');
  const [sub, setSub] = useState('General');
  const [ans, setAns] = useState('');
  const [load, setLoad] = useState(false);
  const [err, setErr] = useState('');
  const ask = async () => {
    if (!q.trim()) return;
    setLoad(true); setAns(''); setErr('');
    try {
      const r = await fetch('/api/ask', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({question:q,subject:sub})});
      const d = await r.json();
      if (d.error) throw new Error(d.error);
      setAns(d.answer);
    } catch(e) { setErr('Something went wrong. Try again.'); }
    finally { setLoad(false); }
  };
  return (
    <main style={{minHeight:'100vh',background:'#eef2ff',display:'flex',alignItems:'center',justifyContent:'center',padding:'1rem'}}>
      <div style={{background:'#fff',borderRadius:'1rem',boxShadow:'0 4px 24px rgba(0,0,0,0.08)',width:'100%',maxWidth:'600px',padding:'2rem'}}>
        <h1 style={{textAlign:'center',color:'#4338ca',marginBottom:'0.25rem'}}>🎓 AI Doubt Solver</h1>
        <p style={{textAlign:'center',color:'#6b7280',marginBottom:'1.5rem',fontSize:'0.9rem'}}>Ask any academic question and get a step-by-step explanation</p>
        <div style={{marginBottom:'1rem'}}>
          <label style={{fontSize:'0.875rem',color:'#374151',display:'block',marginBottom:'0.25rem'}}>Subject</label>
          <select value={sub} onChange={e=>setSub(e.target.value)} style={{width:'100%',padding:'0.5rem',borderRadius:'0.5rem',border:'1px solid #d1d5db'}}>
            {S.map(s=><option key={s}>{s}</option>)}
          </select>
        </div>
        <div style={{marginBottom:'1rem'}}>
          <label style={{fontSize:'0.875rem',color:'#374151',display:'block',marginBottom:'0.25rem'}}>Your Question</label>
          <textarea rows={4} value={q} onChange={e=>setQ(e.target.value)} placeholder="e.g. Why does ice float on water?" style={{width:'100%',padding:'0.5rem',borderRadius:'0.5rem',border:'1px solid #d1d5db',resize:'none',boxSizing:'border-box',fontFamily:'inherit'}} />
        </div>
        <button onClick={ask} disabled={load||!q.trim()} style={{width:'100%',padding:'0.65rem',background:load||!q.trim()?'#a5b4fc':'#4338ca',color:'#fff',border:'none',borderRadius:'0.5rem',fontWeight:600,cursor:'pointer',fontSize:'1rem'}}>
          {load ? 'Thinking...' : 'Get Explanation'}
        </button>
        {err && <p style={{color:'#dc2626',marginTop:'1rem'}}>{err}</p>}
        {ans && (
          <div style={{marginTop:'1.5rem',padding:'1rem',background:'#eef2ff',borderRadius:'0.75rem'}}>
            <strong style={{color:'#4338ca'}}>📘 Explanation</strong>
            <p style={{marginTop:'0.5rem',color:'#374151',whiteSpace:'pre-wrap',lineHeight:'1.6'}}>{ans}</p>
          </div>
        )}
      </div>
    </main>
  );
}