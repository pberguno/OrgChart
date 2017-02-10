

$(document).ready(function() {
	// Al tener los scripts integrados en la pagina maestra, debemos
	// controlar cuando se tiene que ejecutar el codigo.	
	//if (window.location.pathname.toLowerCase().indexOf("organizationchart.aspx") >= 0){
		//LoadData();
		var viewModelFilter = new window.organizationTree.Filter();
		var viewModelOrganizationTree = new window.organizationTree.OrganizationTree(viewModelFilter);
		var viewModelOrganizationChart = new window.organizationChart.OrganizationChartManagement(viewModelOrganizationTree);

		// obtenemos la altura del marco situado a la derecha del �rbol de la organizaci�n. 
		// si ese marco no existe, establecemos una altura de 500
		var organizationTreeHeight = 500;
		$(".organizationTree").height(organizationTreeHeight);
		$(".organizationTreeContent").height("97%");
		$(".organizationTreeContent div").height("99.5%");
		$(".dynatree-container").height("96%");

		// Activamos Knockout
		ko.applyBindings(viewModelFilter, document.getElementById("appraisersFilter"));
		ko.applyBindings(viewModelOrganizationTree, document.getElementById("organizationTree"));
		ko.applyBindings(viewModelOrganizationChart, document.getElementById("organizationChart"));
		
		$.EventClick_OrganizationTreeNode = function (selectedNode) {
			$("#organizationTreeDynatree span").removeClass("dynatree-active");			
			selectedNode.span.className = selectedNode.span.className + " dynatree-active"
			
			var node = new Object();			
			node.Id = selectedNode.data.id;
			node.NodeType = (selectedNode.data.nodeType == null ? "Employee" : selectedNode.data.nodeType);
			//employeesTreeNodes.push(node);
			var test = getObjects(globalVar.organizationData, 'Id', node.Id, node.NodeType);
			var html = transformNodeToHtml(test, false, false);
            var customHtml = CustomizeHtml(html);
			viewModelOrganizationChart.init_chart(customHtml);
		}
		
		var dataLoaded = viewModelOrganizationTree.fillOrganizationDynatree(); 
		if (dataLoaded){		
			$(document).data("treeViewModel", viewModelOrganizationTree);
			viewModelOrganizationTree.run();
		}else{
			PaintException('Se ha producido un error: No hay datos en los catalogos de la organizacion.');
		}		
	//}
});






