import {useState} from 'react';
import {BsPauseCircle,BsPlayCircle} from 'react-icons/bs';
import {BiStopCircle} from 'react-icons/bi';
import {RiRestartLine} from 'react-icons/ri';
var dif=0;
const App=()=>{
    const [date,setDate]=useState([0,0,0,0]);
    const [list,setList]=useState([]);
    const [ps,setPS]=useState('p')
    const [pr,setPR]=useState('P')
    const dateFunction=()=>{
        dif+=1;
        const hour=Math.floor(dif/36000);
        const minute=Math.floor((dif/60-hour*60)/100);
        const second=Math.floor((dif-minute*60-hour*60)/100);
        const milli=Math.floor(dif-second*100-minute*60-hour*60)
        setDate([hour,minute,second,milli])
    }
    var [timer,setTimer]=useState(null);
    const playFunction=()=>{
        setDate([0,0,0,0]);
        dif=0;
        setTimer(setInterval(dateFunction,10));
        setPS('s');
        setPR('r');
        setList([]);
    }
    const pauseFunction=()=>{
        clearInterval(timer)
        setPR('p');
        setPS('s');
    }
    const replayFunction=()=>{
        setTimer(setInterval(dateFunction,10));
        setPR('r');
        setPS('s')
    }
    const stopFunction=()=>{
        clearInterval(timer);
        setList([...list,date]);
        dif=0;
        setPS('p');
        setPR('r')
    }
    return (
        <div className='stopwatch'><h1 className='main'>
                <span className='section hour'>{date[0]}</span>:
                <span className='section minute'>{date[1]}</span>:
                <span className='section second'>{date[2]}</span>:
                <span className='section milli'>{date[3]}</span>
            </h1>
            <h1 className='btns'>
               {ps==='p'?<BsPlayCircle className='btn play' onClick={playFunction}/>:
               <BiStopCircle className='btn stop' onClick={stopFunction}/>}
               {pr==='p'?<RiRestartLine className='btn restart'onClick={replayFunction}/>:
               <BsPauseCircle className='btn pause' onClick={pauseFunction}/>}
            </h1>
            {list !== null&&list.map((item)=>{
                return (
                    <p key={item} className='listItem'>{item[0]}:{item[1]}:{item[2]}:{item[3]}</p>
                )
            })}
        </div>
    )
}
export default App;