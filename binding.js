/* @function : Binding
*   This class is used to bind data to a component
*/

export default function(b) {
	_this = this
	this.element = b.element	
	this.value = b.object[b.property]
	this.attribute = b.attribute
	this.valueGetter = function(){
		return _this.value;
	}
	this.valueSetter = function(val){
		_this.value = val
		_this.element[_this.attribute] = val
	}

	Object.defineProperty(b.object, b.property, {
		get: this.valueGetter,
		set: this.valueSetter
	});	
	b.object[b.property] = this.value;
	
	this.element[this.attribute] = this.value

}