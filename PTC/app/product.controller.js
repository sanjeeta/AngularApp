(function () {
  'use strict';

  angular.module('app').controller('ProductController', ProductController);

  function ProductController($http) {
    var vm = this;
    var dataService = $http;

    // Hook up public events
    vm.resetSearch = resetSearch;
    vm.searchImmediate = searchImmediate;
    vm.search = search;
    vm.addClick = addClick;
    vm.cancelClick = cancelClick;
    vm.editClick = editClick;
    vm.deleteClick = deleteClick;
    vm.saveClick = saveClick;

    vm.products = [];
    vm.product = {
      ProductId: 1,
      ProductName: 'Video Training'
    };
    vm.searchCategories = [];
    vm.searchInput = {
      selectedCategory: {
        CategoryId: 0,
        CategoryName: ''
      },
      productName: ''
    };
    const pageMode = {
      LIST: 'List',
      EDIT: 'Edit',
      ADD: 'Add'
    };
    vm.uiState = {
      mode: pageMode.LIST,
      isDetailAreaVisible: false,
      isListAreaVisible: true,
      isSearchAreaVisible: true,
      isValid: true,
      messages: []
    };

    productList();
    searchCategoriesList();

    function addClick() {
      debugger;
      setUIState(pageMode.ADD);
    }

    function cancelClick() {
      setUIState(pageMode.LIST);
    }

    function editClick(id) {
      setUIState(pageMode.EDIT);
    }

    function deleteClick(id) {
      if (confirm("Delete this Product?")) {

      }
    }

    function saveClick() {
      setUIState(pageMode.LIST);
    }

    function setUIState(state) {
      vm.uiState.mode = state;

      vm.uiState.isDetailAreaVisible =
        (state == pageMode.ADD || state == pageMode.EDIT);
      vm.uiState.isListAreaVisible = (state == pageMode.LIST);
      vm.uiState.isSearchAreaVisible = (state == pageMode.LIST);
    }

    function resetSearch() {
      vm.searchInput = {
        selectedCategory: {
          CategoryId: 0,
          CategoryName: ''
        },
        productName: ''
      };

      productList();
    }

    function search() {
      // Create object literal for search values
      var searchEntity = {
        CategoryId:
          vm.searchInput.
             selectedCategory.CategoryId,
        ProductName:
          vm.searchInput.productName
      };

      // Call Web API to get a list of Products
      dataService.post("/api/Product/Search",
              searchEntity)
        .then(function (result) {
          vm.products = result.data;

          setUIState(pageMode.LIST);
        }, function (error) {
          handleException(error);
        });
    }

    function searchImmediate(item) {
      if ((vm.searchInput.selectedCategory.CategoryId == 0 ? true : vm.searchInput.selectedCategory.CategoryId == item.Category.CategoryId) &&
         (vm.searchInput.productName.length == 0 ? true : (item.ProductName.toLowerCase().indexOf(vm.searchInput.productName.toLowerCase()) >= 0))) {
        return true;
      }

      return false;
    }

    function productList() {
      dataService.get("/api/Product")
      .then(function (result) {
        vm.products = result.data;

        setUIState(pageMode.LIST);
      },
      function (error) {
        handleException(error);
      });
    }

    function searchCategoriesList() {
      dataService.get("/api/Category/GetSearchCategories")
      .then(function (result) {
        vm.searchCategories = result.data;
      },
      function (error) {
        handleException(error);
      });
    }

    function handleException(error) {
      vm.uiState.isValid = false;
      var msg = {
        property: 'Error',
        message: ''
      };

      vm.uiState.messages = [];

      switch (error.status) {
        case 400:  // Bad Request
          // TODO: Covered in validation
          break;

        case 404:  // 'Not Found'
          msg.message = 'The product you were ' +
                        'requesting could not be found';
          vm.uiState.messages.push(msg);

          break;

        case 500:  // 'Internal Error'
          msg.message =
            error.data.ExceptionMessage;
          vm.uiState.messages.push(msg);

          break;

        default:
          msg.message = 'Status: ' +
                      error.status +
                      ' - Error Message: ' +
                      error.statusText;
          vm.uiState.messages.push(msg);

          break;
      }
    }
  }
})();