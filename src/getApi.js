const getData = async (end) =>{
    try{
        return await fetch(end).then((response) => {
            if (response.headers.get('content-type') != 'application/json; charset=utf-8') {
                throw new Error(response.headers.get('content-type'));
            }
            var json = response.json();
            return json; 
            });
    }catch(e){
        throw Error('Hubo un error Lo lamento', e)
    }
}

export {getData};