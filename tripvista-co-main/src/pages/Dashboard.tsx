import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Plus, 
  MapPin, 
  Calendar, 
  DollarSign, 
  ChevronRight,
  TrendingUp,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { mockTripSummaries, recommendedDestinations } from '@/data/mockData';
import { format } from 'date-fns';
import DashboardLayout from '@/components/layout/DashboardLayout';

const Dashboard = () => {
  const navigate = useNavigate();

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
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-3xl md:text-4xl font-semibold text-foreground"
            >
              Welcome back, Traveler
            </motion.h1>
            <p className="text-muted-foreground mt-1">Ready to plan your next adventure?</p>
          </div>
          <Button variant="gold" size="lg" onClick={() => navigate('/trips/create')}>
            <Plus className="mr-2 h-5 w-5" />
            Plan New Trip
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Trips Planned', value: '12', icon: MapPin, color: 'text-secondary' },
            { label: 'Countries Visited', value: '8', icon: TrendingUp, color: 'text-accent' },
            { label: 'Days Traveled', value: '45', icon: Calendar, color: 'text-secondary' },
            { label: 'Total Saved', value: '$2,340', icon: DollarSign, color: 'text-accent' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card variant="feature" className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-muted ${stat.color}`}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-display font-semibold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Recent Trips */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-2xl font-semibold">Your Trips</h2>
            <Link to="/trips" className="text-secondary text-sm font-medium hover:underline flex items-center">
              View All <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockTripSummaries.map((trip, index) => (
              <motion.div
                key={trip.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card 
                  variant="interactive" 
                  className="overflow-hidden group"
                  onClick={() => navigate(`/trips/${trip.id}`)}
                >
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={trip.coverImage}
                      alt={trip.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                    <span className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(trip.status)}`}>
                      {trip.status}
                    </span>
                  </div>
                  <CardContent className="p-4">
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
                    <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
                      <span className="text-sm font-medium">${trip.totalBudget.toLocaleString()}</span>
                      <span className="text-xs text-muted-foreground">estimated budget</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Recommended Destinations */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-2xl font-semibold">Recommended for You</h2>
            <Link to="/explore" className="text-secondary text-sm font-medium hover:underline flex items-center">
              Explore All <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {recommendedDestinations.map((rec, index) => (
              <motion.div
                key={rec.city.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Card variant="interactive" className="overflow-hidden group">
                  <div className="relative h-48">
                    <img
                      src={rec.city.image}
                      alt={rec.city.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-primary-foreground">
                      <h3 className="font-display text-xl font-semibold">{rec.city.name}</h3>
                      <p className="text-sm opacity-90">{rec.city.country}</p>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 text-sm text-secondary">
                      <Clock className="h-4 w-4" />
                      <span>{rec.reason}</span>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full ${i < rec.city.costIndex ? 'bg-secondary' : 'bg-muted'}`}
                          />
                        ))}
                        <span className="text-xs text-muted-foreground ml-1">Cost</span>
                      </div>
                      <Button variant="outline-gold" size="sm">
                        Add to Trip
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
