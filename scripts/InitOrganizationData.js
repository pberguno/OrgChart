var companyNodes = [],
	employees = [],
	positionTypes = [];

var globalVar = {
    organizationData :
[{"Id":"1","name":"GENERAL MARKET","NodeType":"RootNode","ParentNodeId":null,"children":[{"Id":"1","name":"Jon Ander García","NodeType":"Employee","ParentNodeId":null,"children":[],"Selected":false,"CompanyNodeId":"1","PositionTypeId":"1","PositionTypeName":"Manager"},{"Id":"2","name":"Elena Ramirez ","NodeType":"Employee","ParentNodeId":null,"children":[],"Selected":false,"CompanyNodeId":"1","PositionTypeId":"2","PositionTypeName":"Assistant"},{"Id":"2","name":"Continental Tires","NodeType":"CompanyNodeType","ParentNodeId":"1","children":[{"Id":"4","name":"Passenger Sales","NodeType":"CompanyNodeType","ParentNodeId":"2","children":[{"Id":"4","name":"Ismael Rubio ","NodeType":"Employee","ParentNodeId":null,"children":[],"Selected":false,"CompanyNodeId":"4","PositionTypeId":"3","PositionTypeName":"Manager"},{"Id":"5","name":"Ángel Álvarez ","NodeType":"Employee","ParentNodeId":null,"children":[],"Selected":false,"CompanyNodeId":"4","PositionTypeId":"4","PositionTypeName":"Assistant"},{"Id":"21","name":"Retailer","NodeType":"CompanyNodeType","ParentNodeId":"4","children":[{"Id":"22","name":"Zona Norte","NodeType":"CompanyNodeType","ParentNodeId":"21","children":[{"Id":"6","name":"L.Miguel Cabanas ","NodeType":"Employee","ParentNodeId":null,"children":[],"Selected":false,"CompanyNodeId":"22","PositionTypeId":"5","PositionTypeName":"Manager"},{"Id":"7","name":"J.A Penas ","NodeType":"Employee","ParentNodeId":null,"children":[],"Selected":false,"CompanyNodeId":"22","PositionTypeId":"6","PositionTypeName":"Sales Force"},{"Id":"8","name":"Arkaitz Arregui ","NodeType":"Employee","ParentNodeId":null,"children":[],"Selected":false,"CompanyNodeId":"22","PositionTypeId":"6","PositionTypeName":"Sales Force"},{"Id":"9","name":"David Bouzas ","NodeType":"Employee","ParentNodeId":null,"children":[],"Selected":false,"CompanyNodeId":"22","PositionTypeId":"6","PositionTypeName":"Sales Force"},{"Id":"10","name":"Andrés García ","NodeType":"Employee","ParentNodeId":null,"children":[],"Selected":false,"CompanyNodeId":"22","PositionTypeId":"6","PositionTypeName":"Sales Force"}],"Selected":false},{"Id":"23","name":"Zona Sur","NodeType":"CompanyNodeType","ParentNodeId":"21","children":[{"Id":"11","name":"Jesús Moreno ","NodeType":"Employee","ParentNodeId":null,"children":[],"Selected":false,"CompanyNodeId":"23","PositionTypeId":"7","PositionTypeName":"Manager"},{"Id":"12","name":"Antonio G. Bodi","NodeType":"Employee","ParentNodeId":null,"children":[],"Selected":false,"CompanyNodeId":"23","PositionTypeId":"8","PositionTypeName":"Sales Force"},{"Id":"13","name":"Jesús Abarca ","NodeType":"Employee","ParentNodeId":null,"children":[],"Selected":false,"CompanyNodeId":"23","PositionTypeId":"8","PositionTypeName":"Sales Force"},{"Id":"14","name":"Antonio Martín ","NodeType":"Employee","ParentNodeId":null,"children":[],"Selected":false,"CompanyNodeId":"23","PositionTypeId":"8","PositionTypeName":"Sales Force"},{"Id":"15","name":"Marco Machado ","NodeType":"Employee","ParentNodeId":null,"children":[],"Selected":false,"CompanyNodeId":"23","PositionTypeId":"8","PositionTypeName":"Sales Force"}],"Selected":false},{"Id":"24","name":"Zona Este","NodeType":"CompanyNodeType","ParentNodeId":"21","children":[{"Id":"16","name":"Javier Leal ","NodeType":"Employee","ParentNodeId":null,"children":[],"Selected":false,"CompanyNodeId":"24","PositionTypeId":"9","PositionTypeName":"Manager"},{"Id":"17","name":"Eduardo Lillo ","NodeType":"Employee","ParentNodeId":null,"children":[],"Selected":false,"CompanyNodeId":"24","PositionTypeId":"10","PositionTypeName":"Sales Force"},{"Id":"18","name":"Oriol Domenech ","NodeType":"Employee","ParentNodeId":null,"children":[],"Selected":false,"CompanyNodeId":"24","PositionTypeId":"10","PositionTypeName":"Sales Force"},{"Id":"19","name":"Enrique Nuñez ","NodeType":"Employee","ParentNodeId":null,"children":[],"Selected":false,"CompanyNodeId":"24","PositionTypeId":"10","PositionTypeName":"Sales Force"},{"Id":"20","name":"Paco Brocal ","NodeType":"Employee","ParentNodeId":null,"children":[],"Selected":false,"CompanyNodeId":"24","PositionTypeId":"10","PositionTypeName":"Sales Force"}],"Selected":false},{"Id":"25","name":"Zona Centro","NodeType":"CompanyNodeType","ParentNodeId":"21","children":[{"Id":"21","name":"Ángel Sánchez ","NodeType":"Employee","ParentNodeId":null,"children":[],"Selected":false,"CompanyNodeId":"25","PositionTypeId":"11","PositionTypeName":"Manager"},{"Id":"22","name":"Manuel López ","NodeType":"Employee","ParentNodeId":null,"children":[],"Selected":false,"CompanyNodeId":"25","PositionTypeId":"12","PositionTypeName":"Sales Force"},{"Id":"23","name":"J. C. Crespo","NodeType":"Employee","ParentNodeId":null,"children":[],"Selected":false,"CompanyNodeId":"25","PositionTypeId":"12","PositionTypeName":"Sales Force"},{"Id":"24","name":"Carlos Falcó ","NodeType":"Employee","ParentNodeId":null,"children":[],"Selected":false,"CompanyNodeId":"25","PositionTypeId":"12","PositionTypeName":"Sales Force"}],"Selected":false}],"Selected":false},{"Id":"26","name":"NC - CD","NodeType":"CompanyNodeType","ParentNodeId":"4","children":[{"Id":"25","name":"Fernando Jiménez ","NodeType":"Employee","ParentNodeId":null,"children":[],"Selected":false,"CompanyNodeId":"26","PositionTypeId":"14","PositionTypeName":"Manager"},{"Id":"26","name":"Víctor Carratalá ","NodeType":"Employee","ParentNodeId":null,"children":[],"Selected":false,"CompanyNodeId":"26","PositionTypeId":"15","PositionTypeName":"K B Developer"},{"Id":"27","name":"Catherine Cleary ","NodeType":"Employee","ParentNodeId":null,"children":[],"Selected":false,"CompanyNodeId":"26","PositionTypeId":"16","PositionTypeName":"TTM Consultant"},{"Id":"31","name":"Sales Force NC - CD","NodeType":"CompanyNodeType","ParentNodeId":"26","children":[{"Id":"28","name":"Juan Carlos Acción ","NodeType":"Employee","ParentNodeId":null,"children":[],"Selected":false,"CompanyNodeId":"31","PositionTypeId":"17","PositionTypeName":"Sales Force"},{"Id":"29","name":"David Arribas ","NodeType":"Employee","ParentNodeId":null,"children":[],"Selected":false,"CompanyNodeId":"31","PositionTypeId":"17","PositionTypeName":"Sales Force"},{"Id":"30","name":"Francesc Cañellas ","NodeType":"Employee","ParentNodeId":null,"children":[],"Selected":false,"CompanyNodeId":"31","PositionTypeId":"17","PositionTypeName":"Sales Force"},{"Id":"31","name":"Daniel León ","NodeType":"Employee","ParentNodeId":null,"children":[],"Selected":false,"CompanyNodeId":"31","PositionTypeId":"17","PositionTypeName":"Sales Force"},{"Id":"32","name":"David Moliner ","NodeType":"Employee","ParentNodeId":null,"children":[],"Selected":false,"CompanyNodeId":"31","PositionTypeId":"17","PositionTypeName":"Sales Force"},{"Id":"33","name":"Alberto Lesmes ","NodeType":"Employee","ParentNodeId":null,"children":[],"Selected":false,"CompanyNodeId":"31","PositionTypeId":"17","PositionTypeName":"Sales Force"},{"Id":"34","name":"Pedro Pedrón ","NodeType":"Employee","ParentNodeId":null,"children":[],"Selected":false,"CompanyNodeId":"31","PositionTypeId":"17","PositionTypeName":"Sales Force"}],"Selected":false}],"Selected":false},{"Id":"27","name":"KAM","NodeType":"CompanyNodeType","ParentNodeId":"4","children":[{"Id":"35","name":"Victor Monreal ","NodeType":"Employee","ParentNodeId":null,"children":[],"Selected":false,"CompanyNodeId":"27","PositionTypeId":"18","PositionTypeName":"Manager"},{"Id":"36","name":"Óscar Martín ","NodeType":"Employee","ParentNodeId":null,"children":[],"Selected":false,"CompanyNodeId":"27","PositionTypeId":"19","PositionTypeName":"Fleet Service"},{"Id":"37","name":"Alfonso Baeza ","NodeType":"Employee","ParentNodeId":null,"children":[],"Selected":false,"CompanyNodeId":"27","PositionTypeId":"20","PositionTypeName":"KAM"},{"Id":"38","name":"Robin Baer ","NodeType":"Employee","ParentNodeId":null,"children":[],"Selected":false,"CompanyNodeId":"27","PositionTypeId":"20","PositionTypeName":"KAM"}],"Selected":false},{"Id":"28","name":"Moto","NodeType":"CompanyNodeType","ParentNodeId":"4","children":[{"Id":"39","name":"Javier Santos ","NodeType":"Employee","ParentNodeId":null,"children":[],"Selected":false,"CompanyNodeId":"28","PositionTypeId":"21","PositionTypeName":"Manager"},{"Id":"40","name":"Carlos Ortigosa ","NodeType":"Employee","ParentNodeId":null,"children":[],"Selected":false,"CompanyNodeId":"28","PositionTypeId":"22","PositionTypeName":"Sales Force"}],"Selected":false}],"Selected":false},{"Id":"5","name":"Truck Sales","NodeType":"CompanyNodeType","ParentNodeId":"2","children":[{"Id":"41","name":"Daniel Camacho ","NodeType":"Employee","ParentNodeId":null,"children":[],"Selected":false,"CompanyNodeId":"5","PositionTypeId":"23","PositionTypeName":"Manager"},{"Id":"29","name":"Marketing Truck Sales","NodeType":"CompanyNodeType","ParentNodeId":"5","children":[{"Id":"42","name":"Juan Marín ","NodeType":"Employee","ParentNodeId":null,"children":[],"Selected":false,"CompanyNodeId":"29","PositionTypeId":"24","PositionTypeName":"Manager"},{"Id":"43","name":"María Gálvez ","NodeType":"Employee","ParentNodeId":null,"children":[],"Selected":false,"CompanyNodeId":"29","PositionTypeId":"25","PositionTypeName":"Pricing"}],"Selected":false},{"Id":"30","name":"CES - Office","NodeType":"CompanyNodeType","ParentNodeId":"5","children":[{"Id":"44","name":"Jose Luis Martín ","NodeType":"Employee","ParentNodeId":null,"children":[],"Selected":false,"CompanyNodeId":"30","PositionTypeId":"26","PositionTypeName":"Manager"},{"Id":"45","name":"Laura Estepa ","NodeType":"Employee","ParentNodeId":null,"children":[],"Selected":false,"CompanyNodeId":"30","PositionTypeId":"27","PositionTypeName":"Office Ad"},{"Id":"46","name":"Juan José García ","NodeType":"Employee","ParentNodeId":null,"children":[],"Selected":false,"CompanyNodeId":"30","PositionTypeId":"27","PositionTypeName":"Office Ad"},{"Id":"47","name":"Ramón Ramón ","NodeType":"Employee","ParentNodeId":null,"children":[],"Selected":false,"CompanyNodeId":"30","PositionTypeId":"28","PositionTypeName":"Casing Inspe"}],"Selected":false},{"Id":"32","name":"Sales Force Truck Sales","NodeType":"CompanyNodeType","ParentNodeId":"5","children":[{"Id":"48","name":"Raúl Aguilar ","NodeType":"Employee","ParentNodeId":null,"children":[],"Selected":false,"CompanyNodeId":"32","PositionTypeId":"29","PositionTypeName":"Sales Force"},{"Id":"49","name":"Jose Ignacio Vilaplana ","NodeType":"Employee","ParentNodeId":null,"children":[],"Selected":false,"CompanyNodeId":"32","PositionTypeId":"29","PositionTypeName":"Sales Force"},{"Id":"50","name":"J.A. Tapia ","NodeType":"Employee","ParentNodeId":null,"children":[],"Selected":false,"CompanyNodeId":"32","PositionTypeId":"29","PositionTypeName":"Sales Force"},{"Id":"51","name":"Fco. Mancebo ","NodeType":"Employee","ParentNodeId":null,"children":[],"Selected":false,"CompanyNodeId":"32","PositionTypeId":"29","PositionTypeName":"Sales Force"},{"Id":"52","name":"Sergio Molero ","NodeType":"Employee","ParentNodeId":null,"children":[],"Selected":false,"CompanyNodeId":"32","PositionTypeId":"29","PositionTypeName":"Sales Force"},{"Id":"53","name":"Miguel Cortés ","NodeType":"Employee","ParentNodeId":null,"children":[],"Selected":false,"CompanyNodeId":"32","PositionTypeId":"29","PositionTypeName":"Sales Force"},{"Id":"54","name":"Sergio Martínez ","NodeType":"Employee","ParentNodeId":null,"children":[],"Selected":false,"CompanyNodeId":"32","PositionTypeId":"29","PositionTypeName":"Sales Force"},{"Id":"55","name":"Eduardo Galeto ","NodeType":"Employee","ParentNodeId":null,"children":[],"Selected":false,"CompanyNodeId":"32","PositionTypeId":"29","PositionTypeName":"Sales Force"}],"Selected":false},{"Id":"33","name":"Nat Fleet","NodeType":"CompanyNodeType","ParentNodeId":"5","children":[{"Id":"56","name":"Alejandro Moyano ","NodeType":"Employee","ParentNodeId":null,"children":[],"Selected":false,"CompanyNodeId":"33","PositionTypeId":"30","PositionTypeName":"Manager"},{"Id":"57","name":"Miguel Ruíz ","NodeType":"Employee","ParentNodeId":null,"children":[],"Selected":false,"CompanyNodeId":"33","PositionTypeId":"31","PositionTypeName":"Sales Force"}],"Selected":false},{"Id":"34","name":"Fleet KAM","NodeType":"CompanyNodeType","ParentNodeId":"5","children":[{"Id":"58","name":"Miguel Ángel Sánchez ","NodeType":"Employee","ParentNodeId":null,"children":[],"Selected":false,"CompanyNodeId":"34","PositionTypeId":"32","PositionTypeName":"Manager"}],"Selected":false},{"Id":"35","name":"Network","NodeType":"CompanyNodeType","ParentNodeId":"5","children":[{"Id":"59","name":"Jose Trujillo ","NodeType":"Employee","ParentNodeId":null,"children":[],"Selected":false,"CompanyNodeId":"35","PositionTypeId":"33","PositionTypeName":"Manager"}],"Selected":false}],"Selected":false},{"Id":"6","name":"Com Specialty Tires","NodeType":"CompanyNodeType","ParentNodeId":"2","children":[],"Selected":false},{"Id":"7","name":"OE Truck","NodeType":"CompanyNodeType","ParentNodeId":"2","children":[],"Selected":false},{"Id":"8","name":"Pass OE","NodeType":"CompanyNodeType","ParentNodeId":"2","children":[],"Selected":false},{"Id":"9","name":"Customer Service","NodeType":"CompanyNodeType","ParentNodeId":"2","children":[],"Selected":false},{"Id":"10","name":"Marketing PLT","NodeType":"CompanyNodeType","ParentNodeId":"2","children":[],"Selected":false},{"Id":"11","name":"Market Demmand & COD","NodeType":"CompanyNodeType","ParentNodeId":"2","children":[],"Selected":false}],"Selected":false},{"Id":"12","name":"HR","NodeType":"CompanyNodeType","ParentNodeId":"1","children":[],"Selected":false},{"Id":"13","name":"F&A","NodeType":"CompanyNodeType","ParentNodeId":"1","children":[{"Id":"14","name":"IT","NodeType":"CompanyNodeType","ParentNodeId":"13","children":[],"Selected":false},{"Id":"15","name":"Accounting, Tax, Credit","NodeType":"CompanyNodeType","ParentNodeId":"13","children":[],"Selected":false}],"Selected":false},{"Id":"16","name":"ContiTrade","NodeType":"CompanyNodeType","ParentNodeId":"1","children":[{"Id":"17","name":"Marketing ContiTrade","NodeType":"CompanyNodeType","ParentNodeId":"16","children":[],"Selected":false},{"Id":"18","name":"Administración","NodeType":"CompanyNodeType","ParentNodeId":"16","children":[],"Selected":false},{"Id":"19","name":"Regional","NodeType":"CompanyNodeType","ParentNodeId":"16","children":[],"Selected":false},{"Id":"20","name":"Sales Force","NodeType":"CompanyNodeType","ParentNodeId":"16","children":[],"Selected":false}],"Selected":false}],"Selected":true}]
	};

