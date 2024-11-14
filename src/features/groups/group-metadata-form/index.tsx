import { EyeClosedIcon, EyeIcon, LockIcon, LockOpenIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';

import { GroupMetadata } from '@/shared/types';

export type GroupMetadataFormProps = {
  submitLabel?: string | undefined;
  onSubmit: (metadata: Omit<GroupMetadata, 'id'>) => void;
  initialValues?: Partial<GroupMetadata>;
};

export const GroupMetadataForm = ({
  submitLabel = 'Submit',
  onSubmit,
  initialValues,
}: GroupMetadataFormProps) => {
  const [name, setName] = useState(initialValues?.name ?? '');
  const [picture, setPicture] = useState(initialValues?.picture ?? '');
  const [about, setAbout] = useState(initialValues?.about ?? '');
  const [isPublic, setIsPublic] = useState(initialValues?.isPublic ?? true);
  const [isOpen, setIsOpen] = useState(initialValues?.isOpen ?? true);

  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="group-name">Name:</Label>
          <Input
            id="group-name"
            type="text"
            placeholder="The Cool Folks"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="group-picture">Picture (URL):</Label>
          <Input
            id="group-picture"
            type="text"
            placeholder="https://example.com/picture.jpg"
            value={picture}
            onChange={(e) => setPicture(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div>
          <Label htmlFor="group-about">About:</Label>
          <Input
            id="group-about"
            type="text"
            placeholder="We are the cool folks!"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Button
            className="w-full gap-1"
            onClick={() => setIsPublic((prev) => !prev)}
            variant="outline"
          >
            {isPublic ? <EyeIcon className="w-4 h-4" /> : <EyeClosedIcon className="w-4 h-4" />}
            {isPublic ? 'Public' : 'Private'}
          </Button>
        </div>

        <div>
          <Button
            className="w-full gap-1"
            onClick={() => setIsOpen((prev) => !prev)}
            variant="outline"
          >
            {isOpen ? <LockOpenIcon className="w-4 h-4" /> : <LockIcon className="w-4 h-4" />}
            {isOpen ? 'Open' : 'Closed'}
          </Button>
        </div>
      </div>

      <div>
        <Button size="lg" onClick={() => onSubmit({ about, isOpen, isPublic, name, picture })}>
          {submitLabel}
        </Button>
      </div>
    </div>
  );
};
