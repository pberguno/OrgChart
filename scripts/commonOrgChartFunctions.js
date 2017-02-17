var ENTER_KEY = 13;

/*
* Devuelve el propio objeto, cuyo Id se corresponde con val, y todos sus descendientes.
*/
function getHierarchicalObjects(obj, key, val, nodeType) {
	var objects = [];
	for (var i in obj) {
		if (!obj.hasOwnProperty(i)) continue;
		if (typeof obj[i] == 'object') {
			objects = objects.concat(getHierarchicalObjects(obj[i], key, val, nodeType));
		} else if (i == key && obj[key] == val && obj['NodeType'] == nodeType) {
			objects.push(obj);
		}
	}
	return objects;
}

/*
* Transforma la información de empleado en código HTML.
*/
function getEmployeePersonalInformation(employeeNode) {
	return '<div id="wrapper"> ' +
		'<div class="self"> ' +
		'<h1 class="name">' + employeeNode.name + '<br /> ' +
		'<span>' + employeeNode.PositionTypeName + '</span></h1> ' +
		'<ul> ' +
		'<li class="ad">Direcci&oacute;n</li> ' +
		'<li class="mail">empleado@conti.com</li> ' +
		'<li class="tel">+11 444 555 22 33</li> ' +
		'<li class="web">www.blog_o_paginaPersonal.com</li> ' +
		'</ul> ' +
		'</div> ' +
		'<!-- End Personal Information --> ' +
		'</div> ';
}

/*
* Transforma un nodo de compañía en formato Json a código HTML.
* La variable lonelyEmployee nos permite saber si el departamento tiene sólo un empleado.
*/
function transformNodeToHtml(data, isSub, lonelyEmployee) {
	var html = "";

	if (data.length == 1 && data[0].NodeType == "Employee" && !lonelyEmployee)
		return getEmployeePersonalInformation(data[0]);

	if (isSub)
		html += "<ul>";
	else
		html += "<ul id='org' style='display: none;'>"

	for (i in data) {
		lonelyEmployee = false;
		html += '<li>';
		if (typeof (data[i].children) === 'object') {
			html += '<br/>';
			if (isSub && data[i].children.length) {
				html += '<span class="companyNode" data-id="' + data[i].Id + '" data-type="' + data[i].NodeType + '">' + data[i].name + '</span>';
				if (data[i].children.length == 1)
					lonelyEmployee = true;
			} else {				
				if (data[i].NodeType == "Employee") {
					html += '<span class="positionType" data-id="' + data[i].Id + '" data-type="' + data[i].NodeType + '">';
					html += data[i].PositionTypeName + '</span><br>';
					html += '<span>' + data[i].name + '</span>';
					
				} else {
					html += '<span class="companyNode" data-id="' + data[i].Id + '"data-type="' + data[i].NodeType + '">' + data[i].name + '</span>';
					if (data[i].children.length == 1)
						lonelyEmployee = true;
				}
			}
			html += transformNodeToHtml(data[i].children, true, lonelyEmployee); // Submenu encontrado
		} else {
			html += '<span data-id="' + data[i].Id + '"  data-type="' + data[i].NodeType + '">' + data[i].name + '</span>'; // No submenu
		}
		html += '</li>';
	}
	html += '</ul>';
	html = html.replace("<ul></ul>", "");
	return html;
}

/*
* Manipula la información html para los casos de Manager y Assistant.
* 	- Los manager se presentan en la misma caja, debajo del nombre del departamento.
* 	- Los asistentes se presentan al lado derecho de los manager.
*/
function customizeHtml(html) {
	var htmlObject = $($.parseHTML(html));
	// Manager	
	var managerEmployees = htmlObject.find("span.positionType:contains('Manager')");
	$(managerEmployees).each(function (i) {
		var managerCompanyNode = $(this).parent().parent().prev('.companyNode');
		var managerCompanyNodeText = managerCompanyNode.html();

		var manager = $(this).parent();
		$(this).parent().find('span:last')[0]
		var managerText = manager.find('span:last').text();

		managerCompanyNode.html(managerCompanyNodeText + "<br />" + "<div class='manager'><span>" + managerText + "</span></div>");
		manager.remove();
	});

	// Asistentes
	var assistantEmployees = htmlObject.find("span.positionType:contains('Assistant')");
	$(assistantEmployees).each(function (i) {
		var assistantCompanyNode = $(this).parent().parent().prev('.companyNode');
		var assistantCompanyNodeText = assistantCompanyNode.html();

		var assistant = $(this).parent();
		$(this).parent().find('span:last')[0]
		var assistantText = assistant.find('span:last').text();

		assistantCompanyNode.html(assistantCompanyNodeText + "<br />" + "<div class='assistant'><span class='assistantLiteral'>Assistant</span><br/><span class='assistantEmployee'>" + assistantText + "</span></div>");
		assistant.remove();
	});

	return htmlObject[0].outerHTML;
}

/*
* Pinta una excepción en pantalla.
*/
function PaintException(message) {
	$('#errorSection').show();
	$('#errorTitle').append(message + '<br/>');
}

/*
* Elimina los asistentes que pudieran mostrarse en segundo nivel del organigrama.
* Sólo deben aparecer los del primer nivel.
*/
function hideAssistantSecondLevels() {
	$('.jOrgChart').find('table tbody tr td.node-container div.assistant').remove();
}

/* 
* Permite definir el manejador KnockOut executeOnEnter sobre los controles en HTML.
*/
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