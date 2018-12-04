angular.module('starter.controllers', [])

.controller('LoadingCtrl', function($scope, $ionicLoading) {
  $scope.show = function() {
    $ionicLoading.show({
      template: 'Loading...'
    });
  };
  $scope.hide = function(){
    $ionicLoading.hide();
  };
})

.controller('SplashCtrl', function($scope) {
    $scope.allImages = {'src' : 'img/pic1.jpg'};
})

.controller('MeCtrl', ['$scope', 'ngCart', '$localStorage', '$sessionStorage', 'StorageService',  
  function($scope, ngCart, $localStorage, $sessionStorage, StorageService) {

    $scope.name = $localStorage.name;
    $scope.email = $localStorage.email;
    $scope.phone = $localStorage.phone;
    $scope.address = $localStorage.address;
    $scope.message = "";

    $scope.update = function (name, email, phone, addr) {
      $localStorage.name = name;
      $localStorage.email = email;
      $localStorage.phone = phone;
      $localStorage.address = addr;
      $scope.message = "Information updated successfully.";
    };
}])

.controller('CartCtrl', ['$scope', 'ngCart', '$localStorage', '$sessionStorage', 'StorageService',  
  function($scope, ngCart, $localStorage, $sessionStorage, StorageService) {

  ngCart.setTaxRate(10);
  ngCart.setShipping(3);
  
  var currentdate = new Date();
  var order = {
      date: currentdate,
      totalcost: ngCart.totalCost(),
      noofitems: ngCart.getTotalItems()
  };

  $scope.$storage = $localStorage;
  
  $scope.order = order;
  $scope.orders = StorageService.getAll();
  $scope.checkout = false;
  if (ngCart.getTotalItems() > 0){
    $scope.cardempty = false;
  }
  else{
    $scope.cardempty = true;
  }


  $scope.add = function (order) {
    StorageService.add(order);
    $scope.orders = StorageService.getAll();
    ngCart.empty();

    $scope.cardempty = true;
    $scope.checkout = true;
  };

  $scope.remove = function (order) {
    StorageService.remove(order);
    $scope.orders = StorageService.getAll();
  };

  // set localStorage when function is called after a value is changed 
  $scope.$storage = $localStorage.$default({
    cost: 0
  });

  $scope.AddCost = function(){
    $scope.$storage.cost = $scope.$storage.cost + 1
  };

}])

.controller('HistoryCtrl', ['$scope', 'ngCart', '$localStorage', '$sessionStorage', 'StorageService',  
  function($scope, ngCart, $localStorage, $sessionStorage, StorageService) {

  $scope.orders = StorageService.getAll();

  $scope.remove = function (order) {
    StorageService.remove(order);
    $scope.orders = StorageService.getAll();
  };

  $scope.doRefresh = function () {
    $scope.orders = StorageService.getAll();

    //Stop the ion-refresher from spinning
    $scope.$broadcast('scroll.refreshComplete');
  };  

}])


