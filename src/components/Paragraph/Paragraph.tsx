import * as React from 'react';

import styles from './Paragraph.module.scss';

interface IParagraphProps {
    text: string;
    size?: "normal" | "small";
}

const Paragraph: React.FunctionComponent<IParagraphProps> = ({ text, size = "normal" }) => {
    const beautyP = text.split("*enter*");

    return <div className={`${styles.Paragraph} ${styles[size]}`}>{beautyP.map((paragraph, i) => (
        <div key={i} className={styles.item}>{paragraph}</div>
    ))}</div>
};

export default Paragraph;
