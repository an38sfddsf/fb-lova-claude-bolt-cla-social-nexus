import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Plus, Clock, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MOCK_IMAGES } from '@/lib/constants';
import CreateEvent from './CreateEvent';

interface Event {
  id: string;
  title: string;
  date: Date;
  time: string;
  location: string;
  type: 'personal' | 'public' | 'friend';
  color: string;
  attendees?: number;
  organizer?: {
    name: string;
    avatar: string;
  };
}

const EventCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [events] = useState<Event[]>([
    {
      id: '1',
      title: 'Tech Conference 2024',
      date: new Date(2024, 2, 15),
      time: '9:00 AM',
      location: 'Convention Center',
      type: 'public',
      color: 'bg-blue-500',
      attendees: 1250,
      organizer: {
        name: 'Tech Events Inc',
        avatar: MOCK_IMAGES.AVATARS[0]
      }
    },
    {
      id: '2',
      title: 'Birthday Party',
      date: new Date(2024, 2, 20),
      time: '7:00 PM',
      location: 'Home',
      type: 'personal',
      color: 'bg-green-500'
    },
    {
      id: '3',
      title: 'Team Meeting',
      date: new Date(2024, 2, 22),
      time: '2:00 PM',
      location: 'Office',
      type: 'friend',
      color: 'bg-purple-500',
      attendees: 12,
      organizer: {
        name: 'Work Group',
        avatar: MOCK_IMAGES.AVATARS[1]
      }
    },
    {
      id: '4',
      title: 'Community Garden Cleanup',
      date: new Date(2024, 2, 18),
      time: '10:00 AM',
      location: 'Central Community Garden',
      type: 'public',
      color: 'bg-yellow-500',
      attendees: 45,
      organizer: {
        name: 'Green Community',
        avatar: MOCK_IMAGES.AVATARS[2]
      }
    }
  ]);

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    );
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border border-gray-200"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dayEvents = getEventsForDate(date);
      const isToday = date.toDateString() === new Date().toDateString();
      const isSelected = selectedDate?.toDateString() === date.toDateString();

      days.push(
        <div
          key={day}
          className={`h-24 border border-gray-200 p-1 cursor-pointer hover:bg-gray-50 ${
            isToday ? 'bg-blue-50 border-blue-300' : ''
          } ${isSelected ? 'bg-blue-100 border-blue-400' : ''}`}
          onClick={() => setSelectedDate(date)}
        >
          <div className={`text-sm font-medium ${isToday ? 'text-blue-600' : 'text-gray-900'}`}>
            {day}
          </div>
          <div className="space-y-1 mt-1">
            {dayEvents.slice(0, 2).map((event) => (
              <div
                key={event.id}
                className={`text-xs p-1 rounded text-white truncate ${event.color}`}
                title={event.title}
              >
                {event.title}
              </div>
            ))}
            {dayEvents.length > 2 && (
              <div className="text-xs text-gray-500">+{dayEvents.length - 2} more</div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : [];

  // Get upcoming events (sorted by date)
  const upcomingEvents = [...events]
    .filter(event => event.date >= new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 3);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Calendar */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>
                  {currentDate.toLocaleDateString('en-US', { 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </span>
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={() => navigateMonth('prev')}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
                  Today
                </Button>
                <Button variant="outline" size="sm" onClick={() => navigateMonth('next')}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Calendar Header */}
            <div className="grid grid-cols-7 gap-0 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="p-2 text-center text-sm font-medium text-gray-500 border-b">
                  {day}
                </div>
              ))}
            </div>
            
            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-0">
              {renderCalendarDays()}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Event Details */}
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">
                {selectedDate 
                  ? selectedDate.toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      month: 'long', 
                      day: 'numeric' 
                    })
                  : 'Select a date'
                }
              </CardTitle>
              <Button size="sm" onClick={() => setIsCreateModalOpen(true)}>
                <Plus className="w-4 h-4 mr-1" />
                Add Event
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {selectedDateEvents.length > 0 ? (
              <div className="space-y-3">
                {selectedDateEvents.map((event) => (
                  <div key={event.id} className="border rounded-lg p-3 hover:shadow-sm transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{event.title}</h4>
                        <div className="flex items-center space-x-2 mt-1 text-sm text-gray-500">
                          <Clock className="w-3 h-3" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center space-x-2 mt-1 text-sm text-gray-500">
                          <MapPin className="w-3 h-3" />
                          <span>{event.location}</span>
                        </div>
                        
                        {event.attendees && (
                          <div className="flex items-center space-x-2 mt-1 text-sm text-gray-500">
                            <Users className="w-3 h-3" />
                            <span>{event.attendees} attending</span>
                          </div>
                        )}
                        
                        {event.organizer && (
                          <div className="flex items-center space-x-2 mt-2">
                            <Avatar className="w-5 h-5">
                              <AvatarImage src={event.organizer.avatar} />
                              <AvatarFallback>{event.organizer.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-gray-500">by {event.organizer.name}</span>
                          </div>
                        )}
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`${event.color} text-white border-transparent`}
                      >
                        {event.type}
                      </Badge>
                    </div>
                    
                    <div className="flex space-x-2 mt-3 pt-3 border-t">
                      <Button size="sm" variant="outline" className="flex-1">
                        Going
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        Interested
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Calendar className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No events for this date</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2"
                  onClick={() => setIsCreateModalOpen(true)}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Create Event
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingEvents.length > 0 ? (
              <div className="space-y-2">
                {upcomingEvents.map((event) => (
                  <div 
                    key={event.id} 
                    className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
                    onClick={() => setSelectedDate(event.date)}
                  >
                    <div className={`w-3 h-3 rounded-full ${event.color}`}></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{event.title}</p>
                      <p className="text-xs text-gray-500">
                        {event.date.toLocaleDateString()} at {event.time}
                      </p>
                    </div>
                  </div>
                ))}
                <Button variant="ghost" size="sm" className="w-full mt-2 text-blue-600">
                  View All Events
                </Button>
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500">
                <p className="text-sm">No upcoming events</p>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Event Categories */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-blue-500 text-white border-transparent">
                Public
              </Badge>
              <Badge variant="outline" className="bg-green-500 text-white border-transparent">
                Personal
              </Badge>
              <Badge variant="outline" className="bg-purple-500 text-white border-transparent">
                Friend
              </Badge>
              <Badge variant="outline" className="bg-yellow-500 text-white border-transparent">
                Community
              </Badge>
              <Badge variant="outline" className="bg-red-500 text-white border-transparent">
                Birthday
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <CreateEvent 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />
    </div>
  );
};

export default EventCalendar;