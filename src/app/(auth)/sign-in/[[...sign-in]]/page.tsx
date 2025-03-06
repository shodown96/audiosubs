import { PATHS } from '@/lib/constants'
import { SignIn } from '@clerk/nextjs'

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  return (
    <div className='flex justify-center items-center h-screen bg-primary'>
      <SignIn fallbackRedirectUrl={searchParams.nextURL || PATHS.DASHBOARD} />
    </div>
  )
}