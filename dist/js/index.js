$(document).ready(function () {
  const lessonsCategory = document.querySelectorAll(".lessons-groups-item");
  const content = document.querySelectorAll(".lessons__card-price");
  const slickSlider = document.querySelector(".lessons__cards");

  const prices = {
    individual: {
      1: "599 грн",
      4: "2275 грн",
      8: "4349 грн",
      16: "8145 грн",
      32: "15339 грн",
    },
    group: {
      1: 'не передбачено',
      4: "1029 грн",
      8: "1869 грн",
      16: "3579 грн",
      32: "6699 грн",
    },
    native: {
      1: "999 грн",
      4: "3799 грн",
      8: "7199 грн",
      16: "13799 грн",
      32: "26199 грн",
    },
  };

  function updatePrice(category, price) {
    const id = price.id;
    if (prices[category] && prices[category][id] !== undefined) {
      price.innerHTML = prices[category][id];
    }
  }

  function applyPricesToActiveCategory() {
    const activeCategory = document.querySelector(
      ".lessons-groups-item.selected"
    );
    if (activeCategory) {
      const activeCategoryType = activeCategory.dataset.category;
      content.forEach((price) => {
        updatePrice(activeCategoryType, price);
      });
    }
  }

  applyPricesToActiveCategory();

  lessonsCategory.forEach((item) => {
    item.addEventListener("click", (e) => {
      if (!e.target.classList.contains("selected")) {
        lessonsCategory.forEach((item) => item.classList.remove("selected"));
        e.target.classList.add("selected");

        content.forEach((price) => {
          updatePrice(e.target.dataset.category, price);
        });
      }
    });
  });

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
