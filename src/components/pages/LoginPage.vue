<template>
    <layout-box>
        <div class="row justify-content-md-center mt-5">
            <div class="col-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title mb-4">Sign In</h5>
                        <form>
                            <p v-if="Object.keys(validationError).length != 0" class='text-center '><small
                                    class='text-danger'>Incorrect Email or Password</small></p>
                            <div class="mb-3">
                                <label htmlFor="email" class="form-label">
                                    Email address
                                </label>
                                <input v-model="email" type="email" class="form-control" id="email" name="email" />
                            </div>
                            <div class="mb-3">
                                <label htmlFor="password" class="form-label">Password
                                </label>
                                <input v-model="password" type="password" class="form-control" id="password"
                                    name="password" />
                            </div>
                            <div class="d-grid gap-2">
                                <button :disabled="isSubmitting" @click="loginAction()" type="button"
                                    class="btn btn-primary btn-block">Login</button>
                                <p class="text-center">Don't have account?
                                    <router-link to="/register">Register here </router-link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </layout-box>
</template>

<script>
import axios from 'axios';
import LayoutBox from '../LayoutBox.vue';
export default {
    name: "LoginPage",
    components: { 
        LayoutBox
     },
    data() {
        return {
            email: '',
            password: '',
            validationError: {},
            isSubmitting: false
        }
    },

    created() {
        if (localStorage.getItem('token') != "" && localStorage.getItem('token') != null) {
            this.$router.push('/dashboard')
        }
    },

    methods: {
        loginAction() {
            this.isSubmitting = true
            let playload = {
                email: this.email,
                password: this.password
            }
            axios.post('/api/login', playload)
                .then(response => {
                    localStorage.setItem('token', response.data.token)
                    this.$router.push('/dashboard')
                    return response
                })
                .catch(error => {
                    this.isSubmitting = false
                    if (error.response.data.errors != undefined) {
                        this.validationError = error.response.data.errors
                    }
                    if (error.response.data.error != undefined) {
                        this.validationError = error.response.data.error
                    }
                    return error
                })
        }
    }
}
</script>