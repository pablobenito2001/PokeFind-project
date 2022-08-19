const getDataPoke = async (end) =>{
    try{
        return await fetch(`https://pokeapi.co/api/v2/pokemon/${end}`).then((response) => {
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

const getDataGeneration = async (end) =>{
    try{
        return fetch(`https://pokeapi.co/api/v2/pokemon/${end}`).then((response) => {
            if (response.headers.get('content-type') != 'application/json; charset=utf-8') {
                throw new Error(response.headers.get('content-type'));
            }
            var j = response.json();
            return j; 
            });
    }catch(e){
        throw Error('Hubo un error Lo lamento', e)
    }
}

export {getDataPoke};