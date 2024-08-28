import { ColumnDef } from '@tanstack/react-table';
import { useLocation, useNavigate } from 'react-router-dom';
import { Group } from '@/shared/types';
import { useGroupAdmins, useGroupMembers } from '@/shared/hooks';
import { Avatar, AvatarImage } from '@/shared/components/ui/avatar';
import { Button } from '@/shared/components/ui/button';

import { loader } from '@/shared/utils';
import { ArrowUpDown, ExternalLinkIcon } from 'lucide-react';

export const columns: ColumnDef<Group>[] = [
  {
    accessorKey: 'picture',
    header: 'Picture',
    cell: ({ row }) => {
      const picture: string = row.getValue('picture');
      return (
        <Avatar className={`flex justify-center items-center ${!picture ? 'bg-gray-500' : ''}`}>
          {picture && (
            <AvatarImage
              src={loader(picture, { w: 50, h: 50 })}
              alt={picture}
              width={6}
              height={6}
              className="w-10 h-10"
            />
          )}
        </Avatar>
      );
    },
  },
  {
    accessorKey: 'id',
    header: 'group ID',
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'privacy',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Privacy
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'type',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'admins',
    header: 'Admins',
    cell: ({ row }) => {
      const { admins } = useGroupAdmins(row.getValue('id'));
      return <div>{admins?.length}</div>;
    },
  },
  {
    accessorKey: 'members',
    header: 'Members',
    cell: ({ row }) => {
      const { members } = useGroupMembers(row.id);
      return <div>{members?.length}</div>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const navigate = useNavigate();
      const location = useLocation();

      const handleNavigation = () => {
        const newPath = `${location.pathname}${row.getValue('id')}`;
        navigate(newPath);
      };

      return (
        <div>
          <ExternalLinkIcon onClick={handleNavigation} className="cursor-pointer" />
        </div>
      );
    },
  },
];
