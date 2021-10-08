<template>
	<div>
		<div class="top-row">
			<button class="btn btn-link my-2" @click="goTo('pagina1')">
				<i class="fas fa-chevron-left primary--1"></i>
			</button>
        </div>
		<!-- CARD -->
		<div class="card">
            <div class="card-text">
				<h1 class="primary-0">Sobre o atendimento</h1>
				<div class="my-3">
                    <strong>Detalhes do atendimento</strong>
                </div>
				<div class="row">
                    <div class="col">
						<!-- FORMULARIO -->
						<form @submit.stop.prevent="onSubmit">
							<!-- CAMPOS -->
							<div class="row">

								<!-- ESPECIALIDADE -->
								<div class="col col-12">
									<div class="form-group">
                                        <label for="input-especialidade" class="form-label">Especialidade principal*:</label>
                                        <select id="input-especialidade" class="form-select"
                                            v-model="form.especialidade"
                                            v-validate="{ required: true }"
                                            :state="validateField('input-especialidade')"
                                            data-vv-as="Especialidade principal"
											data-vv-name="input-especialidade"
											>

                                            <option :value="null" selected disabled>Selecione a especialidade</option>
                                            <option v-for="especialidade,index in especialidades" :key="`especialidade_${index}`"
                                                :value="especialidade">{{especialidade}}</option>

                                        </select>
                                        
                                        <div class="messages-error">{{ veeErrors.first('input-especialidade') }}</div>
                                    </div>
								</div>

								<!-- PREÇO CONSULTA -->
								<div class="col col-10">
									<div class="form-group">
										<label for="input-preco-consulta" class="form-label">Informe o preço da consulta*:</label>
										<div class="input-group">
											<span class="input-group-text bg-primary-0 text-white bolder">R$</span>
											<input type="number" class="form-control" placeholder="Valor"
												v-model="form.preco_consulta" id="input-preco-consulta" name="input-preco-consulta"
												v-validate="'required|between:30,350'"
												:state="validateField('input-preco-consulta')"
												data-vv-as="Preço da consulta"
											/>
										</div>
										<div class="messages-error">{{ veeErrors.first('input-preco-consulta') }}</div>
									</div>
								</div>
								
								<!-- FORMAS PAGAMENTO -->
								<div class="col col-12">
									<div class="form-group">
										<label class="form-label">Formas de pagamento da consulta*:</label><br/>
										<div class="messages-error">{{veeErrors.first('input-formaspagamento')}}</div>
										<div class="form-check custom-checkbox" v-for="fp,index in formas_pagamentos" :key="`forma_${index}`">
											<input class="form-check-input" type="checkbox" :id="`input-formaspagamento_${index}`" 
												@change="onSelectFormaPgto" 
												v-model="form.formas_pagamentos" 
												:value="fp.id"
												v-validate="'required'"
												:state="validateField('input-formaspagamento')"
												data-vv-as="Formas de pagamento"
												data-vv-name="input-formaspagamento"
												/>
											<label class="form-check-label bold" :for="`input-formaspagamento_${index}`">{{fp.id}}</label>
											
											<!-- PARCELAS -->
											<div class="form-group" v-if="fp.parcelas.length > 0 && parcelamentos.length > 0">
												<label class="form-label mt-2">Parcelamento em</label><br/>
												<div class="messages-error">{{veeErrors.first('input-parcelas')}}</div>

												<div class="form-check mt-2" v-for="parc,i in parcelamentos" :key="`parcela_${i}`">
													<input class="form-check-input" type="radio" :id="`input-parcelas_${i}`" 
														v-validate="'included:1,2,3'"
														:state="validateField('input-parcelas')"
														data-vv-as="Parcelas"
														v-model="form.parcelas" 
														:value="parc.qtde"
														data-vv-name="input-parcelas"
														/>
													<label class="form-check-label" :for="`input-parcelas_${i}`">{{parc.descricao}}</label>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>

							<!-- ACTIONS -->
							<div class="row mt-4">
                                <div class="col-12 mb-4">
                                    <progress-bar :value="2" :max="2" />
                                </div>
                                <div class="col-12">
                                    <btn-prox />
                                </div>
                            </div>
						</form>
					</div>
                    <div class="col d-none d-md-block align-self-center">
						<img width="100%" src="@/assets/img/desktop-pagina-2.png"/>
					</div>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
