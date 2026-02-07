import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './Settings.module.scss';
import Icon from 'components/Icon/Icon';
import Range from 'components/Range/Range';
import { useGlobalContext } from 'contexts/GlobalContext';
import { useTranslation } from 'react-i18next';

interface Position {
    top: number;
    left: number;
}

const Settings: React.FunctionComponent = () => {
    const { t } = useTranslation();
    const { filters, setFilters } = useGlobalContext();
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState<Position | null>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
        if (triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            // Align dropdown with the trigger, showing it below
            setDropdownPosition({ top: rect.top + rect.height, left: rect.left });
        }
    };

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (
                triggerRef.current &&
                !triggerRef.current.contains(event.target as Node) &&
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        const handleScrollOrResize = () => {
            setIsOpen(false);
        };

        document.addEventListener('mousedown', handleOutsideClick);
        window.addEventListener('scroll', handleScrollOrResize);
        window.addEventListener('resize', handleScrollOrResize);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
            window.removeEventListener('scroll', handleScrollOrResize);
            window.removeEventListener('resize', handleScrollOrResize);
        };
    }, []);

    const updateFilter = (key: string, value: string) => {
        setFilters((prev) => ({
            ...prev,
            dynamicView: {
                ...prev.dynamicView,
                [key]: Number(value)
            }
        }));
    };

    return (
        <div className={styles.Settings} ref={triggerRef}>
            <div className={styles.trigger} onClick={toggleDropdown}>
                <Icon size={14} name={"Select"} />
                {t('ui.settings') || 'Settings'}
            </div>

            {isOpen && dropdownPosition && createPortal(
                <div
                    ref={dropdownRef}
                    className={styles.dropdown}
                    style={{ top: dropdownPosition.top, left: dropdownPosition.left }}
                >
                    <div className={styles.group}>
                        <Range
                            id="v-velocity"
                            label={t('ui.velocity') || 'Velocity'}
                            defaultValue={filters.dynamicView.velocity}
                            min={0.1}
                            max={3}
                            step={0.05}
                            onChange={(v) => updateFilter('velocity', v)}
                        />
                        <Range
                            id="v-cohesion"
                            label={t('ui.cohesion') || 'Cohesion'}
                            defaultValue={filters.dynamicView.cohesion}
                            min={-1}
                            max={1}
                            step={0.01}
                            onChange={(v) => updateFilter('cohesion', v)}
                        />
                        <Range
                            id="v-alignment"
                            label={t('ui.alignment') || 'Alignment'}
                            defaultValue={filters.dynamicView.alignment}
                            min={-1}
                            max={1}
                            step={0.01}
                            onChange={(v) => updateFilter('alignment', v)}
                        />
                        <Range
                            id="v-separation"
                            label={t('ui.separation') || 'Separation'}
                            defaultValue={filters.dynamicView.separation}
                            min={-1}
                            max={1}
                            step={0.01}
                            onChange={(v) => updateFilter('separation', v)}
                        />
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
};

export default Settings;
