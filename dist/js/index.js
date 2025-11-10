$(document).ready(function () {
  const lessonsCategory = document.querySelectorAll(".lessons-groups-item");
  const lessonsCards = document.querySelectorAll(".lessons__card");

  // 🧾 Три картки — фіксовані слоти 1, 2, 3
  const prices = {
    individual: {
      1: { lessons: 8, real: 4779, sale: 6300 },
      2: { lessons: 16, real: 8959, sale: 12000 },
      3: { lessons: 32, real: 16879, sale: 25000 },
    },
    pair: {
      1: { lessons: 8, real: 2749, sale: 3700 },
      2: { lessons: 16, real: 5129, sale: 7000 },
      3: { lessons: 32, real: 9739, sale: 13500 },
    },
    group: {
      1: { lessons: 12, real: 3459, sale: 4200 },
      2: { lessons: 24, real: 6219, sale: 7700 },
      3: { lessons: 32, real: 7809, sale: 11000 },
    },
  };

  function formatPrice(num) {
    return num.toLocaleString("uk-UA") + " грн";
  }

  // 🧠 Правильне відмінювання “заняття”
  function getLessonWord(num) {
    const lastDigit = num % 10;
    const lastTwo = num % 100;
    if (lastTwo >= 11 && lastTwo <= 14) return "занять";
    if (lastDigit === 1) return "заняття";
    if (lastDigit >= 2 && lastDigit <= 4) return "заняття";
    return "занять";
  }

  function updatePrice(category) {
    lessonsCards.forEach((card, i) => {
      const slot = i + 1;
      const data = prices[category]?.[slot];
      if (!data) return;

      const titleEl = card.querySelector(".lessons__card-title");
      const realPriceEl = card.querySelector(".lessons__card-price-real");
      const discountPriceEl = card.querySelector(".lessons__card-price-discount");
      const oneLessonEl = card.querySelector(".one-lesson__card-price");

      const word = getLessonWord(data.lessons);

      // 🪄 оновлюємо кількість занять
      titleEl.textContent = `${data.lessons} ${word}`;

      // 💰 оновлюємо ціну
      realPriceEl.textContent = formatPrice(data.real);
      discountPriceEl.textContent = formatPrice(data.sale);

      // 🧮 розрахунок ціни за одне заняття
      const oneLessonPrice = Math.round(data.real / data.lessons);
      oneLessonEl.textContent = formatPrice(oneLessonPrice);
    });
  }

  function applyPricesWithScaleAnimation(category) {
    if (!prices[category]) return;

    lessonsCards.forEach((card) => {
      card.style.transition = "transform 0.3s ease-out, opacity 0.3s ease-out";
      card.style.transform = "scale(0)";
      card.style.opacity = "0";
    });

    setTimeout(() => {
      updatePrice(category);

      lessonsCards.forEach((card) => {
        card.style.transition = "none";
        card.style.transform = "scale(0)";
      });

      setTimeout(() => {
        lessonsCards.forEach((card) => {
          card.style.transition = "transform 0.3s ease-in, opacity 0.3s ease-in";
          card.style.transform = "scale(1)";
          card.style.opacity = "1";
        });
      }, 50);
    }, 300);
  }

  lessonsCategory.forEach((item) => {
    item.addEventListener("click", (e) => {
      if (!e.target.classList.contains("selected")) {
        lessonsCategory.forEach((item) => item.classList.remove("selected"));
        e.target.classList.add("selected");
        applyPricesWithScaleAnimation(e.target.dataset.category);
      }
    });
  });

  // 🏁 початкове завантаження
  applyPricesWithScaleAnimation(
    document.querySelector(".lessons-groups-item.selected")?.dataset.category || "individual"
  );

  // ------------------ ФОРМА ------------------
  $.validator.addMethod(
    "regex",
    function (value, element, regexp) {
      return this.optional(element) || regexp.test(value);
    },
    "Номер телефону містить недопустимі символи"
  );

  $("#form").validate({
    rules: {
      name: { required: true },
      phone: {
        required: true,
        regex: /^[0-9+\-\(\)\s]+$/,
        minlength: 7,
        maxlength: 20,
      },
    },
    messages: {
      name: "Будь ласка, вкажіть ваше ім'я",
      phone: {
        required: "Будь ласка, введіть номер телефону",
        minlength: "Номер телефону занадто короткий",
        maxlength: "Номер телефону занадто довгий",
      },
    },
  });

  $("form").submit(function (e) {
    e.preventDefault();

    if (!$(this).valid()) return;

    $.ajax({
      type: "POST",
      url: "telegram.php",
      data: $(this).serialize(),
      beforeSend: function (xhr) {
        e.currentTarget.classList.add("disabled");
        e.currentTarget.setAttribute("disabled", "true");
      },
    }).done(function () {
      $(this).find("input").val("");
      $("#name, #phone, #social, #button_submit").fadeOut(10);
      $("#thanks").fadeIn("slow");
      $("form").trigger("reset");
    });
    return false;
  });

  // ------------------ FAQ ------------------
  const questionButtons = document.querySelectorAll(".questions__item-button");
  const questionInfos = document.querySelectorAll(".questions__item-info");

  questionButtons.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.currentTarget.classList.toggle("questions__item-button-pressed");
      e.currentTarget.classList.toggle("questions__item-button");
      questionInfos.forEach((info) => {
        if (e.currentTarget.dataset.question == info.dataset.question) {
          info.classList.toggle("hidden");
        }
      });
    });
  });

  // ------------------ SCROLL ------------------
  function scroll(id) {
    $(id).on("click", "a", function (event) {
      event.preventDefault();
      const blockId = $(this).attr("href");
      const top = $(blockId).offset().top;
      $("body,html").animate({ scrollTop: top }, 1500);
    });
  }

  scroll("#menu");
  scroll("#menu-mob");
  scroll("#footer__menu");
  scroll("#button_1");
  scroll("#button_2");
  scroll("#card-button_1");
  scroll("#card-button_2");
  scroll("#card-button_3");

  // ------------------ BURGER ------------------
  const burgerMenu = document.querySelector(".burger-menu");
  const burgerBtn = document.querySelector(".promo__burger");

  burgerBtn.addEventListener("click", () => {
    burgerMenu.classList.toggle("opened");
    document.body.style.overflow = burgerMenu.classList.contains("opened")
      ? "hidden"
      : "auto";

    burgerMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        burgerMenu.classList.remove("opened");
        document.body.style.overflow = "auto";
      });
    });
  });
});
