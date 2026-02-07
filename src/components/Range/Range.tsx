import * as React from 'react';
import { ChangeEventHandler, useEffect, useRef, useState } from 'react';

import styles from './Range.module.scss';
import Icon from 'components/Icon/Icon';

interface IRangeProps {
    id: string,
    defaultValue: number,
    min?: number,
    max?: number,
    step?: number,
    label?: string,
    onChange: (n: string) => void;
}

const Range: React.FunctionComponent<IRangeProps> = ({ id, defaultValue, min = 0, max = 10, step = 0.1, label, onChange }) => {

    const [percentage, setPercentage] = useState(0)
    const airplaneRef = useRef(null)

    const calculatePercentage = (val: number) => {
        return ((val - min) / (max - min)) * 100;
    }

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const value = e.currentTarget.value;
        onChange(value)
        setPercentage(calculatePercentage(Number(value)))
    }

    useEffect(() => {
        setPercentage(calculatePercentage(defaultValue))
    }, [defaultValue, min, max]);

    return <div className={styles.Range}>
        {label && <div className={styles.label}>{label}</div>}
        <div className={styles.input_container}>
            <div ref={airplaneRef} className={styles.value}>
                <span className={styles.icon} style={{ left: `${percentage}%` }}><Icon size={16} name={"Airplane"} /></span>
            </div>
            <input defaultValue={defaultValue} type="range" name={id} id={id} min={min} max={max} step={step} onChange={handleChange} />
        </div>
    </div>
};

export default Range;
