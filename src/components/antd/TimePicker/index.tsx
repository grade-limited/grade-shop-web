import type { Moment } from "moment";
import * as React from "react";
import type { RangePickerTimeProps } from "antd/es/date-picker/generatePicker";
import DatePicker from "../DatePicker";

export interface TimePickerProps
	extends Omit<RangePickerTimeProps<Moment>, "picker"> {}

const TimePicker = React.forwardRef<any, TimePickerProps>((props, ref) => (
	<DatePicker.RangePicker
		{...props}
		picker="time"
		mode={undefined}
		ref={ref}
	/>
));

TimePicker.displayName = "TimePicker";

export default TimePicker;
