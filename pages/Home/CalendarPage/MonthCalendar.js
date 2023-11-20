import CalenderSlider from "./CalendarSlider";
import { useRef, useState } from "react";
import _ from "lodash";
import { MONTHS_LIST } from "../../../constants";
import MonthCalenderSlide from "./MonthCalenderSlide";

const getFullCalendar = (year, month) => {
    const now = new Date();

    let date = new Date(year, month, 1);
    let calendar = [], week = Array(7).fill(0).map(() => ({}));

    if (date.getDay() !== 0) {
        date.setDate(0);

        while (date.getDay() !== 6) {
            week[date.getDay()].date = date.getDate();
            week[date.getDay()].isCurrent = false;
            week[date.getDay()].isToday = (date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth() && date.getDate() === now.getDate());

            date.setDate(date.getDate() - 1);
        }

        date = new Date(year, month, 1);
    }

    while (date.getMonth() === month) {
        week[date.getDay()].date = date.getDate();
        week[date.getDay()].isCurrent = true;
        week[date.getDay()].isToday = (date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth() && date.getDate() === now.getDate());

        date.setDate(date.getDate() + 1);

        if (date.getDay() === 0) {
            calendar.push([...week]);
            week = Array(7).fill(0).map(() => ({}));
        }
    }

    if (date.getDay() !== 0) {
        while (date.getDay() !== 0) {
            week[date.getDay()].date = date.getDate();
            week[date.getDay()].isCurrent = false;
            week[date.getDay()].isToday = (date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth() && date.getDate() === now.getDate());

            date.setDate(date.getDate() + 1);
        }

        calendar.push([...week]);
    }

    return calendar;
}

const getCalenderData = (year, month) => {
    const monthText = MONTHS_LIST[month];
    return {
        year,
        month,
        title: monthText,
        fullCalendar: getFullCalendar(year, month),
    }
}

const monthMinusOne = (year, month) => {
    return month === 0 ? [year - 1, 11] : [year, month - 1];
}

const monthPlusOne = (year, month) => {
    return month === 11 ? [year + 1, 0] : [year, month + 1];
}

export default function MonthCalendar() {
    const date = useRef(new Date());
    const month = date.current.getMonth();
    const year = date.current.getFullYear();

    const [sliderData, setSliderData] = useState([getCalenderData(...monthMinusOne(year, month)), getCalenderData(year, month), getCalenderData(...monthPlusOne(year, month))])

    const setSliderDataBack = (indexYear, indexMonth) => {
        setSliderData(arr => {
            const newArr = _.cloneDeep(arr);
            newArr.push(getCalenderData(indexYear, indexMonth));
            newArr.shift();
            return newArr;
        })
    }

    const setSliderDataFront = (indexYear, indexMonth) => {
        setSliderData(arr => {
            const newArr = _.cloneDeep(arr);
            newArr.unshift(getCalenderData(indexYear, indexMonth));
            newArr.pop();
            return newArr;
        })
    }

    const addItemBack = () => {
        setSliderDataBack(...monthPlusOne(sliderData[2].year, sliderData[2].month));
    }

    const addItemFront = () => {
        setSliderDataFront(...monthMinusOne(sliderData[0].year, sliderData[0].month));
    }

    const edgesFill = () => {
        setSliderData(arr => {
            const newArr = _.cloneDeep(arr);
            newArr[0] = getCalenderData(...monthMinusOne(year, month));
            newArr[1] = getCalenderData(year, month);
            newArr[2] = getCalenderData(...monthPlusOne(year, month));
            return newArr;
        })
    }

    const getSwipeDirection = () => {
        if (sliderData[1].year === year) {
            if (sliderData[1].month === month) {
                return undefined;
            }
            return sliderData[1].month < month;
        }
        return sliderData[1].year < year;
    }

    const squareOne = () => {
        const isRight = getSwipeDirection();
        if (isRight === undefined) return;
        isRight ? setSliderDataBack(year, month) : setSliderDataFront(year, month);
        return isRight;
    }

    return (
        <CalenderSlider
            SliderChild={MonthCalenderSlide}
            sliderData={sliderData}
            addItemBack={addItemBack}
            addItemFront={addItemFront}
            squareOne={squareOne}
            edgesFill={edgesFill}
        />
    )
}
