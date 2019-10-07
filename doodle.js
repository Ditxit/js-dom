export default class Doodle{

	constructor(){
		this.database = {};
		this.uniqueid = 'DOODLE_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);	
		this.template = document.createElement(this.uniqueid);
		this.document = this.template;
	}

	/* 
		@Method => Setter
		@params => String 
	*/
	set content(innerHTML){
		this.contentString = innerHTML;
		this.template.innerHTML = this.replace(this.contentString,this.database);
	}

	/* 
		@Method => Getter
		@return => Object 
	*/
	get content(){
		//return this.template.innerHTML;
		//return this.document;
		//return this.template.toString();
		//return this.replace(this.contentString,this.database);
		return "<"+this.uniqueid+">"+this.replace(this.contentString,this.database)+"</"+this.uniqueid+">";
	}

	update(){
		this.document.innerHTML = this.replace(this.contentString,this.database);
	} 

	display(){
		document.body.append(this.template);
		this.document = document.querySelector(this.uniqueid);
	} 


	// Mouse Events
	set onClick(fun) { this.document.onclick = fun; }
	set onRightClick(fun) { this.document.oncontextmenu = fun; }
	set onDoubleClick(fun) { this.document.ondblclick = fun; }
	set onMouseUp(fun) { this.document.onmouseup = fun; }
	set onMouseDown(fun) { this.document.onmousedown = fun; }
	set onMouseEnter(fun) { this.document.onmouseenter = fun; }
	set onMouseLeave(fun) { this.document.onmouseleave = fun; }
	set onMouseMove(fun) { this.document.onmousemove = fun; }
	set onMouseOut(fun) { this.document.onmouseout = fun; }
	set onMouseOver(fun) { this.document.onmouseover = fun; }
	
	// ClipboardEvent Methods
	set onCopy(fun) { this.document.oncopy = fun; }
	set onCut(fun) { this.document.oncut = fun; }
	set onPaste(fun) { this.document.onpaste = fun; }

	// InputEvents Methods
	set onInput(fun) { this.document.oninput = fun; }

	// KeyboardEvent Methods
	set onKeyDown(fun) { this.document.onkeydown = fun; }
	set onKeyPress(fun) { this.document.onkeypress = fun; }
	set onKeyUp(fun) { this.document.onkeyup = fun; }

	// WheelEvent Methods / Scroll
	set onScroll(fun) { this.document.onwheel = fun; }



	/* NOT MY CODE */
	replace(sTemplate, mData) {
		if (typeof sTemplate === "string") {
			mData = mData ? mData : {};
			return sTemplate.replace(/\$\{\s*([$#@\-\d\w]+)\s*\}/gim, function (fullMath, grp) {
				//console.log(grp);
				return mData[grp];

				let val = mData[grp];
				if (typeof val === "function") {
					val = grp+'()';
				} else if (val === null || val === undefined) {
					val = "";
				} else if (typeof val === "object") {
					//val = "Object"; 
					val = this.database.grp;
				} else if (typeof val === "symbol") {
					val = val.toString();
				}else {
					val = val.valueOf();
				}
				console.log(val);
				return val;
			});
		}
		return "";
	} // Replace


	/* EXPERIMENTAL FEATURES */
	set before(param){
		this.contentString = param + this.contentString;
	}

	set after(param){
		this.contentString = this.contentString + param;
	}

	//return 'id-' + Math.random().toString(36).substr(2, 16) + Date.getTime();
	//return window.crypto.getRandomValues(new Uint32Array(1))[0].toString(16);
	//return 'id-' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
	//return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16))

} // Doodle