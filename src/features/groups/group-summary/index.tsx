import { EyeClosedIcon, EyeIcon, LockIcon, LockOpenIcon } from 'lucide-react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/components/ui/tooltip';

import { GroupMetadata } from '@/shared/types';
import { ellipsis, loader } from '@/shared/utils';

export const GroupSummary = ({ metadata }: { metadata: GroupMetadata | undefined }) => {
  if (!metadata) return null;

  const { name, picture, about, isOpen, isPublic } = metadata;

  return (
    <div className="flex gap-4">
      <div className="w-16 h-16 bg-secondary rounded-md overflow-hidden shrink-0">
        {picture && (
          <img src={loader(picture, { w: 64, h: 64 })} alt={name} className="w-full h-full" />
        )}
      </div>

      <div className="flex flex-col justify-center gap-2">
        <div className="text-xl font-semibold leading-none flex gap-4 items-center">
          {ellipsis(name, 50)}

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                {isPublic ? <EyeIcon className="w-4 h-4" /> : <EyeClosedIcon className="w-4 h-4" />}
              </TooltipTrigger>
              <TooltipContent>
                {isPublic ? 'This group is public' : 'This group is private'}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                {isOpen ? <LockOpenIcon className="w-4 h-4" /> : <LockIcon className="w-4 h-4" />}
              </TooltipTrigger>
              <TooltipContent>
                {isOpen ? 'This group is open' : 'This group is closed'}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {about && (
          <div className="[overflow-wrap:anywhere] text-xs font-light text-muted-foreground">
            {ellipsis(about, 200)}
          </div>
        )}
      </div>
    </div>
  );
};
