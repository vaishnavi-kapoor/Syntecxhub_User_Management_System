import { useState } from 'react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

const parseResponse = async (res) => {
  if (res.status === 204) return null;
  return res.json();
};

export default function App() {
  const [authToken, setAuthToken] = useState('');
  const [currentUserId, setCurrentUserId] = useState('');
  const [output, setOutput] = useState('');

  const [registerForm, setRegisterForm] = useState({ name: '', email: '', password: '' });
  const [signinForm, setSigninForm] = useState({ email: '', password: '' });
  const [updateForm, setUpdateForm] = useState({ name: '', email: '' });

  const log = (title, data) => {
    setOutput(`${title}\n${JSON.stringify(data, null, 2)}`);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registerForm),
    });

    const data = await parseResponse(res);
    log('Register response', { status: res.status, data });
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_BASE}/auth/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(signinForm),
    });

    const data = await parseResponse(res);
    if (res.ok) {
      setAuthToken(data.token);
      setCurrentUserId(data.user.id);
    }

    log('Sign in response', { status: res.status, data });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!authToken || !currentUserId) {
      log('Update response', { error: 'Sign in first' });
      return;
    }

    const res = await fetch(`${API_BASE}/users/${currentUserId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(updateForm),
    });

    const data = await parseResponse(res);
    log('Update response', { status: res.status, data });
  };

  const handleDelete = async () => {
    if (!authToken || !currentUserId) {
      log('Delete response', { error: 'Sign in first' });
      return;
    }

    const res = await fetch(`${API_BASE}/users/${currentUserId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    const data = await parseResponse(res);
    if (res.status === 204) {
      setAuthToken('');
      setCurrentUserId('');
    }

    log('Delete response', { status: res.status, data });
  };

  return (
    <main className="container">
      <h1>Authentication Demo</h1>
      <p>Register, sign in, update your profile, and delete account.</p>

      <section className="card">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Name"
            required
            value={registerForm.name}
            onChange={(e) => setRegisterForm((prev) => ({ ...prev, name: e.target.value }))}
          />
          <input
            type="email"
            placeholder="Email"
            required
            value={registerForm.email}
            onChange={(e) => setRegisterForm((prev) => ({ ...prev, email: e.target.value }))}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={registerForm.password}
            onChange={(e) => setRegisterForm((prev) => ({ ...prev, password: e.target.value }))}
          />
          <button type="submit">Register</button>
        </form>
      </section>

      <section className="card">
        <h2>Sign In</h2>
        <form onSubmit={handleSignin}>
          <input
            type="email"
            placeholder="Email"
            required
            value={signinForm.email}
            onChange={(e) => setSigninForm((prev) => ({ ...prev, email: e.target.value }))}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={signinForm.password}
            onChange={(e) => setSigninForm((prev) => ({ ...prev, password: e.target.value }))}
          />
          <button type="submit">Sign In</button>
        </form>
      </section>

      <section className="card">
        <h2>Profile Actions</h2>
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            placeholder="New Name"
            value={updateForm.name}
            onChange={(e) => setUpdateForm((prev) => ({ ...prev, name: e.target.value }))}
          />
          <input
            type="email"
            placeholder="New Email"
            value={updateForm.email}
            onChange={(e) => setUpdateForm((prev) => ({ ...prev, email: e.target.value }))}
          />
          <button type="submit">Update Profile</button>
        </form>
        <button className="danger" onClick={handleDelete} type="button">
          Delete Account
        </button>
      </section>

      <pre id="output">{output}</pre>
    </main>
  );
}