/*
* Hacemos uso de la biblioteca: SPServices (https://spservices.codeplex.com/)
* que nos permite acceder a la informacion de las listas a traves de los servicios REST que proporciona SharePoint.
*/	
function LoadData(){
	LoadEmployees();
}

function LoadEmployees(){
    $().SPServices({
        operation: "GetListItems",
        async: false,
        listName: "empleados",
        CAMLViewFields:  "<ViewFields Properties='True' />",
        CAMLQuery: "<Query><OrderBy><FieldRef Name='Orden' Ascending='false' /></OrderBy></Query>",        
        completefunc: function (xData, Status) {
			if (Status == "success") {
				$(xData.responseXML).SPFilterNode("z:row").each(function() {                
					
					var companyNode = $(this).attr("ows_Departamento");
					var companyNodeId = null;
					if (companyNode != null)
						companyNodeId = companyNode.substr(0, companyNode.indexOf(';#'));
					
					var positionType = $(this).attr("ows_Puesto");
					var positionTypeId = null, positionTypeName = null;
					if (positionType != null){
						positionTypeId = positionType.substr(0, positionType.indexOf(';#'));
						positionTypeName = positionType.substr(positionType.indexOf(';#') + 2, positionType.length);
					}
					
					var fullName = $(this).attr("ows_Nombre_x0020_y_x0020_apellidos");
					var fullNameSplit = fullName.substr(fullName.indexOf(';#') + 2, fullName.length);
									
					employees.push(
							{
								"Id": $(this).attr("ows_ID"),
								"name": fullNameSplit,
								"NodeType": "Employee",
								"ParentNodeId": null,
								"children": [],
								"Selected": false,
								"CompanyNodeId": companyNodeId,
								"PositionTypeId": positionTypeId,
								"PositionTypeName": positionTypeName
							}
						);				
				});
			} else {				
				PaintException('Excepcion producida al recuperar los empleados. ' + xData.responseText);
			}				
			LoadPositionTypes();			
        }		
    });	
}

