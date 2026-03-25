import React, { useState } from "react";

const tealDark = "#1a7f7a";
const teal = "#22a39f";
const tealLight = "#e6f7f6";
const gold = "#f5a623";
const white = "#ffffff";
const gray = "#f4f6f7";
const darkText = "#1a2d2d";

const stores = [
  { name: "Coles", color: "#e2001a", text: "#fff" },
  { name: "Woolworths", color: "#007837", text: "#fff" },
  { name: "JB Hi-Fi", color: "#ffe000", text: "#000" },
  { name: "ALDI", color: "#00529f", text: "#fff" },
  { name: "OWO", color: "#e2001a", text: "#fff" },
  { name: "Cotton On", color: "#000", text: "#fff" },
  { name: "Officeworks", color: "#e2001a", text: "#fff" },
  { name: "IGA", color: "#e2001a", text: "#fff" },
  { name: "Metro", color: "#007837", text: "#fff" },
  { name: "Lincraft", color: "#8b0000", text: "#fff" },
  { name: "McDonald's", color: "#ffbc0d", text: "#da291c" },
  { name: "KFC", color: "#e4002b", text: "#fff" },
  { name: "Uber Eats", color: "#06c167", text: "#fff" },
  { name: "7-Eleven", color: "#008c45", text: "#fff" },
  { name: "Domino's", color: "#006491", text: "#fff" },
  { name: "Hungry Jack's", color: "#d62300", text: "#fff" },
  { name: "Priceline", color: "#e4003a", text: "#fff" },
  { name: "Target", color: "#c41230", text: "#fff" },
  { name: "Dan Murphy's", color: "#003087", text: "#fff" },
  { name: "Petbarn", color: "#e4002b", text: "#fff" },
  { name: "David Jones", color: "#000", text: "#fff" },
  { name: "Nike", color: "#000", text: "#fff" },
  { name: "The Reject Shop", color: "#e4002b", text: "#fff" },
  { name: "Bunnings", color: "#007b32", text: "#fff" },
  { name: "Myer", color: "#000", text: "#fff" },
  { name: "Daiso", color: "#e4002b", text: "#fff" },
  { name: "H&M", color: "#e4002b", text: "#fff" },
  { name: "IKEA", color: "#0058a3", text: "#ffda1a" },
  { name: "Uniqlo", color: "#e4002b", text: "#fff" },
  { name: "Big W", color: "#003087", text: "#fff" },
];

const initialReceipts = [
  { id: 1, store: "Woolworths", date: "24 Mar 2025", amount: "$87.45", points: 87, status: "approved" },
  { id: 2, store: "Coles", date: "22 Mar 2025", amount: "$42.10", points: 42, status: "approved" },
  { id: 3, store: "IKEA", date: "20 Mar 2025", amount: "$210.00", points: 210, status: "pending" },
  { id: 4, store: "JB Hi-Fi", date: "18 Mar 2025", amount: "$399.00", points: 399, status: "approved" },
];

const prizes = [
  { label: "200", icon: "🪙", count: 3 },
  { label: "20", icon: "🪙", count: 4 },
];

const tabs = ["Home", "Receipts", "Camera", "Shakes", "Account"];
const tabIcons = ["🏠", "🧾", "📷", "🎲", "👤"];

