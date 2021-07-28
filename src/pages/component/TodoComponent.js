import { useState } from "react";
import './todoComponent.css';

function TodoComponent(props){
    const title = props.title
    const content = props.content
    const startTime = props.startTime
    const endTime = props.endTime
    const status = props.status
    const importance = props.importance
    const responsibility = props.responsibility

    const getTimeFromStartEndTime = (startTime, endTime) => {
        const nowDate = new Date();
        var str = "";
        if(nowDate.getFullYear() === startTime.getFullYear() && nowDate.getMonth() === startTime.getMonth()){
            //시작날짜가 오늘이면
            if( nowDate.getDate() === startTime.getDate()){ 
                str += startTime.getHours() + ":00 ~ ";
            }
            //시작 날짜가 어제면
            else if(nowDate.getDate() - startTime.getDate() === 1){
                str += "어제 ~ "
            }
            //시작 날짜가 어제 미만이면
            else{
                str += startTime.getMonth() + "." + startTime.getDate() + " ~ "
            }
        }
        //시작 날짜가 어제 미만이면
        else{
            str += startTime.getMonth() + "." + startTime.getDate()
        }
        
        if(nowDate.getFullYear() === startTime.getFullYear() && nowDate.getMonth() === startTime.getMonth()){
            //끝나는 날짜가 오늘이면
            if(nowDate.getDate() === endTime.getDate()){
                str += endTime.getHours() + ":00"
            }
            //끝나는 날짜가 내일이면
            else if(endTime.getDate() - nowDate.getDate() === 1){
                str += "내일"
            }
            else{
                str += endTime.getMonth() + '.' + endTime.getDate();
            }
        }
        else{
            str += endTime.getMonth() + '.' + endTime.getDate();
        }
        
        return str;
    }

    return(
        <div className={("responsibility" + responsibility) + " todo-container border-radius-10px " + (status ? 'complete' : '')}>
            <div className='todo-inner color-white font-regular'>
                <div className="todo-title">
                    <span className="font-18px font-medium">{title}</span> <span className='font-16px'>{"중요도 : " + importance}</span>
                </div>
                <div>
                    <span>{content}</span> <span>{getTimeFromStartEndTime(startTime, endTime)}</span>
                </div>
            </div>
        </div>
    );
}

export default TodoComponent;