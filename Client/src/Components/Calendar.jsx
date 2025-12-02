import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';


const Calendar = ({onDateSelect}) => {

  const[selectedDate,setSelectedDate] = useState(new Date());

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const handelClickDate =(day)=>{
    const currentMonth = selectedDate.getMonth();
    const currentYear = selectedDate.getFullYear();
    const clickedDate =  new Date(currentYear,currentMonth,day);
    setSelectedDate(clickedDate);
    onDateSelect(clickedDate.toLocaleDateString('en-CA'));


  }

  return (
    <div className="glass-card ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="section-title text-xl font-semibold">
          <span className="dot yellow" /> STAR DATE
        </h2>
        <div className="flex items-center space-x-3 text-slate-300 text-lg">
          <FaChevronLeft className="cursor-pointer hover:text-white" />
          <span>{selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
          <FaChevronRight className="cursor-pointer hover:text-white" />
        </div>
      </div>
       {/* week days display in 7 columns grid */}
      <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium text-slate-400 mb-2">
        {daysOfWeek.map((day, index) => (
          <div key={index}>{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {[...Array(30)].map((_, i) => (
          <div key={i}
          onClick={()=>handelClickDate(i+1)}
          className={`calendar-day cursor-pointer 
          ${selectedDate.getDate()=== i+1 ?'active bg-yellow-400 text-black' : ''}`}>
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
