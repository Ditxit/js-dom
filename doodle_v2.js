export default class Doodle{
	"use strict";
	constructor(){
		this.data = {};
		this.html = '';
		this.uuid = 'doodle-' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
	}

	html(html){
		this.html = html;
	}

	get element(){ return document.getElementById(this.uuid); }

	display(){
		document.body.append(this.getNodeOfHtml(this.getHtmlWithData(this.html,this.data)));	
	}

	remove(){
		this.element.parentNode.removeChild(this.element);
	}

	update(){
		this.element.parentNode.replaceChild(this.getNodeOfHtml(this.getHtmlWithData(this.html,this.data)), this.element);
	} 


	getHtmlWithData(sTemplate, mData){
		if (typeof sTemplate === "string"){
			mData = mData ? mData : {};
			return sTemplate.replace(/\$\{\s*([$#@\-\d\w]+)\s*\}/gim, function (fullMath, key){return mData[key];});
		}
		return "";
	}

	getNodeOfHtml = function(string){
		const _template = document.createElement('template');
		_template.innerHTML = string;

		var _content = _template.content.firstChild;
		//var _content = _template.content

		switch(_content.nodeType) {
		  	case Node.ELEMENT_NODE:
		  	case Node.DOCUMENT_NODE:
		  	case Node.DOCUMENT_FRAGMENT_NODE:
		  		_content.id = this.uuid; 
		  		break;
		  	case Node.TEXT_NODE:
		  		_content = document.createElement('span');
				_content.style.all = 'initial';
				_content.id = this.uuid; 
				_content.innerHTML = string;
				break;
			case Node.COMMENT_NODE:
			case Node.DOCUMENT_TYPE_NODE:
				break;
			case Node.CDATA_SECTION_NODE:
		  	case Node.PROCESSING_INSTRUCTION_NODE:
		  		_content = 'ERROR: Either "CDATA_SECTION_NODE" or "PROCESSING_INSTRUCTION_NODE" was detected.';
		    	break;
		  	default:
		  		_content = 'ERROR: Poor HTML detected, could not compile to node object.';
		}
		return _content;
	}

	// EVENTS HANDELER
	// 'option' is for handeling the click for child element of the component
	on(event_name, event_function, option) { 
		const _uuid = this.uuid;
		document.addEventListener(event_name, function(event) {
			try{
				var element = document.getElementById(_uuid);
				if(option){ element = element.querySelector(option); }
				if( element ){
					if( element == event.target || element.contains(event.target) ) {
						event_function(event);
					}
				}
			}catch(e){
				console.log(e);
			}
		});
	}

	// Selector
	select(string){ return this.element.querySelector(string); }

	// EXTENDED DISPLAY
	get rawElement() { return this.getNodeOfHtml(this.getHtmlWithData(this.html,this.data));}
	set firstChild(node){ this.element.insertBefore(node.rawElement, this.element.firstChild); }
	set lastChild(node){ this.element.insertBefore(node.rawElement,this.element.lastChild.nextSibling); }
	set childAt(array) { this.element.insertBefore(array[1].rawElement, this.element.children[array[0]]); }

	set before(node){ document.body.insertBefore(node.rawElement,this.element); }
	set after(node){ document.body.insertBefore(node.rawElement,this.element.nextSibling); }

} // Doodle


