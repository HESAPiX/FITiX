import { useMemo, useState, type FormEvent } from 'react';
import { Activity, Apple, ArrowDownRight, ArrowUpRight, CalendarDays, ChevronRight, Droplets, Flame, Footprints, HeartPulse, Plus, Scale, Sparkles, Target, TrendingDown, Utensils, Waves } from 'lucide-react';

type WeightEntry = { date: string; kg: number };
const initialWeights: WeightEntry[] = [
  { date: '2026-10-29', kg: 90.0 }, { date: '2026-10-30', kg: 89.8 },
  { date: '2026-11-01', kg: 89.7 }, { date: '2026-11-03', kg: 89.5 }
];

function App() {
  const [weights, setWeights] = useState(initialWeights);
  const [weightInput, setWeightInput] = useState('');
  const [tab, setTab] = useState('overview');
  const [water, setWater] = useState(3);
  const latest = weights.at(-1)?.kg ?? 90;
  const start = weights[0]?.kg ?? latest;
  const progress = Math.max(0, Math.min(100, ((90 - latest) / (90 - 75)) * 100));
  const bmi = useMemo(() => (latest / (1.8 * 1.8)).toFixed(1), [latest]);

  function addWeight(e: FormEvent) {
    e.preventDefault();
    const value = Number(weightInput.replace(',', '.'));
    if (!Number.isFinite(value) || value < 25 || value > 350) return;
    setWeights(old => [...old, { date: new Date().toISOString().slice(0, 10), kg: value }]);
    setWeightInput('');
  }

  return <div className="app-shell">
    <aside className="sidebar">
      <a className="brand" href="#"><span className="brand-mark"><Activity size={22}/></span><span>FIT<span className="accent">iX</span><small>YOUR PROGRESS, YOUR POWER</small></span></a>
      <div className="side-label">MENÜ</div>
      <nav>
        {[['overview','Genel Bakış',Activity],['nutrition','Beslenme',Apple],['training','Antrenman',Waves],['progress','Gelişimim',TrendingDown]].map(([id,label,Icon]) => <button key={id as string} className={tab===id?'nav-item active':'nav-item'} onClick={()=>setTab(id as string)}><Icon size={18}/>{label as string}<ChevronRight size={15}/></button>)}
      </nav>
      <div className="sidebar-bottom"><div className="coach-mini"><Sparkles size={18}/><b>FITiX AI</b><p>Verilerine dayalı akıllı koçun yakında burada.</p><span>SPRINT 6</span></div><div className="profile-mini"><div className="avatar">K</div><div><b>Hesabım</b><small>Kişisel alan</small></div></div></div>
    </aside>
    <main className="main">
      <header className="topbar"><div><span className="eyebrow">ÇARŞAMBA, 4 KASIM</span><h1>{tab==='overview'?'Genel Bakış':tab==='nutrition'?'Beslenme':tab==='training'?'Antrenman':'Gelişimim'}</h1></div><div className="top-actions"><span className="live-dot">● VERİ TAKİBİ</span><button className="icon-button" aria-label="Takvim"><CalendarDays size={18}/></button><div className="avatar">K</div></div></header>
      {tab==='overview' ? <>
        <section className="welcome"><div><span className="eyebrow green">KÜÇÜK ADIMLAR, BÜYÜK DEĞİŞİM</span><h2>Bugün kendin için<br/><em>bir adım daha at.</em></h2><p>İlerlemeni takip et, sürdürülebilir alışkanlıklar oluştur.</p></div><div className="welcome-orb"><Target size={54}/><span>HEDEF<br/><b>75 KG</b></span></div></section>
        <section className="metric-grid">
          <article className="metric-card"><div className="metric-head"><span>GÜNCEL KİLO</span><Scale size={18}/></div><strong>{latest.toFixed(1)}<small> kg</small></strong><div className="metric-foot"><span className="positive"><ArrowDownRight size={14}/> {(start-latest).toFixed(1)} kg</span><span>başlangıçtan</span></div></article>
          <article className="metric-card"><div className="metric-head"><span>HEDEF KİLO</span><Target size={18}/></div><strong>75.0<small> kg</small></strong><div className="metric-foot"><span className="muted">{Math.max(0,latest-75).toFixed(1)} kg kaldı</span><span>hedefine</span></div></article>
          <article className="metric-card"><div className="metric-head"><span>VÜCUT KİTLE İNDEKSİ</span><HeartPulse size={18}/></div><strong>{bmi}</strong><div className="metric-foot"><span className="muted">Boy: 180 cm</span><span>hesaplanan</span></div></article>
          <article className="metric-card"><div className="metric-head"><span>SU TAKİBİ</span><Droplets size={18}/></div><strong>{water}<small> / 8</small></strong><div className="water-actions"><button onClick={()=>setWater(v=>Math.max(0,v-1))} aria-label="Bir bardak azalt">−</button><button onClick={()=>setWater(v=>Math.min(20,v+1))} aria-label="Bir bardak su ekle">+</button><span>bardak</span></div></article>
        </section>
        <section className="content-grid"><article className="panel progress-panel"><div className="panel-title"><div><span className="eyebrow">HEDEF YOLCULUĞUN</span><h3>Kilo gelişimi</h3></div><span className="tag">HEDEF 75 KG</span></div><div className="progress-numbers"><div><strong>{latest.toFixed(1)} <small>kg</small></strong><span>Son kayıt</span></div><div className="progress-percent">{progress.toFixed(0)}%<small>tamamlandı</small></div></div><div className="progress-track"><div style={{width:progress+'%'}}/></div><div className="progress-ends"><span>90 kg başlangıç</span><span>75 kg hedef</span></div><form className="add-weight" onSubmit={addWeight}><input aria-label="Yeni kilo" inputMode="decimal" placeholder="Bugünkü kilon (kg)" value={weightInput} onChange={e=>setWeightInput(e.target.value)}/><button type="submit"><Plus size={16}/> Kilo ekle</button></form><div className="history-list">{weights.slice(-3).reverse().map((w,i)=><div className="history-row" key={w.date+'-'+i}><span className="history-dot"/><span>{new Date(w.date+'T12:00:00').toLocaleDateString('tr-TR',{day:'numeric',month:'long'})}</span><b>{w.kg.toFixed(1)} kg</b></div>)}</div></article>
        <article className="panel activity-panel"><div className="panel-title"><div><span className="eyebrow">GÜNLÜK RUTİN</span><h3>Bugünün özeti</h3></div><span className="subtle">Kayıt bekliyor</span></div><div className="routine-item"><span className="routine-icon"><Footprints/></span><div><b>Adım</b><small>Henüz kayıt yok</small></div><span className="routine-value">—</span></div><div className="routine-item"><span className="routine-icon orange"><Flame/></span><div><b>Aktivite</b><small>Henüz kayıt yok</small></div><span className="routine-value">—</span></div><div className="routine-item"><span className="routine-icon blue"><Droplets/></span><div><b>Su</b><small>{water} bardak kaydedildi</small></div><span className="routine-value">{Math.round(water/8*100)}%</span></div><div className="routine-item"><span className="routine-icon purple"><Utensils/></span><div><b>Beslenme</b><small>Öğün eklenmedi</small></div><span className="routine-value">—</span></div><button className="outline-action" onClick={()=>setTab('progress')}>Tüm kayıtları gör <ChevronRight size={16}/></button></article></section>
      </> : <section className="empty-state panel"><div className="empty-icon"><Sparkles size={30}/></div><span className="eyebrow">GELİŞTİRME AŞAMASINDA</span><h2>{tab==='nutrition'?'Beslenme günlüğü':tab==='training'?'Akıllı antrenman':'Gelişim raporları'}</h2><p>Bu modül, ilgili sprint tamamlandığında gerçek kayıt ve testlerle kullanıma açılacak. Henüz hazır olmayan özellikleri çalışıyor gibi göstermiyoruz.</p><button className="outline-action" onClick={()=>setTab('overview')}>Genel bakışa dön <ChevronRight size={16}/></button></section>}
      <footer>FITiX <span>•</span> İlerlemen sana ait. Verilerin senin kontrolünde.</footer>
    </main>
  </div>;
}
export default App;