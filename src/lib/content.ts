import { keywords } from "./keywords";
import type { Locale } from "./i18n";

/**
 * Все тексты сайта. Один словарь на язык, одинаковой формы:
 * TypeScript не даст забыть перевод — узбекский словарь типизирован по русскому.
 */

const ru = {
  offer: "Услуги европротокола в Ташкенте 24/7",
  cityIn: "Ташкенте",
  cityName: "Ташкент",
  arrival: "30 минут",
  hoursLabel: "Круглосуточно, без выходных",

  nav: {
    advantages: "Преимущества",
    howTo: "Как оформить",
    price: "Стоимость",
    contacts: "Контакты",
  },

  header: {
    home: "Adjaster.uz — на главную",
    openMenu: "Открыть меню",
    call: "Позвонить",
    sections: "Основные разделы",
    siteSections: "Разделы сайта",
    writeTelegram: "Написать в Telegram",
    language: "Язык сайта",
  },

  hero: {
    title: {
      lead: "Услуги",
      accent: "европротокола",
      tail: (place: string) => `в ${place} 24/7`,
    },
    roundClock: "Круглосуточно",
    lead: (limit: string) =>
      `Вызовите аварийного комиссара на место ДТП — сделаем фотофиксацию и заполним извещение так, чтобы страховая выплатила до ${limit}. Без вызова ГАИ и без потери дня.`,
    promise: "Приезжаем первыми — платите после оформления",
    callLabel: "Вызов аварийного комиссара",
    btnCall: "Заказать звонок",
    btnTelegram: "Написать в Telegram",
    btnHow: "Как оформить",
    facts: [
      { value: "24/7", label: "выезд круглосуточно" },
      { value: "30 минут", label: "среднее время приезда" },
      { value: "до 28 млн", label: "выплата по европротоколу" },
    ],
    districtsLine: (list: string) => `Выезжаем во все районы Ташкента: ${list}.`,
  },

  advantages: [
    {
      icon: "clock" as const,
      title: "Комиссар на месте за 30 минут",
      text: "Дежурные экипажи по всему Ташкенту, выезд круглосуточно и в выходные. Вы не ждёте инспектора и не теряете день на разбор.",
    },
    {
      icon: "shield" as const,
      title: "Оформляем так, что страховая платит",
      text: "Заполняем извещение о ДТП по требованиям страховщика и делаем полную фотофиксацию. Документы не возвращают на доработку.",
    },
    {
      icon: "handshake" as const,
      title: "Ведём до выплаты",
      text: "Подскажем сумму, поможем подать документы и пройти независимую экспертизу. Остаёмся на связи, пока страховая не вынесет решение.",
    },
  ],

  urgent: {
    title: "Нужна срочная помощь?",
    text: "Звоните прямо с места ДТП. Дежурный комиссар выедет к вам в течение нескольких минут и возьмёт оформление на себя.",
    note: "Выезд аварийного комиссара",
  },

  howTo: {
    title: "Как оформить европротокол?",
    lead: "Слева — порядок действий на месте ДТП, справа — условия, без которых страховая не примет документы. Если что-то пойдёт не так, звоните: подскажем по телефону, пока комиссар едет.",
    stepsTitle: "Порядок действий",
    importantTitle: "Важные моменты",
    importantLead:
      "Все условия должны выполняться одновременно. Если хотя бы одно не соблюдено, нужно вызывать ГАИ — мы поможем и с этим.",
    conditions: [
      "В ДТП участвуют только два автомобиля",
      "Нет пострадавших и погибших",
      "Виновник полностью признаёт вину",
      "У обоих водителей действующий полис ОСАГО",
      "Ущерб не превышает лимита по европротоколу",
    ],
    steps: [
      {
        title: "Обезопасьте место ДТП",
        text: "Включите аварийную сигнализацию и выставьте знак аварийной остановки. Машины не убирайте, пока не сделаны фотографии.",
      },
      {
        title: "Проверьте, подходит ли случай",
        text: "Европротокол возможен только при двух участниках, без пострадавших, с признанием вины и действующим ОСАГО у обоих.",
      },
      {
        title: "Позвоните нам",
        text: "Комиссар выезжает сразу после звонка и приезжает в среднем за 30 минут в любой район Ташкента.",
      },
      {
        title: "Фотофиксация",
        text: "Снимаем общий план с привязкой к дороге, положение машин, номера, все повреждения обоих автомобилей и следы на покрытии.",
      },
      {
        title: "Заполняем извещение о ДТП",
        text: "На бумажном бланке или через приложение Sug'urta Servis. Подписи ставят оба водителя, каждому остаётся свой экземпляр.",
      },
      {
        title: "Освидетельствование в течение 4 часов",
        text: "Оба водителя проходят проверку на состояние опьянения. Без неё страховая вправе отказать в выплате.",
      },
      {
        title: "Оценка ущерба",
        text: "Потерпевший проводит независимую экспертизу в течение 3 рабочих дней. Можем провести её сами и подготовить заключение.",
      },
      {
        title: "Выплата",
        text: "Страховая рассматривает дело 15 календарных дней и перечисляет возмещение в пределах лимита по европротоколу.",
      },
    ],
    limitNote: (limit: string) =>
      `Максимальная выплата по европротоколу в Узбекистане — ${limit}. Точную сумму по вашему случаю подскажем на месте.`,
  },

  price: {
    title: "Услуги и цены",
    services: [
      {
        key: "europrotocol" as const,
        name: "Оформление европротокола",
        unit: "за выезд и оформление",
        includes: [
          "Выезд комиссара в любой район Ташкента",
          "Осмотр места ДТП и обоих автомобилей",
          "Фотофиксация по требованиям страховой",
          "Проверка, подходит ли случай под европротокол",
          "Заполнение извещения о ДТП без ошибок",
          "Расчёт предварительной суммы ущерба",
          "Помощь в подаче документов страховщику",
          "Сопровождение до решения о выплате",
        ],
      },
      {
        key: "assessment" as const,
        name: "Оценка ущерба после ДТП",
        unit: "за независимую экспертизу",
        includes: [
          "Осмотр автомобиля и фотофиксация повреждений",
          "Расчёт стоимости восстановительного ремонта",
          "Проверка скрытых повреждений",
          "Письменное заключение для страховой",
          "Поддержка при споре о сумме выплаты",
        ],
      },
    ],
    slogan1: "Мы работаем круглосуточно",
    slogan2: "с нами — просто и быстро",
    includesTitle: "Что входит",
    extrasTitle: "Оплачивается отдельно",
    extras: [
      "Оформление ДТП с вызовом ГАИ",
      "Помощь при спорных ДТП и отказе страховой",
      "Выезд за пределы Ташкента",
    ],
    note: "Оплата после оформления. Ночью, в выходные и праздники цена не меняется.",
    contactCards: {
      call: "Позвонить",
      telegram: "Telegram",
      telegramNote: "Ответим в переписке",
      office: "Офис",
    },
  },

  consult: {
    title: "Закажите бесплатную консультацию прямо сейчас",
    actions: {
      telegram: "Связаться через Telegram",
      telegramNote: "Напишите — ответим в переписке",
      call: "Вызвать аварийного комиссара",
      office: "Местоположение офиса",
    },
    additionalTitle: "Дополнительные услуги",
    additionalParagraphs: [
      "Оформляем ДТП с вызовом ГАИ, проводим независимую экспертизу ущерба и помогаем, когда страховая отказала в выплате или занизила сумму. Работаем со всеми страховыми компаниями Узбекистана.",
      "Сомневаетесь, подходит ли ваш случай под европротокол? Позвоните до того, как что-то подпишете на месте. Консультация по телефону бесплатная и ни к чему не обязывает.",
    ],
  },

  map: {
    secondOffice: (street: string) => `Второй офис: ${street}`,
    open: "Открыть в Яндекс Картах",
    title: "Adjaster.uz на Яндекс Картах",
  },

  footer: {
    note: "Adjaster.uz — служба аварийных комиссаров в Ташкенте. Выезжаем на место ДТП круглосуточно, оформляем европротокол по требованиям страховых компаний и сопровождаем до получения выплаты. Работаем со всеми страховщиками Узбекистана.",
    contactsTitle: "Контакты",
    servicesTitle: "Услуги",
    hoursTitle: "Режим работы",
    districtsTitle: "Районы",
    services: [
      "Оформление европротокола",
      "Выезд аварийного комиссара",
      "Оценка ущерба после ДТП",
      "Консультации по ДТП",
      "Сопровождение выплаты",
    ],
    hours: ["Круглосуточно, без выходных", "Выезд в течение 30 минут", "Без праздничных наценок"],
    rights: "Все права защищены.",
  },

  district: {
    breadcrumbs: "Хлебные крошки",
    home: "Главная",
    crumb: (inCity: string) => `Европротокол в ${inCity}`,
    heading: (inCity: string) => `Аварийный комиссар в ${inCity}`,
    extra:
      "Если случай не проходит по европротоколу — например, пострадал человек или участников больше двух — скажем об этом сразу и поможем вызвать ГАИ, а не оформим документы, которые страховая не примет.",
    arrivalLabel: "Время приезда",
    arrivalValue: "в среднем 30 минут",
    dispatcherLabel: "Диспетчер",
    landmarksLabel: "Выезжаем по ориентирам",
    otherDistricts: "Другие районы",
  },

  notFound: {
    title: "Такой страницы на сайте нет",
    text: "Возможно, адрес изменился. Вернитесь на главную или позвоните — ответим круглосуточно.",
    home: "На главную",
    how: "Как оформить европротокол",
    help: "Нужна помощь — звоните",
  },

  seo: {
    title: "Европротокол в Ташкенте 24/7 — Adjaster.uz",
    description:
      "Аварийный комиссар в Ташкенте круглосуточно. Оформляем европротокол на месте ДТП за 30 минут, без вызова ГАИ. Выплата по ОСАГО до 28 млн сум. Звоните +998 95 078 46 65.",
    keywords,
    districtTitle: (inCity: string) => `Европротокол в ${inCity} — Adjaster.uz`,
    districtDescription: (inCity: string, limit: string) =>
      `Аварийный комиссар в ${inCity} Ташкента круглосуточно. Оформление европротокола на месте ДТП за 30 минут, выплата до ${limit}. Звоните +998 95 078 46 65.`,
    notFoundTitle: "Страница не найдена",
  },

  districts: {
    yunusabad: {
      name: "Юнусабадский район",
      short: "Юнусабад",
      inCity: "Юнусабадском районе",
      ofCity: "Юнусабадского района",
      landmarks: ["Ташкентская телебашня", "Северный вокзал", "массивы Юнусабад 1–19"],
      intro:
        "Юнусабад — самый большой жилой район города, и большинство вызовов приходит с Амира Темура и Юнусабадских массивов. Дежурный экипаж стоит рядом с телебашней, поэтому до места доезжаем быстрее всего.",
    },
    chilanzar: {
      name: "Чиланзарский район",
      short: "Чиланзар",
      inCity: "Чиланзарском районе",
      ofCity: "Чиланзарского района",
      landmarks: ["Малая кольцевая дорога", "рынок Чорсу", "квартала Ч-1 — Ч-26"],
      intro:
        "В Чиланзаре чаще всего бьются на Малой кольцевой и на выездах из кварталов. Наш основной офис находится на Малой кольцевой, 4/1, поэтому комиссар выезжает к вам за считаные минуты.",
    },
    "mirzo-ulugbek": {
      name: "Мирзо-Улугбекский район",
      short: "Мирзо-Улугбек",
      inCity: "Мирзо-Улугбекском районе",
      ofCity: "Мирзо-Улугбекского района",
      landmarks: ["проспект Мустакиллик", "Ташкентский университет", "массив Буюк Ипак Йули"],
      intro:
        "Район вытянут вдоль Мустакиллик и Буюк Ипак Йули — трафик плотный, а мелкие попутные столкновения здесь самые частые. Такие случаи почти всегда закрываются европротоколом без вызова ГАИ.",
    },
    yashnabad: {
      name: "Яшнабадский район",
      short: "Яшнабад",
      inCity: "Яшнабадском районе",
      ofCity: "Яшнабадского района",
      landmarks: ["Ташкентский тракторный завод", "массив Куйлюк", "Южный вокзал"],
      intro:
        "Яшнабад — промышленная зона и транзит в сторону Куйлюка, поэтому здесь много ДТП с участием грузового транспорта. Проверяем, проходит ли случай по лимиту европротокола, прежде чем оформлять.",
    },
    shaykhantakhur: {
      name: "Шайхантахурский район",
      short: "Шайхантахур",
      inCity: "Шайхантахурском районе",
      ofCity: "Шайхантахурского района",
      landmarks: ["ул. Лабзак", "Чорсу", "Навои"],
      intro:
        "Второй наш офис стоит на Лабзаке, 95 — это центр Шайхантахура. Узкие улицы старого города и плотная парковка дают много мелких касаний, которые проще всего оформить на месте.",
    },
    mirabad: {
      name: "Мирабадский район",
      short: "Мирабад",
      inCity: "Мирабадском районе",
      ofCity: "Мирабадского района",
      landmarks: ["аэропорт Ташкент", "вокзал Ташкент", "Ойбек"],
      intro:
        "Мирабад — это аэропорт, вокзал и деловой центр, где водители спешат и не хотят терять часы на инспектора. Оформляем европротокол прямо на месте, чтобы вы успели на рейс или встречу.",
    },
  },
};



