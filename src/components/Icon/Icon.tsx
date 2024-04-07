import * as React from 'react';
import { icons } from './icons';
import styles from './Icon.module.scss';

interface IIconProps {
    size?: 16 | 24 | 32 | 48;
    name: keyof typeof icons;
}

const Icon: React.FunctionComponent<IIconProps> = ({name, size = 24}) => {
    
    const IconComponent = icons[name];
    
    return (
        <i className={styles.Icon}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" width={size} height={size} viewBox="0 0 28 28">
            {IconComponent && <IconComponent />}
            </svg>
        </i>
    );

};

export default Icon;
