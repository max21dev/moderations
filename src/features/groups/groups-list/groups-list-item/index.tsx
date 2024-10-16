import { ArrowRightIcon, EyeClosedIcon, EyeIcon, LockIcon, LockOpenIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/components/ui/tooltip';

import { Group } from '@/shared/types';
import { loader } from '@/shared/utils';

export const GroupsListItem = ({ group }: { group: Group }) => {
  return (
    <Card className="transition-colors duration-300 hover:border-purple-600">
      <CardContent className="mt-4 flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="w-16 h-16 bg-secondary rounded-md overflow-hidden">
            {group.picture && (
              <img
                src={loader(group.picture, { w: 64, h: 64 })}
                alt={group.name}
                className="w-full h-full"
              />
            )}
          </div>

          <div className="flex flex-col justify-center gap-2">
            <div className="text-xl font-semibold leading-none flex gap-4 items-center">
              {group.name}

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    {group.privacy == 'private' ? (
                      <EyeClosedIcon className="w-4 h-4" />
                    ) : (
                      <EyeIcon className="w-4 h-4" />
                    )}
                  </TooltipTrigger>
                  <TooltipContent>
                    {group.privacy == 'private' ? 'This group is private' : 'This group is public'}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    {group.type == 'closed' ? (
                      <LockIcon className="w-4 h-4" />
                    ) : (
                      <LockOpenIcon className="w-4 h-4" />
                    )}
                  </TooltipTrigger>
                  <TooltipContent>
                    {group.type == 'closed' ? 'This group is closed' : 'This group is open'}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {group.about && <div className="text-sm text-muted-foreground">{group.about}</div>}
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
                <DialogDescription>This is the raw information of the group.</DialogDescription>
              </DialogHeader>

              <div className="overflow-auto">
                <pre className="text-xs">{JSON.stringify(group.event.rawEvent(), null, 2)}</pre>
              </div>
            </DialogContent>
          </Dialog>

          <Link to={`${location.pathname}/${encodeURIComponent(group.id)}`}>
            <Button size="sm">
              <ArrowRightIcon size={16} />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
