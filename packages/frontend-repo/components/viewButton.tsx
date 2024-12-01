"use client";

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

interface ViewButtonProps {
  id: string;
}

const ViewButton: React.FC<ViewButtonProps> = ({ id }) => {
  const router = useRouter();

  const handleButtonClick = async () => {
    router.push(`/${id}`);
  };

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() => handleButtonClick()}
    >
      View
    </Button>
  );
};

export default ViewButton;
