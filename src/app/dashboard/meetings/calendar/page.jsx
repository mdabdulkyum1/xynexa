
import MyCalendar from './components/Calendar';
import CalendarPiker from './components/CalendarPiker';

export default function Page() {
    return (
        <div>
            <h1>Hello, this is the Calendar Page</h1>
            <CalendarPiker></CalendarPiker>
            <MyCalendar></MyCalendar>
        </div>
    );
}
