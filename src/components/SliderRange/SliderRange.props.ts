export interface SliderRangeProps {
  sliderValues: number[];
  min: number;
  max: number;
  onAfterChange: () => void;
  handleChange: (values: number | number[]) => void;
}
