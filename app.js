
const subcategoryMap = {
  groceries: [
    ['Flour / rice / lentils', 'आटा / चावल / दाल'],
    ['Oil / spices', 'तेल / मसाले'],
    ['Vegetables / fruit', 'सब्ज़ी / फल'],
    ['Snacks / packaged food', 'नाश्ता / पैक्ड फूड'],
    ['Cleaning supplies', 'सफाई का सामान'],
    ['Other groceries', 'अन्य किराना']
  ],
  utilities: [
    ['Electricity bill', 'बिजली बिल'],
    ['Water bill', 'पानी बिल'],
    ['Gas cylinder', 'गैस सिलेंडर'],
    ['Internet / Wi-Fi', 'इंटरनेट / Wi-Fi'],
    ['Mobile recharge', 'मोबाइल रिचार्ज'],
    ['OTT / subscriptions', 'OTT / सब्सक्रिप्शन'],
    ['Other bills', 'अन्य बिल']
  ],
  rent: [
    ['House rent', 'घर का किराया'],
    ['Other rent', 'अन्य किराया']
  ],
  education: [
    ['School fees', 'स्कूल फीस'],
    ['Books / stationery', 'किताबें / स्टेशनरी'],
    ['Uniform', 'यूनिफॉर्म'],
    ['School trip', 'स्कूल ट्रिप'],
    ['Events / functions', 'कार्यक्रम / फंक्शन'],
    ['Other education expenses', 'अन्य शिक्षा खर्च']
  ],
  health: [
    ['Doctor fee', 'डॉक्टर फीस'],
    ['Hospital', 'अस्पताल'],
    ['Medicines', 'दवाइयाँ'],
    ['Tests / lab tests', 'जाँच / लैब टेस्ट'],
    ['Eyeglasses', 'चश्मा'],
    ['Medical emergency', 'मेडिकल इमरजेंसी'],
    ['Other health expenses', 'अन्य स्वास्थ्य खर्च']
  ],
  transport: [
    ['Petrol', 'पेट्रोल'],
    ['Diesel', 'डीज़ल'],
    ['Bus / train', 'बस / ट्रेन'],
    ['Taxi', 'टैक्सी'],
    ['Parking / toll', 'पार्किंग / टोल'],
    ['Other travel', 'अन्य यात्रा']
  ],
  shopping: [
    ['Online shopping', 'ऑनलाइन खरीदारी'],
    ['Clothes / shoes', 'कपड़े / जूते'],
    ['Household items', 'घर का सामान'],
    ['Electronics', 'इलेक्ट्रॉनिक्स'],
    ['Other shopping', 'अन्य खरीदारी']
  ],
  personal: [
    ['Pocket money', 'जेब खर्च'],
    ['Personal care', 'व्यक्तिगत देखभाल'],
    ['Entertainment', 'मनोरंजन'],
    ['Other personal expenses', 'अन्य व्यक्तिगत खर्च']
  ],
  farmingCategory: [
    ['Seeds / fertilizer', 'बीज / खाद'],
    ['Irrigation', 'सिंचाई'],
    ['Labour', 'मजदूरी'],
    ['Diesel', 'डीज़ल'],
    ['Machinery', 'मशीनरी'],
    ['Other farming expenses', 'अन्य खेती खर्च']
  ],
  livestock: [
    ['Animal feed', 'पशु चारा'],
    ['Veterinary care', 'पशु चिकित्सा'],
    ['Milk production', 'दूध उत्पादन'],
    ['Other livestock expenses', 'अन्य पशुपालन खर्च']
  ],
  insurance: [
    ['Health insurance', 'स्वास्थ्य बीमा'],
    ['Vehicle insurance', 'वाहन बीमा'],
    ['Other insurance', 'अन्य बीमा']
  ],
  food: [
    ['Tea / snacks', 'चाय / नाश्ता'],
    ['Restaurant', 'रेस्टोरेंट'],
    ['Delivery', 'डिलीवरी'],
    ['Other food', 'अन्य भोजन']
  ],
  gifts: [
    ['Gifts', 'उपहार'],
    ['Wedding / ceremony', 'शादी / समारोह'],
    ['Festivals', 'त्योहार']
  ],
  miscellaneous: [
    ['Small expense', 'छोटा खर्च'],
    ['Unexpected expense', 'अचानक खर्च'],
    ['Tea / snacks', 'चाय / नाश्ता'],
    ['Other expenses', 'अन्य खर्च']
  ],
  homeCategory: [
    ['Groceries', 'किराना'],
    ['Milk / dairy', 'दूध / डेयरी'],
    ['Water', 'पानी'],
    ['Internet / Wi-Fi', 'इंटरनेट / Wi-Fi'],
    ['Gas', 'गैस'],
    ['Electricity', 'बिजली'],
    ['Home maintenance', 'घर का रखरखाव'],
    ['Other shared expenses', 'अन्य साझा खर्च']
  ],
  maintenance: [
    ['Bike petrol', 'बाइक पेट्रोल'],
    ['Car petrol / diesel', 'कार पेट्रोल / डीज़ल'],
    ['Tractor diesel', 'ट्रैक्टर डीज़ल'],
    ['Servicing', 'सर्विसिंग'],
    ['Engine oil / grease', 'इंजन ऑयल / ग्रीस'],
    ['Tyres', 'टायर'],
    ['Spare parts', 'स्पेयर पार्ट्स'],
    ['Repairs', 'मरम्मत'],
    ['Insurance', 'बीमा'],
    ['Laptop', 'लैपटॉप'],
    ['Electronics', 'इलेक्ट्रॉनिक्स'],
    ['Other machinery', 'अन्य मशीनरी']
  ],
  pocketExpense: [
    ['Personal pocket money', 'व्यक्तिगत जेब खर्च'],
    ['Snacks / tea', 'नाश्ता / चाय'],
    ['Personal shopping', 'व्यक्तिगत खरीदारी'],
    ['Entertainment', 'मनोरंजन'],
    ['Other pocket expenses', 'अन्य पॉकेट खर्च']
  ],
  ecommerce: [
    ['Amazon', 'Amazon'],
    ['Flipkart', 'Flipkart'],
    ['Myntra', 'Myntra'],
    ['Other platform', 'अन्य प्लेटफ़ॉर्म'],
    ['Delivery charge', 'डिलीवरी चार्ज'],
    ['Return / refund', 'रिटर्न / रिफंड']
  ],
  savings: [
    ['Emergency fund', 'आपातकालीन फंड'],
    ['Fixed deposit', 'फिक्स्ड डिपॉज़िट'],
    ['Investment', 'निवेश'],
    ['Other savings', 'अन्य बचत']
  ],
  subscriptions: [
    ['Streaming service', 'स्ट्रीमिंग सेवा'],
    ['Mobile / internet plan', 'मोबाइल / इंटरनेट प्लान'],
    ['Software / app', 'सॉफ्टवेयर / ऐप'],
    ['Other subscription', 'अन्य सब्सक्रिप्शन']
  ],
  other: [
    ['Other expenses', 'अन्य खर्च']
  ]
};

function subcategoryOptions(category) {
  const categoryKey =
    Object.keys(subcategoryMap).find(
      key => key === category || tr(key) === category
    ) || 'other';

  const options = subcategoryMap[categoryKey] || subcategoryMap.other;
  const isEnglish = state.lang === 'en';

  return [
    {
      value: '',
      label: isEnglish ? 'Select (optional)' : 'चुनें (वैकल्पिक)'
    },
    ...options.map(pair => {
      const label = pair[isEnglish ? 0 : 1];
      return { value: label, label: label };
    })
  ];
}
