import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, PieChart as PieIcon, ArrowUp, ArrowDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import DashboardLayout from '@/components/layout/DashboardLayout';

const budgetData = [
  { name: 'Transport', value: 850, color: 'hsl(35, 80%, 55%)' },
  { name: 'Accommodation', value: 1200, color: 'hsl(220, 30%, 20%)' },
  { name: 'Activities', value: 450, color: 'hsl(160, 25%, 45%)' },
  { name: 'Food', value: 600, color: 'hsl(220, 25%, 35%)' },
  { name: 'Other', value: 200, color: 'hsl(40, 20%, 88%)' },
];

const totalBudget = budgetData.reduce((acc, item) => acc + item.value, 0);

const dailyBreakdown = [
  { day: 'Day 1', spent: 280, budget: 300 },
  { day: 'Day 2', spent: 320, budget: 300 },
  { day: 'Day 3', spent: 250, budget: 300 },
  { day: 'Day 4', spent: 290, budget: 300 },
  { day: 'Day 5', spent: 350, budget: 300 },
];

const Budget = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="font-display text-3xl font-semibold">Budget Overview</h1>
          <p className="text-muted-foreground mt-1">Track and manage your trip expenses</p>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { 
              label: 'Total Budget', 
              value: `$${totalBudget.toLocaleString()}`, 
              icon: DollarSign,
              color: 'text-secondary',
              change: null 
            },
            { 
              label: 'Average per Day', 
              value: `$${Math.round(totalBudget / 14)}`, 
              icon: TrendingUp,
              color: 'text-accent',
              change: '+12%' 
            },
            { 
              label: 'Biggest Expense', 
              value: 'Accommodation', 
              icon: PieIcon,
              color: 'text-secondary',
              change: '$1,200' 
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card variant="feature">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-display font-semibold mt-1">{stat.value}</p>
                      {stat.change && (
                        <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                      )}
                    </div>
                    <div className={`p-3 rounded-lg bg-muted ${stat.color}`}>
                      <stat.icon className="h-5 w-5" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Pie Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Expense Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={budgetData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {budgetData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value: number) => [`$${value}`, 'Amount']}
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '0.75rem',
                        }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Category Breakdown */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Category Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {budgetData.map((category, index) => (
                  <div key={category.name} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{category.name}</span>
                      <span className="text-muted-foreground">
                        ${category.value.toLocaleString()} ({Math.round((category.value / totalBudget) * 100)}%)
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(category.value / totalBudget) * 100}%` }}
                        transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Daily Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card variant="elevated">
            <CardHeader>
              <CardTitle>Daily Spending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {dailyBreakdown.map((day) => {
                  const isOverBudget = day.spent > day.budget;
                  return (
                    <div key={day.day} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                      <span className="font-medium w-16">{day.day}</span>
                      <div className="flex-1">
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${isOverBudget ? 'bg-destructive' : 'bg-secondary'}`}
                            style={{ width: `${Math.min((day.spent / day.budget) * 100, 100)}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-2 w-28 justify-end">
                        <span className={`font-medium ${isOverBudget ? 'text-destructive' : ''}`}>
                          ${day.spent}
                        </span>
                        {isOverBudget ? (
                          <ArrowUp className="h-4 w-4 text-destructive" />
                        ) : (
                          <ArrowDown className="h-4 w-4 text-accent" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Budget;
