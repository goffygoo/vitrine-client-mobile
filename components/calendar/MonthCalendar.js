import CalenderSlider from "./CalendarSlider";
import { useRef, useState } from "react";
import MonthCalenderSlide from "./MonthCalenderSlide";
import _ from "lodash";

const monthMinusOne = (year, month) => {
    return month === 0 ? [year - 1, 11] : [year, month - 1];
}

const monthPlusOne = (year, month) => {
    return month === 11 ? [year + 1, 0] : [year, month + 1];
}

export default function MonthCalendar({ getCalenderData, cellPress }) {
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
            cellPress={cellPress}
            sliderData={sliderData}
            addItemBack={addItemBack}
            addItemFront={addItemFront}
            squareOne={squareOne}
            edgesFill={edgesFill}
            HEIGHT={500}
        />
    )
}
