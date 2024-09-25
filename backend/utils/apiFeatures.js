class ApiFeatures {
    constructor(query,queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    search(){
        const keyword = this.queryStr.keyword?{
            name:{
                $regex:this.queryStr.keyword,   //regex is the operator in mongdb
                $options:"i",  //case insensitive that wh i here
            }
        }:{

        }
        this.query = this.query.find({...keyword});
        return this;
    }


    filter(){
        const localQuery = {...this.queryStr};
        //removing some fiels for categor
        const removeFields = ["keyword","page","limit"];
        removeFields.forEach(key=>delete localQuery[key]);
        this.query = this.query.find(localQuery);
        return this
    }
}


module.exports = ApiFeatures;