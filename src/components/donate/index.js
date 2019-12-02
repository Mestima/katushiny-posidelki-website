import React from 'react';
import IFrame from 'react-iframe';

export default function() {
    return(<>
      <IFrame url="https://auth.robokassa.ru/Merchant/PaymentForm/FormFLS.if?MerchantLogin=katusha_events&InvoiceID=0&Culture=ru&Encoding=utf-8&SignatureValue=2acc909ad4ee087c2a3a8d773f247d9f%22/"
              width="453px"
              height="64px"
              id="myId"
              className="myClassname"
              display="initial"
              position="relative"/>
    </>)
}
