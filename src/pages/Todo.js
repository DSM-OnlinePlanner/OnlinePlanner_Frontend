import '../css/Todo.css';
import ComponentStateEnum from '../js/componentState.js';
import { useEffect} from 'react';

function Todo(props){
    useEffect(() => {
        props.setcomponentState(ComponentStateEnum.Todo); //할 일이 마운트 되면 상태를 할 일으로 바꾼다
    }, []);
    return(
        <div id='todo-container'>
            a
        </div>
    );
}

export default Todo;