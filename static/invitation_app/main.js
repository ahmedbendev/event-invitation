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
            email:'',
            agreedToTerms: false,
            invitationType: invitationType,
        },
        successMessage: '',
        errorMessage: '',
    };
  },
  methods: {
    initializeSwiper() {
      this.swiper = new Swiper('.swiper-container', {
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        loop: false,
        on: {
          // Reinitialize the Vimeo player on slide change
          // slideChange: () => {
          //   this.initializeVimeoPlayer();
          // },
        },
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
            email: this.form.email,
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
                }, 5000); 
            });
    },
    resetForm() {
        this.form = {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email:'',
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
  //   initializeVimeoPlayer() {
  //     const button = document.getElementById("play-btn");
  //     const iframe = document.getElementById("vimeo-video");
    
  //     // Initialize the Vimeo Player
  //     const player = new Vimeo.Player(iframe);
    
  //     // Add click event to the button
  //     button.onclick = function () {
  //       // Play the video using the Vimeo Player API
  //       player.play().then(() => {
  //         console.log("Video is playing");
  //         // Hide the button after the video starts playing
  //         button.style.display = 'none';
  //       }).catch((error) => {
  //         console.error("Error playing the video:", error);
  //       });
  //     };
  //   }
  // },
  initializeVimeoPlayer() {
    var button = document.getElementById("play-btn");
    var iframe = document.getElementById("vimeo-video");
    var player = new Vimeo.Player(iframe);

    button.onclick = function() {
      iframe.src = iframe.src.replace("autoplay=0", "autoplay=1");
      iframe.src = iframe.src.replace("controls=0", "controls=1");
      // Play the video using the Vimeo Player API
      player.play().then(() => {
        console.log("Video is playing");
        // Hide the button after the video starts playing
        button.style.display = 'none';
      }).catch((error) => {
        console.error("Error playing the video:", error);
      });
      button.style.display = 'none';
    };
  },
},
  mounted() {
    this.initializeSwiper();
    this.setupVimeoPlayer();
    document.getElementById("openModalBtn").onclick = this.openModal;
  },
});
