import React from "react";
import EditCourse from "../../../../components/EditCourse/EditCourse";

const page = async ({ params }: any) => {
  const id = await params?.id;
  return (
    <div>
      <EditCourse id={id} />
    </div>
  );
};

export default page;
