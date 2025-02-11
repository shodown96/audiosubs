import { PATHS } from '@/lib/constants'
import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className='flex justify-center items-center h-screen bg-primary'>
      <SignIn fallbackRedirectUrl={PATHS.DASHBOARD} />
    </div>
  )
}