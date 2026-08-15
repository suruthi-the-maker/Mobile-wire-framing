import { useState } from 'react'

// ─── Wireframe primitives ────────────────────────────────────────────────────

function PhoneShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        width: 360,
        minHeight: 740,
        background: '#fff',
        border: '2px solid #333',
        borderRadius: 36,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {/* Notch */}
      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 12, paddingBottom: 4, background: '#fff' }}>
        <div style={{ width: 100, height: 20, background: '#333', borderRadius: 10 }} />
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {children}
      </div>
    </div>
  )
}

function StatusBar() {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 20px 8px', fontSize: 11, color: '#555', fontWeight: 500 }}>
      <span>9:41</span>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <span>●●●</span>
        <span>WiFi</span>
        <span>🔋</span>
      </div>
    </div>
  )
}

function TopBar({ title, back, onBack }: { title: string; back?: boolean; onBack?: () => void }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '10px 20px', borderBottom: '1.5px solid #e0e0e0', gap: 10 }}>
      {back && (
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: '#333', padding: 0, display: 'flex', alignItems: 'center' }}>
          ←
        </button>
      )}
      <span style={{ fontWeight: 600, fontSize: 16, color: '#1a1a1a' }}>{title}</span>
    </div>
  )
}

function BottomNav({ active, onNav }: { active: string; onNav: (s: string) => void }) {
  const items = [
    { id: 'home', icon: '⌂', label: 'Home' },
    { id: 'search', icon: '◎', label: 'Search' },
    { id: 'applications', icon: '☰', label: 'Applied' },
    { id: 'profile', icon: '○', label: 'Profile' },
  ]
  return (
    <div style={{ borderTop: '1.5px solid #e0e0e0', display: 'flex', background: '#fff' }}>
      {items.map(item => (
        <button
          key={item.id}
          onClick={() => onNav(item.id)}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '10px 0 14px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            gap: 3,
          }}
        >
          <span style={{ fontSize: 18, color: active === item.id ? '#222' : '#aaa' }}>{item.icon}</span>
          <span style={{ fontSize: 10, color: active === item.id ? '#222' : '#aaa', fontWeight: active === item.id ? 600 : 400 }}>{item.label}</span>
          {active === item.id && <div style={{ width: 20, height: 2, background: '#333', borderRadius: 1 }} />}
        </button>
      ))}
    </div>
  )
}

function Btn({ label, variant = 'primary', onClick }: { label: string; variant?: 'primary' | 'outline' | 'ghost'; onClick?: () => void }) {
  const styles: Record<string, React.CSSProperties> = {
    primary: { background: '#222', color: '#fff', border: '1.5px solid #222' },
    outline: { background: 'transparent', color: '#222', border: '1.5px solid #555' },
    ghost: { background: '#f0f0f0', color: '#444', border: '1.5px solid #ddd' },
  }
  return (
    <button
      onClick={onClick}
      style={{
        ...styles[variant],
        borderRadius: 10,
        padding: '12px 20px',
        fontSize: 14,
        fontWeight: 600,
        cursor: 'pointer',
        width: '100%',
        fontFamily: 'inherit',
        letterSpacing: '0.01em',
      }}
    >
      {label}
    </button>
  )
}

function InputBox({ placeholder, type = 'text' }: { placeholder: string; type?: string }) {
  return (
    <div style={{ border: '1.5px solid #ccc', borderRadius: 10, padding: '12px 14px', fontSize: 14, color: '#999', background: '#fafafa', fontFamily: 'inherit' }}>
      {placeholder}
    </div>
  )
}

function Tag({ label }: { label: string }) {
  return (
    <span style={{ background: '#f0f0f0', border: '1px solid #ddd', borderRadius: 20, padding: '4px 12px', fontSize: 12, color: '#444', fontWeight: 500 }}>
      {label}
    </span>
  )
}

function Pill({ label, active }: { label: string; active?: boolean }) {
  return (
    <span style={{
      background: active ? '#333' : '#f5f5f5',
      border: `1px solid ${active ? '#333' : '#ddd'}`,
      borderRadius: 20,
      padding: '6px 14px',
      fontSize: 12,
      color: active ? '#fff' : '#555',
      fontWeight: 500,
      whiteSpace: 'nowrap' as const,
      cursor: 'pointer',
    }}>
      {label}
    </span>
  )
}

function Divider() {
  return <div style={{ height: 1, background: '#ececec', margin: '0 0' }} />
}

function InternCard({ title, company, location, type, deadline, onClick }: {
  title: string; company: string; location: string; type: string; deadline: string; onClick?: () => void
}) {
  return (
    <div
      onClick={onClick}
      style={{
        border: '1.5px solid #e0e0e0',
        borderRadius: 14,
        padding: '14px 16px',
        cursor: 'pointer',
        background: '#fff',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontWeight: 600, fontSize: 14, color: '#1a1a1a' }}>{title}</div>
          <div style={{ fontSize: 12, color: '#666', marginTop: 2 }}>{company} · {location}</div>
        </div>
        <div style={{ width: 40, height: 40, background: '#eee', borderRadius: 10, border: '1px solid #ddd', flexShrink: 0 }} />
      </div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' as const }}>
        <Tag label={type} />
        <Tag label="₹15k/mo" />
        <Tag label="6 months" />
      </div>
      <div style={{ fontSize: 11, color: '#999', fontFamily: 'DM Mono, monospace' }}>Deadline: {deadline}</div>
    </div>
  )
}

