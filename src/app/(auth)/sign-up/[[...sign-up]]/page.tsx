import { PATHS } from '@/lib/constants'
import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className='flex justify-center items-center h-screen bg-primary'>
      <SignUp fallbackRedirectUrl={PATHS.DASHBOARD} />
    </div>
  )
}