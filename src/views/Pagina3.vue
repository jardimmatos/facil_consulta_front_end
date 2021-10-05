<template>
	<div>
		<div class="top-row">
			<button class="btn btn-link my-2" @click="goTo('pagina2')">
				<i class="fas fa-chevron-left primary--1"></i>
			</button>
		</div>
		<!-- CARD --> 
		<div class="card">
            <div class="card-text">
                <h1 class="primary-0">Revisão do cadastro</h1>
				<form @submit.stop.prevent="cadastrarProfissional">
					<div class="row">
						<div class="col">
							<div class="col my-2">
								<strong>Nome Completo: </strong>
								<div>{{form.nome_completo}}</div>
							</div>
							<div class="col my-2">
								<strong>CPF: </strong>
								<div>{{form.cpf}}</div>
							</div>
							<div class="col my-2">
								<strong>Número de celular ou telefone:</strong>
								<div>{{form.celular}}</div>
							</div>
							<div class="col my-2">
								<strong>Estado/Cidade:</strong>
								<div>{{form.uf}} - {{form.cidade}}</div>
							</div>
							<div class="col my-2">
								<strong>Especialidade principal:</strong>
								<div>{{form.especialidade}}</div>
							</div>
							<div class="col my-2">
								<strong>Preço da consulta:</strong>
								<div>R$ {{form.preco_consulta}}</div>
							</div>
							<div class="col my-2">
								<strong>Formas de pagamento da consulta:</strong>
								<div v-for="forma,index in form.formas_pagamentos" :key="index">
									- {{forma}} {{ form.parcelas > 0  && forma =='Cartão de crédito' ? `- Parcelamento em ${form.parcelas}x sem juros`:''}}
								</div>
							</div>
							<div class="col-12 my-4">
								<btn-prox class="btn-cta" label="CADASTRAR PROFISSIONAL" />
							</div>
							<div class="col-12 text-center">
								<button class="btn btn-link my-2 primary-0" @click="goTo('pagina1')">Editar cadastro
								</button>
							</div>
						</div>
						<div class="col d-none d-md-block align-self-center">
							<img width="100%" class="" src="@/assets/img/desktop-pagina-3.png"/>
						</div>
					</div>
				</form>
            </div>
        </div>
	</div>
</template>

<script>
import BtnProx from '../components/btnProx.vue'
import SessionCadastroStorageService from '../service/SessionCadastroStorage'

export default {
	name: 'Pagina3',
	components: {
		BtnProx
	},
	data(){
		return{
			form:{}
		}
	},
	methods:{
		goTo(page){
			this.$router.push({name:page})
		},
		cadastrarProfissional(){
			this.goTo('pagina4')
		},
		obterDados(){
            const pagina1 = SessionCadastroStorageService.obterDados('pagina1')
            const pagina2 = SessionCadastroStorageService.obterDados('pagina2')
			this.form = {...pagina1, ...pagina2}
		}
	},
	mounted(){
		this.obterDados()
	}
}
</script>
