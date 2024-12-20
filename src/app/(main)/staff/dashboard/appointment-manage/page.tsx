import React from 'react'
import { getUserInfoFromCookies, getUserInforFromCookie } from "@/app/actions/auth";

async function AppointmentManage() {
  const userToken = await getUserInfoFromCookies();
  console.log("User Tolken", userToken);

  const userToken2 = await getUserInforFromCookie();
  console.log("User Tolkenaa", userToken2);


  return (
    <div>AppointmentManage</div>
  )
}

export default AppointmentManage