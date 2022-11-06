new Vue({
    el:"#index_app",
    data:{
        allspot: [],  //全部景點
        spottype: [], //景點種類
        pages: null, //頁碼   // 利用 this.pages = Math.ceil(this.allspot.length / 6); 取出頁碼資料
        currentPage: 1, //分頁
        show:false,
        categorytitle:"請選擇分類",
        allcategorytitle:"全部景點",
        categoryfilter:[], //篩選後的資料包含全部
        allSpotData:[], //全部選入我的最愛的景點資料
        allSpotDataTotal:null, //我的最愛個數

    },
    methods: {
        toPage(i){ //判斷目前點選的頁面
            // console.log(i);
            this.currentPage = i;
        },

        isshow(){
            this.show = ! this.show;
        },

        showCategoryTitle(sort){
            this.categoryfilter = this.allspot
            this.categorytitle = sort;
            this.show = ! this.show;

            if(sort == this.allcategorytitle){
                
              this.newallspot = this.allspot;
              this.pages = Math.ceil(this.newallspot.length / 6);  
              return this.categoryfilter = this.newallspot
             
            
            }else if(sort !== this.allcategorytitle){
                let samesort =[];
                let samecategory = this.allspot.filter(function(item,index){

                    for(let i = 0 ; i < item.category.length; i++){    
                        this.spottype = sort;
                        if(item.category[i].name == this.spottype){
                            samesort.push(item);
                        }
                    }       
                });
            
                this.pages = Math.ceil(samesort.length / 6);
                return this.categoryfilter = samesort;
            }
            
        },

        addtofav(id,pic,name,address,tel,intro){
            // console.log(id,pic, name, address, tel, intro);
            let spotData = {
                "id": id,
                "pic": pic,
                "name": name,
                "address": address,
                "tel": tel,
                "intro": intro,
            };

            let oneSpotdata = this.allSpotData.find(item => {
                return item.id === spotData.id
            });

            if(oneSpotdata){
                return false;
            }else{
                this.allSpotData.push(spotData);
            }

            localStorage.setItem("data",JSON.stringify(this.allSpotData));
            this.allSpotDataTotal = this.allSpotData.length;
            // console.log(this.allSpotDataTotal);
        },

    },
    computed:{
       
        //全部景點種類
        categories(){
            let allcategories = [];
            for(let i = 0; i < this.allspot.length ; i++){
                // console.log(this.allspot[i].category.length);
                for(let y = 0 ; y < this.allspot[i].category.length ; y++){
                    // console.log(this.allspot[i].category[y].name);
                    let categoryname = this.allspot[i].category[y].name
                    allcategories.push(categoryname)
                } 
            } 
            // console.log(allcategories);

            let newallcategories = allcategories.filter(function (element, index, self) {
                return self.indexOf(element) === index;
            });
            return newallcategories;
       },

        // 單頁顯示六筆資料
        spotList(){
            return this.categoryfilter.slice((this.currentPage - 1)*6, this.currentPage * 6);
       },

    },

    mounted() {

        //重新載入
        let data =  localStorage.getItem("data");
        if(data != null){
            this.allSpotData = JSON.parse(data)
            this.allSpotDataTotal = this.allSpotData.length;
        }


        // 全部景點資料
        fetch("./travel_taipei.json",{
            method: 'GET',
            headers: { "Content-Type": "application/json"},
        })  
        .then(resp => resp.json())
        .then((apidata) => {
            this.allspot = apidata.data;
            this.categoryfilter = this.allspot;
            // console.log(this.categoryfilter);
            this.pages = Math.ceil(this.categoryfilter.length / 6);  //一頁顯示六個 
            
            // console.log(this.allspot);

        })
    },


})