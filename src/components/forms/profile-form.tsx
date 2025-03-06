"use client"
import { updateAccount } from '@/actions/account/update-account';
import { MESSAGES, PLACEHOLDERS } from '@/lib/constants';
import { formatDate } from '@/lib/utils';
import { UpdateAccountParamsSchema, UpdateAccountParamsType } from '@/lib/validations';
import { useUser } from '@clerk/nextjs';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

function ProfileForm() {
  const { user } = useUser()
  const router = useRouter()
  const formik = useFormik<UpdateAccountParamsType>({
    initialValues: {
      firstName: "",
      lastName: "",
    },
    onSubmit: async ({ firstName, lastName }) => {
      const result = await updateAccount({
        firstName, lastName
      });
      if (result.id) {
        toast.success(MESSAGES.Success);
        router.refresh()
      }
    },
    validateOnBlur: true,
    validationSchema: UpdateAccountParamsSchema,
  });
  useEffect(() => {
    if (user) {
      formik.setValues({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
      })
    }
  }, [user])
  return (
    <div>
      <div className="text-xl my-4">Profile</div>
      <form className='flex flex-col gap-4 max-w-96' onSubmit={formik.handleSubmit}>
        <Input
          id="email"
          label="Email"
          disabled
          value={user?.primaryEmailAddress?.emailAddress}
        />
        <Input
          id="firstName"
          label="First Name"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.firstName}
          error={formik.errors.firstName}
          touched={formik.touched.firstName}
          placeholder={PLACEHOLDERS.FIRST_NAME}
        />
        <Input
          id="lastName"
          label="Last Name"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.lastName}
          error={formik.errors.lastName}
          touched={formik.touched.lastName}
          placeholder={PLACEHOLDERS.FIRST_NAME}
        />
        <Input
          id="date"
          label="Date Joined"
          disabled
          value={formatDate(user?.createdAt || "")}
        />
        <Button
          type="submit"
          size={"lg"}
          loading={formik.isSubmitting}
          disabled={!formik.isValid}>
          Update name
        </Button>
      </form>
    </div>
  )
}

export default ProfileForm