$((function (win) {
    // ###### Espacio de nombres ######
    var app = null;
    if (!win.organizationTree)
        app = win.organizationTree = {};
    else
        app = win.organizationTree;


    app.CompanyNode = function () {
        var self = this;
        self.companyNodes = ko.observableArray([]);
        self.selectedCompanyNode = ko.observable();
        self.level = ko.observable();
        self.nextLevelNode = ko.observable();

        self.selectedCompanyNode.subscribe(function (companyNodeSelected) {
            var params = new Object();
            //params.year = $.getLocationParams().Year;
            params.companyNode = companyNodeSelected;
            //amplify.request("getCompanyNodesFromCompanyNode", JSON.stringify(params), self.initializaCompanyNodeFormCompanyNode.bind(self));
        });
        self.initializaCompanyNodeFormCompanyNode = function (childrenCompanyNode) {
            var cn = $.getMainObject(childrenCompanyNode);
            if (!$.isEmptyObject(cn)) {
                var companyNode = new app.CompanyNode();
                companyNode.companyNodes(cn);
                companyNode.level(self.level() + 1);

                self.nextLevelNode(companyNode);
            }
        }
    };

    app.Filter = function () {
        var self = this;
        self.showFilter = ko.observable(false);
        self.showTreeTypeFilter = ko.observable(false);
        self.filterName = ko.observable();
        self.filterCode = ko.observable();
        self.companyNodeTypes = ko.observableArray([]);
        self.companyNodeLevelNames = ko.observable([]);
        self.companyNode = ko.observable();        

        self.initializaCompnayNodeFormCompanyNode = function (companyNodes) {
            var cn = $.getMainObject(companyNodes);
        }

        self.currentLevel = ko.observable(1); //

        self.filterCompanyNodeType = ko.observable();
        self.filterCompanyNodeType.subscribe(function (companyNodeTypeSelected) {
            if (companyNodeTypeSelected) {
                var params = new Object();
				//params.year = $.getLocationParams().Year;
                params.companyNodeType = companyNodeTypeSelected;
                //amplify.request("getCompanyNodesFromCompanyNodeType", JSON.stringify(params), self.initializaCompanyNodeFromCompanyNodeTypeLevel.bind(self));
            }
        });

        // Establece que control tiene el foco
        self.ViewMarkerHasFocus = ko.observable(1);
        self.treeType = ko.observable("Organization");

        self.initializaCompanyNodeFromCompanyNodeTypeLevel = function (companyNodes) {
            self.currentLevel(2);
            var cn = $.getMainObject(companyNodes);

            if (!$.isEmptyObject(cn)) {
                self.currentLevel(self.currentLevel() + 1);
                var companyNode = new app.CompanyNode();
                companyNode.companyNodes(cn);
                companyNode.level(self.currentLevel());

                self.companyNode(companyNode);
            }
        }

        self.eventClick_organizationMarker = function (event) {
            initializeConfigurationTopEdge();

            var organizationTreeViewModel = $(document).data("treeViewModel");
            organizationTreeViewModel.treeType("Organization");
            organizationTreeViewModel.fillOrganizationDynatree();

            self.ViewMarkerHasFocus(1);
        };

        self.getCompanyNodesSelected = function () {
            var companyNodes = [];
            var cn = self.companyNode();
            while (cn) {
                if (cn.selectedCompanyNode()) {
                    companyNodes.push(cn.selectedCompanyNode());
                }

                cn = cn.nextLevelNode();
            }
            return companyNodes;
        }

        self.applyFilter = function () {
            // var companyNodeType = self.filterCompanyNodeType();
            // var organizationTreeViewModel = $(document).data("treeViewModel");
            // organizationTreeViewModel.employeeNameFilter(self.filterName());
            // organizationTreeViewModel.employeeCodeFilter(self.filterCode());
            // organizationTreeViewModel.companyNodeTypeFilter(companyNodeType);
            // organizationTreeViewModel.companyNodeFilters(self.getCompanyNodesSelected());
            // organizationTreeViewModel.fillOrganizationDynatree();
            // self.eventClick_hideFilter();
            // $("#cleanFilterBlock").show();
            // $("#linkFilterBlock").hide();
            $("#organizationTreeDynatree").dynatree("getRoot").search(self.filterName());
            self.eventClick_hideFilter();
            $("#cleanFilterBlock").show();
            $("#linkFilterBlock").hide();            
        }

        self.eventClick_applyFilter = function (searchPattern) {
            self.applyFilter();
        }

        self.cleanFilter = function (event) {
            self.filterName(null);
            self.filterCode(null);
            self.filterCompanyNodeType(null);
            self.companyNode(null);
            self.companyNodeTypes([]);
            var organizationTreeViewModel = $(document).data("treeViewModel");
            organizationTreeViewModel.employeeNameFilter(null);
            organizationTreeViewModel.employeeCodeFilter(null);
            organizationTreeViewModel.companyNodeTypeFilter(null);
            organizationTreeViewModel.companyNodeFilters(null);
            $("#cleanFilterBlock").hide();
            $("#linkFilterBlock").show();
            $("#selectFilterUTR-display").val('');
        }

        self.eventClick_cleanFilter = function (event) {
            self.cleanFilter();
            self.eventClick_hideFilter();
            var organizationTreeViewModel = $(document).data("treeViewModel");
            organizationTreeViewModel.fillOrganizationDynatree();
        }

        self.eventKeyUp_filterName = function () {
            self.applyFilter();
        }

        self.eventClick_hideFilter = function (event) {
            self.showFilter(false);
        }

        self.initializeCompanyNodeTypes = function (companyNodeTypes) {
            var cnt = $.getMainObject(companyNodeTypes);
            if (!$.isEmptyObject(cnt)) {
                self.companyNodeTypes(cnt.CompanyNodeTypes);
                self.companyNodeLevelNames(cnt.CompanyNodeLevelNames);
                if (cnt.AutoSelectFirst) self.filterCompanyNodeType(cnt.CompanyNodeTypes[0].Id);
            }
        }

        self.eventClick_viewFilter = function (event) {
            if (self.companyNodeTypes().length == 0) {
                var params = new Object();
                //params.year = $.getLocationParams().Year;
                //amplify.request("getCompanyNodeTypes", JSON.stringify(params), self.initializeCompanyNodeTypes.bind(self));
            }
            self.showFilter(true);
            self.showTreeTypeFilter(false);
            $("#txtFilterName").focus().select();
        };

        self.eventClick_viewTreeTypeFilter = function (event) {
            self.showFilter(false);
            self.showTreeTypeFilter(true);
        }

        self.eventClick_hideTreeTypeFilter = function (event) {
            self.showTreeTypeFilter(false);
        }

        self.setTreeTypeView = function (treeType, data, event) {
            initializeConfigurationTopEdge();

            var organizationTreeViewModel = $(document).data("treeViewModel");
            organizationTreeViewModel.treeType(treeType);
            organizationTreeViewModel.fillOrganizationDynatree();

            $('#treeTypeText span').text($('span', event.currentTarget).text());

            self.showTreeTypeFilter(false);
            self.treeType(treeType);
            self.ViewMarkerHasFocus(1);
        }
    };

    app.organizationTreeOptions = function () {
        var self = this;
        self.treeType = ko.observable();
        self.employeeNameFilter = ko.observable();
        self.employeeCodeFilter = ko.observable();
        self.companyNodeTypeFilter = ko.observable();
        self.companyNodeFilters = ko.observableArray();
		
        self.minExpandLevel = 2;
        self.checkbox = ko.observable(true);
        self.selectMode = ko.observable(1);
		self.classNames = {checkbox: "dynatree-radio"},
        self.fx = { height: "toggle", duration: 200 };
        self.isFolder = ko.observable(false);
        self.icon = ko.observable(false);
        self.autoFocus = ko.observable(false);		
		self.onClick = function(node, event) {			
			if (!node.bSelected){
				// cuando el evento se produce sobre el t�tulo, seleccionamos el nodo
				if(node.getEventTargetType(event) == "title") 
					node.select(true);
				
				// cuando el evento se produce sobre el checkbox (no es ncesario select(true) porque sino lo deseleccionamos), 
				// invocamos funci�n
				if(node.getEventTargetType(event) == "title" || node.getEventTargetType(event) == "checkbox")
					$.EventClick_OrganizationTreeNode(node);
			}else{
				if(node.getEventTargetType(event) == "title" || node.getEventTargetType(event) == "checkbox")
					return false; // Prevenimos procesamiento por defecto
			}			
		};
        self.onRender = function (dtnode, selectNode) {
            if (dtnode.getLevel() <= 2) {
                $(selectNode).addClass("topsLevelNodes");
            }
        };
        self.getFilters = function () {
            return {
                TreeType: self.treeType(),
                EmployeeName: self.employeeNameFilter(),
                EmployeeCode: self.employeeCodeFilter(),
                CompanyNodeType: self.companyNodeTypeFilter(),
                CompanyNode: self.companyNodeFilters()
            };
        }
        self.toDynatreeNodes = function (jsonNodes, parent) {
            var res = [];
            for (var i = 0, l = jsonNodes.length; i < l; i++) {
                var e = jsonNodes[i];

                var treeNode = new Object();
                treeNode.id = e.Id;
                treeNode.title = e.name;
                treeNode.name = e.name;
                treeNode.nodeType = e.NodeType;                
                treeNode.select = e.Selected;

                if (e.children && e.children.length) {
                    if (jsonNodes.length == 1)
						treeNode.expand = false;
                    treeNode.children = self.toDynatreeNodes(e.children, treeNode);
                }

                treeNode.expand = false; //treeNode.children && treeNode.children.length > 0;

                res.push(treeNode);
            }
            return res;
        };
    };

    app.OrganizationTree = function (filter) {
        var self = this;

        self.filter = filter;
        self.organizationTreeDynatreeId = ko.observable("#organizationTreeDynatree");
        self.initialized = ko.observable(false);
        self.items = ko.observableArray();
        self.treeType = ko.observable("Organization");
        self.treeOptions = ko.observable(new app.organizationTreeOptions());

        //Filters
        self.employeeNameFilter = ko.observable(null);
        self.employeeCodeFilter = ko.observable(null);
        self.companyNodeTypeFilter = ko.observable(null);
        self.companyNodeFilters = ko.observableArray(null);	

        self.getFilters = function () {
            return {
                TreeType: self.treeType() || "Organization",
                EmployeeName: self.employeeNameFilter() || "",
                EmployeeCode: self.employeeCodeFilter() || "",
                CompanyNodeType: self.companyNodeTypeFilter() || "",
                CompanyNode: self.companyNodeFilters() || []
            };
        }
		
		self.run = function (){
			var selectedNode = self.selectedNodes();
			$.EventClick_OrganizationTreeNode(selectedNode[0]);
		}

        self.fillOrganizationDynatree = function () {
            //Init tree options:
            self.treeOptions().treeType(self.treeType());
            self.treeOptions().employeeNameFilter(self.employeeNameFilter() || '');
            self.treeOptions().employeeCodeFilter(self.employeeCodeFilter() || '');
            self.treeOptions().companyNodeTypeFilter(self.companyNodeTypeFilter() || '');
            self.treeOptions().companyNodeFilters(self.companyNodeFilters());
            self.destroyTree();
            
            if (!$.isEmptyObject(globalVar.organizationData)) {
                var options = ko.mapping.toJS(self.treeOptions());
                var jsonNodes = globalVar.organizationData; //jQuery.parseJSON(treeOrganizationData);
                options.children = self.treeOptions().toDynatreeNodes(jsonNodes);
                $(self.organizationTreeDynatreeId()).dynatree(options);
				return true;
            }else{
				return false;
			}            
        }	

        self.selectedNodes = function () {
            return $(self.organizationTreeDynatreeId()).dynatree("getSelectedNodes");
        }

        self.destroyTree = function () {
            return $(self.organizationTreeDynatreeId()).dynatree("destroy");
        }

        self.setState = function (state) {
            state = jQuery.parseJSON(state);
            var jsonNodes = state && state.Nodes;
            if (jsonNodes) {
                var options = ko.mapping.toJS(self.treeOptions());
                options.children = self.treeOptions().toDynatreeNodes(jsonNodes);
                self.destroyTree();
                $(self.organizationTreeDynatreeId()).dynatree(options);
            }
            if (state && state.Filters) {
                var f = state.Filters;
                if (!f.EmployeeName && !f.EmployeeCode && !f.CompanyNodeType && !f.CompanyNode) {
                    self.filter.cleanFilter();
                    self.treeOptions().treeType(self.treeType());
                    self.treeOptions().employeeNameFilter(self.employeeNameFilter() || '');
                    self.treeOptions().employeeCodeFilter(self.employeeCodeFilter() || '');
                    self.treeOptions().companyNodeTypeFilter(self.companyNodeTypeFilter() || '');
                    self.treeOptions().companyNodeFilters(self.companyNodeFilters());
                }
            }
        }
		
		self.DeactivateAllNodes = function(){
			$(self.organizationTreeDynatreeId() + " span").removeClass("dynatree-active");
		}
		
		self.seekAndSelectNode = function (nodeId, nodeType) {			
			$("#organizationTreeDynatree span").removeClass("dynatree-active");
			if ($(self.organizationTreeDynatreeId()).dynatree("getRoot").visit != undefined)
				$(self.organizationTreeDynatreeId()).dynatree("getRoot").visit(function (node) {
					if (node.data.id == nodeId && node.data.nodeType == nodeType){												
						node.select(true);
						node.makeVisible();
						node.span.className = node.span.className + " dynatree-active";
					}
				});

			return false;
		};		

        self.removeSelectedNodes = function () {
            var nodes;
            while ((nodes = self.selectedNodes()).length > 0) {
                nodes[0].remove();
            }
        }
    };
})(window));

