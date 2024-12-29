import React from 'react';
import { getUserInforFromCookie } from '@/app/actions/auth';
import ApartmentCreate from '@/components/apartment/apartmentCreate/ApartmentCreate';


const CreateApartment = async ({ params }: { params: { id: string } }) => {
  const userInfor = await getUserInforFromCookie();
  console.log("User Info:", userInfor);
  console.log("User ID", userInfor?.id);

  return (
    <div>
      <h1 className="font-semibold text-2xl">Tạo mới căn hộ</h1>

      <div>
        <h1>params id {params.id}</h1>
        <h1>User id: {userInfor?.id}</h1>
        <h1>User role: {userInfor?.role}</h1>
      </div>
      <ApartmentCreate projectId={params.id} staffId={userInfor?.id} />
    </div>
  );
}

export default CreateApartment;