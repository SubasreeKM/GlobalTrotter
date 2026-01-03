import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MapPin, Star, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { mockCities } from '@/data/mockData';
import DashboardLayout from '@/components/layout/DashboardLayout';

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [regionFilter, setRegionFilter] = useState<string>('all');

  const regions = [...new Set(mockCities.map(city => city.region))];

  const filteredCities = mockCities.filter(city => {
    const matchesSearch = city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      city.country.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = regionFilter === 'all' || city.region === regionFilter;
    return matchesSearch && matchesRegion;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="font-display text-3xl font-semibold">Explore Destinations</h1>
          <p className="text-muted-foreground mt-1">Discover your next adventure from our curated collection</p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search cities or countries..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                {regionFilter === 'all' ? 'All Regions' : regionFilter}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setRegionFilter('all')}>All Regions</DropdownMenuItem>
              {regions.map(region => (
                <DropdownMenuItem key={region} onClick={() => setRegionFilter(region || 'all')}>
                  {region}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Cities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCities.map((city, index) => (
            <motion.div
              key={city.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card variant="interactive" className="overflow-hidden group h-full">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={city.image}
                    alt={city.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
                  <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-background/90 text-sm">
                    <Star className="h-3.5 w-3.5 text-secondary fill-secondary" />
                    <span className="font-medium">{city.popularity}</span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-primary-foreground">
                    <h3 className="font-display text-2xl font-semibold">{city.name}</h3>
                    <p className="text-sm opacity-90 flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {city.country}
                    </p>
                  </div>
                </div>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {city.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full ${i < city.costIndex ? 'bg-secondary' : 'bg-muted'}`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">Cost</span>
                    </div>
                    <Button variant="outline-gold" size="sm">
                      Add to Trip
                    </Button>
                  </div>
                  {city.bestTimeToVisit && (
                    <div className="mt-3 pt-3 border-t border-border">
                      <p className="text-xs text-muted-foreground">
                        Best time: <span className="text-foreground">{city.bestTimeToVisit.join(', ')}</span>
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredCities.length === 0 && (
          <Card variant="flat" className="p-12 text-center">
            <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-display text-xl font-semibold mb-2">No destinations found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Explore;
