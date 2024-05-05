import * as React from 'react';
import { icons } from './icons';
import styles from './Icon.module.scss';

interface IIconProps {
    size?: 14 | 16 | 24 | 32 | 48;
    name: keyof typeof icons;
}

const Icon: React.FunctionComponent<IIconProps> = ({name, size = 24}) => {
    
    const IconComponent = icons[name];
    
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={styles.Icon} fill="none" width={size} height={size} viewBox="0 0 100 100">
            {IconComponent && <IconComponent />}
        </svg>
    );

};

export default Icon;