// ## Funciones de utilidad sobre el �rbol

// Obtiene los nodos seleccionados del �rbol
$.getSelectedCompanyNodesFromTree = function () {
    var companyNodes = [];
    var organizationTreeViewModel = $(document).data("treeViewModel");
    if (!$.isEmptyObject(organizationTreeViewModel)) {
        if ($.isFunction(organizationTreeViewModel.selectedNodes)) {
            var selectedNodes = organizationTreeViewModel.selectedNodes();
            if (!$.isEmptyObject(selectedNodes) || selectedNodes.length > 0) {
                // Nos quedamos con el ultimo nivel que esta marcado
                $(selectedNodes).each(function (i) {
                    if (selectedNodes[i].childList == null)
                        companyNodes.push(selectedNodes[i]);
                    else {
                        var hasChildrenSelected = false;
                        $(selectedNodes[i].childList).each(function (j) {
                            if (selectedNodes[i].childList[j].isSelected() == true) {
                                hasChildrenSelected = true;
                                return;
                            }
                        });
                        if (hasChildrenSelected == false)
                            companyNodes.push(selectedNodes[i]);
                    }
                });
            } else  // has not nodes selected
                return null;
        } else // selected nodes is not a function
            return null;
    } else // organizationTreeViewModel has not properties
        return null;
    return companyNodes;
}

