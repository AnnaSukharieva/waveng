$(document).ready(function () {
  const lessonsCategory = document.querySelectorAll(".lessons-groups-item");
  const content = document.querySelectorAll(".lessons__card-price");
  const dropbtn = document.querySelector(".dropbtn");

  lessonsCategory.forEach((item) => {
    item.addEventListener("click", (e) => {
      lessonsCategory.forEach((item) => item.classList.remove("selected"));
      e.target.classList.add("selected");
      const img = '<img src="icons/blue_list_arrow.svg" alt="arrow"></img>';
      let category;
      switch (e.target.dataset.category) {
        case "group":
          category = "Групові заняття " + img;
          break;
        case "children":
          category = "Заняття для дітей" + img;
          break;
        case "native":
          category = "Заняття з native speaker" + img;
          break;
        default:
          category = "Індивідуальні заняття" + img;
      }
      dropbtn.innerHTML = category;
      content.forEach((price) => {
        if (
          (e.target.dataset.category == "individual" ||
            e.target.dataset.category == "children") &&
          price.id == 1
        ) {
          price.innerHTML = 339 + " грн";
        }
        if (
          (e.target.dataset.category == "individual" ||
            e.target.dataset.category == "children") &&
          price.id == 4
        ) {
          price.innerHTML = 1299 + " грн";
        }
        if (
          (e.target.dataset.category == "individual" ||
            e.target.dataset.category == "children") &&
          price.id == 8
        ) {
          price.innerHTML = 2449 + " грн";
        }

        if (e.target.dataset.category == "group" && price.id == 1) {
          price.innerHTML = 299 + " грн";
        }
        if (e.target.dataset.category == "group" && price.id == 4) {
          price.innerHTML = 999 + " грн";
        }
        if (e.target.dataset.category == "group" && price.id == 8) {
          price.innerHTML = 1899 + " грн";
        }

        if (e.target.dataset.category == "native" && price.id == 1) {
          price.innerHTML = 999 + " грн";
        }
        if (e.target.dataset.category == "native" && price.id == 4) {
          price.innerHTML = 3799 + " грн";
        }
        if (e.target.dataset.category == "native" && price.id == 8) {
          price.innerHTML = 7199 + " грн";
        }
      });
    });
  });

  $.validator.addMethod("regexp", function (value, element, params) {
    var expression = new RegExp(params);
    return this.optional(element) || expression.test(value);
  });

  $("#form").validate({
    rules: {
      name: "required",
      phone: {
        required: true,
        regexp: /^(\+?\d{1,3}[\-\(\)\d ]{4,15}\d)$/,
      },
    },
    messages: {
      name: "Будь ласка, вкажіть ваше ім'я",
      phone: {
        required: "Будь ласка, введіть ваш номер телефону",
        regexp: "Будь ласка, введіть правильний номер телефону",
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
      $("#name, #phone, #button_submit").fadeOut(10);
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
