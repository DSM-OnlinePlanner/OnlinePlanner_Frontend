export class Time{
    constructor(date){
        this.hour = date.getHours();
        this.minute = date.getMinutes();
        this.second = 0;
        this.nano = 0;
    }
    toJson(){
        return {
            hour: this.hour,
            minute: this.minute,
            second: this.second,
            nano: this.nano
        };
    }
}

export class Planner{
    constructor(title, content, priority, want, startDate, endDate, startTime, endTime, isPushed){
        this.title = title;
        this.content = content;
        this.priority = priority;
        this.want = want;
        startDate.setDate(startDate.getDate() + 1);
        this.startDate = startDate.toISOString().split('T')[0];
        endDate.setDate(endDate.getDate() + 1);
        this.endDate = endDate.toISOString().split('T')[0];
        this.startTime = startTime;
        this.endTime = endTime;
        this.isPushed = isPushed;
    }
    
    setDataFromIdAndIsSuccess(plannerId, isSuccess){
        this.plannerId = plannerId;
        this.isSuccess = isSuccess;
    }

    toJson(){
        return {
            title: this.title,
            content: this.content,
            priority: this.priority,
            want : this.want,
            startDate: this.startDate,
            endDate: this.endDate,
            startTime: this.startTime.toJson(),
            endTime: this.endTime.toJson(),
            isPushed: this.isPushed
        }
    }

    
}