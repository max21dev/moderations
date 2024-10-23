import { CopyIcon } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui/dialog';

type InformationDialogProps = {
  buttonLabel: string;
  title: string;
  description: string;
  content: string;
};

export const InformationDialog = ({
  buttonLabel,
  content,
  description,
  title,
}: InformationDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          {buttonLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-screen-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="relative group overflow-auto min-h-6">
          <pre className="text-xs">{content}</pre>

          <div
            className="absolute top-0 right-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 hover:cursor-pointer"
            onClick={() => navigator.clipboard.writeText(content)}
          >
            <CopyIcon size={16} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
