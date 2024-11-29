import { Nip29GroupMetadata, useGroupMetadata } from 'nostr-hooks/nip29';

import { CardContainer } from '@/shared/components/card-container';
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

import { useActiveGroupId, useActiveRelay, useGroupModeration } from '@/shared/hooks';

import { GroupMetadataForm, GroupSummary } from '@/features/groups';

export const EditGroup = () => {
  const { activeRelay } = useActiveRelay();
  const { activeGroupId } = useActiveGroupId();

  const { metadata } = useGroupMetadata(activeRelay, activeGroupId);

  const { handleDeleteGroup, handleEditMetadata } = useGroupModeration(activeRelay, activeGroupId);

  const initialValues: Partial<Nip29GroupMetadata> = metadata || {};

  if (!activeGroupId || !metadata) return null;

  return (
    <div className="flex flex-col gap-4 justify-center w-full">
      <GroupSummary metadata={metadata} />

      <CardContainer title="Group Metadata">
        <GroupMetadataForm
          submitLabel="Save Changes"
          onSubmit={handleEditMetadata}
          initialValues={initialValues}
        />
      </CardContainer>

      <CardContainer title="Danger Zone">
        <div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive">Delete Group</Button>
            </DialogTrigger>
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
        </div>
      </CardContainer>
    </div>
  );
};