// ─── Screens ─────────────────────────────────────────────────────────────────

function SplashScreen({ onNext }: { onNext: () => void }) {
  return (
    <div
      onClick={onNext}
      style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#1a1a1a', gap: 16, cursor: 'pointer', padding: 40 }}
    >
      <div style={{ width: 80, height: 80, border: '3px solid #fff', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 44, height: 44, background: '#fff', borderRadius: 10 }} />
      </div>
      <div style={{ textAlign: 'center' as const }}>
        <div style={{ fontSize: 28, fontWeight: 700, color: '#fff', letterSpacing: '-0.5px' }}>InternHub</div>
        <div style={{ fontSize: 13, color: '#aaa', marginTop: 6, letterSpacing: '0.05em' }}>Find. Apply. Grow.</div>
      </div>
      <div style={{ marginTop: 60, fontSize: 11, color: '#555', fontFamily: 'DM Mono, monospace' }}>tap to continue</div>
    </div>
  )
}

function LoginScreen({ onNext }: { onNext: () => void }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
      <StatusBar />
      <div style={{ padding: '24px 24px 32px', flex: 1, display: 'flex', flexDirection: 'column', gap: 0 }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontWeight: 700, fontSize: 24, color: '#1a1a1a', letterSpacing: '-0.5px' }}>Welcome back 👋</div>
          <div style={{ fontSize: 13, color: '#777', marginTop: 6 }}>Sign in to your InternHub account</div>
        </div>

        <div style={{ display: 'flex', gap: 0, marginBottom: 24, border: '1.5px solid #ddd', borderRadius: 10, overflow: 'hidden' }}>
          <button style={{ flex: 1, padding: '10px', background: '#222', color: '#fff', border: 'none', fontWeight: 600, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>Log In</button>
          <button style={{ flex: 1, padding: '10px', background: '#f5f5f5', color: '#777', border: 'none', fontWeight: 500, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>Sign Up</button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#444', marginBottom: 6 }}>Email Address</div>
            <InputBox placeholder="ananya@college.edu" />
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#444', marginBottom: 6 }}>Password</div>
            <InputBox placeholder="••••••••" type="password" />
          </div>
        </div>

        <div style={{ textAlign: 'right' as const, marginBottom: 24 }}>
          <span style={{ fontSize: 12, color: '#555', textDecoration: 'underline', cursor: 'pointer' }}>Forgot password?</span>
        </div>

        <Btn label="Log In" onClick={onNext} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '20px 0' }}>
          <div style={{ flex: 1, height: 1, background: '#e0e0e0' }} />
          <span style={{ fontSize: 12, color: '#aaa' }}>or continue with</span>
          <div style={{ flex: 1, height: 1, background: '#e0e0e0' }} />
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <button style={{ flex: 1, padding: '11px', border: '1.5px solid #ddd', borderRadius: 10, background: '#fff', fontSize: 13, fontWeight: 500, color: '#333', cursor: 'pointer', fontFamily: 'inherit' }}>G  Google</button>
          <button style={{ flex: 1, padding: '11px', border: '1.5px solid #ddd', borderRadius: 10, background: '#fff', fontSize: 13, fontWeight: 500, color: '#333', cursor: 'pointer', fontFamily: 'inherit' }}>in  LinkedIn</button>
        </div>

        <div style={{ marginTop: 24, textAlign: 'center' as const, fontSize: 12, color: '#888' }}>
          New to InternHub? <span style={{ color: '#222', fontWeight: 600, textDecoration: 'underline', cursor: 'pointer' }}>Create account</span>
        </div>
      </div>
    </div>
  )
}

