import { Link } from 'react-router-dom'
import { SignupForm } from 'wasp/client/auth'
import { Button } from '../components/ui/button'

export const SignupPage = () => {
  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <SignupForm />
      <br />
      <span>
        I already have an account (<Link to="/login">go to login</Link>).
      </span>
      <Button size={'lg'}>Logout</Button>
    </div>
  )
}