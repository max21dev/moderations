import { ChevronUpIcon } from 'lucide-react';
import { useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar';
import { Button } from '@/shared/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/components/ui/tooltip';

import { cn, ellipsis } from '@/shared/utils';

import { useUserInfoRow } from './hooks';

export function UserInfoRow({ pubkey, children }: { pubkey: string; children?: React.ReactNode }) {
  const { name, image, npub } = useUserInfoRow({ pubkey });

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  return (
    <div className="group p-2 w-full rounded-lg border border-transparent hover:border-border transition-colors duration-500 ease-out">
      <div className="flex items-center gap-4 w-full">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <a href={`https://njump.me/${npub}`} target="_blank" rel="noreferrer">
                <Avatar asChild className="flex justify-center items-center">
                  {!image ? (
                    <AvatarFallback>{pubkey.slice(0, 2).toUpperCase()}</AvatarFallback>
                  ) : (
                    <AvatarImage src={image} alt={name} />
                  )}
                </Avatar>
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p>{name}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <a
          className="flex flex-col group-hover:underline"
          href={`https://njump.me/${npub}`}
          target="_blank"
          rel="noreferrer"
        >
          <span className="text-sm">{name}</span>
          <span className="text-sm text-gray-500">{ellipsis(npub, 10)}</span>
        </a>

        {children && (
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto rounded-full"
            onClick={() => setIsDetailsOpen((prev) => !prev)}
          >
            <ChevronUpIcon
              size={16}
              className={cn(
                'transition-all duration-500 ease-out text-background group-hover:text-muted-foreground',
                isDetailsOpen && 'transform rotate-180',
              )}
            />
          </Button>
        )}
      </div>

      {children && <div className={cn('mt-2', isDetailsOpen ? 'block' : 'hidden')}>{children}</div>}
    </div>
  );
}
