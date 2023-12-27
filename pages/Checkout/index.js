import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { themeSelector } from "../../redux/settingReducer";
import { useMemo, useState } from "react";
import colors from '../../colors.json';
import Header from "./Header";
import PrimaryButton from "../../components/widgets/buttons/PrimaryButton";
import CheckBox from "../../components/widgets/input/CheckBox";
import { AntDesign } from '@expo/vector-icons';
import Divider from "../../components/widgets/Divider";
import TipModal from "../../components/widgets/TipModal";
import Card from "./Card";
import RazorpayCheckout from 'react-native-razorpay';

export default function Checkout({ route, navigation }) {
    const theme = useSelector(themeSelector);
    const styles = useMemo(() => generateStyles(theme), [theme]);
    const [itemCount, setItemCount] = useState(3);
    const [autoPayEnabled, setAutoPayEnabled] = useState(false);

    const pgOrderId = 'order_NH6aoZT9QxlK69';
    const options = {
        description: 'Product purchase',
        image: 'https://i.imgur.com/3g7nmJC.jpg',
        currency: 'INR',
        key: 'rzp_test_QeFBI1VmGEL4NY',
        amount: '2100',
        name: 'BaljeetKode',
        order_id: pgOrderId,
        prefill: {
            email: 'bal.jeet@example.com',
            contact: '9191919191',
            name: 'Badmash Baljeet'
        },
        theme: { color: colors.PRIMARY_COLOR }
    }

    const a = {
        "code": 0,
        "description": "{\"error\":{\"code\":\"BAD_REQUEST_ERROR\",\"description\":\"You may have cancelled the payment or there was a delay in response from the UPI app\",\"source\":\"customer\",\"step\":\"payment_authentication\",\"reason\":\"payment_cancelled\",\"metadata\":{}}}",
        "error": {
            "code": "BAD_REQUEST_ERROR",
            "description": "You may have cancelled the payment or there was a delay in response from the UPI app", "metadata": {},
            "reason": "payment_cancelled",
            "source": "customer",
            "step": "payment_authentication"
        }
    }

    const handlePayNow = () => {
        RazorpayCheckout.open(options).then((data) => {
            console.log(data)
        }).catch((err) => {
            console.log(err)
        });
    }

    return (
        <View style={styles.fullPage}>
            <ScrollView style={styles.scroll}>
                <Header />
                <View style={styles.container}>
                    <Text style={styles.sectionHeading}>Payment Details</Text>
                    <Text style={styles.priceTag}>₹ <Text style={styles.priceTagAmount}>199</Text> / month</Text>
                    <Text style={styles.sectionText}>Paying for</Text>
                    <View style={styles.itemCountContainer}>
                        <Text style={styles.itemCountValue}>{itemCount}</Text>
                        <Text style={styles.itemCountDescription}>months</Text>
                        <View style={styles.itemCountButtons}>
                            <PrimaryButton
                                onClick={() => setItemCount(i => i + 1)}
                                text={<AntDesign name="plus" size={20} />}
                                fontWeight="500"
                                height={40}
                            />
                            <PrimaryButton
                                onClick={() => setItemCount(i => i - 1)}
                                text={<AntDesign name="minus" size={20} />}
                                fontWeight="500"
                                height={40}
                            />
                        </View>
                    </View>
                    <View style={styles.autoPayContainer}>
                        <CheckBox
                            checked={autoPayEnabled}
                            onChange={v => setAutoPayEnabled(v)}
                            text={"Enable Auto Payment"}
                            width={"auto"}
                        />
                        <Divider size={"m"} orientation="v" />
                        <TipModal
                            text={"Enable consecutive payments to debit automatically for seamless experience. You can opt out any time."}
                        />
                    </View>
                    <View style={styles.horizontalDivider} />
                    <Divider size={"xl"} />
                    <Text style={styles.sectionHeading}>You are about to buy : </Text>
                    <Card />
                    <Text style={styles.sectionHeading}>Plan Type : <Text style={styles.planType}>Monthly Subscription</Text></Text>
                </View>
            </ScrollView>
            <View style={styles.footer}>
                <View style={styles.amountContainer}>
                    <Text style={styles.amountText}>₹ <Text style={styles.amountValue}>596</Text></Text>
                </View>
                <View style={styles.buttonContainer}>
                    <PrimaryButton
                        onClick={handlePayNow}
                        text={"Pay Now"}
                    />
                </View>

            </View>
        </View>
    )
}

const generateStyles = THEME => StyleSheet.create({
    fullPage: {
        flex: 1,
        height: '100%',
        width: '100%',
    },
    scroll: {
        flex: 1,
        height: '100%',
        width: '100%',
        backgroundColor: colors.BG_COLOR[THEME],
    },
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    horizontalDivider: {
        height: 1,
        width: '100%',
        backgroundColor: colors.TEXT_COLOR_ALT[THEME],
    },
    sectionHeading: {
        color: colors.TEXT_COLOR[THEME],
        fontSize: 20,
        lineHeight: 20,
        marginVertical: 8,
    },
    priceTag: {
        color: colors.TEXT_COLOR[THEME],
        fontSize: 18,
        lineHeight: 18,
        marginVertical: 16,
        fontWeight: '500',
    },
    priceTagAmount: {
        color: colors.PRIMARY_COLOR,
        fontWeight: '600',
    },
    sectionText: {
        color: colors.TEXT_COLOR[THEME],
        fontSize: 18,
        marginVertical: 4,
    },
    itemCountContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
    },
    itemCountValue: {
        backgroundColor: colors.INPUT_BG_COLOR[THEME],
        height: 40,
        textAlign: 'center',
        textAlignVertical: 'center',
        width: 48,
        borderRadius: 4,
        color: colors.INPUT_TEXT_COLOR[THEME],
        fontWeight: '700',
        fontSize: 20,
    },
    itemCountDescription: {
        paddingHorizontal: 16,
        borderRadius: 2,
        color: colors.TEXT_COLOR[THEME],
        fontWeight: '500',
        fontSize: 18,
    },
    itemCountButtons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    autoPayContainer: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        marginVertical: 8,
    },
    cardContainer: {
        height: 100,
        width: '100%',
        borderWidth: 1,
        borderRadius: 4,
        borderColor: colors.TEXT_COLOR_ALT[THEME],
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginVertical: 8,
    },
    planType: {
        fontWeight: '500',
    },
    footer: {
        backgroundColor: colors.BG_COLOR[THEME],
        borderTopWidth: 1,
        borderColor: colors.TEXT_COLOR_ALT[THEME],
        height: 64,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%'
    },
    amountContainer: {
        flex: 2,
        paddingLeft: 24,
        width: '100%',
        justifyContent: 'center',
    },
    amountText: {
        color: colors.TEXT_COLOR[THEME],
        fontWeight: '500',
        fontSize: 20,
    },
    amountValue: {
        color: colors.PRIMARY_COLOR,
    },
    buttonContainer: {
        flex: 3,
        paddingHorizontal: 8,
    },
})