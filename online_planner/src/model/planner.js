export class Planner{
    constructor(id, title, content, priority, want, startTime, endTime, startDate, endDate, success, pushed, failed){
        this.id = id;
        this.title = title;
        this.content = content;
        this.priority = priority;
        this.want = want;
        this.startDate = new Date(startDate);
        this.endDate = new Date(endDate);

        var tempDate = new Date(this.startDate);
        tempDate.setHours(startTime['hour'], startTime['minute'], startTime['second'], startTime['nano']);
        this.startTimeDate = new Date(tempDate);
        
        tempDate = new Date(this.endDate);
        tempDate.setHours(endTime['hour'], endTime['minute'], endTime['second'], endTime['nano']);
        this.endTimeDate = new Date(tempDate);
        // startDate.setDate(startDate.getDate() + 1);
        // this.startDate = startDate.toISOString().split('T')[0];
        
        // endDate.setDate(endDate.getDate() + 1);
        // this.endDate = endDate.toISOString().split('T')[0];
        
        this.success = success;
        this.pushed = pushed;
        this.failed = failed;
    }

    setDataFromIdAndIsSuccess(plannerId, isSuccess){
        this.plannerId = plannerId;
        this.isSuccess = isSuccess;
    }

    toPostJson(){
        var stemp = new Date(this.startDate);
        var etemp = new Date(this.endDate);
        stemp.setDate(stemp.getDate() + 1);
        stemp = stemp.toISOString().split('T')[0];
        
        etemp.setDate(etemp.getDate() + 1);
        etemp = etemp.toISOString().split('T')[0];
        
        return {
            title: this.title,
            content: this.content,
            priority: this.priority,
            want : this.want,
            startDate: stemp,
            endDate: etemp,
            startTime: this.startTime1,
            endTime: this.endTime1,
            isPushed: this.pushed
        }
    }

    
}