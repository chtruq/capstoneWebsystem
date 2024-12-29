import React from 'react';
import { getUserInforFromCookie } from '@/app/actions/auth';
import { getApartmentOwners } from '@/app/actions/apartmentOwer';
import ConsignmentCreate from '@/components/consignment/create/ConsignmentCreate';

const CreateConsignment = async () => {
  const userInfor = await getUserInforFromCookie();
  console.log("User Info:", userInfor);
  console.log("User ID", userInfor?.id);

  const apartmentOwners = await getApartmentOwners();
  console.log("Apartment Owners", apartmentOwners);

  return (
    <div>
      <h1 className="font-semibold text-2xl">Tạo mới hợp đồng</h1>

      <ConsignmentCreate
        apartmentOwners={apartmentOwners}
        assignAccountId={userInfor?.id}
      />
    </div>
  );
}

export default CreateConsignment;