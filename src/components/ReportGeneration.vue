<template>
<div>
 <b-card class="text-center" id="b-card">
    
    <b-card>
      <b-button-group size="lg">
      <b-button v-for="(prog, idx) in programs" :key="idx" variant="primary" @click="generateTable(prog.program)">
        {{ prog.program }}
      </b-button>
    </b-button-group>
    </b-card>
 <b-button variant="primary" @click="generateReport()">Generate Report</b-button>
 
    <b-card id="table">
        <b-card-body>
            <b-table class="zui-table zui-table-rounded" striped hover :items="items" :current-page="currentPage" :per-page="perPage"/>
        </b-card-body>
      <b-pagination align="center" :total-rows=items.length :per-page="perPage" v-model="currentPage" class="my-0"/>
    </b-card>
  </b-card>        
</div>
</template>
<script>
import jsPDF from 'jspdf'
import 'jspdf-autotable'

export default {
    data: function(){
		return{	
            programs:[],
            items:[],
            selected_program:'',
          
            currentPage: 1,
            perPage: 10,

        }
    },

    mounted(){
        axios.get('http://127.0.0.1:8081/api/ssu/subjectList')
            .then(response => {
                this.programs = response.data
            })
    },

    methods:{
        generateTable(id){
          var app = this
          app.currentPage = 1
            axios.get('http://127.0.0.1:8081/api/ssu/listByProgram/'+ id)
                .then(response =>{
                  app.items = response.data
                })
          app.selected_program = id
        },

        generateReport(){
            var app = this
            let pdfName = 'test'
            var columns = [
                {title: "Id" , dataKey:"id" },
                {title: "NIC" , dataKey:"nic" },
                {title: "A/L Stream" , dataKey:"alstream" },
                {title: "Z-Score" , dataKey:"zscore" },
                {title: "Selected Degree Program	" , dataKey:"selected_degree_program" },
                {title: "Selected to Option" , dataKey:"selected_option" },
            ]

            var doc = new jsPDF('p','pt')
            doc.autoTable(columns, app.items)
            doc.save(pdfName + '.pdf')
        }

    }
}
</script>
<style>
.zui-table {
    border: solid 1px #DDEEEE;
    border-collapse: collapse;
    border-spacing: 0;
    font: normal 13px Arial, sans-serif;
}
.zui-table thead th {
    background-color: #DDEFEF;
    border: solid 1px #DDEEEE;
    color: #336B6B;
    padding: 10px;
    text-align: center;
    text-shadow: 1px 1px 1px #fff;
}
.zui-table tbody td {
    border: solid 1px #DDEEEE;
    color: #333;
    padding: 10px;
    text-shadow: 1px 1px 1px #fff;
    text-align: center;
}
.zui-table-rounded {
    border: none;
}
.zui-table-rounded thead th {
    background-color: rgb(231, 224, 211);
    border: none;
    text-shadow: 1px 1px 1px #ccc;
    color: #333;
}
.zui-table-rounded thead th:first-child {
    border-radius: 10px 0 0 0;
}
.zui-table-rounded thead th:last-child {
    border-radius: 0 10px 0 0;
}
.zui-table-rounded tbody td {
    border: none;
    border-top: solid 1px #957030;
    background-color: rgb(230, 213, 168);
}
.zui-table-rounded tbody tr:last-child td:first-child {
    border-radius: 0 0 0 10px;
}
.zui-table-rounded tbody tr:last-child td:last-child {
    border-radius: 0 0 10px 0;
}
.rounded-card{
    border-radius:50px;
}
</style>
