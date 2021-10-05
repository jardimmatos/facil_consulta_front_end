import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VeeValidate from 'vee-validate'
import Dictionary from '@/assets/validators'
import VueMask from 'v-mask'

import 'bootstrap/dist/css/bootstrap.css'
import './assets/custom.css'

const veeValidateConfig = {
	inject: true,
	fieldsBagName: 'veeFields',
	errorBagName: 'veeErrors',
	classes: true,
	classNames: {
		valid: 'is-valid',
		invalid: 'is-invalid'
	},
	locale:'pt',
	dictionary: Dictionary
}


Vue.use(VeeValidate, veeValidateConfig)
Vue.use(VueMask);


Vue.config.productionTip = false

new Vue({
	router,
	render: h => h(App)
}).$mount('#app')
