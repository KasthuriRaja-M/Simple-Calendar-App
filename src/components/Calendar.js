import React, { useState, useEffect } from 'react';
import './Calendar.css';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState({});
  const [darkMode, setDarkMode] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', description: '', time: '' });

  // Apply dark mode to body
  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  // Get the first day of the month
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  // Get the last day of the month
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  // Get the day of week for the first day (0 = Sunday, 1 = Monday, etc.)
  const firstDayOfWeek = firstDayOfMonth.getDay();
  // Get the number of days in the month
  const daysInMonth = lastDayOfMonth.getDate();

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const navigateMonth = (direction) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1));
  };

  const handleDateClick = (day) => {
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(clickedDate);
    setShowEventModal(true);
  };

  const isToday = (day) => {
    const today = new Date();
    return today.getDate() === day &&
           today.getMonth() === currentDate.getMonth() &&
           today.getFullYear() === currentDate.getFullYear();
  };

  const isSelected = (day) => {
    if (!selectedDate) return false;
    return selectedDate.getDate() === day &&
           selectedDate.getMonth() === currentDate.getMonth() &&
           selectedDate.getFullYear() === currentDate.getFullYear();
  };

  const hasEvent = (day) => {
    const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`;
    return events[dateKey] && events[dateKey].length > 0;
  };

  const getEventsForDay = (day) => {
    const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`;
    return events[dateKey] || [];
  };

  const addEvent = () => {
    if (!selectedDate || !newEvent.title.trim()) return;
    
    const dateKey = `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`;
    const eventToAdd = {
      id: Date.now(),
      title: newEvent.title,
      description: newEvent.description,
      time: newEvent.time,
      date: selectedDate.toISOString().split('T')[0]
    };

    setEvents(prev => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), eventToAdd]
    }));

    setNewEvent({ title: '', description: '', time: '' });
    setShowEventModal(false);
  };

  const deleteEvent = (dateKey, eventId) => {
    setEvents(prev => ({
      ...prev,
      [dateKey]: prev[dateKey].filter(event => event.id !== eventId)
    }));
  };

  const renderCalendarDays = () => {
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = getEventsForDay(day);
      days.push(
        <div
          key={day}
          className={`calendar-day ${isToday(day) ? 'today' : ''} ${isSelected(day) ? 'selected' : ''} ${hasEvent(day) ? 'has-event' : ''}`}
          onClick={() => handleDateClick(day)}
        >
          <span className="day-number">{day}</span>
          {hasEvent(day) && (
            <div className="event-indicator">
              {dayEvents.length > 3 ? '3+' : dayEvents.length}
            </div>
          )}
        </div>
      );
    }
    
    return days;
  };

  return (
    <div className={`calendar-container ${darkMode ? 'dark' : ''}`}>
      <div className="calendar-header">
        <button className="nav-button" onClick={() => navigateMonth(-1)}>
          &#8249;
        </button>
        <h2 className="month-year">
          {months[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <button className="nav-button" onClick={() => navigateMonth(1)}>
          &#8250;
        </button>
      </div>

      <div className="calendar-controls">
        <button 
          className={`theme-toggle ${darkMode ? 'dark' : 'light'}`}
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
        <button 
          className="today-button"
          onClick={() => setCurrentDate(new Date())}
        >
          Today
        </button>
      </div>
      
      <div className="calendar-grid">
        <div className="days-of-week">
          {daysOfWeek.map(day => (
            <div key={day} className="day-of-week">
              {day}
            </div>
          ))}
        </div>
        
        <div className="calendar-days">
          {renderCalendarDays()}
        </div>
      </div>
      
      {selectedDate && (
        <div className="selected-date-info">
          <h3>Selected: {selectedDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}</h3>
          
          {hasEvent(selectedDate.getDate()) && (
            <div className="events-list">
              <h4>Events:</h4>
              {getEventsForDay(selectedDate.getDate()).map(event => (
                <div key={event.id} className="event-item">
                  <div className="event-content">
                    <strong>{event.title}</strong>
                    {event.time && <span className="event-time">{event.time}</span>}
                    {event.description && <p>{event.description}</p>}
                  </div>
                  <button 
                    className="delete-event"
                    onClick={() => deleteEvent(`${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`, event.id)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Event Modal */}
      {showEventModal && (
        <div className="modal-overlay" onClick={() => setShowEventModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>Add Event for {selectedDate?.toLocaleDateString()}</h3>
            <div className="form-group">
              <input
                type="text"
                placeholder="Event title"
                value={newEvent.title}
                onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                className="event-input"
              />
            </div>
            <div className="form-group">
              <input
                type="time"
                value={newEvent.time}
                onChange={(e) => setNewEvent(prev => ({ ...prev, time: e.target.value }))}
                className="event-input"
              />
            </div>
            <div className="form-group">
              <textarea
                placeholder="Event description (optional)"
                value={newEvent.description}
                onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                className="event-textarea"
              />
            </div>
            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setShowEventModal(false)}>
                Cancel
              </button>
              <button className="btn-add" onClick={addEvent}>
                Add Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
