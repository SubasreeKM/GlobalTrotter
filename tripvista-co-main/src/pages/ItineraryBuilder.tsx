import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  DollarSign, 
  Share2, 
  Edit, 
  Plus,
  GripVertical,
  Trash2,
  Clock
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockCities, mockActivities } from '@/data/mockData';
import DashboardLayout from '@/components/layout/DashboardLayout';

interface ItineraryStop {
  id: string;
  city: typeof mockCities[0];
  arrivalDate: string;
  departureDate: string;
  activities: typeof mockActivities;
}

const ItineraryBuilder = () => {
  const navigate = useNavigate();
  const { tripId } = useParams();
  
  const [stops, setStops] = useState<ItineraryStop[]>([
    {
      id: '1',
      city: mockCities[0], // Paris
      arrivalDate: '2025-03-15',
      departureDate: '2025-03-18',
      activities: mockActivities.slice(0, 2),
    },
    {
      id: '2',
      city: mockCities[5], // Rome
      arrivalDate: '2025-03-18',
      departureDate: '2025-03-22',
      activities: [],
    },
  ]);

  const totalBudget = stops.reduce((acc, stop) => {
    const activityCost = stop.activities.reduce((sum, act) => sum + act.cost, 0);
    return acc + activityCost;
  }, 0);

  const totalDays = stops.length > 0 ? 
    Math.ceil((new Date(stops[stops.length - 1].departureDate).getTime() - 
    new Date(stops[0].arrivalDate).getTime()) / (1000 * 60 * 60 * 24)) + 1 : 0;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-start gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 -ml-2 text-muted-foreground hover:text-foreground transition-colors mt-1"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h1 className="font-display text-3xl font-semibold">European Adventure</h1>
              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Mar 15 - 28, 2025
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {stops.length} stops
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {totalDays} days
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Edit className="mr-2 h-4 w-4" />
              Edit Details
            </Button>
          </div>
        </div>

        {/* Budget summary */}
        <Card variant="feature" className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-secondary/20">
                <DollarSign className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Estimated Budget</p>
                <p className="text-2xl font-display font-semibold">${totalBudget.toLocaleString()}</p>
              </div>
            </div>
            <Button variant="outline-gold" size="sm" onClick={() => navigate('/budget')}>
              View Breakdown
            </Button>
          </div>
        </Card>

        {/* Itinerary Timeline */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold">Itinerary</h2>
              <Button variant="gold" size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Stop
              </Button>
            </div>

            {stops.map((stop, index) => (
              <motion.div
                key={stop.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card variant="elevated" className="overflow-hidden">
                  <div className="relative h-32 overflow-hidden">
                    <img
                      src={stop.city.image}
                      alt={stop.city.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent" />
                    <div className="absolute inset-0 flex items-center p-6">
                      <div className="flex items-center gap-4">
                        <button className="cursor-grab text-primary-foreground/70 hover:text-primary-foreground">
                          <GripVertical className="h-5 w-5" />
                        </button>
                        <div className="text-primary-foreground">
                          <p className="text-sm opacity-80">Stop {index + 1}</p>
                          <h3 className="font-display text-2xl font-semibold">{stop.city.name}</h3>
                          <p className="text-sm opacity-80">{stop.city.country}</p>
                        </div>
                      </div>
                      <div className="ml-auto flex items-center gap-4 text-primary-foreground">
                        <div className="text-right">
                          <p className="text-sm opacity-80">Duration</p>
                          <p className="font-medium">
                            {Math.ceil((new Date(stop.departureDate).getTime() - 
                            new Date(stop.arrivalDate).getTime()) / (1000 * 60 * 60 * 24))} nights
                          </p>
                        </div>
                        <button className="p-2 hover:bg-primary-foreground/10 rounded-lg transition-colors">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between text-sm mb-4">
                      <span className="text-muted-foreground">
                        {new Date(stop.arrivalDate).toLocaleDateString('en-US', { 
                          weekday: 'short', month: 'short', day: 'numeric' 
                        })} → {new Date(stop.departureDate).toLocaleDateString('en-US', { 
                          weekday: 'short', month: 'short', day: 'numeric' 
                        })}
                      </span>
                    </div>
                    
                    {stop.activities.length > 0 ? (
                      <div className="space-y-2">
                        <p className="text-sm font-medium mb-2">Activities</p>
                        {stop.activities.map((activity) => (
                          <div key={activity.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-lg overflow-hidden">
                                {activity.image && (
                                  <img src={activity.image} alt={activity.name} className="w-full h-full object-cover" />
                                )}
                              </div>
                              <div>
                                <p className="font-medium text-sm">{activity.name}</p>
                                <p className="text-xs text-muted-foreground">{activity.duration}h • {activity.category}</p>
                              </div>
                            </div>
                            <p className="font-medium">${activity.cost}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-4 text-muted-foreground">
                        <p className="text-sm">No activities added yet</p>
                      </div>
                    )}
                    
                    <Button variant="outline" size="sm" className="w-full mt-4">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Activity
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Sidebar - Quick Actions */}
          <div className="space-y-4">
            <Card variant="feature">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Quick Add</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/explore')}>
                  <MapPin className="mr-2 h-4 w-4" />
                  Add Destination
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Activity
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="mr-2 h-4 w-4" />
                  View Calendar
                </Button>
              </CardContent>
            </Card>

            <Card variant="feature">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Trip Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Destinations</span>
                  <span className="font-medium">{stops.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Days</span>
                  <span className="font-medium">{totalDays}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Activities</span>
                  <span className="font-medium">
                    {stops.reduce((acc, s) => acc + s.activities.length, 0)}
                  </span>
                </div>
                <div className="pt-3 border-t border-border">
                  <div className="flex justify-between">
                    <span className="font-medium">Total Budget</span>
                    <span className="font-display text-lg font-semibold text-secondary">
                      ${totalBudget.toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ItineraryBuilder;
