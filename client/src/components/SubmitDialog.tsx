import { ReactNode, FC } from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

interface SubmitFormDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const SubmitFormDialog: FC<SubmitFormDialogProps> = ({
  open,
  onClose,
  title,
  children,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>{title}</span>
        <IconButton edge="end" onClick={onClose}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default SubmitFormDialog;