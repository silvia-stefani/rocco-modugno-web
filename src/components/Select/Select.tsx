import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import './Select.scss';
import Icon from 'components/Icon/Icon';
import { Option } from 'types/Option';

interface ISelectProps {
    options: Option[];
    defaultValue: string;
    getCurrentValue: (value: string) => void;
}

interface Position {
    top: number;
    left: number;
}

const Select: React.FunctionComponent<ISelectProps> = ({ options, defaultValue, getCurrentValue }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string>(defaultValue);
    const [selectPosition, setSelectPosition] = useState<Position | null>(null);
    const selectRef = useRef<HTMLDivElement>(null);
    const optionsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {

        const handleOutsideClick = (event: MouseEvent) => {
            if (
                selectRef.current &&
                !selectRef.current.contains(event.target as Node) &&
                optionsRef.current &&
                !optionsRef.current.contains(event.target as Node) // Ignore clicks inside options container
            ) {
                setIsOpen(false);
            }
        };

        const handleScroll = () => {
            setIsOpen(false);
        };

        document.addEventListener('mousedown', handleOutsideClick);
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleScroll);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, []);

    const toggleSelect = () => {
        setIsOpen(!isOpen);
        if (selectRef.current) {
            const rect = selectRef.current.getBoundingClientRect();
            setSelectPosition({ top: rect.top + rect.height, left: rect.left });
        }
    };

    const handleOptionClick = (option: Option) => {
        setSelectedOption(option.value);
        getCurrentValue(option.value)
        setIsOpen(false); 
    };

    const optionSelected = options.find((o) => o.value === selectedOption);

    return <div className={'Select'} ref={selectRef}>
        <div className={'current_value'} onClick={toggleSelect}>
            <Icon size={14} name={"Select"} />
            {optionSelected ? optionSelected.label : 'Select an option'}
        </div>
        {isOpen && selectPosition && (
            createPortal(
                <div className={"select_options"} style={{ top: selectPosition.top, left: selectPosition.left }} onMouseLeave={() => setIsOpen(false)}>
                    {options.map(option => {
                        const isSelected = option.value === optionSelected?.value;
                        return (
                            <div
                                key={option.value}
                                className={`select_option${isSelected ? ' selected' : ''}`}
                                onClick={() => handleOptionClick(option)}
                            >
                                {option.label}
                            </div>
                        )
                    })}
                </div>,
                document.body
            )
        )}
    </div>;
};

export default Select;
