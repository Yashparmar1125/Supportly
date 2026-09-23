import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/Button';
import { SearchBar } from '../components/SearchBar';
import { StatusFilter } from '../components/StatusFilter';
import { TicketTable } from '../components/TicketTable';
import { useTickets } from '../hooks/useTickets';
import type { TicketStatus } from '../types';
import { Plus } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<TicketStatus | 'All'>('All');

  const { data: tickets = [], isLoading } = useTickets({
    status: status !== 'All' ? status : undefined,
    search: search || undefined,
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-[22px] font-bold text-ink">Support Tickets</h1>
        <Button onClick={() => navigate('/tickets/new')} size="sm">
          <Plus className="w-4 h-4 mr-1.5" /> New ticket
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <SearchBar onSearch={setSearch} />
        <StatusFilter activeStatus={status} onChange={setStatus} />
      </div>

      <TicketTable tickets={tickets} isLoading={isLoading} />
    </div>
  );
};