function LoadPositionTypes(){
    $().SPServices({
        operation: "GetListItems",
        async: false,
        listName: "puestos",
        CAMLViewFields:  "<ViewFields Properties='True' />",
        CAMLQuery: "<Query><OrderBy><FieldRef Name='Orden' Ascending='false' /></OrderBy></Query>",
        //CAMLRowLimit: 5, 			// Numero de elementos a recuperar
        completefunc: function (xData, Status) {
			if (Status == "success") {			
				$(xData.responseXML).SPFilterNode("z:row").each(function() {
					var name = $(this).attr("ows_Title");
				});
				LoadCompanyNodes();
			} else {
				PaintException('Excepcion producida al recuperar los puestos de trabajo. ' + xData.responseText);
			}
        }
    });
}

function LoadCompanyNodes(){
    $().SPServices({
        operation: "GetListItems", 	
        async: false,				
        listName: "departamentos",		
        CAMLViewFields:  "<ViewFields Properties='True' />",	
        CAMLQuery: "<Query><OrderBy><FieldRef Name='Orden' Ascending='false' /></OrderBy></Query>", 
        //CAMLRowLimit: 5, 			// Numero de elementos a recuperar
        completefunc: function (xData, Status) {
			if (Status == "success") {
				$(xData.responseXML).SPFilterNode("z:row").each(function() {
					var nodeType = "CompanyNodeType";
					var companyNodeId = $(this).attr("ows_ID");
					var parentId = null;
					var selected = false;
					var parent = $(this).attr("ows_Departamento_x0020_padre");
					
					if (parent != null){
						parentId = parent.substr(0, parent.indexOf(';#'));
					}else{
						nodeType = "RootNode";
						selected = true;
					}
					
					var employeesByCompanyNode = getEmployees(companyNodeId);												
					
					companyNodes.push(
							{
								"Id": companyNodeId,
								"name": $(this).attr("ows_Title"),
								"NodeType": nodeType,
								"ParentNodeId": parentId,
								"children": employeesByCompanyNode,
								"Selected": selected
							}
						);
				});            
				ConstructHierarchyData();			
			} else {
				PaintException('Excepcion producida al recuperar los puestos de trabajo. ' + xData.responseText);
			}
        }				
    });	
}

