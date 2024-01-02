import * as React from 'react';

import styles from './Paragraph.module.scss';

interface IParagraphProps {
    text: string;
}

const Paragraph: React.FunctionComponent<IParagraphProps> = ({ text }) => {
    const beautyP = text.split("*enter*");

    return <div className={styles.Paragraph}>{beautyP.map((paragraph, i) => (
        <div key={i} className={styles.item}>{paragraph}</div>
    ))}</div>
};

export default Paragraph;
