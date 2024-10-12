import { Edit, MessagesSquare, Trash } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table';
import { H3 } from '@/shared/components/ui/typography/h3';

import { useStore } from '@/shared/store';

export const RelaysList = () => {
  const relays = useStore((state) => state.relays);

  const navigate = useNavigate();

  const handleRelayClick = (relay: string) => {
    navigate(`/relays/${encodeURIComponent(relay)}/groups/`);
  };

  return (
    <>
      <H3>My Relays</H3>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ADDRESS</TableHead>
            <TableHead>STATUS</TableHead>
            <TableHead>ABOUT</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {relays.map((relay) => (
            <TableRow key={relay}>
              <TableCell className="font-medium">{relay}</TableCell>
              <TableCell>-</TableCell>
              <TableCell>-</TableCell>
              <TableCell className="text-right">
                <Button className="ml-2" variant="outline" onClick={() => handleRelayClick(relay)}>
                  <MessagesSquare className="h-5 w-5 mr-2" /> Groups
                </Button>
                <Button className="ml-2" variant="outline" size="icon">
                  <Edit className="h-5 w-5" />
                </Button>
                <Button className="ml-2" variant="destructive" size="icon">
                  <Trash className="h-5 w-5" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