export type Dict = typeof ru;
export type DistrictSlug = keyof typeof ru.districts;

const uz: Dict = {
  offer: "Toshkentda yevroprotokol xizmatlari 24/7",
  cityIn: "Toshkentda",
  cityName: "Toshkent",
  arrival: "30 daqiqa",
  hoursLabel: "Kecha-kunduz, dam olish kunlarisiz",

  nav: {
    advantages: "Afzalliklar",
    howTo: "Qanday rasmiylashtiriladi",
    price: "Narxlar",
    contacts: "Aloqa",
  },

  header: {
    home: "Adjaster.uz — bosh sahifa",
    openMenu: "Menyuni ochish",
    call: "Qo'ng'iroq qilish",
    sections: "Asosiy bo'limlar",
    siteSections: "Sayt bo'limlari",
    writeTelegram: "Telegramga yozish",
    language: "Sayt tili",
  },

  hero: {
    title: {
      lead: "",
      accent: "Yevroprotokol",
      tail: (place: string) => `xizmatlari ${place} 24/7`,
    },
    roundClock: "Kecha-kunduz",
    lead: (limit: string) =>
      `YHH joyiga avariya komissarini chaqiring — fotoqayd qilamiz va xabarnomani shunday to'ldiramizki, sug'urta ${limit} gacha to'lov qiladi. YPX chaqirmasdan va kun yo'qotmasdan.`,
    promise: "Birinchi bo'lib yetib boramiz — to'lov rasmiylashtirgandan keyin",
    callLabel: "Avariya komissarini chaqirish",
    btnCall: "Qo'ng'iroqqa buyurtma",
    btnTelegram: "Telegramga yozish",
    btnHow: "Qanday rasmiylashtiriladi",
    facts: [
      { value: "24/7", label: "kecha-kunduz chiqamiz" },
      { value: "30 daqiqa", label: "o'rtacha yetib borish vaqti" },
      { value: "28 mln gacha", label: "yevroprotokol bo'yicha to'lov" },
    ],
    districtsLine: (list: string) => `Toshkentning barcha tumanlariga chiqamiz: ${list}.`,
  },

  advantages: [
    {
      icon: "clock" as const,
      title: "Komissar 30 daqiqada yetib keladi",
      text: "Toshkent bo'ylab navbatchi ekipajlar, kecha-kunduz va dam olish kunlari chiqamiz. Siz inspektorni kutmaysiz va butun kunni yo'qotmaysiz.",
    },
    {
      icon: "shield" as const,
      title: "Sug'urta to'laydigan qilib rasmiylashtiramiz",
      text: "YHH xabarnomasini sug'urta talablariga muvofiq to'ldiramiz va to'liq fotoqayd qilamiz. Hujjatlar qayta ishlashga qaytarilmaydi.",
    },
    {
      icon: "handshake" as const,
      title: "To'lovgacha yetaklaymiz",
      text: "Summani aytamiz, hujjat topshirishga va mustaqil ekspertizadan o'tishga yordam beramiz. Sug'urta qaror chiqargunicha aloqadamiz.",
    },
  ],

  urgent: {
    title: "Shoshilinch yordam kerakmi?",
    text: "To'g'ridan-to'g'ri YHH joyidan qo'ng'iroq qiling. Navbatchi komissar bir necha daqiqada yetib keladi va rasmiylashtirishni o'z zimmasiga oladi.",
    note: "Avariya komissari chiqishi",
  },

  howTo: {
    title: "Yevroprotokol qanday rasmiylashtiriladi?",
    lead: "Chapda — YHH joyidagi harakatlar tartibi, o'ngda — sug'urta hujjatlarni qabul qilishi uchun zarur shartlar. Biror narsa noto'g'ri ketsa, qo'ng'iroq qiling: komissar yo'lda ekan, telefon orqali yo'naltiramiz.",
    stepsTitle: "Harakatlar tartibi",
    importantTitle: "Muhim jihatlar",
    importantLead:
      "Barcha shartlar bir vaqtda bajarilishi kerak. Hech bo'lmaganda bittasi bajarilmasa, YPX chaqirish kerak — bunda ham yordam beramiz.",
    conditions: [
      "YHHda faqat ikkita avtomobil ishtirok etadi",
      "Jabrlanganlar va halok bo'lganlar yo'q",
      "Aybdor aybini to'liq tan oladi",
      "Ikkala haydovchida ham amaldagi OSAGO polisi bor",
      "Zarar yevroprotokol chegarasidan oshmaydi",
    ],
    steps: [
      {
        title: "YHH joyini xavfsizlantiring",
        text: "Avariya signalizatsiyasini yoqing va avariya to'xtash belgisini qo'ying. Suratlar olinmaguncha mashinalarni joyidan surmang.",
      },
      {
        title: "Holat mos kelishini tekshiring",
        text: "Yevroprotokol faqat ikki ishtirokchi bo'lganda, jabrlanganlarsiz, ayb tan olinganda va ikkalasida amaldagi OSAGO bo'lganda mumkin.",
      },
      {
        title: "Bizga qo'ng'iroq qiling",
        text: "Komissar qo'ng'iroqdan so'ng darhol yo'lga chiqadi va Toshkentning istalgan tumaniga o'rtacha 30 daqiqada yetib boradi.",
      },
      {
        title: "Fotoqayd",
        text: "Yo'lga bog'langan umumiy ko'rinish, mashinalar holati, raqamlar, ikkala avtomobildagi barcha shikastlar va yo'l qoplamasidagi izlarni suratga olamiz.",
      },
      {
        title: "YHH xabarnomasini to'ldiramiz",
        text: "Qog'oz blankada yoki Sug'urta Servis ilovasi orqali. Imzoni ikkala haydovchi qo'yadi, har biriga o'z nusxasi qoladi.",
      },
      {
        title: "4 soat ichida tibbiy ko'rik",
        text: "Ikkala haydovchi mastlik holatiga tekshiruvdan o'tadi. Usiz sug'urta to'lovni rad etishga haqli.",
      },
      {
        title: "Zararni baholash",
        text: "Jabrlangan tomon 3 ish kuni ichida mustaqil ekspertiza o'tkazadi. Buni o'zimiz bajarib, xulosa tayyorlab bera olamiz.",
      },
      {
        title: "To'lov",
        text: "Sug'urta ishni 15 kalendar kun davomida ko'rib chiqadi va yevroprotokol chegarasi doirasida qoplamani o'tkazadi.",
      },
    ],
    limitNote: (limit: string) =>
      `O'zbekistonda yevroprotokol bo'yicha eng yuqori to'lov — ${limit}. Sizning holatingiz bo'yicha aniq summani joyida aytamiz.`,
  },

  price: {
    title: "Xizmatlar va narxlar",
    services: [
      {
        key: "europrotocol" as const,
        name: "Yevroprotokolni rasmiylashtirish",
        unit: "chiqish va rasmiylashtirish uchun",
        includes: [
          "Toshkentning istalgan tumaniga komissar chiqishi",
          "YHH joyi va ikkala avtomobilni ko'zdan kechirish",
          "Sug'urta talablariga muvofiq fotoqayd",
          "Holat yevroprotokolga mos kelishini tekshirish",
          "YHH xabarnomasini xatosiz to'ldirish",
          "Dastlabki zarar summasini hisoblash",
          "Hujjatlarni sug'urtaga topshirishda yordam",
          "To'lov bo'yicha qaror chiqqunicha hamrohlik",
        ],
      },
      {
        key: "assessment" as const,
        name: "YHHdan keyin zararni baholash",
        unit: "mustaqil ekspertiza uchun",
        includes: [
          "Avtomobilni ko'zdan kechirish va shikastlarni fotoqayd qilish",
          "Tiklash ta'miri qiymatini hisoblash",
          "Yashirin shikastlarni tekshirish",
          "Sug'urta uchun yozma xulosa",
          "To'lov summasi bo'yicha nizoda qo'llab-quvvatlash",
        ],
      },
    ],
    slogan1: "Biz kecha-kunduz ishlaymiz",
    slogan2: "biz bilan — oson va tez",
    includesTitle: "Nimalar kiradi",
    extrasTitle: "Alohida to'lanadi",
    extras: [
      "YPX chaqirib YHH rasmiylashtirish",
      "Nizoli YHH va sug'urta rad etganda yordam",
      "Toshkentdan tashqariga chiqish",
    ],
    note: "To'lov rasmiylashtirgandan keyin. Kechasi, dam olish va bayram kunlari narx o'zgarmaydi.",
    contactCards: {
      call: "Qo'ng'iroq qilish",
      telegram: "Telegram",
      telegramNote: "Yozishmada javob beramiz",
      office: "Ofis",
    },
  },

  consult: {
    title: "Hoziroq bepul maslahat oling",
    actions: {
      telegram: "Telegram orqali bog'lanish",
      telegramNote: "Yozing — yozishmada javob beramiz",
      call: "Avariya komissarini chaqirish",
      office: "Ofis joylashuvi",
    },
    additionalTitle: "Qo'shimcha xizmatlar",
    additionalParagraphs: [
      "YPX chaqirib YHH rasmiylashtiramiz, zararning mustaqil ekspertizasini o'tkazamiz va sug'urta to'lovni rad etganda yoki summani kamaytirganda yordam beramiz. O'zbekistondagi barcha sug'urta kompaniyalari bilan ishlaymiz.",
      "Holatingiz yevroprotokolga mos kelishiga shubhangiz bormi? Joyida biror hujjatga imzo qo'yishdan oldin qo'ng'iroq qiling. Telefon orqali maslahat bepul va hech narsaga majbur qilmaydi.",
    ],
  },

  map: {
    secondOffice: (street: string) => `Ikkinchi ofis: ${street}`,
    open: "Yandex Xaritalarda ochish",
    title: "Adjaster.uz Yandex Xaritalarda",
  },

  footer: {
    note: "Adjaster.uz — Toshkentdagi avariya komissarlari xizmati. YHH joyiga kecha-kunduz chiqamiz, yevroprotokolni sug'urta kompaniyalari talablariga muvofiq rasmiylashtiramiz va to'lov olinguncha hamrohlik qilamiz. O'zbekistondagi barcha sug'urtachilar bilan ishlaymiz.",
    contactsTitle: "Aloqa",
    servicesTitle: "Xizmatlar",
    hoursTitle: "Ish tartibi",
    districtsTitle: "Tumanlar",
    services: [
      "Yevroprotokolni rasmiylashtirish",
      "Avariya komissari chiqishi",
      "YHHdan keyin zararni baholash",
      "YHH bo'yicha maslahat",
      "To'lovga hamrohlik",
    ],
    hours: [
      "Kecha-kunduz, dam olish kunlarisiz",
      "30 daqiqa ichida chiqamiz",
      "Bayram ustamasiz",
    ],
    rights: "Barcha huquqlar himoyalangan.",
  },

  district: {
    breadcrumbs: "Yo'l ko'rsatkichi",
    home: "Bosh sahifa",
    crumb: (inCity: string) => `Yevroprotokol — ${inCity}`,
    heading: (inCity: string) => `${inCity} avariya komissari`,
    extra:
      "Agar holat yevroprotokolga to'g'ri kelmasa — masalan, odam jabrlangan bo'lsa yoki ishtirokchilar ikkitadan ko'p bo'lsa — buni darhol aytamiz va YPX chaqirishga yordam beramiz, sug'urta qabul qilmaydigan hujjatlarni rasmiylashtirmaymiz.",
    arrivalLabel: "Yetib borish vaqti",
    arrivalValue: "o'rtacha 30 daqiqa",
    dispatcherLabel: "Dispetcher",
    landmarksLabel: "Mo'ljallar bo'yicha chiqamiz",
    otherDistricts: "Boshqa tumanlar",
  },

  notFound: {
    title: "Bunday sahifa saytda yo'q",
    text: "Ehtimol, manzil o'zgargan. Bosh sahifaga qayting yoki qo'ng'iroq qiling — kecha-kunduz javob beramiz.",
    home: "Bosh sahifaga",
    how: "Yevroprotokol qanday rasmiylashtiriladi",
    help: "Yordam kerakmi — qo'ng'iroq qiling",
  },

  seo: {
    title: "Toshkentda yevroprotokol 24/7 — Adjaster.uz",
    description:
      "Toshkentda avariya komissari kecha-kunduz. Yevroprotokolni YHH joyida 30 daqiqada, YPX chaqirmasdan rasmiylashtiramiz. OSAGO bo'yicha to'lov 28 mln so'mgacha. Qo'ng'iroq qiling: +998 95 078 46 65.",
    keywords,
    districtTitle: (inCity: string) => `${inCity} yevroprotokol — Adjaster.uz`,
    districtDescription: (inCity: string, limit: string) =>
      `Toshkentning ${inCity} avariya komissari kecha-kunduz. YHH joyida yevroprotokolni 30 daqiqada rasmiylashtirish, ${limit} gacha to'lov. Qo'ng'iroq: +998 95 078 46 65.`,
    notFoundTitle: "Sahifa topilmadi",
  },

  districts: {
    yunusabad: {
      name: "Yunusobod tumani",
      short: "Yunusobod",
      inCity: "Yunusobod tumanida",
      ofCity: "Yunusobod tumanining",
      landmarks: ["Toshkent teleminorasi", "Shimoliy vokzal", "Yunusobod 1–19 mavzelari"],
      intro:
        "Yunusobod — shaharning eng yirik turar-joy tumani, chaqiruvlarning aksariyati Amir Temur ko'chasi va Yunusobod mavzelaridan keladi. Navbatchi ekipaj teleminora yonida turadi, shuning uchun bu yerga eng tez yetib boramiz.",
    },
    chilanzar: {
      name: "Chilonzor tumani",
      short: "Chilonzor",
      inCity: "Chilonzor tumanida",
      ofCity: "Chilonzor tumanining",
      landmarks: ["Kichik halqa yo'li", "Chorsu bozori", "Ch-1 — Ch-26 kvartallari"],
      intro:
        "Chilonzorda ko'pincha Kichik halqa yo'lida va kvartallardan chiqishda to'qnashuvlar bo'ladi. Asosiy ofisimiz Kichik halqa yo'li, 4/1 da joylashgan, shuning uchun komissar sizga bir necha daqiqada yetib boradi.",
    },
    "mirzo-ulugbek": {
      name: "Mirzo Ulug'bek tumani",
      short: "Mirzo Ulug'bek",
      inCity: "Mirzo Ulug'bek tumanida",
      ofCity: "Mirzo Ulug'bek tumanining",
      landmarks: ["Mustaqillik shoh ko'chasi", "Toshkent universiteti", "Buyuk Ipak Yo'li mavzesi"],
      intro:
        "Tuman Mustaqillik va Buyuk Ipak Yo'li bo'ylab cho'zilgan — harakat zich, orqadan urilish holatlari eng ko'p uchraydi. Bunday holatlar deyarli har doim YPX chaqirmasdan yevroprotokol bilan yopiladi.",
    },
    yashnabad: {
      name: "Yashnobod tumani",
      short: "Yashnobod",
      inCity: "Yashnobod tumanida",
      ofCity: "Yashnobod tumanining",
      landmarks: ["Toshkent traktor zavodi", "Quyluq mavzesi", "Janubiy vokzal"],
      intro:
        "Yashnobod — sanoat hududi va Quyluq tomonga tranzit yo'l, shuning uchun bu yerda yuk transporti ishtirokidagi YHH ko'p. Rasmiylashtirishdan oldin holat yevroprotokol chegarasiga sig'ishini tekshiramiz.",
    },
    shaykhantakhur: {
      name: "Shayxontohur tumani",
      short: "Shayxontohur",
      inCity: "Shayxontohur tumanida",
      ofCity: "Shayxontohur tumanining",
      landmarks: ["Labzak ko'chasi", "Chorsu", "Navoiy ko'chasi"],
      intro:
        "Ikkinchi ofisimiz Labzak, 95 da — bu Shayxontohur markazi. Eski shaharning tor ko'chalari va zich to'xtash joylari mayda tegishlarni ko'paytiradi, ularni joyida rasmiylashtirish eng oson.",
    },
    mirabad: {
      name: "Mirobod tumani",
      short: "Mirobod",
      inCity: "Mirobod tumanida",
      ofCity: "Mirobod tumanining",
      landmarks: ["Toshkent aeroporti", "Toshkent vokzali", "Oybek"],
      intro:
        "Mirobod — aeroport, vokzal va ishbilarmonlik markazi, bu yerda haydovchilar shoshadi va inspektorni kutib soatlab vaqt yo'qotishni xohlamaydi. Yevroprotokolni joyida rasmiylashtiramiz, reysga yoki uchrashuvga ulgurasiz.",
    },
  },
};

export const content: Record<Locale, Dict> = { ru, uz };

export const getContent = (locale: Locale) => content[locale];

export const getDistrict = (locale: Locale, slug: string) =>
  (content[locale].districts as Record<string, Dict["districts"]["yunusabad"]>)[slug];
