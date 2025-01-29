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

        axios.post(confirmationUrl, formData)
            .then(response => {
                console.log('Invitation submitted successfully:', response.data);
                this.successMessage = 'Merci pour votre confirmation. Nous vous attendons avec impatience !';
                this.errorMessage = '';
                this.closeModal();
                this.resetForm();
                // Hide success / error message after 3 seconds
                setTimeout(() => {
                  this.successMessage = '';
                  this.errorMessage = '';
                }, 3000); 
            })
            .catch(error => {
                console.error('Error submitting invitation:', error);
                this.successMessage = '';
                if (error.response && error.response.data.errors) {
                    this.errorMessage = 'Veuillez corriger les erreurs suivantes :';
                } else {
                    this.errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
                }
                // Hide success / error message after 3 seconds
                setTimeout(() => {
                  this.successMessage = '';
                  this.errorMessage = '';
                }, 3000); 
            });
    },
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