import ProgressBar from '../components/progressBar.vue';
import BtnProx from '../components/btnProx.vue'
import SessionCadastroStorageService from '../service/SessionCadastroStorage'

export default {
	name: 'Pagina2',
	components: {
		BtnProx, ProgressBar
	},
	data(){
		return {
			form:{
				especialidade:null,
				preco_consulta:0,
				formas_pagamentos:[],
				parcelas:0
			},
			parcelamentos:[]
		}
	},
	methods:{
		onSelectFormaPgto(){
			const CARTAO_CREDITO = 'Cartão de crédito'
			try{
				// Se usuário selecionou a forma "Cartão de crédito"
				const cartao_credito_selecionado = this.form.formas_pagamentos.some(obj => obj === CARTAO_CREDITO)
				if(!cartao_credito_selecionado){
					this.zerarParcela()
				}else{
					//caso o usuário tenha selecionado "Cartão de crédito", retornar somente as opções de parcelas do objeto
					const cartao_credito = this.formas_pagamentos.filter(obj => obj.id == CARTAO_CREDITO)
					this.parcelamentos = cartao_credito[0].parcelas
				}
			}catch{
				//Em caso de erro de acesso ao índice do array
				this.zerarParcela()
			}
		},
		zerarParcela(){
			this.form.parcelas = 0
			this.parcelamentos = []
		},
		goTo(page){
			this.$router.push({name:page})
		},
		validateField(field) {
            if ( this.veeFields[field] && (this.veeFields[field].dirty || this.veeFields[field].validated)) {
                return !this.veeErrors.has(field);
            }
            return null;
        },
		onSubmit() {
            this.$validator.validateAll().then(success => {
				//interromper o método em caso de erro em algum campo
                if (!success) return;
				
				this.salvarDados()
				this.goTo('pagina3')
            });
        },
		salvarDados(){
            SessionCadastroStorageService.adicionarItem('pagina2',this.form)
        },
		obterDados(){
            const dados = SessionCadastroStorageService.obterDados('pagina2')
            if(dados){
                this.form = dados
            }
        }
	},
	computed:{
		especialidades(){
			//Array estático de especialidades
			return [
				'Cardiologia',
				'Dermatologia',
				'Neurologia',
				'Oftalmologia',
				'Psiquiatria',
				'Urologia'
			]
		},
		formas_pagamentos(){
			//Array estático de formas de pagamentos
			return [
				{id:'Pix', parcelas:[]},
				{id:'Em dinheiro', parcelas:[]},
				{id:'Cartão de crédito', parcelas:[
					{qtde:1, descricao:'1x, sem juros'},
					{qtde:2, descricao:'2x, sem juros'},
					{qtde:3, descricao:'3x, sem juros'},
					]
				},
			]
		},
	},
	mounted(){
		this.obterDados()
	}
}
</script>

<style>

.custom-checkbox{
    margin: 10px 0 !important;
    padding: 7px 10px;
    border-radius: 4px;
    border-width: 1px;
    border-color: var(--secondary--6);
    background-color: var(--secondary--1);
	-webkit-box-shadow: 2px 2px 3px 0px rgba(50, 50, 50, 0.5);
    -moz-box-shadow:    2px 2px 3px 0px rgba(50, 50, 50, 0.5);
    box-shadow:         2px 2px 3px 0px rgba(50, 50, 50, 0.5);
}
.custom-checkbox input[type=checkbox]{
	margin-left: 10px;
	width:30px;
}
.custom-checkbox .form-label{
	font-weight: bold;
}
.custom-checkbox .form-group{
	margin-left: 40px;
	margin-right: 10px;
}

</style>