function getEmployees(companyNodeId){
	var employeesByCompanyNode = [];
	$.each(employees, function(i, v) {
		if (v.CompanyNodeId == companyNodeId) {
			employeesByCompanyNode.push(v);			
		}
	});
	return employeesByCompanyNode;
}
	
function checkChild(parentId, parent) {
	$.each(companyNodes, function(i, v) {
		if (v.NodeType == "CompanyNodeType" && v.ParentNodeId == parentId) {			
			parent.children.push(v);			
			checkChild(v.Id, v);						
		}else{
			return;
		}
	});	
}

function ConstructHierarchyData(){						
	var parentId = null;
	globalVar.organizationData = [];
	$.each(companyNodes, function(i, v) {
		if (v.ParentNodeId == null) {
			globalVar.organizationData.push(v);			
			checkChild(v.Id, v);
		}
	});		
}

function getObjects(obj, key, val, nodeType) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getObjects(obj[i], key, val, nodeType));
        } else if (i == key && obj[key] == val && obj['NodeType'] == nodeType) {
            objects.push(obj);
        }
    }
    return objects;
}

function transformNodeToHtml(data, isSub){
	var html = ""; 

	if (data.length == 1 && data[0].NodeType == "Employee")	
		return GetEmployeePersonalInformation(data[0]);
	
	if (isSub)
		html += "<ul>";
	else
		html += "<ul id='org' style='display: none;'>" 		
	
	for(i in data){
        html += '<li>';
        if(typeof(data[i].children) === 'object'){ // An array will return 'object'
            if(isSub && data[i].children.length){
                html += '<span class="companyNode" data-id="' + data[i].Id + '" data-type="' + data[i].NodeType + '">' + data[i].name + '</span>';
            } else {
				if (data[i].NodeType == "Employee")
					html += '<span class="positionType">' + data[i].PositionTypeName + '</span><br><span data-type="' + data[i].NodeType + '">' + data[i].name + '</span>'; 
				else 
					html += '<span class="companyNode" data-type="' + data[i].NodeType + '">' + data[i].name + '</span>'; 									
            }
            html += transformNodeToHtml(data[i].children, true); // Submenu found. Calling recursively same method (and wrapping it in a div)
        } else {
            html += '<span data-id="' + data[i].Id + '"  data-type="' + data[i].NodeType + '">' + data[i].name + '</span>'; //data[i].Id // No submenu
        }
        html += '</li>';		
	}
	html += '</ul>';
	html = html.replace("<ul></ul>", "");	
	return html;	
}

