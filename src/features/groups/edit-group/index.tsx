import { useParams } from 'react-router-dom';

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

import { useGroupMetadata, useGroupModeration } from '@/shared/hooks';
import { GroupMetadata } from '@/shared/types';

import { GroupMetadataForm, GroupSummary } from '@/features/groups';

export const EditGroup = () => {
  const { groupId } = useParams();

  const { metadata } = useGroupMetadata(groupId);

  const { deleteGroup, updateMetadata } = useGroupModeration({ groupId });

  const initialValues: Partial<GroupMetadata> = metadata || {};

  if (!groupId || !metadata) return null;

  return (
    <div className="flex flex-col gap-4 justify-center w-full">
      <GroupSummary metadata={metadata} />

      <CardContainer title="Group Metadata">
        <GroupMetadataForm
          submitLabel="Save Changes"
          onSubmit={updateMetadata}
          initialValues={initialValues}
        />
      </CardContainer>

      <CardContainer title="Danger Zone">
        <Dialog>
          <DialogTrigger>
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
                <Button variant="destructive" onClick={deleteGroup}>
                  Delete Group
                </Button>
              </DialogFooter>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </CardContainer>
    </div>
  );
};
