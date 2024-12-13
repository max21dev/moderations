import { ChevronDownIcon } from 'lucide-react';
import { useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar';
import { Button } from '@/shared/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/components/ui/tooltip';

import { cn, ellipsis, loader } from '@/shared/utils';

import { useUserInfoRow } from './hooks';
import { UserInfoRowShortcuts } from './user-info-row-shortcuts';

export function UserInfoRow({
  relay,
  groupId,
  pubkey,
  children,
  openByDefault,
}: {
  relay: string | undefined;
  groupId: string | undefined;
  pubkey: string;
  children?: React.ReactNode;
  openByDefault?: boolean;
}) {
  const { name, image, npub, nip05 } = useUserInfoRow({ pubkey });

  const [isDetailsOpen, setIsDetailsOpen] = useState(openByDefault || false);

  return (
    <div className="group p-2 w-full rounded-lg border border-transparent hover:border-border transition-colors duration-500 ease-out">
      <div className="flex items-center gap-2 w-full">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <a href={`https://njump.me/${npub}`} target="_blank" rel="noreferrer">
                <Avatar asChild className="flex justify-center items-center">
                  {!image ? (
                    <AvatarFallback>{pubkey.slice(0, 2).toUpperCase()}</AvatarFallback>
                  ) : (
                    <AvatarImage
                      src={loader(image, { w: 32, h: 32 })}
                      className="w-8 h-8"
                      alt={name}
                    />
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
          <span className="text-xs">{name}</span>
          <span className="text-xs text-muted-foreground font-light">
            {nip05 || ellipsis(npub, 10)}
          </span>
        </a>

        <UserInfoRowShortcuts relay={relay} groupId={groupId} pubkey={pubkey} />

        {children && (
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => setIsDetailsOpen((prev) => !prev)}
          >
            <ChevronDownIcon
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