function GetEmployeePersonalInformation(employeeNode){
	return	'<div id="wrapper"> ' +
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

function CustomizeHtml(html){
	var htmlObject = $($.parseHTML(html));	
	var managerEmployees = htmlObject.find("span.positionType:contains('Manager')");
	$(managerEmployees).each(function(i) {		
		var managerCompanyNode = $(this).parent().parent().prev('.companyNode');
		var managerCompanyNodeText =  managerCompanyNode.html();

		var manager = $(this).parent();
		$(this).parent().find('span:last')[0]
		var managerText =  manager.find('span:last').text();

		managerCompanyNode.html(managerCompanyNodeText + "<br />" + "<div class='manager'><span>" + managerText + "</span></div>");
		manager.remove();
	});

	var assistantEmployees = htmlObject.find("span.positionType:contains('Assistant')");
	$(assistantEmployees).each(function(i) {		
		var assistantCompanyNode = $(this).parent().parent().prev('.companyNode');
		var assistantCompanyNodeText =  assistantCompanyNode.html();

		var assistant = $(this).parent();
		$(this).parent().find('span:last')[0]
		var assistantText =  assistant.find('span:last').text();

		assistantCompanyNode.html(assistantCompanyNodeText + "<br />" + "<div class='assistant'><span class='assistantLiteral'>Assistant</span><br/><span>" + assistantText + "</span></div>");
		assistant.remove();
	});	
	
	return htmlObject[0].outerHTML;
}

function PaintException (message){
	$('#errorSection').show();
	$('#errorTitle').append(message + '<br/>');	
}

function HideAssistantSecondLevels(){
	$('.jOrgChart').find('table tbody tr td.node-container div.assistant').remove();
}