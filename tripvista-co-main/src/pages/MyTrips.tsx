import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Plus, 
  MoreVertical, 
  Calendar, 
  MapPin, 
  Search,
  Filter,
  Grid3X3,
  List
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { mockTripSummaries } from '@/data/mockData';
import { format } from 'date-fns';
import DashboardLayout from '@/components/layout/DashboardLayout';

const MyTrips = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState<string>('all');

  const filteredTrips = mockTripSummaries.filter(trip => {
    const matchesSearch = trip.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || trip.status === filter;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planned': return 'bg-secondary/20 text-secondary';
      case 'ongoing': return 'bg-accent/20 text-accent';
      case 'completed': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-semibold">My Trips</h1>
            <p className="text-muted-foreground mt-1">Manage and organize all your travel plans</p>
          </div>
          <Button variant="gold" onClick={() => navigate('/trips/create')}>
            <Plus className="mr-2 h-4 w-4" />
            New Trip
          </Button>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search trips..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  {filter === 'all' ? 'All Trips' : filter.charAt(0).toUpperCase() + filter.slice(1)}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setFilter('all')}>All Trips</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter('draft')}>Drafts</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter('planned')}>Planned</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter('ongoing')}>Ongoing</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter('completed')}>Completed</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="flex border border-input rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-muted' : ''}`}
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-muted' : ''}`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Trips Grid/List */}
        {filteredTrips.length === 0 ? (
          <Card variant="flat" className="p-12 text-center">
            <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-display text-xl font-semibold mb-2">No trips found</h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery ? 'Try adjusting your search or filters' : 'Start planning your first adventure'}
            </p>
            <Button variant="gold" onClick={() => navigate('/trips/create')}>
              <Plus className="mr-2 h-4 w-4" />
              Create Your First Trip
            </Button>
          </Card>
        ) : viewMode === 'grid' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrips.map((trip, index) => (
              <motion.div
                key={trip.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card variant="interactive" className="overflow-hidden group">
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={trip.coverImage}
                      alt={trip.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                    <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(trip.status)}`}>
                      {trip.status}
                    </span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="absolute top-3 right-3 p-1.5 rounded-full bg-background/80 text-foreground hover:bg-background transition-colors">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => navigate(`/trips/${trip.id}`)}>View</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate(`/trips/${trip.id}/edit`)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardContent className="p-4" onClick={() => navigate(`/trips/${trip.id}`)}>
                    <h3 className="font-display text-lg font-semibold mb-2">{trip.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {format(trip.startDate, 'MMM d')} - {format(trip.endDate, 'MMM d')}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {trip.destinationCount} stops
                      </span>
                    </div>
                    <div className="mt-3 pt-3 border-t border-border">
                      <span className="text-lg font-display font-semibold">${trip.totalBudget.toLocaleString()}</span>
                      <span className="text-xs text-muted-foreground ml-2">estimated</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTrips.map((trip, index) => (
              <motion.div
                key={trip.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card 
                  variant="interactive" 
                  className="p-4"
                  onClick={() => navigate(`/trips/${trip.id}`)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0">
                      <img
                        src={trip.coverImage}
                        alt={trip.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-display text-lg font-semibold truncate">{trip.name}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(trip.status)}`}>
                          {trip.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {format(trip.startDate, 'MMM d')} - {format(trip.endDate, 'MMM d, yyyy')}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {trip.destinationCount} destinations
                        </span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-lg font-display font-semibold">${trip.totalBudget.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">estimated budget</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default MyTrips;
