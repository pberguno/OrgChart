

$(document).ready(function () {
    // Al tener los scripts integrados en la pagina maestra, debemos
    // controlar cuando se tiene que ejecutar el codigo.	
    //if (window.location.pathname.toLowerCase().indexOf("organizationchart.aspx") >= 0){
    //LoadData();    
    var viewModelFilter = new window.organizationTree.Filter();
    var viewModelOrganizationTree = new window.organizationTree.OrganizationTree(viewModelFilter);
    var viewModelOrganizationChart = new window.organizationChart.OrganizationChartManagement(viewModelOrganizationTree);

    // obtenemos la altura del marco situado a la derecha del árbol de la organización. 
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

    // Evento asociado al click sobre un nodo del arbol de la organización
    $.EventClick_OrganizationTreeNode = function (selectedNode) {
        if (selectedNode) {
            // asignamos el resaltado sobre el nodo del árbol seleccionado.        
            $("#organizationTreeDynatree span").removeClass("dynatree-active");
            selectedNode.span.className = selectedNode.span.className + " dynatree-active";

            var node = new Object();
            node.Id = selectedNode.data.id;
            node.NodeType = (selectedNode.data.nodeType == null ? "Employee" : selectedNode.data.nodeType);
            var hierarchicalObjects = getHierarchicalObjects(globalVar.organizationData, 'Id', node.Id, node.NodeType);
            var html = transformNodeToHtml(hierarchicalObjects, false, false);
            var customHtml = customizeHtml(html);
            viewModelOrganizationChart.init_chart(customHtml);
        } else {
            // si el parámetro selectedNode viene null, invocamos run(), que accede al nodo seleccionado en el árbol (siempre habrá uno).
            viewModelOrganizationTree.run();
        }
    }

    var dataLoaded = viewModelOrganizationTree.fillOrganizationDynatree();
    if (dataLoaded) {
        $(document).data("treeViewModel", viewModelOrganizationTree);
        viewModelOrganizationTree.run();
    } else {
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

    /* Filtrado del árbol. */
    app.Filter = function () {
        var self = this;
        self.showFilter = ko.observable(false);
        self.filterName = ko.observable();
        self.filterCode = ko.observable();
        self.companyNode = ko.observable();

        self.eventClick_hideFilter = function (event) {
            self.showFilter(false);
        }

        self.applyFilter = function () {
            if (self.filterName()) {
                $(".noMatchInTree").remove();
                var organizationTreeViewModel = $(document).data("treeViewModel");
                organizationTreeViewModel.search(self.filterName());
                self.eventClick_hideFilter();
                $("#cleanFilterBlock").show();
                $("#linkFilterBlock").hide();
                // Si no se han encontrado datos, lo indicamos
                if ($('#organizationTreeDynatree li').is(':visible') == false) {
                    $('.dynatree-container').prepend('<span class="noMatchInTree">No se han encontrado datos</span>');
                }
            }
        }

        self.eventClick_applyFilter = function (searchPattern) {
            self.applyFilter();
        }

        self.cleanFilter = function (event) {
            self.filterName(null);
            self.filterCode(null);
            self.companyNode(null);
            $("#cleanFilterBlock").hide();
            $("#linkFilterBlock").show();
            $("#selectFilterUTR-display").val('');
            $(".noMatchInTree").remove();
        }

        self.eventClick_cleanFilter = function (event) {
            self.cleanFilter();
            self.eventClick_hideFilter();
            var organizationTreeViewModel = $(document).data("treeViewModel");
            organizationTreeViewModel.fillOrganizationDynatree();
            organizationTreeViewModel.run();
        }

        self.eventKeyUp_filterName = function () {
            self.applyFilter();
        }

        self.eventClick_viewFilter = function (event) {
            self.showFilter(true);
            $("#txtFilterName").focus().select();
        };
    };

    app.OrganizationTreeOptions = function () {
        var self = this;
        self.minExpandLevel = 2;
        self.checkbox = ko.observable(true);
        self.selectMode = ko.observable(1);
        self.classNames = { checkbox: "dynatree-radio" }, self.fx = { height: "toggle", duration: 200 };
        self.onClick = function (node, event) {
            if (!node.bSelected) {
                // cuando el evento se produce sobre el titulo, seleccionamos el nodo
                if (node.getEventTargetType(event) == "title")
                    node.select(true);

                // cuando el evento se produce sobre el checkbox (no es necesario select(true) porque sino lo deseleccionamos), invocamos función
                if (node.getEventTargetType(event) == "title" || node.getEventTargetType(event) == "checkbox")
                    $.EventClick_OrganizationTreeNode(node);
            } else {
                if (node.getEventTargetType(event) == "title" || node.getEventTargetType(event) == "checkbox")
                    return false; // Prevenimos procesamiento por defecto
            }
        };
        self.onRender = function (dtnode, selectNode) {
            if (dtnode.getLevel() <= 2) {
                $(selectNode).addClass("topsLevelNodes");
            }
        };
    };

    app.OrganizationTree = function (filter) {
        var self = this;
        self.filter = filter;
        self.organizationTreeDynatreeId = ko.observable("#organizationTreeDynatree");
        self.treeOptions = ko.observable(new app.OrganizationTreeOptions());

        self.selectedNodes = function () {
            return $(self.organizationTreeDynatreeId()).dynatree("getSelectedNodes");
        }

        self.run = function () {
            var selectedNode = self.selectedNodes();
            $.EventClick_OrganizationTreeNode(selectedNode[0]);
        }

        self.jsonNodesToDynatreeNodes = function (jsonNodes, parent) {
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
                    treeNode.children = self.jsonNodesToDynatreeNodes(e.children, treeNode);
                }

                treeNode.expand = false;
                res.push(treeNode);
            }
            return res;
        };

        self.fillOrganizationDynatree = function () {
            self.destroyTree();
            if (!$.isEmptyObject(globalVar.organizationData)) {
                var options = ko.mapping.toJS(self.treeOptions());
                var jsonNodes = globalVar.organizationData;
                options.children = self.jsonNodesToDynatreeNodes(jsonNodes);
                $(self.organizationTreeDynatreeId()).dynatree(options);
                return true;
            } else {
                return false;
            }
        }

        self.destroyTree = function () {
            return $(self.organizationTreeDynatreeId()).dynatree("destroy");
        }

        self.seekAndSelectNode = function (nodeId, nodeType) {
            $("#organizationTreeDynatree span").removeClass("dynatree-active");
            if ($(self.organizationTreeDynatreeId()).dynatree("getRoot").visit != undefined)
                $(self.organizationTreeDynatreeId()).dynatree("getRoot").visit(function (node) {
                    if (node.data.id == nodeId && node.data.nodeType == nodeType) {
                        node.select(true);
                        node.makeVisible();
                        node.span.className = node.span.className + " dynatree-active";
                        return false; // Stop iteration, if fn() returns false.
                    }
                });
        };

        self.search = function (searchPattern) {
            $(self.organizationTreeDynatreeId()).dynatree("getRoot").search(searchPattern);
        }

    };
})(window));