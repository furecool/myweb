// MVC - model, view, controller
// API

// =================== MODEL (數據的model) ===================

var model = (function(){

  var item = function(id,name,value){
    this.id = id;
    this.name = name;
    this.value = value;
  };

  var data = {
    allItems:[],
    totals:0,
  }

  var calculateTotal = function(){
    var sum = 0;
    data.allItems.forEach(function(currentVal){
      sum += currentVal.value;
    });
    data.totals = sum;
  };

  return{
    addItem:function(name,value){
      var ID;
      //賦予加入數組的元素ID
      if(data.allItems.length > 0){ //賦予加入數組的元素ID
        ID = data.allItems[data.allItems.length -1].id + 1;
      }else{
        ID = 0;
      }
      var newItem = new item(ID,name,value);
      data.allItems.push(newItem);
      return newItem;
    },

    deleteItem:function(id){
      var ids = data.allItems.map(function(currentVal){
        return currentVal.id;
      });
      var index = ids.indexOf(parseInt(id,10));
      // console.log(index);
      if(index >= 0){ // index = -1 則為該元素不存在
        data.allItems.splice(index,1); // 把某id元素從數組移除，從這開始移除幾個
      }

    },

    calculateSum:function(){
      calculateTotal();
      return{
        sum: data.totals,
      }
    },

    test:function(){
      console.log(data);
    }
  }

})();

// =================== VIEW (get DOM element) ===================

var view = (function(){

  var DOMstrings = {
    name:'.name',
    value:'.value',
    btn:'.bought_btn',
    list:'.bought_list',
    sumLabel:'.total_value',
    container:'.container',
    month:'.month',
  }

  var formatting = function(number){
    number = number.toFixed(2); //保留小數點後兩位
    number = number.replace(/(\d)(?=(\d{3})+\.)/g,'$1,'); // regular expression
    return number;
  };

  return{
    // 把需要傳遞給其他funcion的返回值存在這
    getInfo: function(){
      return{
        name:document.querySelector(DOMstrings.name).value,
        // parseFloat讓字符串變數字
        value:parseFloat(document.querySelector(DOMstrings.value).value),
      };
    },

    addListItem:function(object){
      var newHTML;
      var element = DOMstrings.list;
      var html = '<div class="item clearfix" id="%id%"><div class="item_name">%name%</div><div class="right clearfix"><div class="item_value">%value%</div><div class="delete"><button class="delete_btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      newHTML = html.replace('%id%',object.id);
      newHTML = newHTML.replace('%name%',object.name);
      newHTML = newHTML.replace('%value%',formatting(object.value) + '元');
      document.querySelector(element).insertAdjacentHTML('beforeend',newHTML);
    },

    deleteListItem:function(id){
      var element = document.getElementById(id);
      // console.log(element);
      element.parentNode.removeChild(element);
    },

    //輸入後會清除輸入框
    clearInput:function(){
      var inputs = document.querySelectorAll(DOMstrings.name+','+DOMstrings.value);
      //數組的原型借用slice這個method，運用到inputs這個list裡，再轉換成數組
      var inputArray = Array.prototype.slice.call(inputs);
      // console.log(inputArray);
      inputArray.forEach(function(currentVal){ //清空
        currentVal.value = '';
      });
      inputArray[0].focus(); //預設輸入焦點在第一個輸入框
    },

    displaySum:function(object){
      document.querySelector(DOMstrings.sumLabel).textContent = formatting(object.sum) + '元';
    },

    displayMonth:function(){
      var now = new Date();
      var year = now.getFullYear();
      var month = now.getMonth()+1; // getMonth() 顯示0~11
      document.querySelector(DOMstrings.month).textContent = year+'年'+month+'月';
      // console.log(now);
      // console.log(month);
    },

    //如果不返回DOMstrings，controller裡無法調用
    getDOMstrings:function(){
      return DOMstrings;
    },

  };

})();

// =================== CONTROLLER (拿view裡的東西來操作) ===================

var controller = (function(m, v){

  // 讓鍵盤和游標的監聽器做為初始化的部分
  var setupEventListener = function(){
    var DOMstrings = view.getDOMstrings();
    document.querySelector(DOMstrings.btn).addEventListener('click', addItem);
    document.addEventListener('keypress', function(event){
      if(event.keycode === 13 || event.which === 13){
        addItem();
      }
    });
    document.querySelector(DOMstrings.container).addEventListener('click', deleteItem);
  };

  // 這裡我加了4次parentNode，注意!!!
  var deleteItem = function(event){
    var itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
    // console.log(itemID);
    model.deleteItem(itemID);
    view.deleteListItem(itemID);
    updateTotal();
  };

  var updateTotal = function(){
    var sum = model.calculateSum();
    // console.log(sum);
    view.displaySum(sum);
  };

  var addItem = function(){
    var input = view.getInfo();
    // console.log(input);
    // !isNaN => 不是非數字
    if(input.name !== '' && !isNaN(input.value) && input.value > 0){
      var newItem = model.addItem(input.name,input.value);
      view.addListItem(newItem);
      view.clearInput();
      updateTotal();
    }
  };

  // return，讓其他function可以調用它
  return{
    init:function(){ // 初始化的function
      console.log('App started.');
      view.displayMonth();
      view.displaySum({sum:0,});
      setupEventListener();
    }
  }

})(model, view);

controller.init();
