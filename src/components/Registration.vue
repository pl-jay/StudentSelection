<template>
<div>
  <b-card no-body style="padding-left: 20px;padding-right: 20px;padding-top: 50px;">
    <b-tabs card>    
    <b-tab>
            <template slot="title">
                <b-spinner type="border" v-if="loading" small /> Register a Student
            </template>
    <div class="row" style="padding-top: 20px;">
        <div class="col-4">
            
        </div>
        <div class="col-4">
        <b-card>
            <b-card-body>
                <b-form-group label-cols="4" label-cols-lg="4" label="Student NIC :" label-for="input_default">
                   <b-form-input v-model="student.nic" type="text" placeholder="Enter NIC" />
                </b-form-group>
                <b-button centers size="lg" variant="primary" @click="studentDetails()" >Search</b-button>
            </b-card-body>
        </b-card>
    </div>    
    </div>
            
    <div class="row" v-if="showtable" style="padding-top: 40px;">
    <div class="col-md-2"></div>
    <div class="col-md-8">
    
        <b-card>
        <b-card-body>
            <h3>Student Details</h3>
            <b-table striped hover :items="student.studentDetails" >
            </b-table>
        <b-button centers size="lg" variant="primary" @click="confirmStudent()" >Confirm</b-button>
        </b-card-body>
    </b-card>
    </div>
    <div class="col-md-2"></div>
    </div> 
    </b-tab>

        <b-tab title="Finalize Registraion">
            <h3>Finalize the Registration</h3>
        </b-tab>
    </b-tabs>
  </b-card>    
</div>
</template>
<script>
export default {
    data:function(){
        return{
            fields:['ID', 'NIC', 'ALStream', 'ZScore', 'Selected Program', 'Selected Option'],
            student:{
                studentDetails:[],
                nic:'',
            },
            showtable:false,
            loading: false
        }
    },

    methods:{
        studentDetails(){
            var app = this;
            app.loading = true
            axios.get('http://127.0.0.1:8081/api/ssu/studentByNIC/' + app.student.nic)
                .then(res => {
                    if(res.data.length != 0){
                       app.student.studentDetails = res.data
                       const Toast = this.$swal.mixin({
                       toast: true,
                       position: 'bottom-right',
                       showConfirmButton: false,
                       timer: 3000
                       });
                       Toast.fire({
                           type: 'success',
                           title: 'Data loaded Successfully !'
                        })
                        app.showtable = true
                        app.loading   = false

                    }else{
                       app.loading   = false
                       const Toast = this.$swal.mixin({
                       toast: true,
                       position: 'bottom-right',
                       showConfirmButton: false,
                       timer: 3000
                       });
                       Toast.fire({
                           type: 'error',
                           title: 'Student Not Selected  !'
                        })
                    }
                    
                })

        },

        confirmStudent(){
            var app = this;
            this.$swal.fire({
					title: 'Registration Process',
					type:'info',
					showCancelButton: true,
  				confirmButtonText: 'Start process..',
					showLoaderOnConfirm: true,
					allowOutsideClick: false,
					
  				preConfirm: (login) => {
    				return axios.get('http://127.0.0.1:8081/api/ssu/enroll/'+ app.student.nic +'/1')
      			.then(response => {
        				if (response.ok) {
          				throw new Error(response.statusText)
								}
								console.log(response)
        				return response
      			})
      			.catch(error => {
       			 this.$swal.showValidationMessage(`Request failed: ${error}`)
      			})
  				},
  			allowOutsideClick: () => !this.$swal.isLoading()
				}).then((result) => {
  				if (result.value) {
    				this.$swal.fire({
                      title: "Registration Process Success !",
                      text: result,
      				type:'success'
    			})
  				}
				})
            
        }
    }
}
</script>
