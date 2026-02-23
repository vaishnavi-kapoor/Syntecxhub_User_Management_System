const API_BASE = '';

export async function getUsers() {
  const res = await fetch(`${API_BASE}/api/users`);
  return res.json();
}

export async function registerUser(user) {
  // If `user` is FormData (contains file), send without JSON header
  const isFormData = (typeof FormData !== 'undefined' && user instanceof FormData) || (user && user.constructor && user.constructor.name === 'FormData')
  const res = await fetch(`${API_BASE}/api/users`, {
    method: 'POST',
    headers: isFormData ? {} : { 'Content-Type': 'application/json' },
    body: isFormData ? user : JSON.stringify(user),
  })
  return res.json();
}

export async function updateUser(id, user) {
  const res = await fetch(`${API_BASE}/api/users/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  return res.json();
}

export async function deleteUser(id) {
  const res = await fetch(`${API_BASE}/api/users/${id}`, {
    method: 'DELETE',
  });
  return res.json();
}
