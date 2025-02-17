axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"

var app = new Vue({
  el: '#review-container',
  delimiters: ["[[", "]]"],
  data() {
    return {
        form: {
            firstName: '',
            lastName: '',
            rating: 0,
            msg:""
        },
        successMessage: '',
        errorMessage: '',
    };
  },
  methods: {
    setRating(star) {
      this.form.rating = star;
    },
    submitForm() {
        const formData = {
            first_name: this.form.firstName,
            last_name: this.form.lastName,
            rating: this.form.rating,
            msg: this.form.msg,
        };
        console.log("formData",formData);

        axios.post(reveiwUrl, formData)
            .then(response => {
                console.log('Invitation submitted successfully:', response.data);
                this.successMessage = 'Avis soumis avec succès! Merci pour votre retour.';
                this.errorMessage = '';
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
        };
    },
},
  mounted() {
  },
});
