import * as G from "../style/globalStyle";
import * as S from "./Styles";
import Left from "../../img/left-chevron.svg";
import Right from "../../img/right-chevron.svg";
import { useEffect, useState } from "react";
import { color } from "../style/color";
import apiController from "../../js/ApiController";

const MainCalender = () => {
  const [dates, setDates] = useState([]);
  const [nowDate, setNowDate] = useState(new Date());
  const [todos, setTodos] = useState([]);

  const getYearMonth = (date) => {
    return date.getFullYear() + "년 " + (date.getMonth() + 1) + "월";
  };

  const getDays = (date) => {
    date.setDate(1);
    var startDate = new Date(date);
    var tempDate = new Date(startDate);
    var monthDates = [];
    startDate.setDate(startDate.getDate() - startDate.getDay());
    for (let i = 0; i < 6 * 7; i++) {
      tempDate = new Date(addDays(startDate, i));
      monthDates.push(new Date(tempDate));
    }

    setDates(monthDates);
  };

  const addDays = (date, days) => {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const addMonths = (date, months) => {
    var result = new Date(date);
    result.setMonth(result.getMonth() + months);
    return result;
  };

  useEffect(() => {
    getCalender();
  }, [nowDate]);

  useEffect(() => {
    getDays(nowDate);
  }, [todos]);
  const get2Place = (value) => {
    if (value < 10) {
      return "0" + value;
    }
    return "" + value;
  };

  const dateToString = (date) => {
    var d = new Date(date);
    return (
      d.getFullYear() +
      "-" +
      get2Place(d.getMonth() + 1) +
      "-" +
      get2Place(d.getDate())
    );
  };

  const ChangeResponsibilityToColor = (responsibility) => {
    switch (responsibility) {
      case "ONE":
        return color.red;
      case "TWO":
        return color.orange;
      case "THREE":
        return color.yellow;
      case "FOUR":
        return color.green;
      case "FIVE":
        return color.blue;
      default:
        return color.gray2;
    }
  };

  const getDateString = (date) => {
    return date.split("T")[0];
  };

  const getCalender = async () => {
    try {
      const response = await apiController.get("/api/calender", {
        params: { date: dateToString(nowDate) },
      });

      setTodos(response.data);
    } catch (error) {}
  };

  return (
    <>
      <G.SectionTitle>달력</G.SectionTitle>
      <S.CalenderContainer>
        <S.CalenderHeader>
          <S.DateTitle>{getYearMonth(nowDate)}</S.DateTitle>
          <div>
            <S.MonthButton
              src={Left}
              alt="left"
              onClick={() => {
                setNowDate(addMonths(nowDate, -1));
              }}
            />
            <S.MonthButton
              src={Right}
              alt="right"
              onClick={() => {
                setNowDate(addMonths(nowDate, 1));
              }}
            />
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
            let k = 0;
            return (
              <S.DayCell key={key}>
                <S.DayTitle
                  color={
                    value.getFullYear() === nowDate.getFullYear() &&
                    value.getMonth() === nowDate.getMonth()
                      ? color.black
                      : color.gray3
                  }
                >
                  {value.getDate()}
                </S.DayTitle>
                <S.DayTodoContainer>
                  {todos.map((elem, i) => {
                    if (
                      getDateString(elem["startDate"]) ===
                        dateToString(value) &&
                      k < 4
                    ) {
                      k++;
                      return (
                        <S.DayTodos
                          key={i}
                          color={ChangeResponsibilityToColor(elem["want"])}
                        />
                      );
                    }
                  })}
                </S.DayTodoContainer>
              </S.DayCell>
            );
          })}
        </S.DayContainer>
      </S.CalenderContainer>
    </>
  );
};

export default MainCalender;
