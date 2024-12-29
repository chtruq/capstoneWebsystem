import ApartmentCreateForOwner from '@/components/apartment/apartmentCreate/ApartmentCreateForOwner';
import React from 'react';

const CreateApartmentForOwner = async ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <h1 className="font-semibold text-2xl">Tạo mới căn hộ</h1>

      <ApartmentCreateForOwner PropertyVerificationID={params.id} />
    </div>
  );
}

export default CreateApartmentForOwner;