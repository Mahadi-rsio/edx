

function saveDataInLocalStorageAsJSON(details:object,key:string){
    const saveDataAsJsonString = JSON.stringify(details,null,2);
    localStorage.setItem(key,saveDataAsJsonString);
}

function getDataFromLocalStorageAsJSON(key:string){
    const storedJsonData = localStorage.getItem(key);
    const extractedDataFromLocalStorage = JSON.parse(storedJsonData? storedJsonData:'')
    return extractedDataFromLocalStorage;
}

export default function Test(){

    saveDataInLocalStorageAsJSON({
        name:'mahadi',
        email : 'rtrt'
    },'mydata')
    
    const data = getDataFromLocalStorageAsJSON('mydata')

    return (
        <div>Hello world {data.name}</div>
    )
}
