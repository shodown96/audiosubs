"use client";

import { changePassword } from '@/actions/account/change-password';
import { MESSAGES, PLACEHOLDERS } from '@/lib/constants';
import { ChangePasswordParamsSchema, ChangePasswordParamsType } from '@/lib/validations';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

function ChangePasswordForm() {
  const handleRemoteSubmit = async (values: ChangePasswordParamsType) => {
    try {
      const result = await changePassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword
      })
      if (result.userId) {
        toast.success(MESSAGES.Success);
      }
    } catch (error) {
      console.log(error)
      // if (isAxiosError(error)) {
      //   toast.error(error.response?.data.message);
      // }
    }
  };
  const formik = useFormik<ChangePasswordParamsType>({
    initialValues: {
      currentPassword: "",
      confirmPassword: "",
      newPassword: "",
    },
    onSubmit: handleRemoteSubmit,
    validateOnBlur: true,
    validationSchema: ChangePasswordParamsSchema,
  });

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    values,
    isSubmitting,
  } = formik;
  return (
    <div>
      <div className="text-xl my-4">Change Password</div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-96">
        <Input
          type="password"
          id="currentPassword"
          label="Current password"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.currentPassword}
          error={errors.currentPassword}
          touched={touched.currentPassword}
          placeholder={PLACEHOLDERS.PASSWORD}
        />
        <Input
          type="password"
          id="newPassword"
          label="New password"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.newPassword}
          error={errors.newPassword}
          touched={touched.newPassword}
          placeholder={PLACEHOLDERS.NEW_PASSWORD}
        />
        <Input
          type="password"
          id="confirmPassword"
          label="Confirm Password"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.confirmPassword}
          error={errors.confirmPassword}
          touched={touched.confirmPassword}
          placeholder={PLACEHOLDERS.NEW_PASSWORD}
        />
        <Button type="submit" size={"lg"} loading={isSubmitting} disabled={!formik.isValid}>
          Change Password
        </Button>
      </form>
    </div>
  )
}

export default ChangePasswordForm