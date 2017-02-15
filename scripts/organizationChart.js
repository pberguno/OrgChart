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
            hideAssistantSecondLevels();

            $("div.container div.node").click(function () {
                var $this = $(this);
                self.handleClick($this);
            });
        }

        self.handleClick = function (nodeDiv) {
            $nodeDiv = $(nodeDiv);
            var id = $nodeDiv.find("span").attr("data-id");
            var type = $nodeDiv.find("span").attr("data-type");
            self.tree.seekAndSelectNode(id, type);

            if (id) {
                var target = $currentChart.find('li span[data-id="' + id + '"]');

                if (target) {
                    $currentChart = $("<ul>").append(target.parent("li")).clone();

                    $("div.container").fadeOut(200, function () {
                        $("div.container").html("");
                        $currentChart.jOrgChart(opts);
                        hideAssistantSecondLevels();

                        $("div.container").fadeIn(200);
                        $("div.container div.node:not(:first)").click(function () {
                            var $this = $(this);
                            self.handleClick($this);
                        });
                    })
                }
            }
        }
    }
})(window));