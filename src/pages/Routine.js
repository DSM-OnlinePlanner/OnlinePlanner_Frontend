import '../css/routine.css';
import ComponentStateEnum from '../js/componentState.js';
import {useEffect} from 'react';

function Routine(props){
    useEffect(() => {
        props.setcomponentState(ComponentStateEnum.Routine); //루틴이 마운트 되면 상태를 루틴으로 바꾼다
    }, []);
    return(
        <div id='routine-container'>
            a
        </div>
    );
}

export default Routine;