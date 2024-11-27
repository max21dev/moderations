import { ArrowRightIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

import { CardContainer } from '@/shared/components/card-container';
import { Button } from '@/shared/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui/dialog';

import { useRelayInformation } from '@/shared/hooks';
import { loader } from '@/shared/utils';

export const RelaysListItem = ({ relay }: { relay: string }) => {
  const { info } = useRelayInformation(relay);

  if (!info) {
    return null;
  }

  return (
    <CardContainer>
      <div className="flex gap-4">
        <div className="w-16 h-16 bg-secondary rounded-md overflow-hidden">
          {info.icon && (
            <img
              src={loader(info.icon, { w: 64, h: 64 })}
              alt={info.name}
              className="w-full h-full"
            />
          )}
        </div>

        <div className="flex flex-col justify-between">
          <div className="text-xl font-semibold leading-none">{info.name}</div>

          <div className="text-sm text-muted-foreground">{info.description}</div>

          <div className="text-sm">{relay}</div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline">
              View Raw Information
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-screen-md">
            <DialogHeader>
              <DialogTitle>Raw Information</DialogTitle>
              <DialogDescription>This is the raw information of the relay.</DialogDescription>
            </DialogHeader>

            <div className="overflow-auto">
              <pre className="text-xs">{JSON.stringify(info, null, 2)}</pre>
            </div>
          </DialogContent>
        </Dialog>

        <Link to={`${location.pathname}/${encodeURIComponent(relay)}/groups`}>
          <Button size="sm">
            View Groups <ArrowRightIcon size={16} className="ml-2" />
          </Button>
        </Link>
      </div>
    </CardContainer>
  );
};
