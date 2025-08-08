import React, { useState } from 'react';
import './Calendar.css';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

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

  const renderCalendarDays = () => {
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(
        <div
          key={day}
          className={`calendar-day ${isToday(day) ? 'today' : ''} ${isSelected(day) ? 'selected' : ''}`}
          onClick={() => handleDateClick(day)}
        >
          {day}
        </div>
      );
    }
    
    return days;
  };

  return (
    <div className="calendar-container">
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
          Selected: {selectedDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
      )}
    </div>
  );
};

export default Calendar;
