<template>
    <div>
        <div class="top-row"></div>
        <!-- CARD -->
        <div class="card">
            <div class="card-text">
                <h1 class="primary-0">Sobre o profissional</h1>
                <div class="my-3">
                    <strong>Dados do profissional</strong>
                </div>
                <div class="row">
                    <div class="col">
                        <!-- FORMULARIO -->
                        <form @submit.stop.prevent="onSubmit">
                            <!-- CAMPOS -->
                            <div class="row">
                                <!-- NOME COMPLETO -->
                                <div class="col col-12">
                                    <div class="form-group">
                                        <label for="input-nome" class="form-label">Nome completo:</label>
                                        <input 
                                            id="input-nome" 
                                            name="input-nome" 
                                            type="text" 
                                            v-model="form.nome_completo" 
                                            class="form-control" 
                                            placeholder="Digite o nome completo"
                                            v-validate="{ required: true, min: 3, max:48 }"
                                            :state="validateField('input-nome')"
                                            data-vv-as="Nome completo"
                                            />
                                        <small class="danger">{{ veeErrors.first('input-nome') }}</small>
                                    </div>
                                </div>
                                
                                <!-- CPF -->
                                <div class="col col-10">
                                    <div class="form-group">
                                        <label for="input-cpf" class="form-label">CPF*:</label>
                                        <input 
                                            id="input-cpf" 
                                            name="input-cpf" 
                                            type="text" 
                                            class="form-control" 
                                            v-model="form.cpf" 
                                            placeholder="000.000.000-00"
                                            v-mask="'###.###.###-##'"
                                            v-validate="{ required: true, min: 14 }"
                                            data-vv-as="CPF"
                                            :state="validateField('input-cpf')"
                                            />
                                        <small class="danger">{{ veeErrors.first('input-cpf') }}</small>
                                    </div>
                                </div>
                                
                                <!-- CELULAR -->
                                <div class="col col-10">
                                    <div class="form-group">
                                        <label for="input-celular" class="form-label">Número de celular*:</label>
                                        <input 
                                            id="input-celular" 
                                            name="input-celular" 
                                            type="text" 
                                            class="form-control"
                                            v-model="form.celular"
                                            placeholder="(00) 0 0000 - 0000"
                                            v-mask="'(##) # #### - ####'"
                                            v-validate="'required'"
                                            :state="validateField('input-celular')"
                                            aria-describedby="input-celular-feedback"
                                            data-vv-as="Número de celular" 
                                            />
                                        <small class="danger">{{ veeErrors.first('input-celular') }}</small>
                                    </div>
                                </div>
                                
                                <!-- ESTADO -->
                                <div class="col col-6">
                                    <div class="form-group">
                                        <label for="input-uf" class="form-label">Estado*:</label>
                                        <select id="input-uf" name="input-uf" class="form-select"
                                            @change="onSelectUF"
                                            v-model="form.uf"
                                            v-validate="{ required: true }"
                                            :state="validateField('input-uf')"
                                            data-vv-as="Estado">

                                            <option :value="null" selected disabled>Selecione</option>
                                            <option v-for="estado,index in estados" :key="`estado_${index}`"
                                                :value="estado.nome">{{estado.nome}}</option>

                                        </select>
                                        
                                        <small class="danger">{{ veeErrors.first('input-uf') }}</small>
                                    </div>
                                    
                                </div>
                                
                                <!-- CIDADE -->
                                <div class="col col-6">
                                    <div class="form-group">
                                        <label for="input-cidade" class="form-label">Cidade*:</label>
                                        <select id="input-cidade" name="input-cidade" class="form-select"
                                            v-model="form.cidade"
                                            v-validate="{ required: true }"
                                            :state="validateField('input-cidade')"
                                            data-vv-as="Cidade">

                                            <option :value="null" selected disabled>Selecione</option>
                                            <option v-for="cidade,index in cidades" :key="`cidade_${index}`"
                                                :value="cidade">{{cidade}}</option>

                                        </select>
                                        
                                        <small class="danger">{{ veeErrors.first('input-cidade') }}</small>
                                    </div>
                                </div>
                            </div>

                            <!-- ACTIONS -->
                            <div class="row mt-4">
                                <div class="col-12 mb-4">
                                    <progress-bar :value="1" :max="2" />
                                </div>
                                <div class="col-12">
                                    <btn-prox />
                                </div>
                            </div>
                            
                        </form>
                    </div>

                    <div class="col d-none d-md-block align-self-center">
                        <img width="100%" src="@/assets/img/desktop-pagina-1.png"/>
                    </div>
                </div>
            </div>
        </div>
	</div>
</template>

<script>
import SessionCadastroStorageService from '../service/SessionCadastroStorage'
import BtnProx from '../components/btnProx.vue'
import ProgressBar from '../components/progressBar.vue';

export default {
	name: 'Pagina1',
	components: {
        BtnProx,ProgressBar
	},
    data() {
        return {
            form: {
                nome_completo: null,
                cpf: null,
                celular: null,
                uf:null,
                cidade:null
            },
        };
    },
    methods: {
        goTo(page){
            this.$router.push({name:page})
        },
        onSelectUF(){
            this.form.cidade = null
        },
        validateField(ref) {
            if ( this.veeFields[ref] && (this.veeFields[ref].dirty || this.veeFields[ref].validated)) {
                return !this.veeErrors.has(ref);
            }
            return null;
        },
        onSubmit() {
            this.$validator.validateAll().then(success => {
                if (!success) return;

                this.salvarDados()
                this.goTo('pagina2')
            });
        },
        salvarDados(){
            SessionCadastroStorageService.adicionarItem('pagina1',this.form)
        },
        obterDados(){
            const dados = SessionCadastroStorageService.obterDados('pagina1')
            if(dados){
                this.form = dados
            }
        }
    },
    computed:{
        estados(){
            const estados = [
                { nome: 'Paraná', cidades: ['Londrina','Maringá'] },
                { nome: 'Rio Grande do Sul', cidades: ['Pelotas','Porto Alegre'] },
                { nome: 'Santa Catarina', cidades: ['Florianópolis','Joinville'] },
            ]
            return estados
        },
        cidades(){
            try{
                const estado = this.estados.filter(obj => obj.nome == this.form.uf)[0]
                return estado.cidades
            }catch{
                return []
            }
        },
    },
    mounted(){
        this.obterDados()
    }
};
</script>