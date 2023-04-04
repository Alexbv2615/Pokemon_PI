const validate = (dataEdit) => {

    const [name, value] = Object.entries(dataEdit)[0];
    let errors = {};
    
    // console.log("validate: dataEdit = ", dataEdit);
    // console.log("validate: name = ", name);
    // console.log("validate: value = ", value);

    if(name === 'name'){
        if(!value){
            errors[name] = 'El nombre no puede estar vacío';
        };
        if(value.length > 13){
            errors[name] = 'El nombre no puede exceder los 13 caracteres';
        };
    } else if(name === 'image'){
        if(!value){
            errors[name] = 'La imagen no puede estar vacío';
        };
        if(!/^https?:\/\/.*\.(?:png|jpg|jpeg|gif)$/i.test(value)){
            errors[name] = 'La imagen debe ser una URL válida';
        };
    } else if(name === 'hp' || name === 'attack' || name === 'defense' || name === 'speed'){
        if(!value){
            errors[name] = `El valor de ${name} es requerido`;
        };
        if(value > 999 || value < 0){
            errors[name] = `El valor de ${name} debe estar entre 0 y 999`;
        };
    } else if(name === 'height'){
        if(value > 10 || value < 0){
            errors[name] = `El valor de ${name} debe estar entre 0 y 10`;
        }
    } else if(name === 'weight'){
        if(value > 500 || value < 0){
            errors[name] = `El valor de ${name} debe estar entre 0 y 500`;
        };
    };
    
    return errors[name];
};

export default validate;   



// name: '',
//         image: '',
//         hp: '',
//         attack: '',
//         defense: '',
//         speed: '',
//         height: '',
//         weight: '',
//         types: ''