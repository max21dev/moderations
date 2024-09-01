import { useStore } from '@/shared/store';
import { Outlet, useNavigate } from 'react-router-dom';
import { Button } from '@/shared/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table';
import { Edit, MessagesSquare, Trash } from 'lucide-react';

export const RelaysList = () => {
  const relays = useStore((state) => state.relays);
  const setActiveRelayUrl = useStore((state) => state.setActiveRelayUrl);

  const navigate = useNavigate();

  const handleRelayClick = (relay: string) => {
    setActiveRelayUrl(relay);
    navigate(`/relays/${encodeURIComponent(relay)}/groups/`); // Navigate to the proper page
  };

  return (
    <div className="p-4 rounded-lg mt-4">
      <h3 className="font-bold mb-2">My Relays</h3>

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
              <TableCell
                className={`ml-2 ${relay?.status === 'Connected' ? 'text-green-500' : 'text-red-500'}`}
              >
                {relay?.staus}
              </TableCell>
              <TableCell>{relay?.about}</TableCell>
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
      <Outlet/>
    </div>
  );
};
