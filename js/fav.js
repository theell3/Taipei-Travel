new Vue({
    el:"#fav_app",
    data:{
        allspotdata:[],
        pages:0,
        currentPage: 1,
        id: null,
        name: null,
        address: null,
        tel: null,
        intro: null,
        showeEditplace:false,
        allSpotDataTotal:null, //我的最愛個數
    },
    methods: {

        // 刪除我的最愛
        removemyfav(id){
            this.allspotdata = this.allspotdata.filter(function(item){
                return item.id != id  // 得出點擊刪除的景點以外的景點
            });
            console.log(this.allspotdata)
            // console.log(this.allspotdata.length)
            
            if(this.allspotdata.length === 0){ //判斷為空陣列
                localStorage.removeItem("data"); 
                this.allSpotDataTotal = null;
                alert("已從我的最愛移除囉");
            }else{   
                localStorage.setItem("data",JSON.stringify(this.allspotdata));
                
                this.allSpotDataTotal = this.allSpotDataTotal - 1;
                alert("已從我的最愛移除囉");
            }

        },

        // 編輯我的最愛
        editmyfav(item){
            // console.log(item);
            // console.log(item.name);
            this.showeEditplace = true;
            this.id = item.id;
            this.pic = item.pic
            this.name = item.name;
            this.address= item.address;
            this.tel= item.tel;
            this.intro= item.intro;
            // console.log(this.name);
        },

        //確認更改我的最愛
        savemyfav(){
            // console.log(this.id);
            // console.log(this.name);
            // console.log(this.pic)
            let updaateMyfavData ={
                "id": this.id,
                "pic": this.pic,
                "name": this.name,
                "address": this.address,
                "tel": this.tel,
                "intro": this.intro,
            }

            if(updaateMyfavData.name == "" ){
                alert("名稱不可空白");
            }else if(updaateMyfavData.address == ""){
                alert("地址不可空白");
            }else if(updaateMyfavData.tel == ""){
                alert("電話不可空白");
            }else if(updaateMyfavData.intro == ""){
                alert("介紹不可空白");
            }else{
                    for(let i = 0; i < this.allspotdata.length ; i++){
                    if(updaateMyfavData.id == this.allspotdata[i].id){
                        // console.log(i);
                        this.allspotdata[i].name = updaateMyfavData.name;
                        this.allspotdata[i].address = updaateMyfavData.address;
                        this.allspotdata[i].tel = updaateMyfavData.tel;
                        this.allspotdata[i].intro = updaateMyfavData.intro;
                    }
                }

                localStorage.setItem("data",JSON.stringify(this.allspotdata));
                this.showeEditplace = false;
            }
            

            
        
        },

        closePopup(){
            this.showeEditplace = false;
        },

        toPage(i){
            this.currentPage = i;
        },

    },
    computed:{
        myfavlist(){
            if( this.allspotdata != null){
                if(this.allspotdata.length<=6){
                    this.pages = 0
                    
                }else{
                    this.pages = Math.ceil(this.allspotdata.length / 6);
                    return this.allspotdata.slice((this.currentPage - 1)*6, this.currentPage * 6);
                }
                
                
                return this.allspotdata;
            }
            
        }
    },

    mounted() {
        //取localstorage的data資料
        let data =  localStorage.getItem("data");
        // console.log(data);
        this.allspotdata = JSON.parse(data);
        this.pages = Math.ceil(this.allspotdata.length / 6);
        this.allSpotDataTotal = this.allspotdata.length
    },


})