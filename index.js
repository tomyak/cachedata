var expired = (entry)=>(new Date()).getTime() > entry.expiration
var remaining = (entry)=>parseInt((entry.expiration-(new Date()).getTime())/1000)
var cache;

var clear=()=>{
  cache = {
    entries:{}
  }
}

clear()

var keys=()=>Object.keys(cache.entries)

var count=()=>keys().length



var getData=(name)=>{
  var entry = cache.entries[name]
  if (!entry){
      return null;
  }  
  if (expired(entry)){
    return null
  }
  return entry.data
}

var setData=(name,data,expiration)=>{
    expiration=expiration ? expiration : 600
    cache.entries[name]={
        expiration: (new Date()).getTime()+expiration*1000,
        data:data
    }
}

module.exports={
  getData:getData,
  setData:setData,
  clear:clear,
  count:count,
  keys:keys
}