// Obtiene los filtros del �rbol
$.getFiltersFromTree = function () {
    var organizationTreeViewModel = $(document).data("treeViewModel");
    return (!$.isEmptyObject(organizationTreeViewModel) && $.isFunction(organizationTreeViewModel.getFilters)) ? organizationTreeViewModel.getFilters() : {};
};

// Desmarca los nodos del �rbol
$.deselectAllNodes = function (tree) {
	$("#organizationTreeDynatree span").removeClass("dynatree-active");
    // if (tree.dynatree("getRoot").visit != undefined)
        // tree.dynatree("getRoot").visit(function (node) {			
            // node.data.removeClass("dynatree-active");
            // //node.expand(false);
        // });

    return false;
};

// Recarga el �rbol de la organizaci�n
$.reloadOrganizationTree = function () {
    var organizationTreeViewModel = $(document).data("treeViewModel");
    organizationTreeViewModel.treeType("Organization");
    organizationTreeViewModel.fillOrganizationDynatree();
};

$.setOrganizationTreeState = function (state) {
    var organizationTreeViewModel = $(document).data("treeViewModel");
    organizationTreeViewModel.setState(state);
}

$.removeOrganizationTreeSelectedNodes = function () {
    var organizationTreeViewModel = $(document).data("treeViewModel");
    organizationTreeViewModel.removeSelectedNodes();
}

var ENTER_KEY = 13;
ko.bindingHandlers.executeOnEnter = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var allBindings = allBindingsAccessor();
        $(element).keypress(function (event) {
            var keyCode = (event.which ? event.which : event.keyCode);
            if (keyCode === ENTER_KEY) {
                allBindings.executeOnEnter.call(viewModel);
                return false;
            }
            return true;
        });
    }
};
