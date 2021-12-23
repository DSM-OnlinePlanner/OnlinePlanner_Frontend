import './calender.css';
import { useEffect, useState } from 'react';
import leftChevron from '../img/left-chevron.svg';
import rightChevron from '../img/right-chevron.svg'; 

function Calender(props){
    const setNowdate = props.setNowDate;
    const nowDate = props.nowDate; //지금 날짜
    const [offsetDate, setOffsetDate] = useState(new Date(nowDate.getFullYear(), nowDate.getMonth(), 1)); //달력에 보여지는 년 월 을 담당하는 변수
    const isCalenderOn = props.isCalenderOn;
    const [dates, setDates] = useState([]); //달력에 보여지는 날짜
    
    useEffect(() => {
        console.log('call');
        setDatesToOffset(offsetDate); //달력에 보여지는 년 월이 바뀌면 달력에 보여지는 날짜 업데이트
    }, [offsetDate])

    useEffect( () => {
        if(isCalenderOn)
            setOffsetDate(new Date(nowDate.getFullYear(), nowDate.getMonth(), 1));
    }, [isCalenderOn])

    const setDatesToOffset = (offsetDate) => {
        const startDate = new Date(offsetDate);
        startDate.setDate(offsetDate.getDate() - offsetDate.getDay());

        const dateArr = [];
        for(var i = 0; i < 6 * 7; ++i){
            const tempDate = new Date(startDate);
            tempDate.setDate(tempDate.getDate() + i);
            dateArr.push(tempDate);
        }
        setDates(dateArr);
    }

    return(
        <div id='calender-outer' className={'background-white shadow-default border-radius-10px font-regular color-black ' + (isCalenderOn ? '' : 'disable')}>
            <div id='calender-header' className='display-flex'>
                <div className='display-flex' id='calender-header-inner'>
                    <img className='calender-chevron' alt='leftChevron' src={leftChevron} onClick={() => {
                        const d = new Date(offsetDate);
                        d.setMonth(d.getMonth() - 1);
                        setOffsetDate(d);
                        }}/>
                    <div id='calender-offset-day' className='font-18px'>{`${offsetDate.getFullYear()}년 ${offsetDate.getMonth() + 1}월`}</div>
                    <img className='calender-chevron' alt='rightChevron' src={rightChevron} onClick={() => {
                        const d = new Date(offsetDate);
                        d.setMonth(d.getMonth() + 1);
                        setOffsetDate(d);
                        }} />
                </div>
            </div>
            <div id='calender-day-of-week-container' className='display-flex font-18px'>
                <div className='calender-day-of-week-outer color-red'><div>일</div></div>
                <div className='calender-day-of-week-outer'><div>월</div></div>
                <div className='calender-day-of-week-outer'><div>화</div></div>
                <div className='calender-day-of-week-outer'><div>수</div></div>
                <div className='calender-day-of-week-outer'><div>목</div></div>
                <div className='calender-day-of-week-outer'><div>금</div></div>
                <div className='calender-day-of-week-outer color-blue'><div>토</div></div>
            </div>
            <div id='calender-date-container' className='font-18px font-regular'>
                {
                    dates.map((elem, key) => {
                        return  <div key={key} className='calender-date-inner'>
                                    <div className={'calender-date-inner-select ' + (elem.getMonth() !== offsetDate.getMonth() ? 'color-gray2 ' : 'this-month ') + (elem.toLocaleDateString() === new Date().toLocaleDateString() ? ' color-blue ' : '') + (elem.toLocaleDateString() === nowDate.toLocaleDateString() ? 'color-white background-blue' : '')}
                                    onClick={() => {if(elem.getMonth() === offsetDate.getMonth()) setNowdate(elem)}}>
                                        <span>{elem.getDate()}</span>
                                    </div>
                                </div>
                    })
                }
            </div>
            
        </div>
    );
}

export default Calender;