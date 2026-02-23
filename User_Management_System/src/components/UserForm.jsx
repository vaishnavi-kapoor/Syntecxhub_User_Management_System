import { useState, useEffect, useRef } from 'react'

export default function UserForm({ initial = {}, onSubmit, submitLabel = 'Save' }) {
  const [form, setForm] = useState({
    name: '', email: '', mobile: '', image: null, password: '', ...initial,
  })
  const [preview, setPreview] = useState(null)
  const [focused, setFocused] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const fileRef = useRef()

  useEffect(() => setForm(f => ({ ...f, ...initial })), [initial])

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    if (type === 'file') {
      const file = e.target.files[0]
      setForm(prev => ({ ...prev, [name]: file }))
      if (file) setPreview(URL.createObjectURL(file))
    } else {
      setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? (checked ? 1 : 0) : value }))
    }
  }

  function submit(e) {
    e.preventDefault()
    setSubmitted(true)
    const formData = new FormData()
    formData.append('name', form.name)
    formData.append('email', form.email)
    formData.append('mobile', form.mobile)
    formData.append('password', form.password)
    if (form.image) formData.append('image', form.image)
    onSubmit(formData)
    setTimeout(() => setSubmitted(false), 2000)
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .uf-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0a0a0f;
          padding: 2rem;
          font-family: 'DM Sans', sans-serif;
          position: relative;
          overflow: hidden;
        }

        .uf-root::before {
          content: '';
          position: fixed;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%);
          top: -200px;
          right: -100px;
          pointer-events: none;
        }

        .uf-root::after {
          content: '';
          position: fixed;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(236,72,153,0.10) 0%, transparent 70%);
          bottom: -100px;
          left: -100px;
          pointer-events: none;
        }

        .uf-card {
          width: 100%;
          max-width: 900px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px;
          padding: 1rem;
          backdrop-filter: blur(20px);
          position: relative;
          animation: slideUp 0.5s cubic-bezier(0.16,1,0.3,1);
        }

        @media (max-width: 600px) {
          .uf-card { padding: 1.75rem; }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .uf-header {
          margin-bottom: 1rem;
        }

        .uf-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.75rem;
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.03em;
          line-height: 1.1;
        }

        .uf-title span {
          background: linear-gradient(135deg, #818cf8, #e879f9);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .uf-subtitle {
          margin-top: 0.4rem;
          font-size: 0.875rem;
          color: rgba(255,255,255,0.35);
          font-weight: 300;
        }

        /* Avatar upload */
        .uf-avatar-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.75rem;
          grid-column: 1 / -1;
        }

        .uf-avatar {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: rgba(129,140,248,0.12);
          border: 2px dashed rgba(129,140,248,0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          overflow: hidden;
          transition: border-color 0.2s, background 0.2s;
          flex-shrink: 0;
        }

        .uf-avatar:hover {
          border-color: rgba(129,140,248,0.7);
          background: rgba(129,140,248,0.18);
        }

        .uf-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .uf-avatar-icon {
          font-size: 1.5rem;
          opacity: 0.5;
        }

        .uf-avatar-label {
          font-size: 0.8rem;
          color: rgba(255,255,255,0.45);
          line-height: 1.5;
        }

        .uf-avatar-label strong {
          display: block;
          color: rgba(255,255,255,0.7);
          font-size: 0.875rem;
          font-weight: 500;
        }

        /* Fields */
        .uf-grid {
          display: grid;
          gap: 1rem;
          grid-template-columns: 1fr 1fr;
        }

        .uf-field.full {
          grid-column: 1 / -1;
        }

        @media (max-width: 600px) {
          .uf-grid { grid-template-columns: 1fr; }
          .uf-field.full { grid-column: 1; }
        }

        .uf-field {
          position: relative;
        }

        .uf-label {
          display: block;
          font-size: 0.75rem;
          font-weight: 500;
          color: rgba(255,255,255,0.4);
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 0.5rem;
          transition: color 0.2s;
        }

        .uf-field.is-focused .uf-label {
          color: #818cf8;
        }

        .uf-input-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }

        .uf-icon {
          position: absolute;
          left: 0.875rem;
          color: rgba(255,255,255,0.25);
          font-size: 1rem;
          pointer-events: none;
          transition: color 0.2s;
          line-height: 1;
        }

        .uf-field.is-focused .uf-icon {
          color: #818cf8;
        }

        .uf-input {
          width: 100%;
          background: rgba(255,255,255,0.05);
          border: 1.5px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9375rem;
          font-weight: 400;
          padding: 0.75rem 0.875rem 0.75rem 2.75rem;
          outline: none;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
          -webkit-appearance: none;
        }

        .uf-input::placeholder {
          color: rgba(255,255,255,0.18);
        }

        .uf-input:focus {
          border-color: rgba(129,140,248,0.6);
          background: rgba(129,140,248,0.06);
          box-shadow: 0 0 0 3px rgba(129,140,248,0.12);
        }

        .uf-input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 40px #16162a inset;
          -webkit-text-fill-color: #fff;
        }

        /* Divider */
        .uf-divider {
          height: 1px;
          background: rgba(255,255,255,0.06);
          margin: 0.25rem 0;
          grid-column: 1 / -1;
        }

        /* Submit */
        .uf-submit-wrap {
          grid-column: 1 / -1;
          margin-top: 0.5rem;
        }

        /* Submit */
        .uf-submit {
          width: 100%;
          padding: 0.875rem 1.5rem;
          border: none;
          border-radius: 12px;
          background: linear-gradient(135deg, #6366f1, #a855f7);
          color: #fff;
          font-family: 'Syne', sans-serif;
          font-size: 0.9375rem;
          font-weight: 700;
          letter-spacing: 0.02em;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 4px 24px rgba(99,102,241,0.35);
        }

        .uf-submit::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.1), transparent);
          opacity: 0;
          transition: opacity 0.2s;
        }

        .uf-submit:hover { opacity: 0.92; transform: translateY(-1px); box-shadow: 0 6px 28px rgba(99,102,241,0.5); }
        .uf-submit:hover::before { opacity: 1; }
        .uf-submit:active { transform: translateY(0); }

        .uf-submit.is-done {
          background: linear-gradient(135deg, #10b981, #059669);
          box-shadow: 0 4px 24px rgba(16,185,129,0.35);
        }

        .uf-submit-inner {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
      `}</style>

      <div className="uf-root">
        <div className="uf-card">
          <div className="uf-header">
            <h1 className="uf-title">Your <span>Profile</span></h1>
            <p className="uf-subtitle">Fill in your details to get started</p>
          </div>

          {/* Avatar */}
          <div className="uf-avatar-row">
            <div className="uf-avatar" onClick={() => fileRef.current.click()}>
              {preview
                ? <img src={preview} alt="preview" />
                : <span className="uf-avatar-icon">📷</span>
              }
            </div>
            <div className="uf-avatar-label">
              <strong>Profile Photo</strong>
              Click to upload · PNG or JPG
            </div>
            <input
              ref={fileRef}
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              style={{ display: 'none' }}
            />
          </div>

          <form onSubmit={submit}>
            <div className="uf-grid">

              <Field label="Full Name" icon="👤" focused={focused === 'name'}>
                <input
                  className="uf-input"
                  name="name"
                  type="text"
                  placeholder="Jane Doe"
                  value={form.name}
                  onChange={handleChange}
                  onFocus={() => setFocused('name')}
                  onBlur={() => setFocused(null)}
                />
              </Field>

              <Field label="Mobile Number" icon="📱" focused={focused === 'mobile'}>
                <input
                  className="uf-input"
                  name="mobile"
                  type="tel"
                  placeholder="+1 555 000 0000"
                  value={form.mobile}
                  onChange={handleChange}
                  onFocus={() => setFocused('mobile')}
                  onBlur={() => setFocused(null)}
                />
              </Field>

              <Field label="Email Address" icon="✉️" focused={focused === 'email'} full>
                <input
                  className="uf-input"
                  name="email"
                  type="email"
                  placeholder="jane@example.com"
                  value={form.email}
                  onChange={handleChange}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)}
                />
              </Field>

              <div className="uf-divider full" />

              <Field label="Password" icon="🔒" focused={focused === 'password'} full>
                <input
                  className="uf-input"
                  name="password"
                  type="password"
                  placeholder="Min. 8 characters"
                  value={form.password}
                  onChange={handleChange}
                  onFocus={() => setFocused('password')}
                  onBlur={() => setFocused(null)}
                />
              </Field>

              <div className="uf-submit-wrap">
                <button
                  type="submit"
                  className={`uf-submit${submitted ? ' is-done' : ''}`}
                >
                  <span className="uf-submit-inner">
                    {submitted ? '✓ Saved!' : submitLabel}
                  </span>
                </button>
              </div>

            </div>
          </form>
        </div>
      </div>
    </>
  )
}

function Field({ label, icon, focused, full, children }) {
  return (
    <div className={`uf-field${focused ? ' is-focused' : ''}${full ? ' full' : ''}`}>
      <label className="uf-label">{label}</label>
      <div className="uf-input-wrap">
        <span className="uf-icon">{icon}</span>
        {children}
      </div>
    </div>
  )
}