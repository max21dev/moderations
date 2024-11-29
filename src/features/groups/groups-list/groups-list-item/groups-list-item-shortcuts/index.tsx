import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Nip29GroupId, Nip29Relay } from 'nostr-hooks/nip29';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';

import { useGroupModeration } from '@/shared/hooks';

export const GroupsListItemShortcuts = ({
  relay,
  groupId,
}: {
  relay: Nip29Relay;
  groupId: Nip29GroupId;
}) => {
  const { handleDeleteGroup } = useGroupModeration(relay, groupId);

  const navigate = useNavigate();

  if (!groupId) return null;

  return (
    <>
      <Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="ghost">
              <DotsHorizontalIcon className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => navigate(`${location.pathname}/${groupId}/group-admins`)}
            >
              Admins
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigate(`${location.pathname}/${groupId}/group-members`)}
            >
              Members
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigate(`${location.pathname}/${groupId}/group-chats`)}
            >
              Chats
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigate(`${location.pathname}/${groupId}/group-threads`)}
            >
              Threads
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigate(`${location.pathname}/${groupId}/group-joint-requests`)}
            >
              Join Requests
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigate(`${location.pathname}/${groupId}/group-leave-requests`)}
            >
              Leave Requests
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() => navigate(`${location.pathname}/${groupId}/edit-group`)}
            >
              Edit Group
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <DialogTrigger className="text-destructive">Delete Group</DialogTrigger>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your group.
            </DialogDescription>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button variant="destructive" onClick={handleDeleteGroup}>
                Delete Group
              </Button>
            </DialogFooter>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
