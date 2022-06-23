import React, { ReactNode } from 'react';
import styles from './Button.module.css';
import cn from 'classnames';

type Props = {
	action: string,
	children?: ReactNode,
	type?: "button" | "submit" | "reset",
	onClick?: React.MouseEventHandler<HTMLButtonElement>,
	className?
}

const Button: React.FC<Props> = (props) => {
	return <button className={cn(styles.button, styles[props.action])} type={props.type} onClick={props.onClick}>{props.children}</button>
};

export default Button;