.controller('OrderCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };

  $scope.tasks = [
    {
      name: 'Grocery & Staples',
      category: 'toplevel',
      tree: [
      {name:'Spices', tree: [
        {id:101, name:'Ginder pst', showchkbox:true, price: 85},
        {id:102, name:'Tamarind pst', showchkbox:true, price: 45},
        {id:103, name:'Briyani msla', showchkbox:true, price: 55},
        {id:104, name:'Chilli powder', showchkbox:true, price: 75},
        {id:105, name:'Black pepper', showchkbox:true, price: 200},
        ]},
      {name:'Pulses', tree: [
        {id:106, name:'Moong Dal', showchkbox:true, price: 75},
        {id:107, name:'Urad Dal', showchkbox:true, price: 85},
        {id:108, name:'RedMasoor Dal', showchkbox:true, price: 70},
        {id:109, name:'Toor Dal', showchkbox:true, price: 65},
        {id:110, name:'White Peas', showchkbox:true, price: 50},
        ]},
      {name:'Rice & Flours', tree: [
        {id:111, name:'Brown rice', showchkbox:true, price: 90},
        {id:112, name:'HB rice', showchkbox:true, price: 100},
        {id:113, name:'Whole atta', showchkbox:true, price: 140},
        {id:114, name:'Ragi flour', showchkbox:true, price: 70},
        {id:115, name:'Samba rice', showchkbox:true, price: 100},
        ]},
       {name:'Edible Oil', tree: [
        {id:116, name:'Olive Oil', showchkbox:true, price: 120},
        {id:117, name:'Groundnut oil', showchkbox:true, price: 135},
        {id:118, name:'Gingelly oil', showchkbox:true, price: 155},
        {id:119, name:'Coconut oil', showchkbox:true, price: 80},
        ]},
      {name:'Dry Fruits', tree: [
        {id:120, name:'Dates', showchkbox:true, price: 145},
        {id:121, name:'Badam', showchkbox:true, price: 230},
        {id:122, name:'Pistha', showchkbox:true, price: 300},
        ]},
      {name:'Salt & Sugar', tree: [
        {id:123, name:'Jaggery', showchkbox:true, price: 60},
        {id:124, name:'Palm sugar', showchkbox:true, price: 120},
        {id:125, name:'Iodised salt', showchkbox:true, price: 65},
        ]}     
      ]
    },
    {
      name: 'Personal Care',
      category: 'toplevel',
      tree: [
      {name:'Body Care', tree: [
        {id:151, name:'Body lotion', showchkbox:true, price: 250},
        {id:152, name:'Nivea cream', showchkbox:true, price: 200},
        {id:153, name:'Turmeric cr', showchkbox:true, price: 100},
        {id:154, name:'Hand wash', showchkbox:true, price: 90},
        ]},
      {name:'Hair Care', tree: [
        {id:155, name:'Dove cndr', showchkbox:true, price: 120},
        {id:156, name:'Himalayan oil', showchkbox:true, price: 55},
        {id:157, name:'Loreal shmp', showchkbox:true, price: 85},
        {id:158, name:'Oldspice musk', showchkbox:true, price: 95},
        ]},
      {name:'Deos & Perfume', tree: [
        {id:159, name:'Adidas deo', showchkbox:true, price: 180},
        {id:160, name:'Axe gold', showchkbox:true, price: 175},
        {id:161, name:'Eva fresh', showchkbox:true, price: 150},
        {id:162, name:'Yardly new', showchkbox:true, price: 200},
        {id:163, name:'Z magnetism', showchkbox:true, price: 210},
        ]},
       {name:'Skin Care', tree: [
        {id:164, name:'Aloevera cr', showchkbox:true, price: 120},
        {id:165, name:'Ponds silk', showchkbox:true, price: 65},
        {id:166, name:'Fair & lvly', showchkbox:true, price: 55},
        ]}
      ]
    },
    {
      name: 'Household Needs',
      category: 'toplevel',
      tree: [
      {name:'Pooja Needs', tree: [
        {id:200, name:'Mangaldeep', showchkbox:true, price: 40},
        {id:201, name:'Dheepam oil', showchkbox:true, price: 85},
        {id:202, name:'Camfire', showchkbox:true, price: 45},
        ]},
      {name:'Stationery', tree: [
        {id:203, name:'Stapler pins', showchkbox:true, price: 40},
        {id:204, name:'Scissors', showchkbox:true, price: 80},
        {id:205, name:'Fevicol pen', showchkbox:true, price: 35},
        {id:206, name:'Cello pen', showchkbox:true, price: 25},
        ]},
      {name:'Cleaners', tree: [
        {id:207, name:'Detail lemon', showchkbox:true, price: 65},
        {id:208, name:'Sabena citrus', showchkbox:true, price: 40},
        {id:209, name:'Vim bar', showchkbox:true, price: 45},
        {id:210, name:'Lizol cleaner', showchkbox:true, price: 90},
        ]}
      ]
    },
    {
      name: 'Beverages',
      category: 'toplevel',
      tree: [
      {name:'Fruit Drinks', tree: [
        {id:251, name:'Frooti', showchkbox:true, price: 20},
        {id:252, name:'Maazaa', showchkbox:true, price: 35},
        {id:253, name:'Real apple', showchkbox:true, price: 145},
        {id:254, name:'Tropicana', showchkbox:true, price: 165},
        ]},
      {name:'Health Drinks', tree: [
        {id:255, name:'Boost', showchkbox:true, price: 130},
        {id:256, name:'Amul pro', showchkbox:true, price: 75},
        {id:257, name:'Bournvita', showchkbox:true, price: 110},
        {id:258, name:'Horlicks mt', showchkbox:true, price: 120},
        ]},
      {name:'Aerated Drinks', tree: [
        {id:259, name:'7UP can', showchkbox:true, price: 35},
        {id:260, name:'Apple Fizz', showchkbox:true, price: 65},
        {id:261, name:'Bisleri pina', showchkbox:true, price: 50},
        {id:262, name:'Bovento', showchkbox:true, price: 30},
        ]}
      ]
    },
    {
      name: 'Others',
      category: 'toplevel',
      tree: [
        {id:301, name:'Aavin milk', showchkbox:true, price: 20},
        {id:302, name:'Cookies', showchkbox:true, price: 65},
        {id:303, name:'Cornflakes', showchkbox:true, price: 50},
        {id:304, name:'Dhahi', showchkbox:true, price: 30},
        {id:305, name:'Eggs', showchkbox:true, price: 35},
        {id:306, name:'Britannia50', showchkbox:true, price: 40},
        {id:307, name:'Bingo', showchkbox:true, price: 40},
        {id:308, name:'Cadbury chk', showchkbox:true, price: 85},
        {id:309, name:'Lays classic', showchkbox:true, price: 45},
      ]
    }
  ];  

  $scope.$on('$ionTreeList:ItemClicked', function(event, item) {
    // process 'item'
    console.log(item);
  });

  $scope.$on('$ionTreeList:LoadComplete', function(event, items) {
    // process 'items'
    console.log(items);
  });

});
