/* =========================================================
   CONTACT FORM + MESSAGE ALERT
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const contactForm =
    document.getElementById("contactForm");

const alertOverlay =
    document.getElementById("alertOverlay");

const messageAlert =
    document.getElementById("messageAlert");

const alertMainIcon =
    document.getElementById("alertMainIcon");

const alertStatus =
    document.getElementById("alertStatus");

const alertStatusIcon =
    document.getElementById("alertStatusIcon");

const alertStatusText =
    document.getElementById("alertStatusText");

const alertTitle =
    document.getElementById("alertTitle");

const alertDescription =
    document.getElementById("alertDescription");

const alertPrimaryBtn =
    document.getElementById("alertPrimaryBtn");

const alertPrimaryIcon =
    document.getElementById("alertPrimaryIcon");

const alertPrimaryText =
    document.getElementById("alertPrimaryText");

const sendMessageBtn =
    document.getElementById("sendMessageBtn");


/* =========================================================
   SHOW SUCCESS ALERT
========================================================= */

function showSuccessAlert() {

    /* Remove error state */

    messageAlert.classList.remove("error");


    /* Main icon */

    alertMainIcon.className =
        "fa-solid fa-check";


    /* Status */

    alertStatus.className =
        "alert-status success-status";


    alertStatusIcon.className =
        "fa-regular fa-circle-check";


    alertStatusText.textContent =
        "Message Sent Successfully";


    /* Title */

    alertTitle.textContent =
        "Message Sent Successfully!";


    /* Description */

    alertDescription.textContent =
        "Thank you for reaching out. Your message has been sent successfully. I will get back to you as soon as possible.";


    /* Button */

    alertPrimaryIcon.className =
        "fa-solid fa-check";


    alertPrimaryText.textContent =
        "OK";


    /* Show */

    alertOverlay.classList.add("show");

}


/* =========================================================
   SHOW ERROR ALERT
========================================================= */

function showErrorAlert() {

    /* Add error state */

    messageAlert.classList.add("error");


    /* Main icon */

    alertMainIcon.className =
        "fa-solid fa-xmark";


    /* Status */

    alertStatus.className =
        "alert-status error-status";


    alertStatusIcon.className =
        "fa-regular fa-circle-xmark";


    alertStatusText.textContent =
        "Message Failed";


    /* Title */

    alertTitle.textContent =
        "Message Failed!";


    /* Description */

    alertDescription.textContent =
        "Something went wrong while sending your message. Please try again in a few moments.";


    /* Button */

    alertPrimaryIcon.className =
        "fa-solid fa-rotate";


    alertPrimaryText.textContent =
        "Try Again";


    /* Show */

    alertOverlay.classList.add("show");

}


/* =========================================================
   CLOSE ALERT
========================================================= */

function closeAlert() {

    alertOverlay.classList.remove("show");

}


/* =========================================================
   PRIMARY ALERT BUTTON
========================================================= */

alertPrimaryBtn.addEventListener(
    "click",
    function () {

        const isError =
            messageAlert.classList.contains("error");


        closeAlert();


        /* =================================================
           ERROR
           Return user to contact form
        ================================================= */

        if (isError) {

            setTimeout(() => {

                const contactSection =
                    document.getElementById("contact");

                if (contactSection) {

                    contactSection.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });

                }


                const nameInput =
                    document.getElementById("name");

                if (nameInput) {

                    nameInput.focus();

                }

            }, 250);

        }

    }
);


/* =========================================================
   CLICK OUTSIDE ALERT
========================================================= */

alertOverlay.addEventListener(
    "click",
    function (e) {

        if (e.target === alertOverlay) {

            closeAlert();

        }

    }
);


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    function (e) {

        if (
            e.key === "Escape" &&
            alertOverlay.classList.contains("show")
        ) {

            closeAlert();

        }

    }
);


/* =========================================================
   CONTACT FORM SUBMIT
========================================================= */

contactForm.addEventListener(
    "submit",
    async function (e) {

        e.preventDefault();


        /* Form */

        const form = e.target;


        /* Form data */

        const formData =
            new FormData(form);


        /* Original button */

        const originalButton =
            sendMessageBtn.innerHTML;


        /* =================================================
           LOADING STATE
        ================================================= */

        sendMessageBtn.disabled = true;


        sendMessageBtn.innerHTML = `
            <i class="fa-solid fa-spinner fa-spin"></i>
            Sending...
        `;


        try {

            /* =================================================
               WEB3FORMS REQUEST
            ================================================= */

            const response = await fetch(
                "https://api.web3forms.com/submit",
                {
                    method: "POST",
                    body: formData
                }
            );


            /* JSON */

            const result =
                await response.json();


            /* =================================================
               SUCCESS
            ================================================= */

            if (
                response.ok &&
                result.success
            ) {

                /* Clear form */

                form.reset();


                /* Restore button */

                sendMessageBtn.disabled =
                    false;

                sendMessageBtn.innerHTML =
                    originalButton;


                /* Show success */

                showSuccessAlert();

            }


            /* =================================================
               API ERROR
            ================================================= */

            else {

                sendMessageBtn.disabled =
                    false;

                sendMessageBtn.innerHTML =
                    originalButton;


                console.error(
                    "Web3Forms Error:",
                    result.message
                );


                showErrorAlert();

            }

        }


        /* =================================================
           NETWORK ERROR
        ================================================= */

        catch (error) {

            console.error(
                "Contact form error:",
                error
            );


            /* Restore button */

            sendMessageBtn.disabled =
                false;

            sendMessageBtn.innerHTML =
                originalButton;


            /* Show error */

            showErrorAlert();

        }

    }
);