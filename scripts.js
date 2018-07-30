window.addEventListener('load', function(){

  var steel_price_meter_arr = [8, 10, 14, 18, 20, 25, 32, 40, 53]; //ціна різу вуглицевої сталі за 1 метр, грн
  var steel_price_propal_arr = [1.8, 2, 2.6, 3, 3.5, 4.5, 5.8, 7, 9, 8]; // ціна вуглицевої сталі за 1 пропал, грн
  var nonferus_price_meter_arr = [9.6, 12, 16.8, 21.6, 24, 30, 38.4, 48, 63.6]; // ціна різу кольорового металу за 1 метр, грн
  var nonferus_price_propal_arr = [2.16, 2.4, 3.12, 3.6, 4.2, 5.4, 6.96, 8.4, 11, 76]; // ціна кольорового металу за 1 пропал, грн 
   
  var steel_thickness = document.querySelector('#thickness'); // вибір товщини металу користувачем   
  var result = document.querySelector('#oneprice'); // поле виводу результату
  var button = document.querySelector('.calc'); // кнопка підрахунку
  var valid1 = document.querySelector('.inpValid1');  // поле вводу, на якому буде проводитись валідація форми 
  var valid2 = document.querySelector('.inpValid2'); // поле вводу, на якому буде проводитись валідація форми 
  var inputs = document.querySelectorAll('.inp'); // вибірка полів вводу для скидання значення полів вводу
  var reset = document.querySelector('#reset'); // кнопка скидання значення полів вводу  
  
  reset.addEventListener('click', function(){
    // функція для скидання значення полів вводу
    for(var i = 0; i < inputs.length; i++){
      inputs[i].value = ''; 
      steel_thickness.value = 0;  
    }

  });

  valid1.addEventListener('input', validation);
  valid2.addEventListener('input', validation);
  
  button.addEventListener('click', function(){        
    // розрахунок данних, видає кінцевий результат
    result.value = calc();
  });  

  function pricePerThicknessMeter() { 
    // розраховуємо ціну за 1 метр в залежності від товщини та типу металу 
    var steel_type = document.querySelector('#type'); // вибір типу металу користувачем (1 - вуглицева сталь, 2 - кольоровий метал)
    var price;    
        
    if(steel_type.value == 1){
      price = +steel_price_meter_arr[+steel_thickness.value];  
      
      return price;
    } else if(steel_type.value == 2) {
      price = +nonferus_price_meter_arr[+steel_thickness.value];  
      
      return price;
    }    

  };
  
  function pricePerThicknessPropal() { 
    // розраховуємо ціну за 1 пропал в залежності від товщини та типу металу 
    var steel_type = document.querySelector('#type'); // вибір типу металу користувачем (1 - вуглицева сталь, 2 - кольоровий метал)
    var price;    
        
    if(steel_type.value == 1){
      price = +steel_price_propal_arr[+steel_thickness.value];  
      
      return price;
    } else if(steel_type.value == 2) {
      price = +nonferus_price_propal_arr[+steel_thickness.value];  
      
      return price;
    }    

  };
  
  function calc() {
    // вираховуємо вартість для вуглицевої сталі
    var cut_length = document.querySelector('#length'); // довжина різки
    var propals = document.querySelector('#vrez'); // кількість пропалів
    var result = (pricePerThicknessMeter() * cut_length.value) + (pricePerThicknessPropal() * propals.value);

    return Math.round(result);

  };  

  function validation() {
    // функція валідації поля вводу довжини (не допускає ввід символів окрім "." та букв)
    var pattern = /^(-)?[0-9]+$/; 
    if(!pattern.test(this.value)) {      
      var new_value = this.value.replace(/[^0-9.]/g, '');      
      this.value = new_value;
    }

  };
  
})