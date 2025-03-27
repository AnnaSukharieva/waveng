$(document).ready(function () {
  const lessonsCategory = document.querySelectorAll(".lessons-groups-item");
  const content = document.querySelectorAll(".lessons__card-price");
  const lessonsCards = document.querySelectorAll(".lessons__card");

  const prices = {
    individual: { 
      // 4: { real: "2499 грн", sale: "3070 грн" }, 
      8: { real: "4779 грн", sale: "5600 грн" }, 
      16: { real: "8959 грн", sale: "11200 грн" }, 
      32: { real: "16879 грн", sale: "22400 грн" }
    },
    group: { 
      // 4: { real: "1139 грн", sale: "1400 грн" }, 
      8: { real: "2059 грн", sale: "2520 грн" }, 
      16: { real: "3939 грн", sale: "5040 грн" }, 
      32: { real: "7369 грн", sale: "10080 грн" }
    },
    pair: { 
      // 4: { real: "1449 грн", sale: "1800 грн" }, 
      8: { real: "2749 грн", sale: "3200 грн" }, 
      16: { real: "5129 грн", sale: "6400 грн" }, 
      32: { real: "9739 грн", sale: "12800 грн" }
    }
  };

  function updatePrice(category) {
    content.forEach((priceWrapper) => {
      const realPriceEl = priceWrapper.querySelector(".lessons__card-price-real");
      const discountPriceEl = priceWrapper.querySelector(".lessons__card-price-discount");
      const id = realPriceEl.id;

      if (prices[category] && prices[category][id]) {
        realPriceEl.innerHTML = prices[category][id].real;
        discountPriceEl.innerHTML = prices[category][id].sale;
      }
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

  applyPricesWithScaleAnimation(document.querySelector(".lessons-groups-item.selected")?.dataset.category || "individual");

  //  lessonsCategory.forEach((item) => {
  //    item.addEventListener("click", (e) => {
  //      lessonsCategory.forEach((item) => item.classList.remove("selected"));
  //      e.target.classList.add("selected");
  //      const img = '<img src="icons/blue_list_arrow.svg" alt="arrow"></img>';
  //      let category;
  //      switch (e.target.dataset.category) {
  //        case "group":
  //          category = "Групові заняття" + img;
  //          break;
  //        case "native":
  //          category = "Заняття з native speaker" + img;
  //          break;
  //        default:
  //          category = "Індивідуальні заняття" + img;
  //      }
  //      dropbtn.innerHTML = category;
  //      content.forEach((price) => {
  //        updatePrice(e.target.dataset.category, price);
  //      });
  //    });
  //  });

  $.validator.addMethod(
    "regex",
    function (value, element, regexp) {
      return this.optional(element) || regexp.test(value);
    },
    "Номер телефону містить недопустимі символи"
  );

  $("#form").validate({
    rules: {
      name: {
        required: true,
      },
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

    if (!$(this).valid()) {
      return;
    }

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

  function scroll(id) {
    $(id).on("click", "a", function (event) {
      //отменяем стандартную обработку нажатия по ссылке
      event.preventDefault();

      //забираем идентификатор бока с атрибута href
      var id = $(this).attr("href"),
        //узнаем высоту от начала страницы до блока на который ссылается якорь
        top = $(id).offset().top;

      //анимируем переход на расстояние - top за 1500 мс
      $("body,html").animate({ scrollTop: top }, 1500);
    });
  }

  const burgerMenu = document.querySelector(".burger-menu");
  const burgerBtn = document.querySelector(".promo__burger");

  burgerBtn.addEventListener("click", () => {
    burgerMenu.classList.toggle("opened");
    if (burgerMenu.classList.contains("opened")) {
      document.querySelector("body").style.overflow = "hidden";
    } else {
      document.querySelector("body").style.overflow = "auto";
    }
    // burgerMenu.classList.toggle('opened');
    burgerMenu.childNodes[0].childNodes[0].childNodes.forEach((item) => {
      item.addEventListener("click", () => {
        burgerMenu.classList.remove("opened");
        document.querySelector("body").style.overflow = "auto";
      });
    });
  });

  scroll("#menu");
  scroll("#menu-mob");
  scroll("#footer__menu");
  scroll("#button_1");
  scroll("#button_2");
  scroll("#card-button_1");
  scroll("#card-button_2");
  scroll("#card-button_3");
});
