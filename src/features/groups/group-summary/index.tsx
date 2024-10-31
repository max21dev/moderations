import { EyeClosedIcon, EyeIcon, LockIcon, LockOpenIcon } from 'lucide-react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/components/ui/tooltip';

import { Group } from '@/shared/types';
import { ellipsis, loader } from '@/shared/utils';

export const GroupSummary = ({ group }: { group: Group }) => {
  return (
    <div className="flex gap-4">
      <div className="w-16 h-16 bg-secondary rounded-md overflow-hidden shrink-0">
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
          {ellipsis(group.name, 50)}

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

        {group.about && (
          <div className="[overflow-wrap:anywhere] text-xs font-light text-muted-foreground">
            {ellipsis(group.about, 200)}
          </div>
        )}
      </div>
    </div>
  );
};
