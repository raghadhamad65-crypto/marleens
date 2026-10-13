const shopNowBtn = document.getElementById("shopNowBtn");
const quickOrderOverlay = document.getElementById("quickOrderOverlay");
const quickOrderClose = document.getElementById("quickOrderClose");
const quickOrderForm = document.getElementById("quickOrderForm");

const WHATSAPP_NUMBER = "972595702677";

/* فتح نافذة الطلب */
if (shopNowBtn && quickOrderOverlay) {
  shopNowBtn.addEventListener("click", function (e) {
    e.preventDefault();

    quickOrderOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  });
}

/* إغلاق النافذة */
if (quickOrderClose && quickOrderOverlay) {
  quickOrderClose.addEventListener("click", function () {
    quickOrderOverlay.classList.remove("active");
    document.body.style.overflow = "";
  });
}

/* الضغط خارج النافذة */
if (quickOrderOverlay) {
  quickOrderOverlay.addEventListener("click", function (e) {
    if (e.target === quickOrderOverlay) {
      quickOrderOverlay.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
}

/* إرسال الطلب   */

if (quickOrderForm) {
  quickOrderForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("customerName").value.trim();
    const phone = document.getElementById("customerPhone").value.trim();
    const address = document.getElementById("customerAddress").value.trim();
    const quantity = Number(document.getElementById("customerQty").value);
    const notes = document.getElementById("customerNotes").value.trim();

    const message = `طلب جديد من Marleen's Oil 🌿

المنتج: زيت Marleen's Oil
سعر الوحدة: $40
الكمية: ${quantity}
الإجمالي: $${40 * quantity}

اسم الزبون: ${name}
رقم التواصل: ${phone}
موقع التوصيل: ${address}
${notes ? `ملاحظات: ${notes}` : ""}

أرغب في تأكيد الطلب.`;

    // نسخ تفاصيل الطلب
    const textArea = document.createElement("textarea");
    textArea.value = message;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.select();

    let copied = false;

    try {
      copied = document.execCommand("copy");
    } catch (error) {
      copied = false;
    }

    textArea.remove();

    if (copied) {
      alert("تم نسخ تفاصيل الطلب ❤️\nالصقيها في محادثة مارلين على إنستغرام.");
    } else {
      window.prompt("انسخي تفاصيل الطلب يدويًا:", message);
    }

    // فتح حساب مارلين
    window.open(
      "https://www.instagram.com/marleenn.alhii2/",
      "_blank"
    );

    // إغلاق النموذج بعد تجهيز الطلب
    if (copied) {
      quickOrderForm.reset();
      quickOrderOverlay.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
}
