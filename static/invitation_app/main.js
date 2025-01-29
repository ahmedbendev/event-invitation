axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"

var app = new Vue({
  el: '#swiper-container',
  delimiters: ["[[", "]]"],
  data() {
    return {
        swiper: null,  // Store the swiper instance
        form: {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            agreedToTerms: false,
            invitationType: invitationType,
        },
        successMessage: '',
        errorMessage: '',
    };
  },
  methods: {
    initializeSwiper() {
        console.log(this.form);
        
      // Initialize Swiper instance
      this.swiper = new Swiper('.swiper-container', {
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        loop: true,
      });
    },
    goToNextSlide() {
      if (this.swiper) {
        this.swiper.slideNext();  // Move to the next slide
      }
    },
    openModal() {
      document.getElementById("confirmationModal").style.display = "flex";
    },
    closeModal() {
      document.getElementById("confirmationModal").style.display = "none";
    },
    showTermsCondition() {
      document.getElementById("terms-and-conditions").style.display = "block";
    },
    submitForm() {
        const formData = {
            invitation_type: this.form.invitationType,
            first_name: this.form.firstName,
            last_name: this.form.lastName,
            phone_number: this.form.phoneNumber,
            agreed_to_terms: this.form.agreedToTerms,
        };
        console.log("formData",formData);

        axios.post('http://127.0.0.1:8000/invitation/submit-invitation/', formData)
            .then(response => {
                console.log('Invitation submitted successfully:', response.data);
                this.successMessage = 'Merci pour votre confirmation. Nous vous attendons avec impatience !';
                this.errorMessage = '';
                this.closeModal();
                this.resetForm();
            })
            .catch(error => {
                console.error('Error submitting invitation:', error);
                this.successMessage = '';
                if (error.response && error.response.data.errors) {
                    this.errorMessage = 'Veuillez corriger les erreurs suivantes :';
                } else {
                    this.errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
                }
            });
    },
    // submitForm() {
    //     console.log(confirmationUrl);
    //     const formData = {
    //         first_name: this.form.firstName,
    //         last_name: this.form.lastName,
    //         phone_number: this.form.phoneNumber,
    //         agreed_to_terms: this.form.agreedToTerms,
    //         invitation_type: this.form.invitationType,
    //     };
    //     console.log("formData",formData);
    //     axios.post(confirmationUrl, formData, {
    //         headers: {
    //             'Content-Type': 'application/json',
    //         }
    //     })
    //     // axios.post('/invitation/submit-invitation/', formData)
    //       .then(response => {
    //         this.successMessage = "Merci pour votre confirmation. Nous vous attendons avec impatience !";
    //         this.errorMessage = '';
    //         this.closeModal();
    //         this.resetForm();
    //       })
    //       .catch(error => {
    //         this.successMessage = '';
    //         if (error.response && error.response.data.errors) {
    //           this.errorMessage = "Veuillez corriger les erreurs suivantes :";
    //           console.error("Validation errors:", error.response.data.errors);
    //         } else {
    //           this.errorMessage = "Une erreur est survenue. Veuillez réessayer.";
    //         }
    //       });
    // },
    // submitForm() {
    //     console.log(confirmationUrl);
    //     const formData = {
    //         first_name: this.form.firstName,
    //         last_name: this.form.lastName,
    //         phone_number: this.form.phoneNumber,
    //         agreed_to_terms: this.form.agreedToTerms,
    //         invitation_type: this.form.invitationType,
    //     };
    //     console.log("formData", formData);
    
    //     $.ajax({
    //         url: confirmationUrl,
    //         type: 'POST',
    //         contentType: 'application/json',
    //         data: JSON.stringify(formData),
    //         headers: {
    //             'X-CSRFToken': window.CSRF_TOKEN  // Add CSRF token to headers
    //         },
    //         success: (response) => {
    //             this.successMessage = "Merci pour votre confirmation. Nous vous attendons avec impatience !";
    //             this.errorMessage = '';
    //             this.closeModal();
    //             this.resetForm();
    //         },
    //         error: (xhr, status, error) => {
    //             this.successMessage = '';
    //             if (xhr.responseJSON && xhr.responseJSON.errors) {
    //                 this.errorMessage = "Veuillez corriger les erreurs suivantes :";
    //                 console.error("Validation errors:", xhr.responseJSON.errors);
    //             } else {
    //                 this.errorMessage = "Une erreur est survenue. Veuillez réessayer.";
    //             }
    //         }
    //     });
    // },
    resetForm() {
        this.form = {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            agreedToTerms: false,
            invitationType: invitationType,
        };
    },
    setupVimeoPlayer() {
      // Check if Vimeo script is already loaded
      if (typeof Vimeo !== 'undefined') {
        this.initializeVimeoPlayer();
      } else {
        // Dynamically load the Vimeo script
        const script = document.createElement('script');
        script.src = "https://player.vimeo.com/api/player.js";
        script.onload = () => {
          this.initializeVimeoPlayer();
        };
        document.body.appendChild(script);
      }
    },
    initializeVimeoPlayer() {
      var button = document.getElementById("play-btn");
      var iframe = document.getElementById("vimeo-video");
      var player = new Vimeo.Player(iframe);

      button.onclick = function() {
        iframe.src = iframe.src.replace("autoplay=0", "autoplay=1");
        iframe.src = iframe.src.replace("controls=0", "controls=1");
        button.style.display = 'none';  // Hide button after click
      };
    },
  },
  mounted() {
    this.initializeSwiper();
    this.setupVimeoPlayer();
    document.getElementById("openModalBtn").onclick = this.openModal;
  },
});
