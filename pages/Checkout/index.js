import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { themeSelector } from "../../redux/settingReducer";
import { useContext, useMemo, useState } from "react";
import colors from '../../colors.json';
import Header from "./Header";
import PrimaryButton from "../../components/widgets/buttons/PrimaryButton";
import Divider from "../../components/widgets/Divider";
import Card from "./Card";
import RazorpayCheckout from 'react-native-razorpay';
import { ServiceContext } from "../../util/context/serviceContext";
import { showToast } from "../../components/widgets/Toast";
import GlassButton from "../../components/widgets/buttons/GlassButton";
import FloatingModalSmall from "../../components/modal/FloatingModalSmall";

export default function Checkout({ route, navigation }) {
    const theme = useSelector(themeSelector);
    const styles = useMemo(() => generateStyles(theme), [theme]);

    const serviceContext = useContext(ServiceContext);

    const { pageData, space } = route.params;
    const [paymentInitiated, setPaymentInitiated] = useState(false);

    const [showModal, setShowModal] = useState(false);

    const paymentFailed = () => {
        showToast('Something went wrong');
        setPaymentInitiated(false);
    }

    const paymentSuccess = () => {
        setPaymentInitiated(false);
        navigation.navigate("PaymentComplete");
    }

    const refundPayment = () => {
        setShowModal(true);
        setPaymentInitiated(false);
    }

    const options = {
        description: 'Product purchase',
        image: 'https://i.imgur.com/3g7nmJC.jpg',
        currency: 'INR',
        amount: (space.amount * 100).toString(),
        name: 'BaljeetKode',
        prefill: {
            email: '',
            contact: '',
            name: ''
        },
        theme: { color: colors.PRIMARY_COLOR }
    }

    const handlePayNow = () => {
        if (paymentInitiated) return;
        setPaymentInitiated(true);
        serviceContext.request(
            'post',
            '/api/monet/order/createOrder',
            {
                spaceId: pageData.id,
                amount: space.price,
            },
            ({ data }) => {
                RazorpayCheckout.open({
                    ...options,
                    order_id: data.pgOrderId,
                    key: data.pgKey,
                }).then((data) => {
                    serviceContext.request(
                        'post',
                        '/api/monet/order/confirm',
                        {
                            razorpayPaymentId: data.razorpay_payment_id
                        },
                        ({ data }) => {
                            if (data.paymentSuccess) {
                                paymentSuccess();
                            } else if (data.refundPayment) {
                                refundPayment();
                            } else {
                                paymentFailed();
                            }
                        },
                        () => {
                            paymentFailed();
                        }
                    )
                }).catch(() => {
                    paymentFailed();
                });
            },
            () => {
                paymentFailed();
            },
        )
    }

    return (
        <View style={styles.fullPage}>
            <FloatingModalSmall
                visible={showModal}
                closeModal={() => setShowModal(false)}
            >
                <Text style={styles.modalText}>{'You have already brought this course.\n\nAny additional payment deducted for this will be refunded.'}</Text>
            </FloatingModalSmall>
            <ScrollView style={styles.scroll}>
                <Header />
                <View style={styles.container}>
                    <Text style={styles.sectionHeading}>You are about to buy : </Text>
                    <Card {...pageData} />
                    <Divider size={'l'} />
                    <Text style={styles.sectionHeading}>Plan Type : <Text style={[styles.planType, (!space.price) && styles.priceTagAmount]}>{space.price ? 'Purchase' : 'FREE'}</Text></Text>
                    {
                        !!space.price && (
                            <Text style={styles.priceTag}><Text style={styles.priceTagDescription}>Net Total:</Text> ₹ <Text style={styles.priceTagAmount}>{space.price}</Text></Text>
                        )
                    }
                </View>
                <Divider size={'xl'} />
                <Divider size={'xl'} />
                <View style={styles.supportContainer}>
                    <GlassButton
                        onClick={() => undefined}
                        text={"Refund Policy"}
                        fontSize={12}
                        height={32}
                    />
                    <Divider size={'m'} />
                    <GlassButton
                        onClick={() => undefined}
                        text={"Need Help ?"}
                        fontSize={12}
                        height={32}
                    />
                </View>
            </ScrollView>
            <View style={styles.footer}>
                <View style={styles.amountContainer}>
                    <Text style={styles.amountText}>₹ <Text style={styles.amountValue}>{space.price}</Text></Text>
                </View>
                <View style={styles.buttonContainer}>
                    <PrimaryButton
                        onClick={handlePayNow}
                        text={!!space.price ? "Pay Now" : "Buy Now"}
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
    modalText: {
        color: colors.TEXT_COLOR[THEME],
        fontSize: 24,
        fontWeight: '300',
        padding: 16,
    },
    sectionHeading: {
        color: colors.TEXT_COLOR[THEME],
        fontSize: 20,
        lineHeight: 20,
        marginVertical: 8,
    },
    priceTag: {
        color: colors.TEXT_COLOR[THEME],
        fontSize: 24,
        marginVertical: 8,
        fontWeight: '500',
    },
    priceTagDescription: {
        fontSize: 18,
        fontWeight: '400',
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
    planType: {
        fontWeight: '500',
    },
    supportContainer: {
        alignItems: 'flex-start',
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