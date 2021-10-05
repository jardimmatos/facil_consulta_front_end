<template>
	<div>
		<div class="top-row"></div>
		<div class="card">
            <div class="card-text">
                <h1 class="primary-0">Cadastro concluído</h1>
                <div class="row">
                    <div class="col text-center my-5" >
                        <img width="100px" src="@/assets/img/check.png"/>
                    </div>
				</div>
                <div class="row">
					<div class="col text-center">
						<div class="pb-5">
							<p>O profissional foi cadastrado com sucesso!</p>
						</div>
                    </div>
                </div>
                <div class="row">
					<div class="col-12 text-center my-4">
						<button class="btn btn-primary btn-cta" @click="cadastrarNovo">Cadastrar novo profissional</button>
					</div>
                </div>
            </div>
        </div>
	</div>
</template>

<script>
import SessionCadastroStorageService from '../service/SessionCadastroStorage'
export default {
	name: 'Pagina4',
	methods:{
		cadastrarNovo(){
			SessionCadastroStorageService.removerItem('pagina1')
			SessionCadastroStorageService.removerItem('pagina2')
			this.$router.push({name:'pagina1'})
		},
		obterDados(){
			const pagina1 = SessionCadastroStorageService.obterDados('pagina1')
			const pagina2 = SessionCadastroStorageService.obterDados('pagina2')
			if (!pagina1 || !pagina2){
				alert('Dados incompletos')
				this.$router.push({name:'pagina1'})
			}
		}
	},
	mounted(){
		this.obterDados()
	}
}
</script>
