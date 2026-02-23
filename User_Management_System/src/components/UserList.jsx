import { useEffect, useState } from 'react'
import { getUsers, deleteUser } from '../services/userService'

export default function UserList({ onEdit }) {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  async function load() {
    setLoading(true)
    try {
      const data = await getUsers()
      setUsers(data || [])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  async function handleDelete(id) {
    if (!confirm('Delete user?')) return
    await deleteUser(id)
    load()
  }

  if (loading) return <div>Loading users...</div>

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Admin</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id || u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.mobile}</td>
              <td>{u.is_admin ? 'Yes' : 'No'}</td>
              <td>
                <button onClick={() => onEdit && onEdit(u)}>Edit</button>
                <button onClick={() => handleDelete(u._id || u.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
