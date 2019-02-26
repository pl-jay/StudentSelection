<template>
<div>

<div>
  <b-card class="text-center">
	  <div class="row">
		   <div class="col-2"></div>
		  <div class="col-4">
			  <div class="text-light">
     			<div>
    				<table class="table table-bordered table-info table-sm">
  						<thead>
    						<tr>
      							<th class="bg-success" scope="col">
									  <h6><strong>Degree Programme</strong></h6>
								</th>
      							<th class="bg-success" scope="col">
									  <h6><strong>Students Limit</strong></h6>
								</th>
   							</tr>
  						</thead>
  						<tbody>
    						<tr v-for="sbj in subject">
      							<td><strong>{{ sbj.program }}</strong></td>
      							<td><input class="form-control" type="number" v-model.number="sbj.limit"></td>
    						</tr>
  						</tbody>
					</table>
  				</div>
    		</div>
		  </div>

		  <div class="col-4">
			 <b-card>
				 <div>
  					<b-button block variant="primary">Start Selection</b-button>
					<b-button block variant="primary">Show Lists</b-button>
					<b-button block variant="primary">Generate Reports</b-button>
				</div>
			 </b-card>
		  </div>
	  </div>
  </b-card>
</div>
</div>
</template>

<script>
	export default{

		data: function(){
			return{
				programe:    '',
				list_no:     '',
				std_limit:   '',
                subjectid:   '',
				
				
				subject:[
					{Limit: '<b-form-input v-model.number="subject.limit" type="text" placeholder="Enter limit" />'}
				],
				
				choosen_studentList:{},
				final_List : [],

				// Main Threee List
				list1: {},
				list2: {},
				list3: {},

				// Programme and limit
				listOfStudentlimits:[],

				fields: ['program','Limit'],
			}
		},

		mounted() {
			var app = this;
            axios.get('http://127.0.0.1:8000/api/ssu/subjectList')
            .then(response => {
                app.subject = response.data
                console.log(app.subject)
            })
        },

        methods:{
			
			SubjectTable(){
				var app = this;
			console.log(app.subject)
				axios.post('http://127.0.0.1:8000/api/ssu/fillSubjectTable', app.subjectList)
					.then(response =>{
						console.log(response.data)
					})
			},

        	loadData(){

				// this will fill the three lists with prg, option & limit parameters
        		var app = this;

				// this will empty the final list array
        		app.final_List = []
        		console.log(app.subjectList.subject.length)
        		for (var i = 0; i < app.subjectList.subject.length-1; i++) {
        			
        			var std_limit   = app.subjectList.subject[i].limit
        			//var subj_id 	= app.subjectList.subject[i].choice_id

					var subj_id = app.subjectid                    
        			console.log(std_limit,subj_id)

        			axios.get('http://127.0.0.1:8000/api/ssu/test/'+ subj_id)
        			 	.then(response =>{
        			 		
        			 		app.list1 = response.data[0]
        			 		console.log('fill list 1',app.list1)

        			 		app.list2 = response.data[1]
        			 		console.log('fill list 2', app.list2)

        			 		app.list3 = response.data[2]
        			 		console.log('fill list 3', app.list3)


        			 		this.selection_logic(std_limit)

        			 	})

        		}
        	},


        	selection_logic(limit){
        		var app = this;
        		
        		var list1_length = app.list1.length;
        		var list2_length = app.list2.length;
        		var list3_length = app.list3.length;

        		var due_no1,due_no2,due_no3;

        		console.log('list1_length',app.list1.length)
        		
        		if(list1_length < limit){

        			/* print out */
					console.log('list1_lenght',list1_length)
        			/* end */

        			/* Array Operation */
        			for (var i = 0; i <= list1_length-1; ++i) {
        				app.final_List.push(app.list1[i])
        			}
        			
        			due_no1 = limit - list1_length
        			/* end */
        			
        			/* print out */
						console.log('due_no1',due_no1)
        			
        				console.log('Final List first if', app.final_List)
        			/* end */

        			
        			if(list2_length < due_no1){
        				
        				/* print out */
        				console.log('list2_lenght',list2_length)
        				/* end */

        				/* Array Operation */
        				
        				for (var i = 0; i <= list2_length-1; ++i) {
        					app.final_List.push(app.list2[i])
        				}
        				
        				due_no2 = due_no1 - list2_length
        				
        				/* end */
        				
        				/* print out */
        				console.log('Final List second if', app.final_List)
        				console.log('due_no2',due_no2)
        				/* end */

        			
        				if(list3_length < due_no2){
        					
        					/* print out */
        					console.log('list3_lenght',list3_length)
        					/* end */

        					/* Array Operation */
        					
        					for (var i = 0; i <= list3_length-1; ++i) {
        						app.final_List.push(app.list3[i])
        					}

        					due_no3 = due_no2 - list3_length
        					/* end */

        					/* print out */
        					
        					console.log('Final List third if', app.final_List)
        					console.log('due_no3',due_no3)

        					/* end */

        				} else{
        					/* print out */
        					console.log('else of list3_length')
        					/* end */


        					/* Array Operation */
        					
        					for (var i = 0; i <= due_no2-1; ++i) {
        						app.final_List.push(app.list3[i])
        					}

        					/* end */

        					/* print out */
        					
        					console.log('Final List third if-else', app.final_List)
        				
        					/* end */

        				}

        			} else{
        				

        					/* Array Operation */
        					
        					for (var i = 0; i <= due_no1-1; ++i) {
        						app.final_List.push(app.list2[i])
        					}
        					
        					/* end */

        					/* print out */
        					
        					console.log('Final List second if-else', app.final_List)
        				
        					/* end */

        			}

        		}else{
        			/* Array Operation */
        			
        			for (var i = 0; i <= limit-1; ++i) {
        				app.final_List.push(app.list1[i])
        			}

        			/* end */

        			/* print out */
        					
        				console.log('Final List first if-else', app.final_List)
        				
        			/* end */
        		}
        	},


        	confirm_list(para){
        		var app = this;
        		console.log('NIC', app.final_List[2].nic)
        	},

        	filterByALStream(){

        	}
        }
	}
</script>
