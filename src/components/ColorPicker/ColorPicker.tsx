import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { TwitterPicker } from 'react-color';
import styles from './ColorPicker.module.css';
import { useFirestore } from 'react-redux-firebase';
import { useAppDispatch } from '../../hooks';
import { updateList } from '../../store/list/listActions';

type Props = {
	id: string,
	oldColor: string
}

const ColorPicker: React.FC<Props> = ({ id, oldColor }) => {

	const firestore = useFirestore();
	const dispatch = useAppDispatch();

	const [colorOfCorner, setColorOfCorner] = useState<string>(oldColor);
	const [showingPalette, setShowingPalette] = useState<boolean>(false);


	useEffect(() => {
		setColorOfCorner(oldColor)
	}, [oldColor])

	const handleChangeComplete = (color) => {
		setColorOfCorner(color.hex);
		dispatch(updateList({ firestore }, { listId: id, changes: { color: color.hex } }));
	};

	const onCornerClick = () => {
		setShowingPalette(!showingPalette);
	}

	return <div className={styles.color__picker}>
		<div onClick={onCornerClick} style={{ background: colorOfCorner }} className={styles.color__corner}></div>
		<TwitterPicker color={colorOfCorner} triangle={'top-right'} className={cn(styles.color__colors, styles[`color__colors-${showingPalette}`])} onChangeComplete={handleChangeComplete} />
	</div>
};

export default ColorPicker;
