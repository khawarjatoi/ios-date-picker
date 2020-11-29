import React from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import './css/Wheel.css';
import { days, years, months } from './Date';

interface IProps {
  perspective?: string;
  loop?: boolean;
  width: number;
  types: string;
  initIdx: string;
  label?: string;
  textColor?: string;
  setValue?: (_: any, idx: any) => string;
}

const Wheel = (props: IProps) => {
  const perspective = props.perspective || 'center';
  const wheelSize = 15;
  const slideType =
    (props.types === 'days' && days) ||
    (props.types === 'years' && years) ||
    (props.types === 'months' && months);
  // console.log(slideType);
  const slides = slideType.length;
  const slideDegree = 360 / wheelSize;
  const slidesPerView = props.loop ? 9 : 1;
  const [sliderState, setSliderState] = React.useState(null);
  const [sliderRef, slider] = useKeenSlider({
    centered: props.loop,
    vertical: true,
    friction: 0.0025,
    initial: slideType.indexOf(props.initIdx) || 0,
    loop: props.loop,
    dragSpeed: (val, instance) => {
      const height = instance.details().widthOrHeight;
      return (
        val *
        (height /
          ((height / 2) * Math.tan(slideDegree * (Math.PI / 180))) /
          slidesPerView)
      );
    },
    move: (s: any) => {
      setSliderState(s.details());
    },
    rubberband: !props.loop,
    mode: 'free-snap',
    slides,
    slidesPerView,
  });

  const [radius, setRadius] = React.useState(0);

  React.useEffect(() => {
    if (slider) setRadius(slider.details().widthOrHeight / 2);
  }, [slider]);

  function slideValues() {
    if (!sliderState) return [];
    const offset = props.loop ? 1 / 2 - 1 / slidesPerView / 2 : 0;

    const values = [];
    for (let i = 0; i < slides; i++) {
      const distance =
        sliderState && sliderState.positions
          ? (sliderState.positions[i].distance - offset) * slidesPerView
          : 0;
      const rotate =
        Math.abs(distance) > wheelSize / 2
          ? 180
          : distance * (360 / wheelSize) * -1;
      const style = {
        transform: `rotateX(${rotate}deg) translateZ(${radius}px)`,
        WebkitTransform: `rotateX(${rotate}deg) translateZ(${radius}px)`,
      };
      const value = props.setValue
        ? props.setValue(i, sliderState.absoluteSlide + Math.round(distance))
        : slideType[i];
      // console.log(value, style);
      values.push({ style, value });
    }
    return values;
  }

  return (
    <div
      className={'wheel keen-slider wheel--perspective-' + perspective}
      ref={sliderRef as React.RefObject<HTMLDivElement>}
    >
      <div
        className='wheel__shadow-top'
        style={{
          transform: `translateZ(${radius}px)`,
          WebkitTransform: `translateZ(${radius}px)`,
        }}
      />
      <div className='wheel__inner'>
        <div className='wheel__slides' style={{ width: props.width + 'px' }}>
          {slideValues().map(({ style, value }, idx) => (
            <div className='wheel__slide' style={style} key={idx}>
              <p
                className='wheel__slide_text'
                style={{ color: props.textColor }}
              >
                {value}
              </p>
            </div>
          ))}
        </div>
        {props.label && (
          <div
            className='wheel__label'
            style={{
              transform: `translateZ(${radius}px)`,
              WebkitTransform: `translateZ(${radius}px)`,
              color: props.textColor,
            }}
          >
            {props.label}
          </div>
        )}
      </div>
      <div
        className='wheel__shadow-bottom'
        style={{
          transform: `translateZ(${radius}px)`,
          WebkitTransform: `translateZ(${radius}px)`,
        }}
      />
    </div>
  );
};

export default Wheel;
