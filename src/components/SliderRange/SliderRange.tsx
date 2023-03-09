import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import styles from './SliderRange.module.scss';

import { SliderRangeProps } from './SliderRange.props';

export const SliderRange = ({ sliderValues, handleChange, min, max }: SliderRangeProps) => {
  return (
    <div className={styles.sliderContainer}>
      <div className={styles.sliderText}>
        {sliderValues[0]}⟷{sliderValues[1]}
      </div>
      <div>
        <div>
          <Slider range value={sliderValues} step={1} onChange={handleChange} min={min} max={max} />
        </div>
      </div>
    </div>
  );
};
