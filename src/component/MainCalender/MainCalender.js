import * as G from '../style/globalStyle';
import * as S from './Styles';
import Left from '../../img/left-chevron.svg';
import Right from '../../img/right-chevron.svg';
import { useEffect, useState } from 'react';
import { color } from '../style/color';

const MainCalender = () => {
    const [dates, setDates] = useState([]);
    const [nowDate, setNowDate] = useState(new Date());

    const getYearMonth = (date) =>{
        return date.getFullYear() + "년 " + (date.getMonth() + 1) + "월"
    }

    const getDays = (date) => {
        date.setDate(1);
        var startDate = new Date(date);
        var tempDate = new Date(startDate);
        var monthDates = [];
        startDate.setDate(startDate.getDate() - startDate.getDay());
        for(let i = 0; i < 6 * 7; i++){
            tempDate = new Date(addDays(startDate, i));
            monthDates.push(new Date(tempDate));
        }
        
        setDates(monthDates);
    }
    
    const addDays = (date, days) => {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    const addMonths = (date, months) => {
        var result = new Date(date);
        result.setMonth(result.getMonth() + months);
        return result;
    }

    useEffect(() => {
        getDays(nowDate);
    }, []);

    useEffect(() => {
        getDays(nowDate);
    }, [nowDate]);

    return (
        <>
            <G.SectionTitle>달력</G.SectionTitle>
            <S.CalenderContainer>
                <S.CalenderHeader>
                    <S.DateTitle>{getYearMonth(nowDate)}</S.DateTitle>
                    <div>
                        <S.MonthButton src={Left} alt='left' onClick={() => {setNowDate(addMonths(nowDate, -1))}}/>
                        <S.MonthButton src={Right} alt='right' onClick={() => {setNowDate(addMonths(nowDate, 1))}}/>
                    </div>
                </S.CalenderHeader>
                <S.DOWContainer>
                    <S.DOWCell>일</S.DOWCell>
                    <S.DOWCell>월</S.DOWCell>
                    <S.DOWCell>화</S.DOWCell>
                    <S.DOWCell>수</S.DOWCell>
                    <S.DOWCell>목</S.DOWCell>
                    <S.DOWCell>금</S.DOWCell>
                    <S.DOWCell>토</S.DOWCell>
                </S.DOWContainer>
                <S.DayContainer>
                    {dates.map((value, key) => {
                        return <S.DayCell>
                            <S.DayTitle>{value.getDate()}</S.DayTitle>
                            <S.DayTodoContainer>
                                {/* <S.DayTodos color={color.red}></S.DayTodos>
                                <S.DayTodos color={color.red}></S.DayTodos>
                                <S.DayTodos color={color.red}></S.DayTodos> */}
                            </S.DayTodoContainer>
                            </S.DayCell>;
                    })}
                </S.DayContainer>
            </S.CalenderContainer>
        </>
    );

}

export default MainCalender;