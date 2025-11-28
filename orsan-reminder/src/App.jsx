import React, { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [ms, setMs] = useState(getRemainingMs())
  const [excuse, setExcuse] = useState('')
  const [celebrate, setCelebrate] = useState(false)
  const [seaStatus, setSeaStatus] = useState('')

  useEffect(() => {
    const id = setInterval(() => setMs(getRemainingMs()), 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const statuses = [
      'Deniz durgun, rapor hızlı!',
      'Orta dalga, rapor sallanmasın!',
      'Fırtına ufukta, raporu çabuk!',
      'Poyraz esiyor, rapor uçmadan yetiş!'
    ]
    setSeaStatus(statuses[Math.floor(Math.random() * statuses.length)])
  }, [])

  const before13 = ms > 0
  const { hours, minutes, seconds } = format(ms)
  const confettiEmojis = ['⚓', '⛵', '🚢', '🌊']

  return (
    <div className="app">
      <div className="card">
        <div className="emoji-row">⛵ 🌊 ⚓ 🚢 🌊 ⛵</div>
        <h1>⚓ KAPTAN ÖRSAN, RAPORU UNUTMA! 🌊</h1>
        <p className="apprentice">🧑‍✈️ Çırak Ömer senden rapor bekliyor, kaptan!</p>
        <p className="subtitle">Raporları saat 13.00’ten önce göndermeyi unutursan gemi limandan ayrılıyor! ⛴️</p>

        <div className="countdown">
          <span className="label">Kalan süre:</span>
          <span className="time">
            {hours} saat {minutes} dakika {seconds} saniye
          </span>
        </div>

        <p className="message">
          {before13
            ? 'Hadi kaptan, daha vaktin varken raporu gönder!'
            : 'Geç kaldın kaptan! Rapor hala gitmediyse iskele seni bekliyor...'}
        </p>

        <p className="status">{seaStatus}</p>

        <div className="actions">
          <button
            className="cta"
            onClick={() => {
              alert('Güzel iş kaptan Örsan, mürettebat gurur duyuyor! 🚢')
              setCelebrate(true)
              setTimeout(() => setCelebrate(false), 2500)
            }}
          >
            Raporu Gönderdim Kaptan!
          </button>

          <button
            className="secondary"
            onClick={() => {
              const excuses = [
                'Kaptan, pusula ters döndü!',
                'Martılar raporu götürdü...',
                'Rüzgar şekil yapıyor, az kaldı!',
                'Liman trafiği var, rapor beklemede!',
                'Denizaltı Wi‑Fi çekmiyor!',
                'Kaptan köşkü güncelleniyor, rapor sırada!',
                'Güverte cilalanıyor, rapor kaymasın diye.'
              ]
              setExcuse(excuses[Math.floor(Math.random() * excuses.length)])
            }}
          >
            Bahane Üret
          </button>
        </div>

        {excuse && <div className="bubble">{excuse}</div>}

        <p className="note">Bu güverte motivasyon istasyonudur: Raporu 13:00’ten önce at, liman alkışlasın! 🛳️</p>

        <ul className="list">
          <li>✅ Köprüüstü kahveleri hazır</li>
          <li>✅ Rota net, haritalar katlandı</li>
          <li>✅ Siren testi tamam</li>
          <li>✅ Rapor için mürekkep kurutuldu</li>
        </ul>
      </div>

      {celebrate && (
        <div className="confetti">
          {Array.from({ length: 24 }).map((_, i) => {
            const emoji = confettiEmojis[i % confettiEmojis.length]
            const left = Math.random() * 100
            const delay = Math.random() * 1.5
            const size = 22 + Math.floor(Math.random() * 14)
            return (
              <span
                key={i}
                className="piece"
                style={{ left: left + '%', animationDelay: delay + 's', fontSize: size + 'px' }}
              >
                {emoji}
              </span>
            )
          })}
        </div>
      )}
    </div>
  )
}

function getRemainingMs() {
  const now = new Date()
  const target = new Date(now)
  target.setHours(13, 0, 0, 0)
  const diff = target.getTime() - now.getTime()
  return diff > 0 ? diff : 0
}

function format(ms) {
  const totalSeconds = Math.floor(ms / 1000)
  const h = String(Math.floor(totalSeconds / 3600)).padStart(2, '0')
  const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0')
  const s = String(totalSeconds % 60).padStart(2, '0')
  return { hours: h, minutes: m, seconds: s }
}

export default App
