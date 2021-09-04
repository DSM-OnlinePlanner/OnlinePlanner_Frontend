import '../css/sidebar.css';
import menu from '../img/menu-2.svg';
import checkMark from '../img/check-mark-2.svg';
import refresh from '../img/refresh-3.svg';
import pencil from '../img/pencil.svg';

import {Link} from 'react-router-dom'
import ComponentStateEnum from '../js/componentState.js';
function Sidebar(props) {

  return (
    <div id="sidebar" className="background-gray1">
        <div id='sidebar-container'>
            <ul>
                <li className={props.componentState === ComponentStateEnum.Summary ? 'active' : 'disactive'}>
                    <Link to='/' className='li-link font-no-decoration'><img alt='menu' src={menu} className='filter-gray3'/> <span className='color-gray3 font-18px font-medium'>Summary</span></Link>
                </li>
                <li className={props.componentState === ComponentStateEnum.Todo ? 'active' : 'disactive'}>
                    <Link to='/todo' className='li-link font-no-decoration'><img alt='checkMark' src={checkMark} className='filter-gray3'/> <span className='color-gray3 font-18px font-medium'>To do</span></Link>
                </li>
                <li className={props.componentState === ComponentStateEnum.Routine ? 'active' : 'disactive'}>
                    <Link to='/routine' className='li-link font-no-decoration '><img alt='refresh' src={refresh} className='filter-gray3'/> <span className='color-gray3 font-18px font-medium'>Routine</span></Link>
                </li>
                <li className={props.componentState === ComponentStateEnum.Recode ? 'active' : 'disactive'}>
                    <Link to='/recode' className='li-link font-no-decoration '><img alt='refresh' src={pencil} className='filter-gray3'/> <span className='color-gray3 font-18px font-medium'>Recode</span></Link>
                </li>
            </ul>
        </div>
        <div id='sidebar-left-line' className='background-gray2'></div>
    </div>
  );
}
export default Sidebar;