function HomeScreen({ onNav, onCard }: { onNav: (s: string) => void; onCard: () => void }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#f9f9f9' }}>
      <StatusBar />
      <div style={{ flex: 1, overflow: 'auto' }}>
        {/* Header */}
        <div style={{ padding: '16px 20px 12px', background: '#fff', borderBottom: '1.5px solid #ececec' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 13, color: '#888' }}>Good morning,</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#1a1a1a', letterSpacing: '-0.3px' }}>Ananya 👋</div>
            </div>
            <div style={{ width: 40, height: 40, background: '#ddd', borderRadius: 20, border: '2px solid #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>A</div>
          </div>
          {/* Search bar */}
          <div
            onClick={() => onNav('search')}
            style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 10, background: '#f5f5f5', border: '1.5px solid #e0e0e0', borderRadius: 12, padding: '10px 14px', cursor: 'pointer' }}
          >
            <span style={{ color: '#999', fontSize: 16 }}>◎</span>
            <span style={{ fontSize: 13, color: '#aaa' }}>Search internships...</span>
          </div>
        </div>

        <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Stats strip */}
          <div style={{ display: 'flex', gap: 12 }}>
            {[['3', 'Applications'], ['1', 'Interview'], ['12', 'Saved']].map(([n, l]) => (
              <div key={l} style={{ flex: 1, background: '#fff', border: '1.5px solid #e0e0e0', borderRadius: 12, padding: '12px 10px', textAlign: 'center' as const }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#1a1a1a' }}>{n}</div>
                <div style={{ fontSize: 11, color: '#888', marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>

          {/* Deadline reminder */}
          <div style={{ background: '#f0f0f0', border: '1.5px dashed #bbb', borderRadius: 12, padding: '12px 14px', display: 'flex', gap: 10, alignItems: 'center' }}>
            <span style={{ fontSize: 20 }}>⏰</span>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#333' }}>Deadline in 2 days</div>
              <div style={{ fontSize: 11, color: '#666', marginTop: 2 }}>SDE Intern @ Google — Apply by Aug 17</div>
            </div>
          </div>

          {/* Category pills */}
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a', marginBottom: 10 }}>Browse by Role</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const }}>
              {['Software Dev', 'Data Science', 'UI/UX', 'Marketing', 'Finance', 'Research'].map((c, i) => (
                <Pill key={c} label={c} active={i === 0} />
              ))}
            </div>
          </div>

          {/* Recommended */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a' }}>Recommended for You</div>
              <span style={{ fontSize: 12, color: '#777', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => onNav('search')}>See all</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <InternCard title="SDE Intern" company="Google" location="Bengaluru" type="Remote" deadline="Aug 17, 2026" onClick={onCard} />
              <InternCard title="Frontend Dev Intern" company="Flipkart" location="Bengaluru" type="On-site" deadline="Aug 25, 2026" onClick={onCard} />
            </div>
          </div>
        </div>
      </div>
      <BottomNav active="home" onNav={onNav} />
    </div>
  )
}

function SearchScreen({ onNav, onCard, onFilter }: { onNav: (s: string) => void; onCard: () => void; onFilter: () => void }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#f9f9f9' }}>
      <StatusBar />
      <div style={{ padding: '10px 20px 12px', background: '#fff', borderBottom: '1.5px solid #ececec' }}>
        <div style={{ fontSize: 17, fontWeight: 700, color: '#1a1a1a', marginBottom: 12 }}>Find Internships</div>
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, background: '#f5f5f5', border: '1.5px solid #ddd', borderRadius: 10, padding: '9px 12px' }}>
            <span style={{ color: '#aaa' }}>◎</span>
            <span style={{ fontSize: 13, color: '#bbb' }}>Search role, company, skill...</span>
          </div>
          <button
            onClick={onFilter}
            style={{ background: '#222', border: 'none', borderRadius: 10, padding: '0 14px', cursor: 'pointer', color: '#fff', fontSize: 14 }}
          >
            ⊞
          </button>
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 10, overflowX: 'auto' as const, paddingBottom: 2 }}>
          {['All', 'Remote', 'On-site', 'Hybrid', 'Stipend > 10k', 'New'].map((p, i) => (
            <Pill key={p} label={p} active={i === 0} />
          ))}
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ fontSize: 11, color: '#999', fontFamily: 'DM Mono, monospace', marginBottom: 4 }}>142 results found</div>
        <InternCard title="SDE Intern" company="Google" location="Bengaluru" type="Remote" deadline="Aug 17, 2026" onClick={onCard} />
        <InternCard title="Frontend Dev Intern" company="Flipkart" location="Bengaluru" type="On-site" deadline="Aug 25, 2026" onClick={onCard} />
        <InternCard title="Backend Intern" company="Razorpay" location="Pune" type="Hybrid" deadline="Sep 1, 2026" onClick={onCard} />
        <InternCard title="ML Intern" company="Microsoft" location="Hyderabad" type="Remote" deadline="Sep 10, 2026" onClick={onCard} />
        <InternCard title="Full Stack Intern" company="Swiggy" location="Bengaluru" type="On-site" deadline="Sep 15, 2026" onClick={onCard} />
      </div>
      <BottomNav active="search" onNav={onNav} />
    </div>
  )
}

