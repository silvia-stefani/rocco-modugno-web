import * as React from 'react';

import styles from './ActionsMenu.module.scss';

interface IActionsMenuProps {
    actions: {
        id: string,
        label: string,
        keyPress: string
    }[]
}

const ActionsMenu: React.FunctionComponent<IActionsMenuProps> = ({actions}) => {
  return <div className={styles.ActionsMenu}>
    <div className={styles.container}>
    {actions.map((action) => (
        <div key={action.id} className={styles.action}>
          <div className={styles.label}>{action.label}</div>
          <div className={styles.key}>{action.keyPress}</div>
        </div>
    ))}
    </div>
  </div>;
};

export default ActionsMenu;
