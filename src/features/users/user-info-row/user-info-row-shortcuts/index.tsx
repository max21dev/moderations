import { PersonStandingIcon, WrenchIcon, XIcon } from 'lucide-react';
import {
  Nip29GroupId,
  Nip29Relay,
  putGroupUser,
  removeGroupUser,
  useGroupAdmins,
  useGroupRoles,
} from 'nostr-hooks/nip29';

import { Button } from '@/shared/components/ui/button';
import { Checkbox } from '@/shared/components/ui/checkbox';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { useEffect, useState } from 'react';

export const UserInfoRowShortcuts = ({
  relay,
  groupId,
  pubkey,
}: {
  relay: Nip29Relay;
  groupId: Nip29GroupId;
  pubkey: string;
}) => {
  const { roles: groupRoles } = useGroupRoles(relay, groupId);

  const { admins } = useGroupAdmins(relay, groupId);

  const [selectedRoles, setSelectedRoles] = useState<string[] | undefined>(undefined);
  const [isEditRolesDialogOpen, setIsEditRolesDialogOpen] = useState(false);
  const [isRemoveUserConfirmationDialogOpen, setIsRemoveUserConfirmationDialogOpen] =
    useState(false);

  useEffect(() => {
    admins?.forEach((admin) => {
      if (admin.pubkey === pubkey) {
        setSelectedRoles(admin.roles);
      }
    });
  }, [admins, pubkey, setSelectedRoles]);

  if (!groupId || !relay || !pubkey) return null;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            className="ml-auto text-background group-hover:text-muted-foreground"
          >
            <WrenchIcon size={16} />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuItem
            className="flex items-center gap-2"
            onClick={() => setIsEditRolesDialogOpen(true)}
          >
            <PersonStandingIcon size={16} />
            Edit Roles
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="text-destructive flex items-center gap-2"
            onClick={() => setIsRemoveUserConfirmationDialogOpen(true)}
          >
            <XIcon size={16} />
            Remove User
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isEditRolesDialogOpen} onOpenChange={(open) => setIsEditRolesDialogOpen(open)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Roles</DialogTitle>
            <DialogDescription>
              Select the roles you want to assign to the user in the group.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-2">
            {groupRoles?.map((role) => (
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={role.name}
                  name={role.name}
                  value={role.name}
                  defaultChecked={selectedRoles?.includes(role.name)}
                />
                <label
                  htmlFor={role.name}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {role.name}
                </label>
              </div>
            ))}
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={() => putGroupUser({ relay, groupId, pubkey, roles: selectedRoles })}>
              Assign Roles
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isRemoveUserConfirmationDialogOpen}
        onOpenChange={(open) => setIsRemoveUserConfirmationDialogOpen(open)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>This action will remove the user from the group.</DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              variant="destructive"
              onClick={() => removeGroupUser({ relay, groupId, pubkey })}
            >
              Remove User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
