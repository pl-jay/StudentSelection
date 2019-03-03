<template>
<div>
  <b-card id="b-card">
	  <div class="row">
			<div class="col-2"></div>
			 <div class="col-4">
			 <b-card>
				 <div>
					 <b-button block variant="primary" @click="confirmLimitList()"><strong>Confirm Limit List</strong></b-button>
					 <br>
					 <br>
  					<b-button block variant="primary" @click="startSelection()"><strong>Start Selection</strong></b-button>
					<b-button block variant="primary" @click="showLists()"><strong>Show Lists</strong></b-button>
					<b-button block variant="primary" @click="genarateReports()"><strong>Generate Reports</strong></b-button>
				</div>
			 </b-card>
		  </div>
		   <!-- <div class="col-2"></div> -->
		  <div class="col-4">
			  <div class="text-light">
     			<div>
    				<table class="table table-info table-sm">
  						<thead>
    						<tr>
      							<th class="bg-info" scope="col" style="text-align: center; !important">
									  <h6><strong>Degree Programme</strong></h6>
								</th>
      							<th class="bg-info" scope="col" style="text-align: center; !important">
									  <h6><strong>Students Limit</strong></h6>
								</th>
   							</tr>
  						</thead>
  						<tbody>
    						<tr v-for="sbj in subjectList.subject" >
      							<td style="text-align: center; !important"><strong>{{ sbj.program }}</strong></td>
      							<td><input class="form-control" type="number" v-model.number="sbj.limit"></td>
    						</tr>
  						</tbody>
					</table>
  				</div>
    		</div>
		  </div>
			<div class="col-2"></div>
	  </div>
  </b-card>
</div>
</template>

<script>

import jsPDF from 'jspdf'
import 'jspdf-autotable'

	export default{

		data: function(){
			return{				
				subjectList:{
					subject:{},
				},
				reports:['Whole List(sorted by ZScore)', 'Selected List', 'Unselected List'],
				fields: ['program','Limit'],
				reportList:[]
			}
		},

		props:{
			confirmbtn_bool: false,
		},

		mounted() {
			var app = this;
			
			return new Promise((resolve) => {
				let timerInterval
				this.$swal({
					title: 'Loading Data....',
					toast: true,
					timer: 3000,
					allowOutsideClick: false,
					onOpen: () => {
						this.$swal.showLoading()
					},
					onClose: () => {
						clearInterval(timerInterval)
					}
				}).then((result) => {
						axios.get('subjectList')
            		 .then(response => {
									app.subjectList.subject = response.data
									resolve();  
								})
			    })
				setTimeout(() =>{	
				}, 3000);
			});
        },

    methods:{
			
			confirmButton(){
				this.confirmbtn_bool = true
			},

			getAll(){
				axios.get('http://127.0.0.1:8081/api/ssu/wholeList')
						.then( res => {
							console.log(res.data)
						})
			},
			
			confirmLimitList(){
				var app = this;

				var i = 0;
				app.subjectList.subject.forEach(function (key, value) {
					if(!app.subjectList.subject[value].limit){
						i=i+1
					}
				})
				if(!i){
					
					app.$swal.fire({
  					title: 'Are you sure?',
  					text: "This will update Students Limits Table",
  					type: 'warning',
						showCancelButton: true,
						allowOutsideClick: false,
						confirmButtonText: 'Confirm',
						showLoaderOnConfirm: true,

							
						preConfirm: (login) => {
    				return axios.post('http://127.0.0.1:8081/api/ssu/fillSubjectTable', app.subjectList)
      			.then(response => {
        				if (response.ok) {
          				throw new Error(response.statusText)
								}
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
      				title: "Successfully Updated!",
      				type:'success'
    			})
  				}
				})
				}else{
					app.$swal.fire({
  						title:'Please Fill the Limits Table',
						type:'warning',
						allowOutsideClick: false,
					})
				}
				
			},
			startSelection(){
				
				this.$swal.fire({
					title: 'Selection Process',
					type:'info',
					showCancelButton: true,
  				confirmButtonText: 'Start process..',
					showLoaderOnConfirm: true,
					allowOutsideClick: false,
					
  				preConfirm: (login) => {
    				return axios.post('http://127.0.0.1:8081/api/ssu/selection_process')
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
      				title: "Selection Process Success !",
      				type:'success'
    			})
  				}
				})

			},
			
			showLists(){
				 this.$router.push('/reportsView')
			},

			genarateReports(){
				this.$swal.fire({
					title: 'Select type of Report',
					input: 'select',
					inputOptions: this.reports,
					showCancelButton: true,
  				confirmButtonText: 'Generate',
					showLoaderOnConfirm: true,
					
  				preConfirm: (login) => {
    				return axios.get(`/reportResult/${login}`)
      			.then(response => {
        				if (response.ok) {
          				throw new Error(response.statusText)
								}
								this.reportList = response.data
								this.generatePDF()
      			})
      			.catch(error => {
       			 this.$swal.showValidationMessage(`Request failed: ${error}`)
      			})
  				},
  			allowOutsideClick: () => !this.$swal.isLoading()
				}).then((result) => {
  				if (result.value) {
    				this.$swal.fire({
      				title: "Report generation Success !",
      				type:'success'
    			})
  				}
				})
			},

			generatePDF(){
            var app = this
            let pdfName = 'test'
            var doc = new jsPDF('l','pt', 'a3')
						doc.autoTable({
							//head:[['Name','NIC','Address1','Address2', 'Address3', 'zscore', 'AlStream','option1','option2','option3']],
							body: app.reportList})
            doc.save(pdfName + '.pdf')
				}
				
    }
	}
</script>
<style>
#b-card{
	    background-color: rgb(226, 229, 232);
}
    
</style>
