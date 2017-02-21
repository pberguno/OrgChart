$originalChart = null;
$currentChart = null;
var opts = {	// opciones del organigrama
    chartElement: '#chartContainer', // contenedor del árbol
    handleClick: false,
    depth: 2,
    interactive: false
};

$((function (win) {
    // ###### Espacio de nombres ######
    var app = null;
    if (!win.organizationChart)
        app = win.organizationChart = {};
    else
        app = win.organizationChart;

    app.OrganizationChartManagement = function (tree) {
        var self = this;
        self.tree = tree;

        self.init_chart = function (orgList) {
            $("#chartContainer").html(""); // limpiamos el contenedor
            $("#chartContainer").html(orgList);

            $originalChart = $("div#chartContainer ul#org").clone();
            $currentChart = $originalChart.clone();
            $currentChart.jOrgChart(opts); // creamos el organigrama
            orgChartPostProcessing();

            $("div.container div.node:not(:first)").click(function () {
                var $this = $(this);
                self.handleClick($this);
            });

            $(".assistant").click(function () {
                var $this = $(this);
                self.handleClick($this);
            });
        }


        self.handleClick = function (nodeDiv) {
            $nodeDiv = $(nodeDiv);            
            var searchNodeId = $nodeDiv.find("[data-id]");
            var id = searchNodeId.length > 0 ? searchNodeId.attr("data-id") : null;
            var searchNodeType = $nodeDiv.find("[data-type]");
            var type = searchNodeType.length > 0 ? searchNodeType.attr("data-type") : null;

            self.tree.seekAndSelectNode(id, type); // marcamos nodo del árbol
            goToActiveNodeByScroll(); // y nos movemos hasta él con el scroll, si no estuviera visible

            if (id) {
                if (type == "Employee") {
                    $.EventClick_OrganizationTreeNode(null);
                } else {
                    var target = $currentChart.find('li span[data-id="' + id + '"][data-type="' + type + '"]');
                    if (target) {
                        $currentChart = $("<ul>").append(target.parent("li")).clone();

                        $("div.container").fadeOut(200, function () {
                            $("div.container").html("");
                            $currentChart.jOrgChart(opts);
                            orgChartPostProcessing();

                            $("div.container").fadeIn(200);
                            $("div.container div.node:not(:first)").click(function () {
                                var $this = $(this);
                                self.handleClick($this);
                            });

                            $(".assistant").click(function () {
                                var $this = $(this);
                                self.handleClick($this);
                            });                            
                        })
                    }
                }
            }
        }
    }
})(window));