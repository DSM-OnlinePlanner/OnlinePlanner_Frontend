import { useCallback, useEffect, useMemo, useState } from 'react';
import Calender from '../calender';
import { color } from '../style/color';
import * as S from './Styles';


const TodoModal = ({ planner, activefunction}) => {
    const [ plannerState, setPlannerState ] = useState({...planner});
    const [isModify, setIsModify] = useState(false);
    const { title, priority, success, startDate, endDate, pushed, want, content, startTimeDate, endTimeDate , failed} = plannerState;

    const get2Place = (value) => {
        if(value < 10){
            return "0" + value;
        }
        return "" + value;
    }

    const dateToTimeString = (date) => {
        var d = new Date(date);
        return get2Place(d.getHours()) + ":" + (get2Place(d.getMinutes()));
    }

    const [times, setTimes] = useState({
        start: dateToTimeString(startTimeDate),
        end : dateToTimeString(endTimeDate)
    });

    const onTimeChange = (e) => {
        setTimes({...times, [e.target.name] : e.target.value })
        console.log(e.target.name);
        console.log(e.target.value);
        console.log(times);
    }

    useEffect(() => {
        var s = new Date(startTimeDate);
        var canChange = false;
        var split = times['start'].split(":");
        s.setHours(split[0], split[1]);
        if(s >= endTimeDate){
            s = new Date(startTimeDate);
            canChange = true;
        }
        
        var e = new Date(endTimeDate);
        split = times['end'].split(":");
        e.setHours(split[0], split[1]);
        if(e <= startTimeDate){
            e = new Date(endTimeDate);
            canChange = true;
        }
        if(canChange){
            setTimes({...times, 'start' : dateToTimeString(s), 'end' : dateToTimeString(e)});
        }
        setPlannerState({...plannerState, 'startTimeDate' : s, 'endTimeDate' : e});
    },[times]);

    const [tempStartDate, setTempStartDate] = useState(startDate);
    const [tempEndDate, setTempEndDate] = useState(endDate);

    const [calenderState, setCalenderState] = useState(0);
    
    const onChangeHandler = (e) => {
        setPlannerState({...plannerState, [e.target.name] : e.target.value })
        console.log(e.target.name);
        console.log(e.target.value);
        console.log(plannerState);
    }
    useEffect(() => {console.log(plannerState);}, [plannerState]);
    
    useEffect(() => {
        setPlannerState({...plannerState, 'startDate' : tempStartDate, 'endDate' : tempEndDate});
    }, [tempStartDate, tempEndDate]);

    useEffect(() => {console.log(endTimeDate);}, []);
    const setMember = (name, value) => {
        setPlannerState({...plannerState, [`${name}`] : value});
    }

    const getRelativeTime = (time) => {
         return (time.getFullYear()) + "." + (time.getMonth() + 1) + "." + time.getDate();
    }


    const ChangeResponsibilityToColor = (responsibility, status) => {
        if(status){
            return color.gray2;
        }
        switch(responsibility){
            case 1:
                return color.red;
            case 2:
                return color.orange;
            case 3:
                return color.yellow;
            case 4:
                return color.green;
            case 5:
                return color.blue;
            default:
                return color.gray2;
        }
    }

    return (
        <>
            <S.ModalContainer>
                <S.ModalBack onClick={() => {activefunction(false)}}/>
                <S.ModalOuter>
                    <S.Title>
                        <S.TitleInner>
                            <S.Input 
                                placeholder="제목을 입력해주세요."
                                type="text"
                                name="title" 
                                value={title} 
                                onChange={onChangeHandler} 
                                disabled={!isModify}/>    
                        </S.TitleInner>
                        {(!success && !failed) && <S.Modify onClick={() => {setIsModify(!isModify)}}>{!isModify ? "수정" : "완료"}</S.Modify>}
                    </S.Title>
                    <S.InfoGrid>
                        <S.Subtitle>기간 </S.Subtitle>
                        <S.SubtitleContent>
                            <S.DateLabel 
                                isModify={isModify} 
                                onClick={() => {
                                    if(isModify)
                                        setCalenderState(calenderState === 1 ? 0 : 1);
                                }}>
                                {getRelativeTime(startDate)}
                            </S.DateLabel>
                            <Calender 
                                nowDate={tempStartDate}
                                setNowDate={setTempStartDate} 
                                isCalenderOn={calenderState === 1} />
                            <S.Temp>
                                ~
                            </S.Temp>
                            <S.DateLabel 
                                isModify={isModify}
                                onClick={() => {
                                    if(isModify)
                                        setCalenderState(calenderState === 2 ? 0 : 2);
                                }}>
                                {getRelativeTime(endDate)}
                            </S.DateLabel>
                            <Calender 
                                nowDate={tempEndDate} 
                                setNowDate={setTempEndDate} 
                                isCalenderOn={calenderState === 2}/>
                        </S.SubtitleContent>
                        <S.Subtitle>시간 </S.Subtitle>
                        <S.SubtitleContent>
                            <S.InputTime type="time" name="start"  step="900" required={true} disabled={!isModify}
                                value={times['start']}
                                onChange={onTimeChange}
                            />
                            <span>~</span>
                            <S.InputTime type="time" name="end" step="900" required={true} disabled={!isModify}
                                value={times['end']}
                                onChange={onTimeChange}
                            />
                        </S.SubtitleContent>
                        <S.Subtitle>우선도</S.Subtitle>
                        <S.SubtitleContent>
                            {
                                !isModify ? 
                                <S.Circle color={ChangeResponsibilityToColor(want)} bool={true}/>
                                :
                                <S.CircleContainer>
                                    {
                                        [1, 2, 3, 4, 5].map((value) => {
                                            return(
                                                <S.Circle bool={want === value} color={ChangeResponsibilityToColor(value)} onClick={() => {setMember('want', value)}}></S.Circle>
                                            );
                                        })
                                    }
                                </S.CircleContainer>
                            }
                        </S.SubtitleContent>
                        <S.Subtitle>중요도</S.Subtitle>
                        <S.SubtitleContent>
                            {
                                !isModify ? 
                                priority
                                :
                                <S.CircleContainer>
                                    {
                                    ['A', 'B', 'C', 'D', 'E'].map((value) => {
                                        return (
                                            <S.PriorityDiv bool={priority === value} onClick={() => {setMember('priority', value)}}>{value}</S.PriorityDiv>
                                        );
                                    })
                                    }
                                </S.CircleContainer>
                            }
                        </S.SubtitleContent>
                        <S.Subtitle>성공여부</S.Subtitle>
                        <S.SubtitleContent>
                        {
                            success ? "완료" : ""
                        }
                        {
                            failed ? "실패" : ""
                        }
                        {
                            (!success && !failed) ? "진행중" : "" 
                        }
                        </S.SubtitleContent>
                        <S.Subtitle>알림</S.Subtitle>
                        <S.SubtitleContent>{pushed ? "켜짐" : "꺼짐"}</S.SubtitleContent>
                        <S.Subtitle>내용</S.Subtitle>
                    </S.InfoGrid>
                    <S.Content>
                        <S.InputContent
                                placeholder="내용을 입력해주세요."
                                type="text"
                                name="content" 
                                value={content} 
                                onChange={onChangeHandler} 
                                disabled={!isModify}/>    
                    </S.Content>
                    {
                        (!success && !failed)
                        &&
                        <S.ButtonContainer>
                            <S.Button color={color.red} onClick={() => {
                                setPlannerState({...plannerState, 'failed' : true});
                            }}>실패</S.Button>
                            <S.Button color={color.blue} onClick={() => {
                                setPlannerState({...plannerState, 'success' : true});
                            }}>성공</S.Button>
                        </S.ButtonContainer>
                    }
                </S.ModalOuter>
            </S.ModalContainer>
        </>
    );

}

export default TodoModal;