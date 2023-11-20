import CalenderSlider from "./CalendarSlider";
import { useRef, useState } from "react";
import _ from "lodash";
import { DAYS_LIST, MONTHS_LIST } from '../../../constants';
import DayCalenderSlide from "./DayCalenderSlide";

const getFullSchedule = (year, month, date) => {
    return [];
}

const getCalenderData = (year, month, date) => {
    const dateObject = new Date(year, month, date);
    const monthText = MONTHS_LIST[month];
    const daysText = DAYS_LIST[dateObject.getDay()];
    return {
        year,
        month,
        date,
        monthText,
        daysText,
        title: daysText,
        fullSchedule: getFullSchedule(year, month, date),
    }
}

const dateMinusOne = (year, month, date) => {
    const dateObject = new Date(year, month, date);
    dateObject.setDate(dateObject.getDate() - 1);
    return [dateObject.getFullYear(), dateObject.getMonth(), dateObject.getDate()];
}

const datePlusOne = (year, month, date) => {
    const dateObject = new Date(year, month, date);
    dateObject.setDate(dateObject.getDate() + 1);
    return [dateObject.getFullYear(), dateObject.getMonth(), dateObject.getDate()];
}

export default function DayCalender() {
    const dateObject = useRef(new Date());
    const month = dateObject.current.getMonth();
    const year = dateObject.current.getFullYear();
    const date = dateObject.current.getDate();

    const [sliderData, setSliderData] = useState([getCalenderData(...dateMinusOne(year, month, date)), getCalenderData(year, month, date), getCalenderData(...datePlusOne(year, month, date))])

    const setSliderDataBack = (year, month, date) => {
        setSliderData(arr => {
            const newArr = _.cloneDeep(arr);
            newArr.push(getCalenderData(year, month, date));
            newArr.shift();
            return newArr;
        })
    }

    const setSliderDataFront = (year, month, date) => {
        setSliderData(arr => {
            const newArr = _.cloneDeep(arr);
            newArr.unshift(getCalenderData(year, month, date));
            newArr.pop();
            return newArr;
        })
    }

    const addItemBack = () => {
        setSliderDataBack(...datePlusOne(sliderData[2].year, sliderData[2].month, sliderData[2].date));
    }

    const addItemFront = () => {
        setSliderDataFront(...dateMinusOne(sliderData[0].year, sliderData[0].month, sliderData[0].date));
    }

    const edgesFill = () => {
        setSliderData(arr => {
            const newArr = _.cloneDeep(arr);
            newArr[0] = getCalenderData(...dateMinusOne(year, month, date));
            newArr[1] = getCalenderData(year, month, date);
            newArr[2] = getCalenderData(...datePlusOne(year, month, date));
            return newArr;
        })
    }

    const getSwipeDirection = () => {
        if (sliderData[1].year === year) {
            if (sliderData[1].month === month) {
                if (sliderData[1].date === date) {
                    return undefined;
                }
                return sliderData[1].date < date;
            }
            return sliderData[1].month < month;
        }
        return sliderData[1].year < year;
    }

    const squareOne = () => {
        const isRight = getSwipeDirection();
        if (isRight === undefined) return;
        isRight ? setSliderDataBack(year, month, date) : setSliderDataFront(year, month, date);
        return isRight;
    }

    return (
        <CalenderSlider
            SliderChild={DayCalenderSlide}
            sliderData={sliderData}
            addItemBack={addItemBack}
            addItemFront={addItemFront}
            squareOne={squareOne}
            edgesFill={edgesFill}
        />
    )
}
