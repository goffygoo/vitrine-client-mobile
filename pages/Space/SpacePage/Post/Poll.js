import { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux';
import colors from '../../../../colors.json';
import { themeSelector } from '../../../../redux/settingReducer';
import { getDateStamp, getTimeStamp } from '../../../../util/helper';
import PrimaryButton from '../../../../components/widgets/buttons/PrimaryButton'
import CheckBox from '../../../../components/widgets/input/CheckBox'
import RadioInput from '../../../../components/widgets/input/RadioInput';


function CheckBoxColumn({ options }) {
  const [checkbox, setCheckbox] = useState(Array(options.length).fill(false));

  const handleCheckChange = index => state => {
    setCheckbox(arr => {
      const newArr = [...arr];
      newArr[index] = state;
      return newArr;
    })
  }

  return (
    <View>
      {
        options.map((option, index) => {
          return <CheckBox
            checked={checkbox[index]}
            onChange={handleCheckChange(index)}
            text={option}
          />
        })
      }
    </View>
  )
}

function RadioColumn({ options }) {
  const [radio, setRadio] = useState(-1);

  const handleCheckChange = index => _ => {
    setRadio(index);
  }

  return (
    <View>
      {
        options.map((option, index) => {
          return <RadioInput
            selected={radio === index}
            onChange={handleCheckChange(index)}
            text={option}
          />
        })
      }
    </View>
  )
}

export default function Poll({ post }) {
  const theme = useSelector(themeSelector);
  const styles = useMemo(() => generateStyles(theme), [theme]);
  const {
    _id,
    poll: {
      question,
      options,
      type
    },
    createdAt
  } = post;
  const dateObj = new Date(createdAt);
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.question}>{question}</Text>
        <View style={styles.options}>
          {
            type === 0 ?
              <RadioColumn CheckBoxColumn options={options} /> :
              <CheckBoxColumn options={options} />
          }
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.timestamp}>
          {`${getDateStamp(dateObj)} • ${getTimeStamp(dateObj)}`}
        </Text>
        <PrimaryButton
          onClick={() => undefined}
          text={'Submit'}
          fontSize={14}
          height={32}
        />
      </View>
    </View>
  )
}

const generateStyles = THEME => StyleSheet.create({
  container: {
    width: '70%',
    borderRadius: 8,
    marginVertical: 16,
    backgroundColor: colors.BG_COLOR_MODAL[THEME],
  },
  content: {
    padding: 8,
  },
  question: {
    fontSize: 16,
    marginBottom: 16,
    fontWeight: '500',
    color: colors.TEXT_COLOR[THEME],
  },
  options: {},
  footer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginVertical: 8,
    marginHorizontal: 8,
  },
  footerText: {
    fontWeight: '500',
    paddingLeft: 8,
    fontSize: 12,
    color: colors.TEXT_COLOR[THEME],
  },
  timestamp: {
    fontSize: 12,
    color: colors.TEXT_COLOR_ALT[THEME],
  },
})