export default function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [shakeResult, setShakeResult] = useState(null);
  const [shaking, setShaking] = useState(false);
  const [points, setPoints] = useState(1590);
  const [draws, setDraws] = useState(36);
  const [shakes, setShakes] = useState(28);
  const [uploadedReceipts, setUploadedReceipts] = useState(initialReceipts);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [jarFill, setJarFill] = useState(55);

  function handleShake() {
    if (shakes <= 0) return;
    setShaking(true);
    setShakeResult(null);
    setTimeout(() => {
      const roll = Math.random();
      let result;
      if (roll < 0.05) result = { prize: "25,000 pts", icon: "🏆", big: true };
      else if (roll < 0.2) result = { prize: "200 pts", icon: "🪙", big: false };
      else result = { prize: "20 pts", icon: "🥉", big: false };
      setShakeResult(result);
      setShaking(false);
      setShakes((s) => s - 1);
      setPoints((p) => p + parseInt(result.prize.replace(/[^0-9]/g, "")));
    }, 1200);
  }

  function handleUpload() {
    const newReceipt = {
      id: uploadedReceipts.length + 1,
      store: "Woolworths",
      date: new Date().toLocaleDateString("en-AU", { day: "2-digit", month: "short", year: "numeric" }),
      amount: `$${(Math.random() * 150 + 10).toFixed(2)}`,
      points: Math.floor(Math.random() * 150 + 10),
      status: "pending",
    };
    setUploadedReceipts((r) => [newReceipt, ...r]);
    setShakes((s) => s + 1);
    setPoints((p) => p + newReceipt.points);
    setJarFill((f) => Math.min(f + 10, 100));
    setShowUploadModal(false);
  }

  return (
    <div style={{ fontFamily: "'Nunito', 'Segoe UI', sans-serif", background: "#f0fafa", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .shake-anim { animation: shake 0.5s infinite; }
        @keyframes shake {
          0%,100% { transform: rotate(0deg); }
          20% { transform: rotate(-15deg); }
          40% { transform: rotate(15deg); }
          60% { transform: rotate(-10deg); }
          80% { transform: rotate(10deg); }
        }
        .tab-btn { transition: all 0.2s; }
        .tab-btn:hover { opacity: 0.7; }
        .store-badge { transition: transform 0.15s; }
        .store-badge:hover { transform: scale(1.07); }
        .receipt-row { transition: background 0.15s; }
        .receipt-row:hover { background: #e6f7f6 !important; }
        .upload-btn:hover { transform: scale(1.04); }
        .shake-btn:hover:not(:disabled) { transform: scale(1.05); }
        .shake-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #22a39f44; border-radius: 4px; }
      `}</style>

      {/* Phone frame */}
      <div style={{
        width: 390,
        height: 780,
        background: white,
        borderRadius: 40,
        boxShadow: "0 30px 80px #00000030, 0 0 0 8px #1a2d2d",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}>
        {/* Status Bar */}
        <div style={{ background: tealDark, padding: "10px 20px 0", display: "flex", justifyContent: "space-between", alignItems: "center", color: white, fontSize: 12, fontWeight: 700 }}>
          <span>9:41</span>
          <div style={{ display: "flex", gap: 6 }}>
            <span>●●●</span>
            <span>WiFi</span>
            <span>🔋</span>
          </div>
        </div>

        {/* Header */}
        <div style={{ background: `linear-gradient(135deg, ${tealDark} 0%, ${teal} 100%)`, padding: "12px 20px 16px", color: white }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 22 }}>🫙</span>
              <span style={{ fontWeight: 900, fontSize: 20, letterSpacing: -0.5 }}>receipt<span style={{ color: gold }}>CUAN</span></span>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <span style={{ fontSize: 20, cursor: "pointer" }}>🔔</span>
            </div>
          </div>
          {/* Stats bar */}
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            {[
              { icon: "⭐", val: points.toLocaleString(), label: "points" },
              { icon: "🎟️", val: draws, label: "draws" },
              { icon: "🎲", val: shakes, label: "shakes" },
            ].map((s, i) => (
              <div key={i} style={{ flex: 1, background: "rgba(255,255,255,0.18)", borderRadius: 12, padding: "6px 8px", textAlign: "center" }}>
                <div style={{ fontSize: 13 }}>{s.icon}</div>
                <div style={{ fontWeight: 900, fontSize: 15 }}>{s.val}</div>
                <div style={{ fontSize: 9, opacity: 0.8, fontWeight: 600, textTransform: "uppercase" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: "auto", background: gray }}>

          {/* HOME TAB */}
          {activeTab === 0 && (
            <div style={{ padding: "16px 16px 80px" }}>
              {/* Level badge */}
              <div style={{ background: white, borderRadius: 16, padding: 14, marginBottom: 12, boxShadow: "0 2px 8px #0001" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontWeight: 800, color: tealDark, fontSize: 13 }}>Level 2</span>
                  <span style={{ fontSize: 11, color: "#888", fontWeight: 600 }}>Next: Level 3</span>
                </div>
                <div style={{ background: "#e0f0ee", borderRadius: 99, height: 8, overflow: "hidden" }}>
                  <div style={{ width: "60%", background: `linear-gradient(90deg, ${teal}, ${gold})`, height: "100%", borderRadius: 99 }} />
                </div>
              </div>

              {/* Golden Jar */}
              <div style={{ background: `linear-gradient(135deg, #fffbe6, #fff8d0)`, borderRadius: 16, padding: 14, marginBottom: 12, border: `2px solid ${gold}33`, boxShadow: "0 2px 8px #f5a62322" }}>
                <div style={{ fontWeight: 800, fontSize: 14, color: "#b8860b", marginBottom: 8 }}>🏆 Golden Jar Reward</div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ position: "relative", width: 56, height: 64 }}>
                    <svg width="56" height="64" viewBox="0 0 56 64">
                      <rect x="10" y="12" width="36" height="46" rx="8" fill="#f5e070" stroke={gold} strokeWidth="2" />
                      <rect x="8" y="8" width="40" height="10" rx="5" fill={gold} />
                      <rect x="10" y={12 + (1 - jarFill / 100) * 46} width="36" height={jarFill / 100 * 46} rx="4" fill="#22a39f55" />
                      <text x="28" y="42" textAnchor="middle" fontSize="12" fontWeight="bold" fill={tealDark}>{jarFill}%</text>
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontSize: 12, color: "#555", fontWeight: 600 }}>Fill 4x Shake Jars to fill</div>
                    <div style={{ fontSize: 12, color: "#555", fontWeight: 600 }}>1x Golden Jar and earn</div>
                    <div style={{ fontSize: 12, color: gold, fontWeight: 800 }}>5 bonus points!</div>
                    <div style={{ fontSize: 11, color: teal, fontWeight: 700, marginTop: 4, textDecoration: "underline", cursor: "pointer" }}>About Shake Jars</div>
                  </div>
                </div>
              </div>

              {/* Upload CTA */}
              <button
                className="upload-btn"
                onClick={() => setShowUploadModal(true)}
                style={{
                  width: "100%", background: `linear-gradient(135deg, ${teal}, ${tealDark})`,
                  color: white, border: "none", borderRadius: 16, padding: "14px 0",
                  fontWeight: 900, fontSize: 15, cursor: "pointer", marginBottom: 12,
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  boxShadow: `0 4px 14px ${teal}55`, transition: "transform 0.2s"
                }}
              >
                📷 Upload a Receipt → Earn Points
              </button>

              {/* Surveys */}
              <div style={{ background: white, borderRadius: 16, padding: 14, marginBottom: 12, boxShadow: "0 2px 8px #0001" }}>
                <div style={{ fontWeight: 800, fontSize: 14, color: darkText, marginBottom: 10 }}>📋 Surveys</div>
                {[
                  { title: "Survey title survey title survey", pts: 45, progress: "1/5", locked: false },
                  { title: "Premium brand survey", pts: 30, progress: "0/3", locked: true },
                ].map((s, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, background: gray, borderRadius: 12, padding: 10, marginBottom: 8, opacity: s.locked ? 0.6 : 1 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: s.locked ? "#ccc" : teal, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, color: white }}>
                      {s.locked ? "🔒" : "📝"}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: 12, color: darkText }}>{s.title}</div>
                      <div style={{ fontSize: 11, color: gold, fontWeight: 700 }}>⭐ {s.pts} points</div>
                    </div>
                    <div style={{ fontSize: 11, color: "#888", fontWeight: 600 }}>{s.progress}</div>
                  </div>
                ))}
              </div>

              {/* How does it work */}
              <div style={{ background: white, borderRadius: 16, padding: 14, boxShadow: "0 2px 8px #0001" }}>
                <div style={{ fontWeight: 800, fontSize: 14, color: darkText, marginBottom: 10 }}>💡 How does it work?</div>
                <div style={{ display: "flex", justifyContent: "space-around", textAlign: "center" }}>
                  {[["🧾", "Upload Receipt"], ["⭐", "Earn Points"], ["💰", "Get Cash"]].map(([icon, label], i) => (
                    <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                      <div style={{ width: 44, height: 44, borderRadius: 12, background: tealLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{icon}</div>
                      <span style={{ fontSize: 10, fontWeight: 700, color: tealDark }}>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* RECEIPTS TAB */}
          {activeTab === 1 && (
            <div style={{ padding: "16px 16px 80px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <div style={{ fontWeight: 900, fontSize: 16, color: darkText }}>My Receipts</div>
                <button onClick={() => setShowUploadModal(true)} style={{ background: teal, color: white, border: "none", borderRadius: 20, padding: "6px 14px", fontSize: 12, fontWeight: 800, cursor: "pointer" }}>+ Upload</button>
              </div>
              {uploadedReceipts.map((r) => (
                <div key={r.id} className="receipt-row" style={{ background: white, borderRadius: 14, padding: 12, marginBottom: 8, display: "flex", alignItems: "center", gap: 12, boxShadow: "0 1px 6px #0001" }}>
                  <div style={{ width: 42, height: 42, borderRadius: 10, background: tealLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🧾</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 800, fontSize: 13, color: darkText }}>{r.store}</div>
                    <div style={{ fontSize: 11, color: "#888" }}>{r.date}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontWeight: 900, fontSize: 13, color: tealDark }}>{r.amount}</div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: gold }}>+{r.points} pts</div>
                    <div style={{
                      fontSize: 9, fontWeight: 800, padding: "2px 6px", borderRadius: 99,
                      background: r.status === "approved" ? "#e6f9ed" : "#fff8e1",
                      color: r.status === "approved" ? "#1a8f3f" : "#b8860b"
                    }}>{r.status.toUpperCase()}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* CAMERA TAB */}
          {activeTab === 2 && (
            <div style={{ padding: "16px 16px 80px", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
              <div style={{ fontWeight: 900, fontSize: 18, color: darkText, marginTop: 8 }}>Upload Receipt</div>
              <div style={{ width: "100%", aspectRatio: "3/4", background: "#1a2d2d", borderRadius: 20, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, color: white }}>
                <div style={{ fontSize: 60 }}>📷</div>
                <div style={{ fontWeight: 700, fontSize: 14, opacity: 0.8 }}>Point camera at receipt</div>
              </div>
              <div style={{ display: "flex", gap: 12, width: "100%" }}>
                <button onClick={() => setShowUploadModal(true)} style={{ flex: 1, background: gray, border: `2px dashed ${teal}`, borderRadius: 14, padding: 14, fontWeight: 800, fontSize: 13, color: tealDark, cursor: "pointer" }}>📁 From Gallery</button>
                <button onClick={() => setShowUploadModal(true)} style={{ flex: 1, background: `linear-gradient(135deg, ${teal}, ${tealDark})`, border: "none", borderRadius: 14, padding: 14, fontWeight: 800, fontSize: 13, color: white, cursor: "pointer" }}>📷 Take Photo</button>
              </div>
              <div style={{ background: white, borderRadius: 14, padding: 12, width: "100%", boxShadow: "0 2px 8px #0001" }}>
                <div style={{ fontWeight: 800, fontSize: 13, color: darkText, marginBottom: 6 }}>Accepted stores</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {stores.slice(0, 12).map((s, i) => (
                    <div key={i} className="store-badge" style={{ background: s.color, color: s.text, borderRadius: 8, padding: "3px 8px", fontSize: 9, fontWeight: 800, cursor: "default" }}>{s.name}</div>
                  ))}
                  <div style={{ background: tealLight, color: tealDark, borderRadius: 8, padding: "3px 8px", fontSize: 9, fontWeight: 800 }}>+{stores.length - 12} more</div>
                </div>
              </div>
            </div>
          )}

          {/* SHAKES TAB */}
          {activeTab === 3 && (
            <div style={{ padding: "16px 16px 80px" }}>
              <div style={{ background: `linear-gradient(135deg, ${tealDark}, #0d5f5a)`, borderRadius: 20, padding: 20, marginBottom: 12, textAlign: "center", color: white }}>
                <div style={{ fontWeight: 900, fontSize: 20, color: gold }}>🎲 Shake & Win</div>
                <div style={{ fontSize: 12, opacity: 0.8, marginBottom: 16, fontWeight: 600 }}>You have {shakes} shake{shakes !== 1 ? "s" : ""} left</div>
                <div style={{ fontWeight: 800, fontSize: 13, opacity: 0.7, marginBottom: 4 }}>TOP PRIZE</div>
                <div style={{ fontWeight: 900, fontSize: 32, color: gold }}>🏆 25,000</div>
                <div style={{ fontWeight: 700, fontSize: 12, opacity: 0.7, marginBottom: 16 }}>pts</div>
                <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 16 }}>
                  {prizes.map((p, i) => (
                    Array.from({ length: p.count }).map((_, j) => (
                      <div key={`${i}-${j}`} style={{ background: "rgba(255,255,255,0.1)", borderRadius: 10, padding: "6px 10px", fontWeight: 800, color: gold, fontSize: 13 }}>
                        {p.icon} {p.label}
                      </div>
                    ))
                  ))}
                </div>

                <div className={shaking ? "shake-anim" : ""} style={{ fontSize: 64, marginBottom: 12, cursor: "pointer" }} onClick={handleShake}>
                  🫙
                </div>

                {shakeResult && (
                  <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 14, padding: 12, marginBottom: 12 }}>
                    <div style={{ fontSize: 24 }}>{shakeResult.icon}</div>
                    <div style={{ fontWeight: 900, fontSize: 18, color: shakeResult.big ? gold : white }}>
                      You won {shakeResult.prize}!
                    </div>
                  </div>
                )}

                <button
                  className="shake-btn"
                  onClick={handleShake}
                  disabled={shaking || shakes <= 0}
                  style={{
                    background: shakes > 0 ? `linear-gradient(135deg, ${gold}, #e6920a)` : "#555",
                    color: shakes > 0 ? darkText : "#888",
                    border: "none", borderRadius: 14, padding: "14px 40px",
                    fontWeight: 900, fontSize: 16, cursor: shakes > 0 ? "pointer" : "not-allowed",
                    boxShadow: shakes > 0 ? `0 4px 14px ${gold}55` : "none",
                    transition: "transform 0.2s"
                  }}
                >
                  {shaking ? "Shaking..." : shakes > 0 ? "🎲 Play Now" : "No Shakes Left"}
                </button>
              </div>

              <div style={{ background: white, borderRadius: 16, padding: 14, boxShadow: "0 2px 8px #0001" }}>
                <div style={{ fontWeight: 800, fontSize: 14, color: darkText, marginBottom: 8 }}>Fill jars to earn Shakes</div>
                <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                  {[1, 2, 3].map((i) => (
                    <div key={i} style={{ flex: 1, background: tealLight, borderRadius: 12, padding: "10px 0", textAlign: "center", fontSize: 24 }}>✅</div>
                  ))}
                  <div style={{ flex: 1, background: gray, borderRadius: 12, padding: "10px 0", textAlign: "center", fontSize: 24 }}>🫙</div>
                </div>
                <div style={{ fontSize: 11, color: "#888", fontWeight: 600 }}>Upload before 8 March to earn 1 shake</div>
              </div>
            </div>
          )}

          {/* ACCOUNT TAB */}
          {activeTab === 4 && (
            <div style={{ padding: "16px 16px 80px" }}>
              <div style={{ background: `linear-gradient(135deg, ${tealDark}, ${teal})`, borderRadius: 20, padding: 20, marginBottom: 16, color: white, textAlign: "center" }}>
                <div style={{ width: 64, height: 64, borderRadius: 32, background: "rgba(255,255,255,0.2)", margin: "0 auto 10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32 }}>👤</div>
                <div style={{ fontWeight: 900, fontSize: 18 }}>Jane Smith</div>
                <div style={{ fontSize: 12, opacity: 0.8 }}>jane.smith@email.com</div>
                <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 12 }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontWeight: 900, fontSize: 18, color: gold }}>{points.toLocaleString()}</div>
                    <div style={{ fontSize: 10, opacity: 0.8 }}>POINTS</div>
                  </div>
                  <div style={{ width: 1, background: "rgba(255,255,255,0.3)" }} />
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontWeight: 900, fontSize: 18, color: gold }}>{uploadedReceipts.length}</div>
                    <div style={{ fontSize: 10, opacity: 0.8 }}>RECEIPTS</div>
                  </div>
                </div>
              </div>

              {/* Monthly draw */}
              <div style={{ background: white, borderRadius: 16, padding: 14, marginBottom: 12, boxShadow: "0 2px 8px #0001" }}>
                <div style={{ fontWeight: 800, fontSize: 14, color: darkText, marginBottom: 8 }}>🎟️ Monthly Draws</div>
                <div style={{ background: tealLight, borderRadius: 12, padding: 12, textAlign: "center" }}>
                  <div style={{ fontSize: 11, color: tealDark, fontWeight: 700 }}>YOU COULD WIN A SHARE OF</div>
                  <div style={{ fontWeight: 900, fontSize: 28, color: tealDark }}>100,000</div>
                  <div style={{ fontSize: 11, color: tealDark, fontWeight: 700, marginBottom: 8 }}>pts</div>
                  <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
                    {[["5", "2,000"], ["200", "200"], ["500", "100"]].map(([winners, pts], i) => (
                      <div key={i} style={{ background: white, borderRadius: 10, padding: "6px 10px", textAlign: "center" }}>
                        <div style={{ fontWeight: 900, fontSize: 13, color: tealDark }}>{winners}</div>
                        <div style={{ fontSize: 9, color: "#888" }}>winners</div>
                        <div style={{ fontWeight: 800, fontSize: 11, color: gold }}>{pts} pts</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {[["How to enter", "Each qualifying receipt you upload earns one entry into that month's drawing."],
                ["How does it work?", "Winners are chosen on the last day of every month."],
                ["See last month's draw winners", ""]
              ].map(([title, desc], i) => (
                <div key={i} style={{ background: white, borderRadius: 14, padding: 12, marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 1px 4px #0001", cursor: "pointer" }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 13, color: darkText }}>{title}</div>
                    {desc && <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>{desc}</div>}
                  </div>
                  <span style={{ color: teal, fontSize: 16 }}>›</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Tab Bar */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          background: white, borderTop: "1px solid #e8eeee",
          display: "flex", padding: "8px 0 16px",
          boxShadow: "0 -4px 16px #00000010"
        }}>
          {tabs.map((tab, i) => (
            <button
              key={i}
              className="tab-btn"
              onClick={() => setActiveTab(i)}
              style={{
                flex: 1, border: "none", background: "transparent",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
                cursor: "pointer",
              }}
            >
              {i === 2 ? (
                <div style={{
                  width: 48, height: 48, borderRadius: 24,
                  background: `linear-gradient(135deg, ${teal}, ${tealDark})`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 22, marginTop: -20, boxShadow: `0 4px 14px ${teal}66`
                }}>
                  {tabIcons[i]}
                </div>
              ) : (
                <>
                  <span style={{ fontSize: 18, filter: activeTab === i ? "none" : "grayscale(1) opacity(0.5)" }}>{tabIcons[i]}</span>
                  <span style={{ fontSize: 9, fontWeight: 800, color: activeTab === i ? tealDark : "#aaa" }}>{tab}</span>
                </>
              )}
            </button>
          ))}
        </div>

        {/* Upload Modal */}
        {showUploadModal && (
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "flex-end", zIndex: 99 }} onClick={() => setShowUploadModal(false)}>
            <div onClick={(e) => e.stopPropagation()} style={{ background: white, width: "100%", borderRadius: "24px 24px 0 0", padding: 24 }}>
              <div style={{ width: 40, height: 4, background: "#ddd", borderRadius: 99, margin: "0 auto 16px" }} />
              <div style={{ fontWeight: 900, fontSize: 16, color: darkText, marginBottom: 16 }}>Upload Receipt</div>
              <div style={{ background: tealLight, borderRadius: 14, padding: 16, marginBottom: 16, textAlign: "center" }}>
                <div style={{ fontSize: 40, marginBottom: 8 }}>🧾</div>
                <div style={{ fontWeight: 700, color: tealDark, fontSize: 13 }}>Tap to select or take photo</div>
                <div style={{ fontSize: 11, color: "#888", marginTop: 4 }}>JPG, PNG, PDF accepted</div>
              </div>
              <button onClick={handleUpload} style={{
                width: "100%", background: `linear-gradient(135deg, ${teal}, ${tealDark})`,
                color: white, border: "none", borderRadius: 14, padding: 14,
                fontWeight: 900, fontSize: 15, cursor: "pointer",
                boxShadow: `0 4px 14px ${teal}55`
              }}>
                ✅ Upload & Earn Points
              </button>
              <button onClick={() => setShowUploadModal(false)} style={{ width: "100%", background: "transparent", border: "none", padding: 10, color: "#888", fontWeight: 700, fontSize: 13, cursor: "pointer", marginTop: 4 }}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Stores marquee outside phone */}
      <div style={{ marginTop: 20, width: 390, overflow: "hidden", paddingBottom: 40 }}>
        <div style={{ fontWeight: 700, fontSize: 11, color: "#888", textAlign: "center", marginBottom: 8 }}>ACCEPTED STORES</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center" }}>
          {stores.map((s, i) => (
            <div key={i} className="store-badge" style={{ background: s.color, color: s.text, borderRadius: 8, padding: "4px 10px", fontSize: 10, fontWeight: 800, cursor: "default", boxShadow: "0 1px 4px #0002" }}>{s.name}</div>
          ))}
        </div>
      </div>
    </div>
  );
}