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
							<div class="col revision">
								<div class="revision-label">Nome Completo: </div>
								<div>{{form.nome_completo}}</div>
							</div>
							<div class="col revision">
								<div class="revision-label">CPF: </div>
								<div>{{form.cpf}}</div>
							</div>
							<div class="col revision">
								<div class="revision-label">Número de celular ou telefone:</div>
								<div>{{form.celular}}</div>
							</div>
							<div class="col revision">
								<div class="revision-label">Estado/Cidade:</div>
								<div>{{form.uf}} - {{form.cidade}}</div>
							</div>
							<div class="col revision">
								<div class="revision-label">Especialidade principal:</div>
								<div>{{form.especialidade}}</div>
							</div>
							<div class="col revision">
								<div class="revision-label">Preço da consulta:</div>
								<div>R$ {{form.preco_consulta}}</div>
							</div>
							<div class="col revision">
								<div class="revision-label">Formas de pagamento da consulta:</div>
								<div v-for="forma,index in form.formas_pagamentos" :key="index">
									- {{forma}} {{ form.parcelas > 0  && forma =='Cartão de crédito' ? `- Parcelamento em ${form.parcelas}x sem juros`:''}}
								</div>
							</div>
							<div class="col-12 my-4">
								<btn-prox class="btn-cta" label="CADASTRAR PROFISSIONAL" />
							</div>
							<div class="col-12 text-center">
								<button class="btn btn-link primary-0" @click="goTo('pagina1')">Editar cadastro
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
