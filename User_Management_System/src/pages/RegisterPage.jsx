import UserForm from '../components/UserForm'
import { registerUser } from '../services/userService'

export default function RegisterPage() {
  async function handleSubmit(data) {
    try {
      await registerUser(data)
      alert('Registered successfully')
      window.location.href = '/'
    } catch (e) {
      console.error(e)
      alert('Registration failed')
    }
  }

  return (
    <>
      <UserForm onSubmit={handleSubmit} submitLabel="Register" />
    </>
  )
}
