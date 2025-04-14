import React from "react";
import { Box, Modal } from "@mui/material";
interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;

  setRoute?: (route: string) => void;
  component: any;
}
const CustomModal: React.FC<Props> = ({
  open,
  setOpen,
  component: Component,
  setRoute,
}) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="absolute top-[50%] left-[50%] w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none -translate-y-1/2 -translate-x-1/2">
          <Component setOpen={setOpen} setRoute={setRoute} />
        </Box>
      </Modal>
    </div>
  );
};

export default CustomModal;
