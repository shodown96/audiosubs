import ChangePasswordForm from '@/components/forms/change-password'
import ProfileForm from '@/components/forms/profile-form'

function ProfilePage() {
    return (
        <div className='grid grid-cols-12'>
            <div className="xl:col-span-6 col-span-12">
                <ProfileForm />
            </div>
            <div className="xl:col-span-6 col-span-12">
                <ChangePasswordForm />
            </div>
        </div>
    )
}

export default ProfilePage