function FilterScreen({ onBack, onApply }: { onBack: () => void; onApply: () => void }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#fff' }}>
      <StatusBar />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', borderBottom: '1.5px solid #ececec' }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: '#333' }}>←</button>
        <span style={{ fontWeight: 700, fontSize: 16 }}>Filter & Sort</span>
        <span style={{ fontSize: 12, color: '#777', textDecoration: 'underline', cursor: 'pointer' }}>Reset</span>
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: '20px' }}>
        {[
          { label: 'Work Mode', options: ['Any', 'Remote', 'On-site', 'Hybrid'] },
          { label: 'Duration', options: ['Any', '1–2 months', '3–6 months', '6+ months'] },
          { label: 'Role Category', options: ['Software Dev', 'Data Science', 'UI/UX', 'Marketing', 'Finance'] },
        ].map((group, gi) => (
          <div key={group.label} style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#222', marginBottom: 10 }}>{group.label}</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const }}>
              {group.options.map((o, i) => <Pill key={o} label={o} active={i === 0 && gi === 0} />)}
            </div>
          </div>
        ))}

        <Divider />

        {/* Stipend slider placeholder */}
        <div style={{ marginTop: 20, marginBottom: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#222', marginBottom: 10 }}>Minimum Stipend</div>
          <div style={{ height: 4, background: '#e0e0e0', borderRadius: 2, position: 'relative' as const, marginBottom: 8 }}>
            <div style={{ position: 'absolute' as const, left: 0, width: '45%', height: '100%', background: '#333', borderRadius: 2 }} />
            <div style={{ position: 'absolute' as const, left: '45%', top: '50%', transform: 'translate(-50%, -50%)', width: 18, height: 18, background: '#fff', border: '2px solid #333', borderRadius: 9 }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#888', fontFamily: 'DM Mono, monospace' }}>
            <span>₹0</span><span>₹10,000/mo</span><span>₹30,000+</span>
          </div>
        </div>

        {/* Sort */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#222', marginBottom: 10 }}>Sort By</div>
          {['Newest First', 'Deadline (Soonest)', 'Highest Stipend', 'Most Relevant'].map((s, i) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: '1px solid #f0f0f0' }}>
              <div style={{ width: 18, height: 18, borderRadius: 9, border: `2px solid ${i === 0 ? '#333' : '#ccc'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {i === 0 && <div style={{ width: 8, height: 8, borderRadius: 4, background: '#333' }} />}
              </div>
              <span style={{ fontSize: 13, color: '#333' }}>{s}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '16px 20px', borderTop: '1.5px solid #ececec' }}>
        <Btn label="Apply Filters" onClick={onApply} />
      </div>
    </div>
  )
}

function InternDetailScreen({ onBack, onApply }: { onBack: () => void; onApply: () => void }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#fff' }}>
      <StatusBar />
      <TopBar title="Internship Details" back onBack={onBack} />

      <div style={{ flex: 1, overflow: 'auto' }}>
        {/* Header card */}
        <div style={{ padding: '20px', borderBottom: '1.5px solid #ececec' }}>
          <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 14 }}>
            <div style={{ width: 56, height: 56, background: '#eee', borderRadius: 14, border: '1.5px solid #ddd', flexShrink: 0 }} />
            <div>
              <div style={{ fontWeight: 700, fontSize: 17, color: '#1a1a1a', letterSpacing: '-0.3px' }}>SDE Intern</div>
              <div style={{ fontSize: 13, color: '#666', marginTop: 3 }}>Google · Bengaluru, India</div>
              <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' as const }}>
                <Tag label="Remote" /><Tag label="6 months" /><Tag label="₹15k/mo" />
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ flex: 1, background: '#f5f5f5', borderRadius: 10, padding: '10px', textAlign: 'center' as const }}>
              <div style={{ fontSize: 11, color: '#888' }}>Deadline</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#d44', fontFamily: 'DM Mono, monospace' }}>Aug 17</div>
            </div>
            <div style={{ flex: 1, background: '#f5f5f5', borderRadius: 10, padding: '10px', textAlign: 'center' as const }}>
              <div style={{ fontSize: 11, color: '#888' }}>Openings</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#333' }}>15</div>
            </div>
            <div style={{ flex: 1, background: '#f5f5f5', borderRadius: 10, padding: '10px', textAlign: 'center' as const }}>
              <div style={{ fontSize: 11, color: '#888' }}>Applied</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#333' }}>342</div>
            </div>
          </div>
        </div>

        <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a', marginBottom: 8 }}>About the Role</div>
            <div style={{ fontSize: 13, color: '#555', lineHeight: 1.6 }}>
              Join Google's engineering team as a Software Development Intern. You'll work on real products used by millions, mentored by senior engineers. This is a 6-month paid internship for pre-final/final year students.
            </div>
          </div>

          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a', marginBottom: 8 }}>Eligibility</div>
            {['B.Tech/M.Tech CS/IT/ECE (2025/2026 batch)', 'CGPA ≥ 7.0', 'Strong DSA and problem-solving skills'].map(e => (
              <div key={e} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 6 }}>
                <span style={{ color: '#555', marginTop: 1 }}>▸</span>
                <span style={{ fontSize: 13, color: '#555' }}>{e}</span>
              </div>
            ))}
          </div>

          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a', marginBottom: 8 }}>Skills Required</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const }}>
              {['Java', 'Python', 'Data Structures', 'Algorithms', 'System Design'].map(s => <Tag key={s} label={s} />)}
            </div>
          </div>

          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a', marginBottom: 8 }}>Selection Process</div>
            <div style={{ display: 'flex', gap: 0 }}>
              {['Resume', 'Online Test', 'Tech Interview', 'HR Round', 'Offer'].map((step, i, arr) => (
                <div key={step} style={{ display: 'flex', alignItems: 'center', flex: i < arr.length - 1 ? 1 : 0 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                    <div style={{ width: 22, height: 22, borderRadius: 11, background: i < 2 ? '#333' : '#e0e0e0', border: '2px solid #aaa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {i < 2 && <div style={{ width: 8, height: 8, borderRadius: 4, background: '#fff' }} />}
                    </div>
                    <span style={{ fontSize: 9, color: '#777', textAlign: 'center' as const, width: 44 }}>{step}</span>
                  </div>
                  {i < arr.length - 1 && <div style={{ flex: 1, height: 2, background: i < 1 ? '#333' : '#e0e0e0', marginBottom: 16 }} />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '16px 20px', borderTop: '1.5px solid #ececec', display: 'flex', gap: 10 }}>
        <button style={{ width: 44, height: 44, border: '1.5px solid #ddd', borderRadius: 10, background: '#fff', cursor: 'pointer', fontSize: 18 }}>♡</button>
        <div style={{ flex: 1 }}><Btn label="Apply Now →" onClick={onApply} /></div>
      </div>
    </div>
  )
}

function ApplicationFormScreen({ onBack, onSubmit }: { onBack: () => void; onSubmit: () => void }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#fff' }}>
      <StatusBar />
      <TopBar title="Application Form" back onBack={onBack} />

      {/* Progress */}
      <div style={{ padding: '10px 20px', background: '#f9f9f9', borderBottom: '1px solid #ececec' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#888', marginBottom: 6 }}>
          <span>Step 2 of 3</span><span>Personal Details</span>
        </div>
        <div style={{ height: 4, background: '#e0e0e0', borderRadius: 2 }}>
          <div style={{ width: '66%', height: '100%', background: '#333', borderRadius: 2 }} />
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ fontWeight: 600, fontSize: 14, color: '#1a1a1a', marginBottom: 4 }}>SDE Intern @ Google</div>

        {[
          { label: 'Full Name', placeholder: 'Ananya Sharma' },
          { label: 'College / University', placeholder: 'VIT Vellore' },
          { label: 'Branch & Year', placeholder: 'B.Tech IT · 3rd Year' },
          { label: 'CGPA', placeholder: '8.6' },
          { label: 'GitHub / LinkedIn URL', placeholder: 'github.com/ananya' },
        ].map(f => (
          <div key={f.label}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#444', marginBottom: 6 }}>{f.label}</div>
            <InputBox placeholder={f.placeholder} />
          </div>
        ))}

        {/* Resume upload */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#444', marginBottom: 6 }}>Resume (PDF)</div>
          <div style={{ border: '1.5px dashed #bbb', borderRadius: 10, padding: '18px', textAlign: 'center' as const, background: '#f9f9f9', cursor: 'pointer' }}>
            <div style={{ fontSize: 24, marginBottom: 6 }}>↑</div>
            <div style={{ fontSize: 13, color: '#666' }}>Tap to upload resume</div>
            <div style={{ fontSize: 11, color: '#aaa', marginTop: 4 }}>PDF up to 2MB</div>
          </div>
        </div>

        {/* Cover note */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#444', marginBottom: 6 }}>Cover Note <span style={{ fontWeight: 400, color: '#aaa' }}>(optional)</span></div>
          <div style={{ border: '1.5px solid #ccc', borderRadius: 10, padding: '12px 14px', height: 80, background: '#fafafa', fontSize: 13, color: '#bbb' }}>
            Tell us why you'd be a great fit...
          </div>
        </div>
      </div>

      <div style={{ padding: '16px 20px', borderTop: '1.5px solid #ececec', display: 'flex', gap: 10 }}>
        <div style={{ width: '35%' }}><Btn label="← Back" variant="outline" onClick={onBack} /></div>
        <div style={{ flex: 1 }}><Btn label="Submit →" onClick={onSubmit} /></div>
      </div>
    </div>
  )
}

function MyApplicationsScreen({ onNav, onCard }: { onNav: (s: string) => void; onCard: () => void }) {
  const apps = [
    { title: 'SDE Intern', company: 'Google', status: 'Under Review', color: '#f5a623', date: 'Applied Aug 10' },
    { title: 'Frontend Intern', company: 'Flipkart', status: 'Shortlisted', color: '#27ae60', date: 'Applied Aug 5' },
    { title: 'Backend Intern', company: 'Razorpay', status: 'Rejected', color: '#e74c3c', date: 'Applied Jul 28' },
    { title: 'ML Intern', company: 'Microsoft', status: 'Applied', color: '#888', date: 'Applied Aug 12' },
  ]

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#f9f9f9' }}>
      <StatusBar />
      <div style={{ padding: '12px 20px', background: '#fff', borderBottom: '1.5px solid #ececec' }}>
        <div style={{ fontWeight: 700, fontSize: 17, color: '#1a1a1a' }}>My Applications</div>
        <div style={{ display: 'flex', gap: 8, marginTop: 10, overflowX: 'auto' as const }}>
          {['All (4)', 'Active (2)', 'Shortlisted (1)', 'Rejected (1)'].map((f, i) => (
            <Pill key={f} label={f} active={i === 0} />
          ))}
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {apps.map(app => (
          <div
            key={app.title}
            onClick={onCard}
            style={{ background: '#fff', border: '1.5px solid #e0e0e0', borderRadius: 14, padding: '14px 16px', cursor: 'pointer', display: 'flex', gap: 12, alignItems: 'flex-start' }}
          >
            <div style={{ width: 44, height: 44, background: '#eee', borderRadius: 10, border: '1px solid #ddd', flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 14, color: '#1a1a1a' }}>{app.title}</div>
              <div style={{ fontSize: 12, color: '#777', marginTop: 2 }}>{app.company}</div>
              <div style={{ fontSize: 11, color: '#aaa', marginTop: 2, fontFamily: 'DM Mono, monospace' }}>{app.date}</div>
            </div>
            <div style={{ background: app.color + '20', border: `1px solid ${app.color}`, borderRadius: 20, padding: '4px 10px', fontSize: 11, color: app.color, fontWeight: 600, whiteSpace: 'nowrap' as const }}>
              {app.status}
            </div>
          </div>
        ))}
      </div>
      <BottomNav active="applications" onNav={onNav} />
    </div>
  )
}

function AppStatusScreen({ onBack }: { onBack: () => void }) {
  const steps = [
    { label: 'Application Submitted', date: 'Aug 10, 2026', done: true },
    { label: 'Resume Screened', date: 'Aug 12, 2026', done: true },
    { label: 'Online Test Scheduled', date: 'Aug 18, 2026', done: false, active: true },
    { label: 'Technical Interview', date: 'TBD', done: false },
    { label: 'Final Decision', date: 'TBD', done: false },
  ]

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#fff' }}>
      <StatusBar />
      <TopBar title="Application Status" back onBack={onBack} />

      <div style={{ flex: 1, overflow: 'auto', padding: '20px' }}>
        {/* Role summary */}
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 20, padding: '14px', background: '#f5f5f5', borderRadius: 14 }}>
          <div style={{ width: 44, height: 44, background: '#ddd', borderRadius: 10, border: '1px solid #ccc', flexShrink: 0 }} />
          <div>
            <div style={{ fontWeight: 600, fontSize: 14, color: '#1a1a1a' }}>SDE Intern</div>
            <div style={{ fontSize: 12, color: '#666', marginTop: 2 }}>Google · Bengaluru</div>
            <div style={{ fontSize: 11, color: '#888', fontFamily: 'DM Mono, monospace', marginTop: 2 }}>Applied: Aug 10, 2026</div>
          </div>
        </div>

        {/* Status badge */}
        <div style={{ background: '#fff9e6', border: '1.5px solid #f5a623', borderRadius: 12, padding: '12px 16px', marginBottom: 24, display: 'flex', gap: 10, alignItems: 'center' }}>
          <span style={{ fontSize: 18 }}>⏳</span>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#c47d00' }}>Under Review</div>
            <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>Online test scheduled for Aug 18</div>
          </div>
        </div>

        {/* Timeline */}
        <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a', marginBottom: 16 }}>Application Timeline</div>
        {steps.map((step, i) => (
          <div key={step.label} style={{ display: 'flex', gap: 14, paddingBottom: i < steps.length - 1 ? 20 : 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{
                width: 24, height: 24, borderRadius: 12,
                background: step.done ? '#333' : step.active ? '#fff' : '#f0f0f0',
                border: `2px solid ${step.done ? '#333' : step.active ? '#333' : '#ddd'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                {step.done && <span style={{ color: '#fff', fontSize: 11, fontWeight: 700 }}>✓</span>}
                {step.active && <div style={{ width: 8, height: 8, borderRadius: 4, background: '#333' }} />}
              </div>
              {i < steps.length - 1 && <div style={{ flex: 1, width: 2, background: step.done ? '#333' : '#e0e0e0', minHeight: 20, marginTop: 4 }} />}
            </div>
            <div style={{ paddingBottom: 4 }}>
              <div style={{ fontSize: 13, fontWeight: step.active ? 700 : 500, color: step.done || step.active ? '#1a1a1a' : '#aaa' }}>{step.label}</div>
              <div style={{ fontSize: 11, color: '#aaa', fontFamily: 'DM Mono, monospace', marginTop: 2 }}>{step.date}</div>
            </div>
          </div>
        ))}

        {/* Note */}
        <div style={{ marginTop: 24, background: '#f5f5f5', borderRadius: 12, padding: '12px 14px', fontSize: 12, color: '#666', lineHeight: 1.6 }}>
          💡 Tip: Prepare for the online test with DSA practice on LeetCode. You'll receive an email with the test link 24h before.
        </div>
      </div>
    </div>
  )
}

function ProfileScreen({ onNav }: { onNav: (s: string) => void }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#f9f9f9' }}>
      <StatusBar />
      <div style={{ padding: '16px 20px 0', background: '#fff', borderBottom: '1.5px solid #ececec' }}>
        <div style={{ fontWeight: 700, fontSize: 17, color: '#1a1a1a', paddingBottom: 12 }}>My Profile</div>
      </div>

      <div style={{ flex: 1, overflow: 'auto' }}>
        {/* Avatar + name */}
        <div style={{ background: '#fff', padding: '24px 20px', borderBottom: '1.5px solid #ececec', display: 'flex', gap: 16, alignItems: 'center' }}>
          <div style={{ width: 64, height: 64, background: '#ddd', borderRadius: 32, border: '2px solid #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, color: '#999', flexShrink: 0 }}>A</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 16, color: '#1a1a1a' }}>Ananya Sharma</div>
            <div style={{ fontSize: 12, color: '#777', marginTop: 3 }}>B.Tech IT · 3rd Year · VIT Vellore</div>
            <div style={{ fontSize: 11, color: '#aaa', marginTop: 2 }}>ananya@college.edu</div>
          </div>
          <button style={{ marginLeft: 'auto', background: '#f0f0f0', border: '1px solid #ddd', borderRadius: 8, padding: '6px 12px', fontSize: 12, color: '#444', cursor: 'pointer', fontFamily: 'inherit' }}>Edit</button>
        </div>

        <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Stats */}
          <div style={{ display: 'flex', gap: 10 }}>
            {[['3', 'Applied'], ['1', 'Shortlisted'], ['12', 'Saved']].map(([n, l]) => (
              <div key={l} style={{ flex: 1, background: '#fff', border: '1.5px solid #e0e0e0', borderRadius: 12, padding: '12px', textAlign: 'center' as const }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#1a1a1a' }}>{n}</div>
                <div style={{ fontSize: 10, color: '#888', marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>

          {/* Skills */}
          <div style={{ background: '#fff', border: '1.5px solid #e0e0e0', borderRadius: 14, padding: '14px 16px' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a', marginBottom: 10 }}>Skills</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const }}>
              {['React', 'Python', 'Node.js', 'SQL', 'Java', 'Git'].map(s => <Tag key={s} label={s} />)}
              <span style={{ fontSize: 12, color: '#999', alignSelf: 'center', cursor: 'pointer' }}>+ Add</span>
            </div>
          </div>

          {/* Preferences */}
          <div style={{ background: '#fff', border: '1.5px solid #e0e0e0', borderRadius: 14, padding: '14px 16px' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a', marginBottom: 10 }}>Job Preferences</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[['Role', 'Software Development'], ['Mode', 'Remote / Hybrid'], ['Duration', '3–6 months'], ['Min Stipend', '₹10,000/mo']].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                  <span style={{ color: '#888' }}>{k}</span>
                  <span style={{ color: '#333', fontWeight: 500 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Menu */}
          <div style={{ background: '#fff', border: '1.5px solid #e0e0e0', borderRadius: 14, overflow: 'hidden' }}>
            {['Resume & Documents', 'Notification Settings', 'Privacy & Security', 'Help & Support', 'Log Out'].map((item, i, arr) => (
              <div key={item} style={{ padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: i < arr.length - 1 ? '1px solid #f0f0f0' : 'none', cursor: 'pointer' }}>
                <span style={{ fontSize: 13, color: item === 'Log Out' ? '#e74c3c' : '#333' }}>{item}</span>
                {item !== 'Log Out' && <span style={{ color: '#ccc', fontSize: 16 }}>›</span>}
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav active="profile" onNav={onNav} />
    </div>
  )
}

// ─── Wireframe flow map ──────────────────────────────────────────────────────

type Screen =
  | 'splash' | 'login'
  | 'home' | 'search' | 'filter' | 'detail' | 'form' | 'applications' | 'status' | 'profile'

const SCREEN_LABELS: Record<Screen, string> = {
  splash: '1. Splash',
  login: '2. Login / Sign Up',
  home: '3. Home Dashboard',
  search: '4. Internship Search',
  filter: '5. Filter & Sort',
  detail: '6. Internship Details',
  form: '7. Application Form',
  applications: '8. My Applications',
  status: '9. Application Status',
  profile: '10. Student Profile',
}

const ALL_SCREENS: Screen[] = ['splash', 'login', 'home', 'search', 'filter', 'detail', 'form', 'applications', 'status', 'profile']

export default function App() {
  const [view, setView] = useState<'flow' | 'grid'>('flow')
  const [active, setActive] = useState<Screen>('splash')

  function go(s: Screen) { setActive(s) }

  function renderScreen(s: Screen) {
    switch (s) {
      case 'splash': return <SplashScreen onNext={() => go('login')} />
      case 'login': return <LoginScreen onNext={() => go('home')} />
      case 'home': return <HomeScreen onNav={n => go(n as Screen)} onCard={() => go('detail')} />
      case 'search': return <SearchScreen onNav={n => go(n as Screen)} onCard={() => go('detail')} onFilter={() => go('filter')} />
      case 'filter': return <FilterScreen onBack={() => go('search')} onApply={() => go('search')} />
      case 'detail': return <InternDetailScreen onBack={() => go('search')} onApply={() => go('form')} />
      case 'form': return <ApplicationFormScreen onBack={() => go('detail')} onSubmit={() => go('applications')} />
      case 'applications': return <MyApplicationsScreen onNav={n => go(n as Screen)} onCard={() => go('status')} />
      case 'status': return <AppStatusScreen onBack={() => go('applications')} />
      case 'profile': return <ProfileScreen onNav={n => go(n as Screen)} />
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f2f2f2', fontFamily: 'Inter, sans-serif' }}>
      {/* Top bar */}
      <div style={{ background: '#fff', borderBottom: '1.5px solid #e0e0e0', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56, position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 30, height: 30, background: '#222', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 14, height: 14, background: '#fff', borderRadius: 3 }} />
          </div>
          <div>
            <span style={{ fontWeight: 700, fontSize: 15, color: '#1a1a1a' }}>InternHub</span>
            <span style={{ fontSize: 11, color: '#aaa', marginLeft: 8, fontFamily: 'DM Mono, monospace' }}>wireframe · lo-fi</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={() => setView('flow')}
            style={{ padding: '6px 14px', border: '1.5px solid #ddd', borderRadius: 8, fontSize: 12, fontWeight: view === 'flow' ? 700 : 400, background: view === 'flow' ? '#222' : '#fff', color: view === 'flow' ? '#fff' : '#555', cursor: 'pointer', fontFamily: 'inherit' }}
          >
            Interactive Flow
          </button>
          <button
            onClick={() => setView('grid')}
            style={{ padding: '6px 14px', border: '1.5px solid #ddd', borderRadius: 8, fontSize: 12, fontWeight: view === 'grid' ? 700 : 400, background: view === 'grid' ? '#222' : '#fff', color: view === 'grid' ? '#fff' : '#555', cursor: 'pointer', fontFamily: 'inherit' }}
          >
            All Screens
          </button>
        </div>
      </div>

      {view === 'flow' ? (
        <div style={{ display: 'flex', minHeight: 'calc(100vh - 56px)' }}>
          {/* Sidebar */}
          <div style={{ width: 220, background: '#fff', borderRight: '1.5px solid #e0e0e0', padding: '20px 0', flexShrink: 0, overflowY: 'auto' as const }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#aaa', padding: '0 16px 10px', letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>Screens</div>
            {ALL_SCREENS.map(s => (
              <button
                key={s}
                onClick={() => setActive(s)}
                style={{
                  width: '100%', textAlign: 'left' as const, padding: '10px 16px', border: 'none', background: active === s ? '#f0f0f0' : 'transparent',
                  cursor: 'pointer', fontSize: 12, color: active === s ? '#1a1a1a' : '#555',
                  fontWeight: active === s ? 700 : 400, borderLeft: active === s ? '3px solid #333' : '3px solid transparent',
                  fontFamily: 'inherit',
                }}
              >
                {SCREEN_LABELS[s]}
              </button>
            ))}

            <div style={{ margin: '20px 16px 0', padding: '14px', background: '#f5f5f5', borderRadius: 12 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#555', marginBottom: 8 }}>Flow Guide</div>
              <div style={{ fontSize: 11, color: '#777', lineHeight: 1.7 }}>
                Splash → Login → Home → Search → Filter → Detail → Form → Applied → Status → Profile
              </div>
            </div>
          </div>

          {/* Screen + label */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 24px', gap: 20, overflow: 'auto' }}>
            <div style={{ fontSize: 11, color: '#aaa', fontFamily: 'DM Mono, monospace', letterSpacing: '0.05em', textTransform: 'uppercase' as const }}>
              {SCREEN_LABELS[active]}
            </div>
            <PhoneShell>{renderScreen(active)}</PhoneShell>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const, justifyContent: 'center', maxWidth: 400 }}>
              <div style={{ fontSize: 12, color: '#888', textAlign: 'center' as const }}>
                Tap interactive elements inside the phone to navigate the flow
              </div>
            </div>

            {/* Prev / Next */}
            <div style={{ display: 'flex', gap: 10 }}>
              {ALL_SCREENS.indexOf(active) > 0 && (
                <button
                  onClick={() => setActive(ALL_SCREENS[ALL_SCREENS.indexOf(active) - 1])}
                  style={{ padding: '8px 20px', border: '1.5px solid #ddd', borderRadius: 8, background: '#fff', cursor: 'pointer', fontSize: 12, color: '#555', fontFamily: 'inherit' }}
                >
                  ← Prev
                </button>
              )}
              {ALL_SCREENS.indexOf(active) < ALL_SCREENS.length - 1 && (
                <button
                  onClick={() => setActive(ALL_SCREENS[ALL_SCREENS.indexOf(active) + 1])}
                  style={{ padding: '8px 20px', border: '1.5px solid #333', borderRadius: 8, background: '#222', cursor: 'pointer', fontSize: 12, color: '#fff', fontFamily: 'inherit' }}
                >
                  Next →
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Grid view */
        <div style={{ padding: '40px 32px' }}>
          <div style={{ fontSize: 13, color: '#888', marginBottom: 28, fontFamily: 'DM Mono, monospace' }}>10 screens · lo-fi grayscale wireframe</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 40 }}>
            {ALL_SCREENS.map(s => (
              <div key={s} style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
                <div
                  onClick={() => { setActive(s); setView('flow') }}
                  style={{ cursor: 'pointer', transition: 'transform 0.15s', }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-4px)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
                >
                  <PhoneShell>{renderScreen(s)}</PhoneShell>
                </div>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#555', fontFamily: 'DM Mono, monospace' }}>{SCREEN_LABELS[s]}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
