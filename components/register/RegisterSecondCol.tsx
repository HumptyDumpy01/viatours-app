// 'use client';

/*type RegisterSecondColType = {
  // children: ReactNode;
}*/

import RegisterHeading from '@/components/register/RegisterHeading';
import RegisterForm from '@/components/register/RegisterForm';

export default function RegisterSecondCol(/*{  }: RegisterSecondColType*/) {
  return (
    <>
      <div className="register__second-col">
        <RegisterHeading />
        <RegisterForm />
      </div>
    </>
  );
}
