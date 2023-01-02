import React, { useRef, DetailedHTMLProps, InputHTMLAttributes, FC, useEffect } from 'react';
import "./RangeSlider.scss"

interface IProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> { duration?: number }


const RangeSlider: FC<IProps> = ({ duration, ...props }) => {
    const fillRef = useRef<HTMLSpanElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (fillRef.current) {
            fillRef.current.style.width = e.target.value + '%'
        }
    }

    useEffect(() => {
        if (fillRef.current && inputRef.current) {
            fillRef.current.style.width = inputRef.current.value + "%"
        }
    }, [fillRef.current, inputRef.current])


    return (
        <div className="slider__wrapper">
            <span className="slider__bar">
                <span className="slider__fill" ref={fillRef}></span>
            </span>
            <input className="slider" type="range" onInput={onInput} {...props} ref={inputRef} />
        </div>
    );
};

export default RangeSlider;