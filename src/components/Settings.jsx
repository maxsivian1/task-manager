// Settings.jsx

import { useState, useRef } from "react";
import styles from "./Settings.module.css";
import SettingsSVG from './SettingsSVG'
import SOLID_DELETE_ICON from "../assets/solid_delete.json";
import { Player } from '@lordicon/react';
import { useDispatch } from "react-redux";
import { clearLocalStorage, clearCompletedTasks } from "../redux/tasksSlice";
import { changeColorTheme } from "../redux/themesSlice";


const Settings = () => {
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [isRendered, setIsRendered] = useState(false); // Controls actual DOM presence
    const [shouldAnimate, setShouldAnimate] = useState(false); // Controls animation timing

    const playerRef = useRef(null);
    const playerRef1 = useRef(null);

    const dispatch = useDispatch();
    

    const handleClick = () => {
        if (isMenuVisible) {
            // Start fade-out animation, then remove from DOM
            setShouldAnimate(false);
            setTimeout(() => setIsRendered(false), 300);
        } else {
            // First, add to the DOM
            setIsRendered(true);

            // Delay animation slightly so it fades in smoothly
            setTimeout(() => setShouldAnimate(true), 10);
        }
        setIsMenuVisible(!isMenuVisible);
    };

    const handleOutsideClick = (e) => {
        if (e.target.classList.contains(styles.overlay)) {
            // setIsMenuVisible(true)
            handleClick()
        }
    };

    const handleCloseButton = (e) => {
        // setIsMenuVisible(true)
        handleClick()
    };

    const handleColorButtons = (e) => {
        const mode = e.target.name;
        dispatch(changeColorTheme(mode))
    };


    return (
        <div className={styles.container}>
            <button onClick={handleClick} className={styles.button} tabIndex={-1}>
                <div className={styles.icon}>
                    <SettingsSVG />
                </div>
            </button>
            {isRendered && (
                <div className={styles.overlay} onClick={handleOutsideClick}>
                    <div className={`${styles.box} ${shouldAnimate ? styles.show : styles.hide}`}>
                        <button className={styles.closeButton} onClick={handleCloseButton}>x</button>
                        <div>
                            <button onClick={() => dispatch(clearLocalStorage())} onMouseEnter={() => { playerRef.current?.playFromBeginning() }}>
                                <span>Clear all tasks</span>
                                <span>
                                    <Player
                                        ref={playerRef}
                                        icon={SOLID_DELETE_ICON}
                                        colors='secondary:crimson,tertiary:crimson'
                                    />
                                </span>
                            </button>
                        </div>
                        <div>
                            <button onClick={() => dispatch(clearCompletedTasks())} onMouseEnter={() => { playerRef1.current?.playFromBeginning() }}>
                                <span>Clear finished tasks</span>
                                <span>
                                    <Player
                                        ref={playerRef1}
                                        icon={SOLID_DELETE_ICON}
                                        colors='secondary:crimson,tertiary:crimson'
                                    />
                                </span>
                            </button>
                        </div>
                        <div className={styles.colorThemeBox}>
                            <h3>Themes</h3>
                            <button onClick={handleColorButtons} name="blue" className={styles.blueTheme}>CADET BLUE</button>
                            <button onClick={handleColorButtons} name="green" className={styles.greenTheme}>MEDIUM SEA GREEN</button>
                            <button onClick={handleColorButtons} name="pink" className={styles.purpleTheme}>LIGHT CORAL</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Settings;
