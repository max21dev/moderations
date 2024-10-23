import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/components/ui/tooltip';

import { ellipsis } from '@/shared/utils';

import { useUserInfoRow } from './hooks';

export function UserInfoRow({ pubkey }: { pubkey: string }) {
  const { name, image, npub } = useUserInfoRow({ pubkey });

  return (
    <a
      className="flex items-center gap-4 p-2 group"
      href={`https://njump.me/${npub}`}
      target="_blank"
      rel="noreferrer"
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Avatar className="flex justify-center items-center">
              {!image ? (
                <AvatarFallback>{pubkey.slice(0, 2).toUpperCase()}</AvatarFallback>
              ) : (
                <AvatarImage src={image} alt={name} />
              )}
            </Avatar>
          </TooltipTrigger>
          <TooltipContent>
            <p>{name}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div className="flex flex-col group-hover:underline">
        <span className="text-sm">{name}</span>
        <span className="text-sm text-gray-500">{ellipsis(npub, 10)}</span>
      </div>
    </a>
  );
}
