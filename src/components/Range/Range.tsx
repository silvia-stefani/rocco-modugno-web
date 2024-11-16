import * as React from 'react';
import { ChangeEventHandler, useEffect, useRef, useState } from 'react';

import styles from './Range.module.scss';
import Icon from 'components/Icon/Icon';

interface IRangeProps {
    id: string,
    defaultValue: number,
    onChange: (n: string) => void;
}

const Range: React.FunctionComponent<IRangeProps> = ({id, defaultValue, onChange}) => {

    const [moveAirplane, setMoveAirplane] = useState(0)
    const airplaneRef = useRef(null)

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const value = e.currentTarget.value;
        onChange(value)
        setMoveAirplane(Number(value) * 10)        
    }

    useEffect(() => {
        setMoveAirplane(defaultValue * 10)    
    }, []);

    if(!moveAirplane) return null;

    return <div className={styles.Range}>
        <div ref={airplaneRef} className={styles.value}>
            <span className={styles.icon} style={{left: `${moveAirplane}%`}}><Icon size={16} name={"Airplane"} /></span>
        </div> 
        <input defaultValue={defaultValue} type="range" name={id} id={id} min={0.25} max={10} step={0.1} onChange={handleChange} />
    </div>
};

export default Range;
